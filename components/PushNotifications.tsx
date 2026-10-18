"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PushStatus =
  | "checking"
  | "ready"
  | "enabled"
  | "denied"
  | "unsupported"
  | "working"
  | "error";

function decodeVapidKey(value: string): Uint8Array {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const bytes = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

export default function PushNotifications() {
  const [status, setStatus] = useState<PushStatus>("checking");
  const [note, setNote] = useState("");

  useEffect(() => {
    let active = true;

    async function checkStatus() {
      if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("Notification" in window)
      ) {
        if (active) setStatus("unsupported");
        return;
      }

      if (Notification.permission === "denied") {
        if (active) setStatus("denied");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (active) setStatus("ready");
        return;
      }

      try {
        const registration = await navigator.serviceWorker.getRegistration("/");
        const subscription = await registration?.pushManager.getSubscription();

        if (subscription) {
          const { data } = await supabase
            .from("push_subscriptions")
            .select("endpoint")
            .eq("user_id", user.id)
            .eq("endpoint", subscription.endpoint)
            .maybeSingle();

          if (active) setStatus(data ? "enabled" : "ready");
        } else if (active) {
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("ready");
      }
    }

    checkStatus();
    return () => {
      active = false;
    };
  }, []);

  async function enableNotifications() {
    setNote("");
    setStatus("working");

    try {
      const publicKey = process.env.NEXT_PUBLIC_ANOMASS_VAPID_PUBLIC_KEY;
      if (!publicKey) throw new Error("The public push key is not configured.");

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setNote("Please log in again, then enable notifications.");
        setStatus("error");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "ready");
        setNote("Notifications were not allowed. You can enable them in your browser settings.");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeVapidKey(publicKey) as BufferSource,
      });

      const { error } = await supabase
        .from("push_subscriptions")
        .upsert(
          {
            user_id: user.id,
            endpoint: subscription.endpoint,
            subscription: subscription.toJSON(),
          },
          { onConflict: "endpoint" },
        );

      if (error) {
        await subscription.unsubscribe();
        throw new Error("Could not save this device in your account. Run the Supabase SQL setup first.");
      }

      setStatus("enabled");
      setNote("This device is registered for new-message alerts.");
    } catch (error) {
      console.error("Anomass push setup failed:", error);
      setStatus("error");
      setNote(
        error instanceof Error
          ? error.message
          : "Could not enable notifications. Please try again.",
      );
    }
  }

  async function disableNotifications() {
    setNote("");
    setStatus("working");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const registration = await navigator.serviceWorker.getRegistration("/");
      const subscription = await registration?.pushManager.getSubscription();

      if (subscription && user) {
        const { error } = await supabase
          .from("push_subscriptions")
          .delete()
          .eq("user_id", user.id)
          .eq("endpoint", subscription.endpoint);

        if (error) throw new Error("Could not remove this device from your account.");
        await subscription.unsubscribe();
      }

      setStatus("ready");
      setNote("Notifications are turned off for this device.");
    } catch {
      setStatus("error");
      setNote("Could not turn off notifications. Please try again.");
    }
  }

  return (
    <section className="push-settings-card">
      <div className="push-settings-icon" aria-hidden="true">🔔</div>
      <div className="push-settings-copy">
        <p className="push-settings-eyebrow">STAY IN THE LOOP</p>
        <h2>New messages, right away.</h2>
        <p>
          Get a private alert when someone leaves you an anonymous message.
          The message itself stays out of your lock-screen notification.
        </p>
        {note && <p className="push-settings-note" role="status">{note}</p>}
        {status === "denied" && (
          <p className="push-settings-note">
            Notifications are blocked in your browser settings. Allow them there first.
          </p>
        )}
        {status === "unsupported" && (
          <p className="push-settings-note">
            This browser does not support web push. Try the latest Chrome on Android.
          </p>
        )}
      </div>
      <div className="push-settings-action">
        {status === "enabled" ? (
          <button type="button" onClick={disableNotifications} className="push-settings-button" disabled={false}>
            Turn off
          </button>
        ) : (
          <button
            type="button"
            onClick={enableNotifications}
            className="push-settings-button"
            disabled={status === "checking" || status === "working" || status === "unsupported" || status === "denied"}
          >
            {status === "working" ? "Setting up…" : status === "checking" ? "Checking…" : "Enable alerts"}
          </button>
        )}
      </div>
    </section>
  );
}
