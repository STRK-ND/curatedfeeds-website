import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, breadcrumbLd, faqPageLd, pageAlternates } from '../lib/seo';
import { StructuredData } from '../components/StructuredData';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Press Kit, Facts, Boilerplate, and Brand Assets',
  description:
    'Facts, boilerplate, and downloadable brand assets for coverage of Curated Feeds, the free privacy-first RSS reader for Android. No embargo, no PR agency.',
  alternates: pageAlternates('/press/'),
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `${SITE.url}/press/`,
    siteName: SITE.name,
    title: 'Curated Feeds Press Kit',
    description:
      'Facts, boilerplate, and downloadable brand assets for covering the free, privacy-first RSS reader for Android.',
    images: [`${SITE.url}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curated Feeds Press Kit',
    description:
      'Facts, boilerplate, and downloadable brand assets for covering the free, privacy-first RSS reader for Android.',
    images: [`${SITE.url}/og-image.png`],
  },
};

/** The APK size the store listing and download page quote, derived from the build. */
const apkMb = Math.round(SITE.app.apkBytes / 1048576);

/** Every file is a real asset in public/, verified present before it was listed. */
const assets = [
  { label: 'App icon, 512 × 512 PNG', href: '/icon-512.png' },
  { label: 'App icon, 192 × 192 PNG', href: '/icon-192.png' },
  { label: 'Social card, 1200 × 630 PNG', href: '/og-image.png' },
  { label: 'Home feed screenshot, 1080 × 1920 WebP', href: '/screenshots/home-feed.webp' },
  { label: 'Swipe gestures screenshot, 1080 × 1920 WebP', href: '/screenshots/swipe-gestures.webp' },
];

/** The four colours the product and the site are actually painted in. */
const swatches = [
  { name: 'Ink', hex: '#0b0a09' },
  { name: 'Cream', hex: '#f4ece0' },
  { name: 'Gold', hex: '#d9a566' },
  { name: 'Rose', hex: '#ff6b9d' },
];

const faqs = [
  {
    q: 'Can we use the screenshots and app icon in coverage?',
    a: 'Yes. The app icon, the social card, and every screenshot on this site are free to use in articles, videos, and podcasts about Curated Feeds. A credit or link back to curatedfeeds.web.app is appreciated but not required.',
  },
  {
    q: 'Where can we download the app to check the claims in this kit?',
    a: 'The current version is a free direct APK download on this site, and it is also listed on Uptodown. No account, no payment, and no store listing gate.',
  },
  {
    q: 'Is there an embargo or a press release schedule?',
    a: 'No. There is no embargo and no PR agency. Coverage is welcome whenever you are ready, and the facts on this page reflect the release that is live today.',
  },
  {
    q: 'Does the app collect data we should disclose to readers?',
    a: 'Curated Feeds requires no account and keeps feeds, saved articles, and reading history on the device. The only analytics are anonymous Firebase counters that record aggregate events rather than individual readers.',
  },
];

export default function PressPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbLd([
            { name: 'Home', url: '/' },
            { name: 'Press Kit', url: '/press/' },
          ]),
          faqPageLd(faqs, `${SITE.url}/press/`),
        ]}
      />
      <Nav />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Press Kit', url: '/press/' },
        ]}
      />
      <main id="main" className="press-page">
        <section className="page-hero">
          <h1>Press kit</h1>
          <p className="page-lede">
            Facts, boilerplate, and brand assets for coverage of Curated Feeds. No embargo, no PR
            contact theater. If you need something that is not on this page, reach the maker
            directly.
          </p>
        </section>

        {/* Size is derived from the shipped build rather than hand-written, so the
            number cannot drift from the file readers actually download. */}
        <div className="stat-band">
          <div>
            <strong>Free</strong>
            <span>Price</span>
          </div>
          <div>
            <strong>Android 8.0+</strong>
            <span>Minimum</span>
          </div>
          <div>
            <strong>~{apkMb} MB</strong>
            <span>APK size</span>
          </div>
        </div>

        <section className="page-section" aria-labelledby="about-title">
          <h2 id="about-title">About Curated Feeds</h2>
          <p>
            Curated Feeds is a free, privacy-first RSS reader for Android, built by Rajat Kashyap. It
            replaces the endless scroll with a deck of cards: read an article, swipe right to save
            it or left to mark it done, and the feed stays short and intentional. Sources are
            organized into categories, articles cache on first read so they remain available
            offline, and a dark theme is tuned for night reading.
          </p>
          <p>
            The app is free with no ads, no in-app purchases, and no account. It does not follow
            readers around: Firebase analytics record anonymous aggregate counters only, and feeds
            and saved articles stay on the device. Curated Feeds is written in Flutter and Dart,
            and this website is a Next.js static export.
          </p>
        </section>

        <section className="page-section" aria-labelledby="facts-title">
          <h2 id="facts-title">Product facts</h2>
          <ul className="asset-list">
            <li>
              <span>Developer</span>
              <span>Rajat Kashyap</span>
            </li>
            <li>
              <span>Platform</span>
              <span>Android 8.0 and up</span>
            </li>
            <li>
              <span>Price</span>
              <span>Free, no ads, no in-app purchases</span>
            </li>
            <li>
              <span>Size</span>
              <span>~{apkMb} MB</span>
            </li>
            <li>
              <span>Current version</span>
              <span>{SITE.app.version}</span>
            </li>
            <li>
              <span>Distribution</span>
              <span>
                <a href={SITE.app.apk} target="_blank" rel="noopener noreferrer">
                  Direct APK
                </a>{' '}
                ·{' '}
                <a href={SITE.app.uptodown} target="_blank" rel="noopener noreferrer">
                  Uptodown
                </a>
              </span>
            </li>
            <li>
              <span>Analytics</span>
              <span>Anonymous Firebase counters only</span>
            </li>
            <li>
              <span>Source</span>
              <span>Flutter and Dart app, Next.js static site</span>
            </li>
          </ul>
        </section>

        <section className="page-section" aria-labelledby="brand-title">
          <h2 id="brand-title">Brand</h2>
          <p>
            Four colours, no more. Ink is the field the site is drawn on, cream carries every word,
            gold marks what to read next, and rose is the product mark.
          </p>
          <div className="swatch-row">
            {swatches.map((swatch) => (
              <div key={swatch.hex} className="swatch">
                <div className="swatch-color" style={{ backgroundColor: swatch.hex }} />
                <div className="swatch-label">
                  <strong>{swatch.name}</strong>
                  {swatch.hex}
                </div>
              </div>
            ))}
          </div>
          <p className="note">
            Wordmark and logo are set in the same type as this page; the app icon in the asset list
            below is the canonical mark.
          </p>
        </section>

        <section className="page-section" aria-labelledby="assets-title">
          <h2 id="assets-title">Assets</h2>
          <ul className="asset-list">
            {assets.map((asset) => (
              <li key={asset.href}>
                <span>{asset.label}</span>
                <a href={asset.href} download>
                  Download
                </a>
              </li>
            ))}
          </ul>
          <p className="note">
            Screenshots of the app are on <Link href="/screenshots/">the screenshots page</Link>,
            free to use in coverage.
          </p>
        </section>

        <section className="page-section" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <ul className="asset-list">
            <li>
              <span>Email</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <span>Instagram</span>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                instagram.com/curated_feeds
              </a>
            </li>
            <li>
              <span>Personal site</span>
              <a href={SITE.authorUrl} target="_blank" rel="noopener noreferrer">
                rajatkashyap.com
              </a>
            </li>
            <li>
              <span>Response time</span>
              <span>Typically within 48 hours</span>
            </li>
          </ul>
        </section>

        <section className="page-section page-faq" aria-labelledby="press-faq-title">
          <h2 id="press-faq-title">Coverage questions</h2>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <details key={item.q} className="faq-item" open={i === 0}>
                <summary>{item.q}</summary>
                <div>
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
