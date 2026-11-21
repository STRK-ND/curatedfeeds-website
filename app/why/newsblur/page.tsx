import Link from 'next/link';
import { articleLd, qaPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';

const PATH = '/why/newsblur/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Curated Feeds vs NewsBlur: Best Free Alternative (2026/2027)';
const DESCRIPTION =
  'Curated Feeds vs NewsBlur (2026/2027): pricing, 64-feed limits, mandatory accounts, privacy, and offline reading. Curated Feeds is free forever with no limits.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs NewsBlur', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'NewsBlur alternative',
    'NewsBlur alternative 2027',
    'NewsBlur alternative free',
    'NewsBlur free limit alternative',
    'NewsBlur vs Curated Feeds',
    'free RSS reader without account 2027',
    'best NewsBlur replacement 2026',
    'best NewsBlur replacement 2027',
    'RSS reader no feed limit',
    'offline RSS reader android',
    'private feed reader android',
  ],
  type: 'article',
});

const rows: { label: string; cf: string; newsblur: string }[] = [
  { label: 'Price', cf: 'Free forever, no premium tier', newsblur: 'Free tier limited; Premium is $36/year' },
  { label: 'Account required', cf: 'No', newsblur: 'Yes, mandatory account' },
  { label: 'Feed limit on free tier', cf: 'Unlimited (device storage only)', newsblur: 'Strict 64-feed limit on free plan' },
  { label: 'Data stored on', cf: 'Your device only', newsblur: 'NewsBlur cloud servers' },
  { label: 'Reading interface', cf: 'Card-based swipe triage (right=save, left=done)', newsblur: 'Traditional multi-pane reader (original, feed, story)' },
  { label: 'Offline reading', cf: 'Full article cache on first read', newsblur: 'Limited offline cache; best online' },
  { label: 'Platforms', cf: 'Android 8.0+', newsblur: 'Web, iOS, Android' },
  { label: 'Intelligence / training filters', cf: 'No (simple chronological triage)', newsblur: 'Yes, thumbs up/down training on authors & tags' },
];

const qa = [
  {
    q: 'Why switch from NewsBlur to Curated Feeds?',
    a: 'NewsBlur is a capable service, but its free plan caps you at 64 feeds and restricts feed refresh speeds unless you pay $36 per year. If you only read on your Android phone and do not want to hit a feed ceiling, pay an annual fee, or maintain an account, Curated Feeds offers unlimited feeds free forever.',
  },
  {
    q: 'What do I give up by leaving NewsBlur?',
    a: 'You give up NewsBlur\'s web interface, its cross-platform iOS sync, and its signature "intelligence trainer" (which lets you train feeds to highlight or hide stories based on keywords and authors). Curated Feeds focuses purely on clean, fast, chronological reading without server-side processing.',
  },
  {
    q: 'Can I import my NewsBlur feeds?',
    a: 'Yes. In NewsBlur, export your OPML file from the account settings. You can then copy the RSS/Atom URLs and paste them directly into Curated Feeds without any directory gatekeeping.',
  },
  {
    q: 'Is Curated Feeds really completely free?',
    a: 'Yes. Because Curated Feeds operates directly on your phone without hosted database servers, there are zero server overhead costs to monetize. No ads, no tracking, and no upsells.',
  },
];

export default function WhyNewsBlurPage() {
  return (
    <PageShell
      crumbs={CRUMBS}
      mainClass="why-page"
      data={[
        articleLd({
          path: PATH,
          title: TITLE,
          description: DESCRIPTION,
          body:
            'Curated Feeds versus NewsBlur: subscription pricing, 64-site free plan caps, accounts, intelligence training, offline reading, and privacy compared honestly.',
          author: SITE.author,
          authorUrl: SITE.authorUrl,
          datePublished: '2026-11-22',
          dateModified: '2026-11-22',
          isPartOf: '/why/',
        }),
        qaPageLd(qa, PAGE_URL),
      ]}
    >
      <section className="page-hero">
        <h1>Curated Feeds vs NewsBlur</h1>
        <p className="page-lede">
          NewsBlur is an independent, community-backed RSS reader with powerful web features. But its
          free tier is capped at 64 feeds and requires an account. Curated Feeds is built for readers
          who want unlimited feeds on Android with zero subscriptions and zero accounts.
        </p>
      </section>

      <section className="page-section" aria-labelledby="glance-title">
        <h2 id="glance-title">The comparison at a glance</h2>
        <div className="table-wrap">
          <table className="data-table" aria-label="Curated Feeds compared with NewsBlur">
            <thead>
              <tr>
                <td />
                <th scope="col">Curated Feeds</th>
                <th scope="col">NewsBlur</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.cf}</td>
                  <td>{row.newsblur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Sources, checked November 2026:{' '}
          <a href="https://newsblur.com" target="_blank" rel="noopener noreferrer">
            NewsBlur website
          </a>{' '}
          and its published pricing tiers. NewsBlur is open source software supported by subscription revenue.
        </p>
      </section>

      <section className="page-section" aria-labelledby="better-title">
        <h2 id="better-title">When NewsBlur is the better choice</h2>
        <p>
          NewsBlur shines if you do a large portion of your reading at a desktop computer in a web
          browser. Its multi-mode view (Original, Feed, Text, Story) lets you view websites exactly
          as published without leaving the reader.
        </p>
        <p>
          It also features sophisticated intelligence filters that learn what topics, authors, and
          tags you like or dislike. If you follow hundreds of high-volume feeds and rely on machine
          filtering to surface stories, NewsBlur Premium ($36/yr) is well worth the cost.
        </p>
      </section>

      <section className="page-section" aria-labelledby="cf-better-title">
        <h2 id="cf-better-title">When Curated Feeds is the better choice</h2>
        <p>
          Curated Feeds is the better choice when your smartphone is your primary reading device and
          you refuse to pay an annual subscription or submit to a 64-feed cap.
        </p>
        <p>
          Instead of wading through a dense desktop interface shrunk down to a phone screen,
          Curated Feeds gives you a fluid, tactile card stack. You swipe through stories with one
          thumb, saving the best articles to read offline whenever you have downtime.
        </p>
      </section>

      <section className="page-section" aria-labelledby="switch-title">
        <h2 id="switch-title">How to switch from NewsBlur</h2>
        <ol>
          <li>In NewsBlur, go to Account &gt; Export OPML to download your feed list.</li>
          <li>Open the OPML export and copy your feed URLs.</li>
          <li>In Curated Feeds, tap add-feed and paste each URL. There is no 64-feed cap.</li>
          <li>Organize your sources into custom categories to keep your daily stack clean and focused.</li>
        </ol>
      </section>

      <section className="page-section" aria-labelledby="qa-title">
        <h2 id="qa-title">Frequently asked questions</h2>
        <FaqList items={qa} />
      </section>

      <section className="page-section" aria-labelledby="try-title">
        <h2 id="try-title">Try Curated Feeds</h2>
        <p>
          Free forever, no account, no ads: version {SITE.app.version}, about {APK_MB} MB, Android
          8.0 and up, as a direct APK from this site or from Uptodown.
        </p>
        <div className="blog-cta-actions">
          <Link href={SITE.app.apk} className="cta-button primary">
            Download the APK
          </Link>
          <Link href="/blog/best-rss-readers-android-2026/" className="cta-button secondary">
            All 8 readers compared
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
