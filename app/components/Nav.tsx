import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav nav-scrolled">
      <div className="nav-content">
        <Link href="/" className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#c9b6df" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" stroke="url(#navGradient)" strokeWidth="2" />
            <path d="M12 16a4 4 0 0 0 8 0" stroke="currentColor" strokeLinecap="round" />
            <circle cx="16" cy="16" r="3" fill="url(#navGradient)" />
          </svg>
          <span>Curated Feeds</span>
        </Link>
        <div className="nav-links">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/#download" className="nav-cta">Download</Link>
        </div>
      </div>
    </nav>
  );
}