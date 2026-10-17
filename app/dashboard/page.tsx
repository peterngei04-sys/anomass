"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadAccount() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      const savedUsername =
        profile?.username ??
        (typeof user.user_metadata?.username === "string"
          ? user.user_metadata.username
          : "");

      setUsername(savedUsername);
      setLoading(false);
    }

    loadAccount();

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
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your Anomass link:", link);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] text-[#77747d]">
        Loading your account...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] px-5 py-6 text-[#242329]">
      <header className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight">
          anomass<span className="text-violet-600">.</span>
        </Link>
        <button onClick={logout} className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-black/5">
          Log out
        </button>
      </header>

      <section className="mx-auto max-w-3xl pt-12">
        <p className="text-sm font-semibold text-violet-700">YOUR ACCOUNT</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          Hey, {username || "there"}.
        </h1>
        <p className="mt-3 text-[#77747d]">
          Your Anomass space starts here.
        </p>

        <div className="mt-8 rounded-3xl border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">Your personal link</h2>
          <p className="mt-2 text-sm leading-6 text-[#77747d]">
            Share your link so people can send you anonymous messages.
          </p>

          <div className="mt-5 break-all rounded-xl bg-[#f5f3f8] p-4 text-sm">
            {typeof window !== "undefined" && username
              ? `${window.location.origin}/u/${username}`
              : "Your link will appear here"}
          </div>

          <button
            onClick={copyLink}
            disabled={!username}
            className="mt-4 w-full rounded-xl bg-violet-600 px-5 py-3.5 font-bold text-white hover:bg-violet-700 disabled:opacity-50 sm:w-auto"
          >
            {copied ? "Copied!" : "Copy my link"}
          </button>
        </div>

        <Link
          href="/inbox"
          className="mt-5 block rounded-3xl border border-black/[0.07] bg-white p-6 transition hover:border-violet-200 hover:shadow-sm"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-bold">Your inbox</h2>
              <p className="mt-2 text-sm leading-6 text-[#77747d]">
                Read and manage anonymous messages sent to you.
              </p>
            </div>
            <span className="text-xl text-violet-600">→</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
