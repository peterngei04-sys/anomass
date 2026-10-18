"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [messageCount, setMessageCount] = useState<number | null>(null);

  const messageLink =
    typeof window !== "undefined" && username
      ? `${window.location.origin}/u/${username}`
      : "";

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      if (!active) return;
      setUserEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      const name =
        profile?.username ||
        (typeof user.user_metadata?.username === "string"
          ? user.user_metadata.username
          : "");

      setUsername(name);

      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("recipient_id", user.id)
        .eq("is_read", false);

      if (active) {
        setMessageCount(count ?? 0);
        setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  async function copyLink() {
    if (!username) return;

    const link = `${window.location.origin}/u/${username}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy your personal Anomass link:", link);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-loading">
          <div className="loading-orb" />
          <p>Getting your space ready...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <Link href="/" className="brand-mark">
            <span className="brand-symbol">a.</span>
            <span>anomass</span>
          </Link>

          <div className="dashboard-top-actions">
            <Link href="/inbox" className="top-inbox-link">
              <span aria-hidden="true">✉</span>
              Inbox
              {messageCount !== null && messageCount > 0 && (
                <span className="inbox-count">{messageCount}</span>
              )}
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="logout-button"
            >
              Log out
            </button>
          </div>
        </header>

        <section className="dashboard-welcome">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-sparkle">✦</span> YOUR LITTLE CORNER
            </p>
            <h1>
              Hey{username ? `, ${username}` : " there"}.
              <br />
              <span>Let the messages roll in.</span>
            </h1>
            <p className="welcome-description">
              Share your link with your people and see what they really want to
              tell you. The unexpected messages are usually the best ones.
            </p>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="art-sparkle sparkle-one">✦</div>
            <div className="art-sparkle sparkle-two">✧</div>
            <div className="art-heart">♡</div>
            <div className="art-message art-message-one">you seem cool 👀</div>
            <div className="art-message art-message-two">secret admirer? 💌</div>
          </div>
        </section>

        <section className="share-card">
          <div className="share-card-heading">
            <div className="share-icon">↗</div>
            <div>
              <p className="share-kicker">YOUR PERSONAL LINK</p>
              <h2>Your link is ready to go.</h2>
            </div>
          </div>

          <p className="share-description">
            Put it on your WhatsApp status, Instagram bio, or send it straight
            to your friends.
          </p>

          <div className="personal-link-box">
            <span className="link-mini-icon">🔗</span>
            <span className="personal-link-text">
              {username
                ? `${typeof window !== "undefined" ? window.location.host : "anomass"}/u/${username}`
                : "Preparing your link..."}
            </span>
            <button
              type="button"
              onClick={copyLink}
              disabled={!username}
              className={`copy-link-button ${copied ? "is-copied" : ""}`}
            >
              {copied ? "✓ Copied!" : "Copy link"}
            </button>
          </div>

          <div className="share-card-bottom">
            <span>♡</span>
            <span>Your identity isn't displayed with messages.</span>
            <Link
              href={username ? `/u/${username}` : "/dashboard"}
              target="_blank"
              rel="noreferrer"
            >
              Preview your page ↗
            </Link>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-topline">
              <span className="stat-icon stat-icon-pink">✉</span>
              <span className="stat-label">YOUR INBOX</span>
            </div>
            <p className="stat-number">{messageCount ?? "—"}</p>
            <p className="stat-caption">messages received</p>
            <Link href="/inbox" className="stat-action">
              Open your inbox <span>→</span>
            </Link>
          </div>

          <div className="stat-card stat-card-violet">
            <div className="stat-topline">
              <span className="stat-icon stat-icon-violet">✦</span>
              <span className="stat-label">YOUR NEXT MOVE</span>
            </div>
            <p className="stat-feature-title">Make them curious.</p>
            <p className="stat-caption">
              A little mystery goes a long way. Share your link today.
            </p>
            <button
              type="button"
              onClick={copyLink}
              className="stat-action stat-action-button"
            >
              {copied ? "Link copied ✓" : "Share your link"} <span>↗</span>
            </button>
          </div>
        </section>

        <section className="dashboard-tip">
          <div className="tip-emoji">💌</div>
          <div>
            <p className="tip-title">Need a status idea?</p>
            <p className="tip-copy">
              “I know you have something to say 👀 Send it anonymously.”
            </p>
          </div>
          <button
            type="button"
            className="tip-copy-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  "I know you have something to say 👀 Send it anonymously."
                );
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2200);
              } catch {
                window.prompt(
                  "Copy this status:",
                  "I know you have something to say 👀 Send it anonymously."
                );
              }
            }}
          >
            Copy idea
          </button>
        </section>

        <footer className="dashboard-footer">
          <span>Made for the things left unsaid.</span>
          <span>♡ anomass</span>
        </footer>
      </div>
    </main>
  );
}
