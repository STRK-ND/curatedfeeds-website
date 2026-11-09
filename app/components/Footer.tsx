import Link from 'next/link';
import { SITE } from '../lib/seo';

const mb = Math.round(SITE.app.apkBytes / 1048576);

/** Footer: the wordmark at display size, then the kept links and the credits. */
export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <p className="footer__word">Curated Feeds</p>
          <a href={SITE.app.apk} className="btn" download>
            Download APK · {mb} MB
          </a>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link href="/#preview">Screens</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/sources/">Starter feeds</Link>
          <Link href="/tools/find-feed/">Feed finder</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/why/">Why Curated Feeds</Link>
          <Link href="/why/feedly/">vs Feedly</Link>
          <Link href="/why/inoreader/">vs Inoreader</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/use-cases/">Use cases</Link>
          <Link href="/changelog/">Changelog</Link>
          <Link href="/about/">About</Link>
          <Link href="/privacy/">Privacy policy</Link>
          <Link href="/press/">Press kit</Link>
        </nav>

        <div className="footer__meta">
          <span>© {new Date().getFullYear()} Curated Feeds. Made by Rajat Kashyap in India.</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <span>v{SITE.app.version}</span>
        </div>

        <p className="footer__credit">
          Photograph: “Mathura railway station” by juggadery, CC BY-SA 2.0, via{' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:Mathura_railway_station_(42593488361).jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikimedia Commons
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
