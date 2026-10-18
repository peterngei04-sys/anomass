import Link from "next/link";

const examples = [
  {
    emoji: "💗",
    label: "A little confession",
    message: "You make people feel more welcome than you realize.",
    color: "pink",
    delay: "delay-one",
  },
  {
    emoji: "🤫",
    label: "Something I've wondered",
    message: "Have you ever liked someone and never told them?",
    color: "purple",
    delay: "delay-two",
  },
  {
    emoji: "✨",
    label: "Just being honest",
    message: "Your energy is honestly one of a kind.",
    color: "peach",
    delay: "delay-three",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Link href="/" className="home-brand" aria-label="Anomass home">
          <span className="home-brand-icon">a.</span>
          <span>anomass<span className="home-brand-dot">.</span></span>
        </Link>

        <nav className="home-nav">
          <Link href="/login" className="home-login">
            Log in
          </Link>
          <Link href="/signup" className="home-nav-cta">
            Get started <span>↗</span>
          </Link>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-orb home-orb-one" />
        <div className="home-orb home-orb-two" />

        <div className="home-hero-content">
          <div className="home-pill">
            <span className="home-pill-dot" />
            YOUR SPACE. YOUR PEOPLE. THEIR SECRETS.
          </div>

          <h1>
            There's more
            <br />
            <span className="home-gradient-text">to what they</span>
            <br />
            <span className="home-last-line">
              want to tell you<span className="home-title-sparkle">✦</span>
            </span>
          </h1>

          <p className="home-description">
            Give your friends a way to say what they really think.
            Collect anonymous messages, unexpected compliments, and
            things they might never say out loud.
          </p>

          <div className="home-actions">
            <Link href="/signup" className="home-primary-cta">
              Get your anonymous link <span>↗</span>
            </Link>
            <Link href="/login" className="home-secondary-cta">
              I already have an account
            </Link>
          </div>

          <div className="home-social-proof">
            <div className="home-avatar-stack" aria-hidden="true">
              <span>💗</span>
              <span>😎</span>
              <span>✨</span>
              <span>🤍</span>
            </div>
            <p>
              <strong>Your link. Your circle.</strong>
              <span>Let the honest messages find you.</span>
            </p>
          </div>
        </div>

        <div className="home-preview" aria-label="Examples of anonymous messages">
          <div className="home-preview-glow" />

          <div className="home-preview-heading">
            <div>
              <span className="home-preview-kicker">A GLIMPSE INTO YOUR INBOX</span>
              <h2>Things people<br />might tell you...</h2>
            </div>
            <span className="home-inbox-icon">♡</span>
          </div>

          <div className="home-message-list">
            {examples.map((item) => (
              <article
                key={item.label}
                className={`home-message-card ${item.color} ${item.delay}`}
              >
                <div className="home-message-top">
                  <span className="home-message-emoji">{item.emoji}</span>
                  <span className="home-anon-label">
                    <span /> ANONYMOUS
                  </span>
                </div>
                <p className="home-message-label">{item.label}</p>
                <p className="home-message-text">“{item.message}”</p>
              </article>
            ))}
          </div>

          <div className="home-preview-foot">
            <span className="home-live-dot" />
            Imagine what your inbox could look like.
          </div>
          <p className="home-example-note">
            Illustrative examples · Not real submissions
          </p>
        </div>
      </section>

      <section className="home-how">
        <div className="home-section-heading">
          <span className="home-section-kicker">THREE LITTLE STEPS</span>
          <h2>Easy to start. <span>Fun to discover.</span></h2>
          <p>Your anonymous inbox is just around the corner.</p>
        </div>

        <div className="home-steps">
          <article className="home-step">
            <span className="home-step-number">01</span>
            <div className="home-step-icon step-pink">✦</div>
            <h3>Make it yours</h3>
            <p>Create an account and choose the username for your personal link.</p>
          </article>

          <article className="home-step">
            <span className="home-step-number">02</span>
            <div className="home-step-icon step-purple">↗</div>
            <h3>Spread the link</h3>
            <p>Share it with friends or post it wherever your people are.</p>
          </article>

          <article className="home-step">
            <span className="home-step-number">03</span>
            <div className="home-step-icon step-peach">♡</div>
            <h3>Discover messages</h3>
            <p>Check your inbox for anonymous words, thoughts, and confessions.</p>
          </article>
        </div>
      </section>

      <section className="home-bottom-cta">
        <div className="home-bottom-sparkle">✧</div>
        <p className="home-section-kicker">A LITTLE CURIOSITY NEVER HURT</p>
        <h2>What are they waiting<br />to tell <span>you?</span></h2>
        <p>Your Anomass story starts with one link.</p>
        <Link href="/signup" className="home-primary-cta">
          Create my free account <span>↗</span>
        </Link>
        <span className="home-bottom-note">No complicated setup. Just you and your link.</span>
      </section>

      <footer className="home-footer">
        <Link href="/" className="home-footer-brand">
          anomass<span>.</span>
        </Link>
        <p>A little mystery. A lot to say.</p>
        <div className="home-footer-links">
          <Link href="/signup">Get started</Link>
          <Link href="/login">Log in</Link>
        </div>
        <span className="home-footer-copy">© 2026 Anomass</span>
      </footer>
    </main>
  );
}
