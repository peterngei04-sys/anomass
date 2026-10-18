"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setNotice("");

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim();

    if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
      setError(
        "Username must be 3–20 characters using letters, numbers or underscores."
      );
      return;
    }

    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { username: cleanUsername },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signupError) throw signupError;

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setNotice(
          "Your registration was submitted. If email confirmation is enabled, check your inbox before logging in."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <section className="auth-shell">
        <Link href="/" className="auth-brand">
          <span className="auth-brand-mark">a.</span>
          <span>anomass<span className="auth-brand-dot">.</span></span>
        </Link>

        <div className="auth-card">
          <div className="auth-hero">
            <div className="auth-icon" aria-hidden="true">
              💌
              <span>✦</span>
            </div>

            <p className="auth-eyebrow">YOUR STORY STARTS HERE</p>

            <h1>
              Your own little
              <br />
              <span>corner of mystery.</span>
            </h1>

            <p className="auth-description">
              Create your link, share it with your people, and discover what
              they've been wanting to tell you.
            </p>

            <div className="auth-benefits">
              <span><b>♡</b> Your own message link</span>
              <span><b>✦</b> A space for honest words</span>
            </div>
          </div>

          <div className="auth-form-area">
            <div className="auth-form-heading">
              <div>
                <h2>Create your account</h2>
                <p>It only takes a minute to get started.</p>
              </div>
              <span className="auth-form-sparkle">✧</span>
            </div>

            <form onSubmit={handleSignup} className="auth-form">
              <div className="auth-field">
                <label htmlFor="username">Choose a username</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">@</span>
                  <input
                    id="username"
                    required
                    minLength={3}
                    maxLength={20}
                    pattern="[A-Za-z0-9_]{3,20}"
                    autoComplete="username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value.toLowerCase())
                    }
                    placeholder="your_username"
                    disabled={loading}
                  />
                </div>
                <p className="auth-field-hint">
                  This becomes your personal Anomass link.
                </p>
              </div>

              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉</span>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="password">Create a password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">♧</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="auth-field-hint">
                  Use at least 8 characters.
                </p>
              </div>

              {error && (
                <div className="auth-alert auth-alert-error" role="alert">
                  <span>!</span>
                  <p>{error}</p>
                </div>
              )}

              {notice && (
                <div className="auth-alert auth-alert-notice" role="status">
                  <span>✓</span>
                  <p>{notice}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit"
              >
                <span>{loading ? "Creating your space..." : "Create my account"}</span>
                <span className="auth-submit-arrow">{loading ? "…" : "↗"}</span>
              </button>

              <p className="auth-terms-note">
                By joining, be kind, respect boundaries, and avoid sharing
                sensitive personal information.
              </p>
            </form>

            <div className="auth-login-divider">
              <span />
              <p>Already part of Anomass?</p>
              <span />
            </div>

            <Link href="/login" className="auth-login-link">
              Log in to your account <span>→</span>
            </Link>
          </div>
        </div>

        <footer className="auth-footer">
          <span>♡</span> Good words. Bold secrets. Little surprises.
          <Link href="/">Back to home</Link>
        </footer>
      </section>
    </main>
  );
}
