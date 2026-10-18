"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Recipient = {
  id: string;
  username: string;
};

export default function PublicMessagePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const [username, setUsername] = useState("");

  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    params.then((value) => {
      if (active) setUsername(decodeURIComponent(value.username || "").toLowerCase());
    }).catch(() => {
      if (active) {
        setError("We could not read this profile link.");
        setLoading(false);
      }
    });

    async function loadRecipient() {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("username", username)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setError("We couldn't load this profile. Please try again later.");
      } else if (data) {
        setRecipient(data as Recipient);
      }

      setLoading(false);
    }

    if (username) loadRecipient();

    return () => {
      active = false;
    };
  }, [username, params]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const content = message.trim();

    if (!recipient) {
      setError("This profile could not be found.");
      return;
    }

    if (!content || content.length > 500) {
      setError("Your message must be between 1 and 500 characters.");
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
      console.error("Anomass message submission failed:", insertError);
      setError("Your message couldn't be sent. Please try again.");
      return;
    }

    setMessage("");
    setSent(true);
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#faf9f7] px-5 py-10 text-[#242329]">
      <section className="w-full max-w-md">
        <Link href="/" className="text-2xl font-black tracking-tight">
          anomass<span className="text-violet-600">.</span>
        </Link>

        {loading ? (
          <div className="mt-10 rounded-3xl border border-black/[0.07] bg-white p-7">
            Loading profile...
          </div>
        ) : !recipient ? (
          <div className="mt-10 rounded-3xl border border-black/[0.07] bg-white p-7">
            <h1 className="text-2xl font-black">Profile not found</h1>
            <p className="mt-3 text-sm leading-6 text-[#77747d]">
              This Anomass link may be incorrect or the account may no longer exist.
            </p>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl font-black text-violet-700">
              {recipient.username.charAt(0).toUpperCase()}
            </div>

            <p className="mt-6 text-sm font-semibold text-violet-700">
              ANONYMOUS MESSAGES
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Send a message to @{recipient.username}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#77747d]">
              Say what you want to say. Your message will be sent anonymously.
            </p>

            {sent ? (
              <div className="mt-6 rounded-2xl bg-violet-50 p-5">
                <h2 className="font-bold text-violet-800">Message sent!</h2>
                <p className="mt-2 text-sm leading-6 text-violet-700">
                  Your message has been delivered. Your identity isn't displayed to the recipient.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={sendMessage} className="mt-6">
                <label htmlFor="message" className="mb-2 block text-sm font-bold">
                  Your message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write something..."
                  maxLength={500}
                  required
                  rows={5}
                  className="w-full resize-y rounded-2xl border border-black/10 bg-[#faf9f7] p-4 text-base outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <div className="mt-2 text-right text-xs text-[#77747d]">
                  {message.length}/500
                </div>

                {error && (
                  <p role="alert" className="mt-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="mt-4 w-full rounded-xl bg-violet-600 px-5 py-4 font-bold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send anonymously"}
                </button>
              </form>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[#77747d]">
          Your words, your way. Powered by Anomass.
        </p>
      </section>
    </main>
  );
}
