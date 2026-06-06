import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#c9b6df" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" stroke="url(#footerGradient)" strokeWidth="2" />
            <path d="M12 16a4 4 0 0 0 8 0" stroke="currentColor" strokeLinecap="round" />
            <circle cx="16" cy="16" r="3" fill="url(#footerGradient)" />
          </svg>
          <span>Curated Feeds</span>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
      <div className="footer-copy">Made by Rajat Kashyap - 2026</div>
    </footer>
  );
}