"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type InboxMessage = {
  id: string;
  content: string;
  created_at: string;
};

export default function InboxPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      router.replace("/login");
      return;
    }

    const { data, error: queryError } = await supabase
      .from("messages")
      .select("id, content, created_at")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false });

    if (queryError) {
      console.error("Anomass inbox load failed:", queryError);
      setError("We couldn't load your messages. Please try again.");
    } else {
      setMessages((data ?? []) as InboxMessage[]);
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  async function deleteMessage(id: string) {
    const confirmed = window.confirm("Delete this message permanently?");
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const { error: deleteError } = await supabase
      .from("messages")
      .delete()
      .eq("id", id)
      .eq("recipient_id", user.id);

    setDeletingId(null);

    if (deleteError) {
      console.error("Anomass message deletion failed:", deleteError);
      setError("We couldn't delete that message. Please try again.");
      return;
    }

    setMessages((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] px-5 py-6 text-[#242329]">
      <header className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight">
          anomass<span className="text-violet-600">.</span>
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-black/5"
        >
          Dashboard
        </Link>
      </header>

      <section className="mx-auto max-w-3xl pt-10 sm:pt-14">
        <p className="text-sm font-semibold text-violet-700">YOUR PRIVATE INBOX</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Messages</h1>
        <p className="mt-3 text-[#77747d]">
          Anonymous messages sent to your Anomass link appear here.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#77747d]">
            {loading ? "Loading messages..." : `${messages.length} message${messages.length === 1 ? "" : "s"}`}
          </p>
          <button
            onClick={() => void loadMessages()}
            disabled={loading}
            className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-bold hover:bg-black/[0.03] disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="mt-6 rounded-3xl border border-black/[0.07] bg-white p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <span className="text-2xl">✉</span>
            </div>
            <h2 className="mt-5 text-xl font-bold">No messages yet</h2>
            <p className="mt-2 text-sm leading-6 text-[#77747d]">
              Share your personal link with friends. When they send a message, it will appear here.
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700"
            >
              Go to my link
            </Link>
          </div>
        )}

        <div className="mt-5 space-y-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-3xl border border-black/[0.07] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="whitespace-pre-wrap break-words text-base leading-7">
                  {message.content}
                </p>
                <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                  Anonymous
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
                <time className="text-xs text-[#77747d]" dateTime={message.created_at}>
                  {new Date(message.created_at).toLocaleString()}
                </time>
                <button
                  onClick={() => void deleteMessage(message.id)}
                  disabled={deletingId === message.id}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === message.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
