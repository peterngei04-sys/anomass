import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#faf9f7] text-[#242329]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Link href="/" className="text-2xl font-black tracking-tight">
          anomass<span className="text-violet-600">.</span>
        </Link>
        <Link
          href="/login"
          className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-black/5"
        >
          Log in
        </Link>
      </header>

      <section className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-16 pt-16 text-center sm:pt-24">
        <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#68666f]">
          Your space to speak freely
        </span>

        <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl">
          What do people
          <br />
          <span className="text-violet-600">really think?</span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-7 text-[#77747d] sm:text-lg">
          Get honest messages from the people in your life.
          No names attached.
        </p>

        <Link
          href="/signup"
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-2xl bg-violet-600 px-8 font-bold text-white transition hover:bg-violet-700"
        >
          Get your Anomass link <span className="ml-3">→</span>
        </Link>

        <div className="mt-16 w-full max-w-md rounded-3xl border border-black/[0.07] bg-white p-5 text-left shadow-[0_12px_45px_rgba(30,20,50,0.05)] sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-700">
              ?
            </div>
            <div>
              <p className="font-semibold">Someone has a question</p>
              <p className="mt-1 text-xs text-[#8a8790]">
                Anonymous message preview
              </p>
            </div>
          </div>

          <p className="mt-5 text-lg leading-7">
            “What’s something you’ve always wanted to tell me?”
          </p>

          <p className="mt-4 text-xs text-[#99969e]">
            Example message · Not a real submission
          </p>
        </div>

        <p className="mt-8 text-sm text-[#85818b]">
          Share your link. Hear what people have to say.
        </p>
      </section>

    </main>
  );
}
