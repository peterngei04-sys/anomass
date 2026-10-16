const features = [
  {
    number: "01",
    icon: "✉",
    title: "Honest conversations",
    description:
      "Give people a comfortable way to share thoughts, questions and feedback without putting their name on every message.",
  },
  {
    number: "02",
    icon: "✦",
    title: "Your space, your rules",
    description:
      "Build toward an inbox with privacy controls, message filtering and tools that help you feel in control.",
  },
  {
    number: "03",
    icon: "↗",
    title: "Made to be shared",
    description:
      "Your personal link can become a simple invitation to start a conversation with your friends and community.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090914] text-white">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#" className="flex items-center gap-3" aria-label="Anomass home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500 text-xl font-black shadow-lg shadow-fuchsia-500/20">
            a.
          </span>
          <span className="text-xl font-bold tracking-tight">
            ano<span className="text-fuchsia-400">mass</span>
          </span>
        </a>

        <a
          href="#how-it-works"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-fuchsia-400 hover:text-white"
        >
          How it works
        </a>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:px-12 lg:pb-32 lg:pt-24">
        <div className="pointer-events-none absolute -left-48 top-12 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />

        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            A new way to speak freely
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Say what you
            <br />
            <span className="bg-gradient-to-r from-fuchsia-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              really mean.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/65 sm:text-xl">
            Questions, confessions, honest feedback or just something you
            have been meaning to say. Start a conversation without putting
            your name on the message.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-fuchsia-500 px-7 py-4 font-bold text-white shadow-xl shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-400"
            >
              Discover Anomass <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 font-semibold text-white/85 transition hover:bg-white/[0.08]"
            >
              Explore the features
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/45">
            <span>✦ Share your voice</span>
            <span>✦ Connect differently</span>
            <span>✦ Set your boundaries</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/10 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white/10 bg-[#121222]/95 p-5 shadow-2xl shadow-black/40 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-white/45">THE ANOMASS EXPERIENCE</p>
                <h2 className="mt-1 text-xl font-bold">Your inbox, reimagined.</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-400/10 text-xl text-violet-300">
                ✉
              </div>
            </div>

            <div className="my-6 rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500 text-xl font-black">
                  ?
                </div>
                <div>
                  <p className="font-semibold">A little mystery</p>
                  <p className="mt-1 text-xs text-white/45">
                    Anonymous message preview
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-fuchsia-400/10 px-2.5 py-1 text-xs text-fuchsia-200">
                  New
                </span>
              </div>
              <p className="mt-5 leading-7 text-white/85">
                “What is something you wish more people understood about you?”
              </p>
              <p className="mt-4 text-xs text-white/35">
                An example message — not a real submission.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-lg text-amber-200">
                  ✦
                </span>
                <div>
                  <p className="text-sm font-semibold">Speak your mind</p>
                  <p className="mt-1 text-xs text-white/45">
                    Questions, thoughts and feedback
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-lg text-emerald-200">
                  ↗
                </span>
                <div>
                  <p className="text-sm font-semibold">Share your link</p>
                  <p className="mt-1 text-xs text-white/45">
                    Invite people into the conversation
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] py-3 text-xs text-white/45">
              <span className="text-emerald-300">●</span>
              Designed with privacy and safety in mind
            </div>
          </div>

          <div className="absolute -right-3 top-16 hidden rounded-2xl border border-white/10 bg-[#1a1830] px-4 py-3 shadow-xl sm:block">
            <p className="text-xs text-white/45">Your voice</p>
            <p className="mt-1 font-bold text-fuchsia-200">Your choice.</p>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/[0.07] bg-white/[0.02] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-300">
              More than a message
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Conversations should feel different.
            </h2>
            <p className="mt-4 leading-7 text-white/55">
              Anomass is being built around expression, sharing and giving
              people more control over their anonymous interactions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-3xl border border-white/10 bg-[#11111e] p-7 transition hover:-translate-y-1 hover:border-fuchsia-300/30"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-400/10 text-2xl text-fuchsia-300">
                    {feature.icon}
                  </span>
                  <span className="text-sm font-semibold text-white/25">
                    {feature.number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-white/55">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-[#141323] to-indigo-500/10 px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-300">
            The beginning
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
            A little more honesty. A little less pressure.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/60">
            We are building the foundations of Anomass. Personal accounts,
            working message links and a real inbox are the next steps.
          </p>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Early-stage preview · Messaging is not active yet
          </p>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white/70">anomass<span className="text-fuchsia-300">.</span></p>
          <p>Speak freely. Respect boundaries. Be kind.</p>
          <p>© 2026 Anomass</p>
        </div>
      </footer>
    </main>
  );
}
