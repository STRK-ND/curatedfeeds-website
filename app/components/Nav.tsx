import Link from 'next/link';
import { PRIMARY_NAV } from '../lib/nav';
import { SITE } from '../lib/site';
import MobileMenu from './MobileMenu';

/**
 * Navigation: serif wordmark left, small caps links right.
 * `overlay` lifts the bar onto the hero photograph; interior pages keep the
 * solid sticky bar.
 */
export default function Nav({ overlay = false }: { overlay?: boolean }) {
  return (
    <nav className={overlay ? 'nav nav--overlay' : 'nav'} aria-label="Primary">
      <div className="container nav__inner">
        <Link href="/" className="nav__mark" aria-label="Curated Feeds home">
          <span className="nav__dot" aria-hidden="true" />
          Curated Feeds
        </Link>
        <div className="nav__links" aria-label="Site links">
          {PRIMARY_NAV.map((link) => (
            <Link key={link.url} href={link.url}>
              {link.name}
            </Link>
          ))}
        </div>
        <a
          href={SITE.app.uptodown}
          className="nav__cta"
          aria-label="Download Curated Feeds on Uptodown"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the App
        </a>
        <MobileMenu />
      </div>
    </nav>
  );
}
