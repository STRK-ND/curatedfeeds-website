import Link from 'next/link';
import { faqPageLd } from '../lib/seo';
import { pageMetadata, pageUrl, SITE } from '../lib/site';
import PageShell from '../components/PageShell';
import FaqList from '../components/FaqList';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Screenshots', url: '/screenshots/' },
];

export const metadata = pageMetadata({
  path: '/screenshots/',
  title: 'Screenshots, See the App in Action',
  description:
    'Two real screenshots of Curated Feeds: the card queue with 24 unread across 8 sources, and a right swipe filing a story as saved.',
  socialTitle: 'Curated Feeds Screenshots, RSS Reader for Android',
  socialDescription:
    'The card-based feed and swipe gestures of the privacy-first RSS reader for Android.',
});

/** Each shot pairs a real WebP asset with descriptive alt text (no keyword stuffing). */
const shots = [
  {
    src: '/screenshots/home-feed.webp',
    width: 1080,
    height: 1920,
    alt: 'Curated Feeds home feed showing unread count, source categories, and article cards from TechCrunch, Hacker News, MIT Technology Review, and The Verge',
    caption: 'Home feed, all your sources, one card at a time',
  },
  {
    src: '/screenshots/swipe-gestures.webp',
    width: 1080,
    height: 1920,
    alt: 'Curated Feeds swipe gestures: an article card saved with a green confirmation and a second card queued underneath',
    caption: 'Swipe right to save, left to mark done',
  },
];

const faqs = [
  {
    q: 'Is Curated Feeds free?',
    a: 'Yes. Curated Feeds is completely free with no ads, no in-app purchases, and no premium tier. Direct APK download is available on this site.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Articles cache on first read so they stay available in airplane mode, on the subway, or in low-signal areas.',
  },
  {
    q: 'Which Android versions are supported?',
    a: 'Curated Feeds runs on Android 8.0 Oreo and later. It requires roughly 25 MB of storage for the app and cached articles.',
  },
];

export default function ScreenshotsPage() {
  return (
    <PageShell
      crumbs={CRUMBS}
      mainClass="screenshots-page"
      data={faqPageLd(faqs, pageUrl('/screenshots/'))}
    >
        <section className="screenshots-hero">
          <h1>Curated Feeds in Action</h1>
          <p>
            Two screens, captured on a phone running version {SITE.app.version}: the queue with 24
            unread across 8 sources, and a story being filed as saved.
          </p>
          <p className="screenshots-note">
            Captured {SITE.app.version}, published November 2026. Both images are unedited screenshots
            from a phone in dark theme.
          </p>
        </section>

        {/* Explicit width/height on every image reserves layout space to keep
            cumulative layout shift at zero while the WebP files decode. */}
        <section className="screenshots-grid" aria-label="Curated Feeds screenshots">
          {shots.map((shot) => (
            <figure key={shot.src} className="screenshot-card">
              <div className="screenshot-frame">
                {/* `output: 'export'` disables the Next.js image optimizer
                    (it needs a running server), and these files are already
                    WebP-optimised by scripts/build-assets.mjs. Intrinsic
                    width/height are what protect the LCP/CLS scores. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- static export has no image optimizer; see comment above */}
                <img
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="screenshot-caption">{shot.caption}</figcaption>
            </figure>
          ))}
        </section>

        {/* Reading the interface: gives image-search visitors and screen-reader
            users the same orientation the screenshots give sighted users, and
            carries the entity terms (card queue, unread count, categories)
            search engines expect near app imagery. */}
        <section className="page-section" aria-labelledby="anatomy-title">
          <h2 id="anatomy-title">Reading the interface</h2>
          <h3>The queue screen</h3>
          <p>
            The first screenshot is the whole app in one view: a single article card, the source
            name and category above it, and the unread count with your source total in the corner,
            24 unread from 8 sources in this capture. There is no bottom tab bar and no sidebar,
            because the queue is the only screen you read in.
          </p>
          <h3>The swipe</h3>
          <p>
            The second screenshot catches a right swipe mid-gesture: the card tilts, a confirmation
            marks the story as saved, and the next card is already underneath. Swipe left and the
            card clears instead. Both gestures are one motion, so clearing a morning queue takes
            seconds, not a filing session.
          </p>
          <h3>What the numbers mean</h3>
          <p>
            The unread count only moves when you act on a card. There is no badge nagging you from
            outside the app. Categories such as Tech, Science and Research are groups you define,
            so the count in each stays meaningful instead of becoming one blended pile.
          </p>
          <p>
            Seen something you want to know more about? The{' '}
            <Link href="/use-cases/" className="text-link">use-case pages</Link> map each of these
            behaviours to a reading habit, and the{' '}
            <Link href="/why/" className="text-link">why pages</Link> explain the design decisions
            behind the one-card queue.
          </p>
        </section>

        <section className="screenshots-faq" aria-labelledby="screenshots-faq-title">
          <h2 id="screenshots-faq-title">Quick questions</h2>
          <FaqList items={faqs} />
        </section>

        <section className="screenshots-cta">
          <h2>Ready to read on your own terms?</h2>
          <p>Download Curated Feeds for Android, free forever, no ads, no account required.</p>
          <Link href="/#download" className="cta-button primary">
            Download Curated Feeds
          </Link>
        </section>
    </PageShell>
  );
}
