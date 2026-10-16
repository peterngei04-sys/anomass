"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setNotice("");

    const cleanUsername = username.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
      setError("Username must be 3–20 characters using letters, numbers or underscores.");
      return;
    }

    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
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
          "Your registration was submitted. Check your email for a confirmation link if confirmation is enabled, then log in."
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
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-5 py-10 text-[#242329]">
      <section className="w-full max-w-md">
        <Link href="/" className="text-2xl font-black tracking-tight">
          anomass<span className="text-violet-600">.</span>
        </Link>

        <div className="mt-8 rounded-3xl border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-black tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-[#77747d]">
            Your own space for anonymous messages.
          </p>

          <form onSubmit={handleSignup} className="mt-7 space-y-4">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold">
                Username
              </label>
              <input
                id="username"
                required
                minLength={3}
                maxLength={20}
                pattern="[A-Za-z0-9_]{3,20}"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                className="w-full rounded-xl border border-black/10 bg-[#faf9f7] px-4 py-3 outline-none focus:border-violet-500"
              />
              <p className="mt-1 text-xs text-[#8a8790]">
                3–20 letters, numbers or underscores.
              </p>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/10 bg-[#faf9f7] px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-black/10 bg-[#faf9f7] px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {notice && (
              <p role="status" className="rounded-xl bg-violet-50 p-3 text-sm leading-6 text-violet-800">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 px-4 py-3.5 font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#77747d]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-violet-700 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-[#8a8790]">
          Be kind. Respect boundaries. Don't share sensitive personal information.
        </p>
      </section>
    </main>
  );
}
