import Link from 'next/link';
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
          <Link href="/#preview">Screens</Link>
          <Link href="/#features">Features</Link>
          <Link href="/sources/">Sources</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <Link href="/#download" className="nav__cta" aria-label="Download the app">
          Get the APK
        </Link>
        <MobileMenu />
      </div>
    </nav>
  );
}
