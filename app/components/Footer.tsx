import Link from 'next/link';
import FevIcon from './FevIcon';
import VisitorStats from './VisitorStats';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <FevIcon width={24} height={24} />
          <span>Curated Feeds</span>
        </div>
        <div className="footer-links">
          <Link href="/privacy/">Privacy</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/screenshots/">Screenshots</Link>
          <Link href="/about/">About</Link>
        </div>
      </div>
      <VisitorStats />
      <div className="footer-copy">Made by Rajat Kashyap - 2026</div>
    </footer>
  );
}
