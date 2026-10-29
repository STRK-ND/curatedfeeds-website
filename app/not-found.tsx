import type { Metadata } from 'next';
import Link from 'next/link';
import FevIcon from './components/FevIcon';
import Nav from './components/Nav';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you were looking for does not exist or has moved.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="notfound-page">
        <section className="notfound-hero" aria-labelledby="notfound-title">
          <FevIcon width={56} height={56} />
          <p className="notfound-code" aria-hidden="true">404</p>
          <h1 id="notfound-title" className="section-title">This page went offline</h1>
          <p className="notfound-description">
            The page you were looking for doesn&rsquo;t exist or has moved. Your feeds are still
            where you left them. No reading history lost, no re-subscribing needed.
          </p>
          <div className="notfound-actions">
            <Link href="/" className="btn btn-primary">
              <span>Back to home</span>
            </Link>
            <Link href="/screenshots/" className="btn btn-secondary">
              <span>See the app</span>
            </Link>
          </div>
          <p className="notfound-meta">
            Or browse the <Link href="/blog/">reading guides</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
