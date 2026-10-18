"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <main className="flex flex-1 items-center justify-center bg-[#faf9f7] px-5 py-10 text-[#242329]">
      <section className="w-full max-w-md">
        <Link href="/" className="text-2xl font-black tracking-tight">
          anomass<span className="text-violet-600">.</span>
        </Link>

        <div className="mt-8 rounded-3xl border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-black tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-[#77747d]">
            Log in to continue to Anomass.
          </p>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-black/10 bg-[#faf9f7] px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 px-4 py-3.5 font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#77747d]">
            New to Anomass?{" "}
            <Link href="/signup" className="font-bold text-violet-700 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
