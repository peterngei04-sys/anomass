"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) throw loginError;

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't log you in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <section className="login-layout">
        <div className="login-intro">
          <Link href="/" className="auth-brand">
            ano<span>mass</span><b>.</b>
          </Link>

          <div className="login-intro-content">
            <div className="login-eyebrow">
              <span className="login-live-dot" />
              YOUR SPACE. YOUR SECRETS.
            </div>

            <h1>
              The messages
              <br />
              you <span>never saw</span>
              <br />
              coming.
            </h1>

            <p>
              Your friends have something to say. Get back in and discover
              what’s waiting for you.
            </p>

            <div className="login-message-preview">
              <div className="login-avatar">?</div>
              <div className="login-message-copy">
                <span>Someone has a message for you</span>
                <strong>“I've wanted to tell you this for a while…”</strong>
              </div>
              <span className="login-sparkle">✦</span>
            </div>
          </div>

          <p className="login-side-note">
            A little mystery makes life interesting. 💌
          </p>
        </div>

        <div className="login-form-side">
          <div className="login-card">
            <div className="login-card-icon">✦</div>

            <div className="login-heading">
              <p className="login-kicker">GOOD TO SEE YOU AGAIN</p>
              <h2>Welcome back<span>.</span></h2>
              <p>Log in and get back to your world.</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="login-field">
                <div className="login-password-label">
                  <label htmlFor="password">Password</label>
                </div>

                <div className="login-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="login-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="login-error">
                  <span>!</span> {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="login-submit"
              >
                <span>{loading ? "Logging you in..." : "Log in to Anomass"}</span>
                {!loading && <span className="login-submit-arrow">↗</span>}
              </button>
            </form>

            <div className="login-divider">
              <span />
              <p>YOUR PEOPLE ARE WAITING</p>
              <span />
            </div>

            <p className="login-signup">
              New to Anomass?{" "}
              <Link href="/signup">Create your account <span>→</span></Link>
            </p>
          </div>

          <p className="login-privacy-note">
            Made for honest words and a little mystery. <span>♥</span>
          </p>
        </div>
      </section>
    </main>
  );
}
