import Link from 'next/link';
import FevIcon from './FevIcon';

export default function Nav() {
  return (
    <nav className="nav nav-scrolled">
      <div className="nav-content">
        <Link href="/" className="logo">
          <FevIcon />
          <span>Curated Feeds</span>
        </Link>
        <div className="nav-links">
          <Link href="/blog/">Blog</Link>
          <Link href="/screenshots/">Screenshots</Link>
          <Link href="/about/">About</Link>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/#download" className="nav-cta">Download</Link>
        </div>
      </div>
    </nav>
  );
}
