"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
};

export default function InboxPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const loadMessages = useCallback(async (quiet = false) => {
    if (quiet) setRefreshing(true);
    else setLoading(true);

    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      router.replace("/login");
      return;
    }

    const [messageResult, profileResult] = await Promise.all([
      supabase
        .from("messages")
        .select("id, content, created_at, is_read")
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle(),
    ]);

    if (messageResult.error) {
      setError("We couldn't load your messages. Please try again.");
    } else {
      setMessages((messageResult.data ?? []) as Message[]);
    }

    setUsername(profileResult.data?.username ?? "");
    setLoading(false);
    setRefreshing(false);
  }, [router]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  async function deleteMessage(id: string) {
    const confirmed = window.confirm(
      "Delete this message? You won't be able to get it back."
    );

    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError("That message couldn't be deleted. Please try again.");
      return;
    }

    setMessages((current) => current.filter((message) => message.id !== id));
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

          <Link href="/dashboard" className="inbox-back-link">
            <span aria-hidden="true">←</span> Dashboard
          </Link>
        </header>

        <section className="inbox-hero">
          <div className="inbox-hero-copy">
            <p className="inbox-eyebrow">YOUR SECRET CORNER ✦</p>
            <h1>
              The things
              <br />
              <span>people want to say.</span>
            </h1>
            <p className="inbox-subtitle">
              Every message is a little mystery. Read them, enjoy them, and
              remember: someone took a moment to send you something.
            </p>
          </div>

          <div className="inbox-hero-art" aria-hidden="true">
            <div className="inbox-art-glow" />
            <div className="inbox-envelope">💌</div>
            <span className="inbox-art-star inbox-star-one">✦</span>
            <span className="inbox-art-star inbox-star-two">✧</span>
            <span className="inbox-art-note">psst... 👀</span>
          </div>
        </section>

        <section className="inbox-toolbar">
          <div>
            <p className="inbox-section-kicker">THE MESSAGE VAULT</p>
            <h2>Your inbox <span>♡</span></h2>
          </div>

          <div className="inbox-toolbar-right">
            <span className="inbox-total">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </span>
            <button
              type="button"
              className="inbox-refresh-button"
              onClick={() => loadMessages(true)}
              disabled={loading || refreshing}
            >
              <span className={refreshing ? "refresh-spinning" : ""}>↻</span>
              {refreshing ? "Checking..." : "Refresh"}
            </button>
          </div>
        </section>

        {error && (
          <div className="inbox-error" role="alert">
            <span>♡</span> {error}
            <button type="button" onClick={() => loadMessages()}>
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="inbox-loading">
            <div className="inbox-loader" />
            <p>Unsealing your messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <section className="inbox-empty">
            <div className="empty-illustration">
              <span className="empty-sparkle empty-sparkle-left">✦</span>
              <span className="empty-envelope">💌</span>
              <span className="empty-sparkle empty-sparkle-right">✧</span>
            </div>

            <p className="empty-kicker">A LITTLE QUIET IN HERE</p>
            <h3>Your story starts with the first message.</h3>
            <p className="empty-description">
              Your inbox is waiting for its first surprise. Share your Anomass
              link and let people know they can say what’s on their mind.
            </p>

            <Link href="/dashboard" className="empty-primary-button">
              Get your link <span>↗</span>
            </Link>

            <p className="empty-footnote">
              Your next notification could be interesting 👀
            </p>
          </section>
        ) : (
          <section className="inbox-message-grid">
            {messages.map((message, index) => (
              <article
                key={message.id}
                className={`inbox-message-card ${!message.is_read ? "is-unread" : ""}`}
                style={{ animationDelay: `${Math.min(index, 8) * 65}ms` }}
              >
                <Link
                  href={`/inbox/${message.id}`}
                  className="inbox-message-open"
                  aria-label={`Open ${message.is_read ? "message" : "unread message"} from ${formatDate(message.created_at)}`}
                >
                <div className="message-card-top">
                  <div className="message-avatar">
                    {["♡", "✦", "✿", "✧"][index % 4]}
                  </div>
                  <div className="message-meta">
                    <span className="anonymous-label">
                      <span className="anonymous-dot" />
                      ANONYMOUS MESSAGE
                    </span>
                    {!message.is_read && (
                      <span className="message-unread-label">
                        <span className="message-unread-dot" />
                        NEW
                      </span>
                    )}
                    <time dateTime={message.created_at}>
                      {formatDate(message.created_at)}
                    </time>
                  </div>
                  <span className="message-card-number">
                    #{String(messages.length - index).padStart(2, "0")}
                  </span>
                </div>

                <div className="message-card-content message-preview">
                  {message.content.length > 100
                    ? `${message.content.slice(0, 100).trimEnd()}…`
                    : message.content}
                  <span className="message-open-hint">Tap to read →</span>
                </div>
                </Link>

                <div className="message-card-bottom">
                  <span className="message-secret-note">
                    <span>🔒</span> Sender identity not shown
                  </span>
                  <button
                    type="button"
                    className="message-delete-button"
                    onClick={() => deleteMessage(message.id)}
                    aria-label="Delete message"
                    title="Delete message"
                  >
                    <span aria-hidden="true">×</span> Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="inbox-share-nudge">
          <div className="share-nudge-icon">💗</div>
          <div className="share-nudge-copy">
            <h3>Want more messages?</h3>
            <p>Your link is the key. Share it and see what happens.</p>
          </div>
          <Link href="/dashboard" className="share-nudge-button">
            Share my link <span>↗</span>
          </Link>
        </section>

        <footer className="inbox-footer">
          <span>Some things are easier left unsaid... or anonymously said. ♡</span>
          <Link href="/dashboard">Back to your space</Link>
        </footer>
      </div>
    </main>
  );
}
