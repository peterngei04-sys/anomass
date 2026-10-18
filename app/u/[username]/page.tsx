"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Recipient = {
  id: string;
  username: string;
};

export default function PublicMessagePage() {
  return (
    <Suspense
      fallback={
        <main className="public-message-page">
          <div className="public-message-loading">
            <div className="public-message-loader" />
            <p>Opening their little corner...</p>
          </div>
        </main>
      }
    >
      <PublicMessageContent />
    </Suspense>
  );
}

function PublicMessageContent() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username || "").toLowerCase();

  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRecipient() {
      setLoading(true);
      setError("");

      const { data, error: lookupError } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("username", username)
        .maybeSingle();

      if (!active) return;

      if (lookupError) {
        setError("We couldn't load this page. Please try again.");
      } else if (data) {
        setRecipient(data as Recipient);
      } else {
        setRecipient(null);
      }

      setLoading(false);
    }

    if (username) loadRecipient();

    return () => {
      active = false;
    };
  }, [username]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const content = message.trim();

    if (!recipient) {
      setError("This Anomass link doesn't seem to exist.");
      return;
    }

    if (!content) {
      setError("Write a little something before sending.");
      return;
    }

    if (content.length > 500) {
      setError("Keep your message under 500 characters.");
      return;
    }

    setSending(true);

    const { error: insertError } = await supabase
      .from("messages")
      .insert({
        recipient_id: recipient.id,
        content,
      });

    setSending(false);

    if (insertError) {
      setError("Your message couldn't be sent. Please try again.");
      return;
    }

    setMessage("");
    setSent(true);
  }

  function sendAnother() {
    setSent(false);
    setError("");
    setMessage("");
  }

  if (loading) {
    return (
      <main className="public-message-page">
        <div className="public-message-loading">
          <div className="public-message-loader" />
          <p>Opening their little corner...</p>
        </div>
      </main>
    );
  }

  if (!recipient) {
    return (
      <main className="public-message-page">
        <div className="public-message-shell">
          <Link href="/" className="public-message-brand">
            <span className="public-brand-symbol">a.</span>
            anomass
          </Link>

          <section className="public-message-panel not-found-panel">
            <div className="public-message-illustration">🔎</div>
            <p className="public-message-eyebrow">MISSING IN ACTION</p>
            <h1>We can't find this space.</h1>
            <p className="public-message-description">
              This link may be incorrect or the account may no longer be available.
            </p>
            <Link href="/" className="public-message-main-button">
              Back to Anomass <span>→</span>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="public-message-page">
      <div className="public-message-shell">
        <header className="public-message-topbar">
          <Link href="/" className="public-message-brand">
            <span className="public-brand-symbol">a.</span>
            anomass
          </Link>

          <span className="public-topbar-tag">
            <span className="public-online-dot" />
            A little space for honesty
          </span>
        </header>

        <section className="public-message-panel">
          <div className="public-message-hero">
            <div className="public-message-illustration" aria-hidden="true">
              💌<span className="public-illustration-sparkle">✦</span>
            </div>

            <p className="public-message-eyebrow">YOUR WORDS, YOUR WAY</p>

            <h1>
              Send something
              <br />
              <span>they won't expect.</span>
            </h1>

            <p className="public-message-description">
              Leave a compliment, confess a secret, ask a question, or just
              say what's on your mind. Your name isn't displayed with your message.
            </p>

            <div className="public-recipient-pill">
              <span className="recipient-avatar">
                {recipient.username.charAt(0).toUpperCase()}
              </span>
              <span>
                Sending to <strong>@{recipient.username}</strong>
              </span>
              <span className="recipient-heart">♡</span>
            </div>
          </div>

          <div className="public-composer-area">
            {sent ? (
              <div className="public-success-state" role="status">
                <div className="success-confetti" aria-hidden="true">
                  <span>✦</span>
                  <span>♡</span>
                  <span>✧</span>
                </div>

                <div className="success-icon">💌</div>
                <p className="success-kicker">MESSAGE SENT</p>

                <h2>
                  Your message
                  <br />
                  <span>is on its way!</span>
                </h2>

                <p className="success-description">
                  You've said your piece. Now it's their turn to discover it.
                  Your identity isn't displayed with the message.
                </p>

                <button
                  type="button"
                  onClick={sendAnother}
                  className="public-message-main-button success-again-button"
                >
                  Send another message <span>↗</span>
                </button>

                <p className="success-bottom-note">
                  A little mystery can make someone's day. ♡
                </p>

                <div className="success-signup-prompt">
                  <span className="success-signup-heart">💗</span>
                  <h3>Now it's your turn!</h3>
                  <p>
                    Want to hear what people will say about you? Get your own
                    Anomass link and let the messages roll in.
                  </p>
                  <Link href="/signup" className="success-signup-button">
                    Get my Anomass link <span>↗</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="composer-heading">
                  <div>
                    <p className="composer-kicker">THE FLOOR IS YOURS</p>
                    <h2>What's on your mind?</h2>
                  </div>
                  <span className="composer-emoji">✍️</span>
                </div>

                <form onSubmit={sendMessage} className="public-message-form">
                  <label
                    htmlFor="anonymous-message"
                    className="composer-label"
                  >
                    YOUR MESSAGE
                  </label>

                  <div className="composer-textarea-wrap">
                    <textarea
                      id="anonymous-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="I've been wanting to tell you this..."
                      maxLength={500}
                      rows={6}
                      required
                      disabled={sending}
                      className="public-message-textarea"
                    />

                    <div className="composer-textarea-bottom">
                      <span>Be real. Be kind. Be you. ♡</span>
                      <span
                        className={
                          message.length > 450
                            ? "character-count character-count-warning"
                            : "character-count"
                        }
                      >
                        {message.length}/500
                      </span>
                    </div>
                  </div>

                  {error && (
                    <p className="public-message-error" role="alert">
                      <span>!</span> {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="public-message-main-button send-message-button"
                  >
                    <span>
                      {sending ? "Sending your message..." : "Send anonymously"}
                    </span>
                    <span className="send-button-icon">
                      {sending ? "…" : "↗"}
                    </span>
                  </button>

                  <p className="composer-privacy-note">
                    <span>🔒</span>
                    Your name won't be displayed with this message.
                  </p>
                </form>
              </>
            )}
          </div>
        </section>

        <footer className="public-message-footer">
          <p>Good words. Bold secrets. Little surprises. ♡</p>
          <Link href="/signup">
            Want your own link? <strong>Get yours ↗</strong>
          </Link>
        </footer>
      </div>
    </main>
  );
}
