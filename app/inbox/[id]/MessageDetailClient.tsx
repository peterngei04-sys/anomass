"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
};

export default function MessageDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadMessage = useCallback(async () => {
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

    const { data, error: fetchError } = await supabase
      .from("messages")
      .select("id, content, created_at, is_read")
      .eq("id", params.id)
      .eq("recipient_id", user.id)
      .maybeSingle();

    if (fetchError || !data) {
      setError("This message could not be found or is no longer available.");
      setLoading(false);
      return;
    }

    const currentMessage = data as Message;
    setMessage(currentMessage);
    setLoading(false);

    if (!currentMessage.is_read) {
      const { error: updateError } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", currentMessage.id)
        .eq("recipient_id", user.id);

      if (!updateError) {
        setMessage({ ...currentMessage, is_read: true });
      }
    }
  }, [params.id, router]);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  async function deleteMessage() {
    if (!message || deleting) return;

    const confirmed = window.confirm(
      "Delete this message? You won't be able to get it back."
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const { error: deleteError } = await supabase
      .from("messages")
      .delete()
      .eq("id", message.id)
      .eq("recipient_id", user.id);

    if (deleteError) {
      setError("This message couldn't be deleted. Please try again.");
      setDeleting(false);
      return;
    }

    router.replace("/inbox");
  }

  function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Recently received";

    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }

  return (
    <main className="inbox-page">
      <div className="inbox-shell">
        <header className="inbox-topbar">
          <Link href="/dashboard" className="inbox-brand">
            <span className="inbox-brand-symbol">a.</span>
            <span>anomass</span>
          </Link>

          <Link href="/inbox" className="inbox-back-link">
            <span aria-hidden="true">←</span> All messages
          </Link>
        </header>

        <section className="inbox-hero">
          <div className="inbox-hero-copy">
            <p className="inbox-eyebrow">A MESSAGE JUST FOR YOU ✦</p>
            <h1>
              Someone had
              <br />
              <span>something to say.</span>
            </h1>
            <p className="inbox-subtitle">
              Take a moment with their words. The sender stays anonymous.
            </p>
          </div>
          <div className="inbox-hero-art" aria-hidden="true">
            <div className="inbox-art-glow" />
            <div className="inbox-envelope">💌</div>
            <span className="inbox-art-star inbox-star-one">✦</span>
            <span className="inbox-art-star inbox-star-two">✧</span>
            <span className="inbox-art-note">just between us ♡</span>
          </div>
        </section>

        {loading ? (
          <div className="inbox-loading">
            <div className="inbox-loader" />
            <p>Opening your message...</p>
          </div>
        ) : error && !message ? (
          <section className="inbox-empty">
            <h3>We couldn't open that message.</h3>
            <p className="empty-description">{error}</p>
            <Link href="/inbox" className="empty-primary-button">
              Back to inbox <span>←</span>
            </Link>
          </section>
        ) : message ? (
          <section className="inbox-message-detail">
            <article className="inbox-message-card">
              <div className="message-card-top">
                <div className="message-avatar">♡</div>
                <div className="message-meta">
                  <span className="anonymous-label">
                    <span className="anonymous-dot" />
                    ANONYMOUS MESSAGE
                  </span>
                  <time dateTime={message.created_at}>
                    {formatDate(message.created_at)}
                  </time>
                </div>
                <span className="message-card-number">
                  {message.is_read ? "READ" : "NEW"}
                </span>
              </div>

              <div className="message-card-content message-full-content">
                {message.content}
              </div>

              <div className="message-card-bottom">
                <span className="message-secret-note">
                  <span>🔒</span> Sender identity not shown
                </span>
                <button
                  type="button"
                  className="message-delete-button"
                  onClick={deleteMessage}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "× Delete"}
                </button>
              </div>
            </article>

            {error && (
              <div className="inbox-error" role="alert">{error}</div>
            )}

            <div className="message-detail-actions">
              <Link href="/inbox" className="empty-primary-button">
                ← Back to all messages
              </Link>
              <Link href="/dashboard" className="share-nudge-button">
                Share my link ↗
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
