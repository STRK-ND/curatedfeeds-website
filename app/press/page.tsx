import Link from 'next/link';
import { faqPageLd } from '../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../lib/site';
import PageShell from '../components/PageShell';
import FaqList from '../components/FaqList';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Press Kit', url: '/press/' },
];

export const metadata = pageMetadata({
  path: '/press/',
  title: 'Press Kit, Facts, Boilerplate, and Brand Assets',
  description:
    'Facts, boilerplate, and downloadable brand assets for coverage of Curated Feeds, the free privacy-first RSS reader for Android. No embargo, no PR agency.',
  keywords: [
    'Curated Feeds press kit',
    'Curated Feeds media kit',
    'Curated Feeds brand assets',
    'Android RSS reader press',
    'privacy RSS app press release',
  ],
  socialTitle: 'Curated Feeds Press Kit',
  socialDescription:
    'Facts, boilerplate, and downloadable brand assets for covering the free, privacy-first RSS reader for Android.',
});

/** Every file is a real asset in public/, verified present before it was listed. */
const assets = [
  { label: 'App icon, 512 × 512 PNG', href: '/icon-512.png' },
  { label: 'App icon, 192 × 192 PNG', href: '/icon-192.png' },
  { label: 'Social card, 1200 × 630 PNG', href: '/og-image.png' },
  { label: 'Home feed screenshot, 1080 × 1920 WebP', href: '/screenshots/home-feed.webp' },
  { label: 'Swipe gestures screenshot, 1080 × 1920 WebP', href: '/screenshots/swipe-gestures.webp' },
];

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
    a: 'The current version is a free download on Uptodown. No account, no payment, and no store listing gate. The changelog at curatedfeeds.web.app/changelog/ lists what each public build changed, so claims about features can be checked against the version you install.',
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
    <PageShell crumbs={CRUMBS} mainClass="press-page" data={faqPageLd(faqs, pageUrl('/press/'))}>
        <section className="page-hero">
          <h1>Press kit</h1>
          <p className="page-lede">
            Facts, boilerplate, and brand assets for coverage of Curated Feeds. No embargo, no PR
            contact theater. If you need something that is not on this page, reach the maker
            directly. Facts on this page reflect version {SITE.app.version} and were reviewed on
            November 1, 2026.
          </p>
        </section>

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
            <strong>~{APK_MB} MB</strong>
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
              <span>~{APK_MB} MB</span>
            </li>
            <li>
              <span>Current version</span>
              <span>{SITE.app.version}</span>
            </li>
            <li>
              <span>Distribution</span>
              <span>
                <a href={SITE.app.uptodown} target="_blank" rel="noopener noreferrer">
                  Uptodown
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
          <FaqList items={faqs} openFirst />
        </section>
    </PageShell>
  );
}
