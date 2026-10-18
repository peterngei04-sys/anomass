import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";


type MessageWebhook = {
  type?: string;
  table?: string;
  record?: {
    id?: string;
    recipient_id?: string;
  };
};

export async function POST(request: Request) {
  const secret = process.env.ANOMASS_PUSH_WEBHOOK_SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: MessageWebhook;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    payload.type !== "INSERT" ||
    payload.table !== "messages" ||
    !payload.record?.recipient_id
  ) {
    return NextResponse.json({ skipped: true });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_ANOMASS_VAPID_PUBLIC_KEY;
  const privateKey = process.env.ANOMASS_VAPID_PRIVATE_KEY;

  if (!supabaseUrl || !serviceRoleKey || !publicKey || !privateKey) {
    console.error("Push server environment is incomplete.");
    return NextResponse.json({ error: "Push server is not configured" }, { status: 500 });
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  webpush.setVapidDetails("https://anomass.vercel.app", publicKey, privateKey);

  const { data: subscriptions, error } = await db
    .from("push_subscriptions")
    .select("endpoint, subscription")
    .eq("user_id", payload.record.recipient_id);

  if (error) {
    console.error("Could not load push subscriptions:", error.message);
    return NextResponse.json({ error: "Could not load subscriptions" }, { status: 500 });
  }

  const results = await Promise.allSettled(
    (subscriptions ?? []).map(async (item) => {
      try {
        await webpush.sendNotification(
          item.subscription,
          JSON.stringify({ type: "new_message" }),
          { TTL: 60 * 60 },
        );
      } catch (error) {
        const statusCode =
          typeof error === "object" && error !== null && "statusCode" in error
            ? Number(error.statusCode)
            : 0;

        if (statusCode === 404 || statusCode === 410) {
          await db
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", item.endpoint);
        } else {
          throw error;
        }
      }
    }),
  );

  const failed = results.filter((result) => result.status === "rejected").length;
  if (failed) console.error(`Push delivery failed for ${failed} subscription(s).`);

  return NextResponse.json({
    sent: results.length - failed,
    failed,
  });
}
