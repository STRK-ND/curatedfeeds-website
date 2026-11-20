import Link from 'next/link';
import { APK_MB, SITE } from '../lib/site';
import { FOOTER_NAV } from '../lib/nav';

/** Footer: the wordmark at display size, then the kept links and the credits. */
export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <p className="footer__word">Curated Feeds</p>
          <a href={SITE.app.apk} className="btn" download>
            Download APK · {APK_MB} MB
          </a>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {FOOTER_NAV.map((link) => (
            <Link key={link.url} href={link.url}>
              {link.name}
            </Link>
          ))}
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
          Photograph: &quot;Mathura railway station&quot; by juggadery, CC BY-SA 2.0, via{' '}
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
