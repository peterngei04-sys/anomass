export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Anomass</p>
      <span className="site-footer-dot" aria-hidden="true">·</span>
      <p>
        Powered by <span className="site-footer-brand">PECO</span>
      </p>
    </footer>
  );
}
