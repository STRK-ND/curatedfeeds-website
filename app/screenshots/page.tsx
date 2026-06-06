import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Screenshots | Curated Feeds',
  description: 'See Curated Feeds in action. Beautiful card-based RSS reader with swipe gestures and dark-elegant design.',
  openGraph: {
    title: 'Screenshots | Curated Feeds',
    description: 'See Curated Feeds in action.',
    type: 'website',
  },
};

export default function ScreenshotsPage() {
  return (
    <>
      <Nav />
      <main className="screenshots-page">
        <section className="screenshots-hero">
          <h1>Screenshots</h1>
          <p>Curated Feeds in action — beautiful cards, effortless swipes, dark-elegant design.</p>
        </section>

        <section className="screenshots-grid">
          <div className="screenshot-card">
            <div className="screenshot-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>Preview 1</p>
            </div>
            <p className="screenshot-caption">Home feed with article cards</p>
          </div>
          <div className="screenshot-card">
            <div className="screenshot-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>Preview 2</p>
            </div>
            <p className="screenshot-caption">Swipe gestures for save and done</p>
          </div>
          <div className="screenshot-card">
            <div className="screenshot-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>Preview 3</p>
            </div>
            <p className="screenshot-caption">Dark theme with indigo-purple gradient</p>
          </div>
        </section>

        <section className="screenshots-cta">
          <h2>Ready to try it?</h2>
          <p>Download Curated Feeds and experience it yourself.</p>
          <a href="/#download" className="cta-button primary">Download Now</a>
        </section>
      </main>
      <Footer />
    </>
  );
}