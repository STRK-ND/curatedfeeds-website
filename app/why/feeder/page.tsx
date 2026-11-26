import Link from 'next/link';
import { articleLd, qaPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';

const PATH = '/why/feeder/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Curated Feeds vs Feeder: Best Free Android Alternative (2026/2027)';
const DESCRIPTION =
  'Curated Feeds vs Feeder (2026/2027): card-swipe triage vs classic list, offline reading, privacy, and UX. Both are free with no accounts; see which fits your reading style.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs Feeder', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Feeder alternative',
    'Feeder alternative 2027',
    'Feeder RSS reader alternative',
    'Feeder vs Curated Feeds',
    'best open source RSS reader android 2027',
    'free RSS reader no account android',
    'Feeder app android alternative',
    'offline RSS reader android',
    'card swipe RSS reader',
    'privacy feed reader android',
  ],
  type: 'article',
});

const rows: { label: string; cf: string; feeder: string }[] = [
  { label: 'Price', cf: 'Free forever, no premium tier', feeder: 'Free, open source (GPL-3.0)' },
  { label: 'Account required', cf: 'No', feeder: 'No' },
  { label: 'Data stored on', cf: 'Your device only', feeder: 'Your device only' },
  { label: 'Reading interface', cf: 'Swipeable card queue (Tinder-style triage)', feeder: 'Classic vertical list view' },
  { label: 'Offline reading', cf: 'Full article cache on first open', feeder: 'Yes, offline article storage' },
  { label: 'Platforms', cf: 'Android 8.0+', feeder: 'Android (Google Play & F-Droid)' },
  { label: 'Sync to cloud', cf: 'None (device-local)', feeder: 'None (device-local)' },
  { label: 'Adding feeds', cf: 'Paste any RSS 2.0 / Atom / RDF URL', feeder: 'OPML import/export & direct URL paste' },
  { label: 'One-hand triage', cf: 'Yes (swipe right to save, left to dismiss)', feeder: 'Tap, back, scroll lists' },
];

const qa = [
  {
    q: 'How does Curated Feeds differ from Feeder?',
    a: 'Both apps respect your privacy, keep all data strictly on your device, and require no account. The core difference is the user interface: Feeder uses a traditional list-based layout where you scroll headlines and tap into each article, while Curated Feeds uses a card stack where you swipe right to save and left to clear, making mobile triage fast and effortless with one hand.',
  },
  {
    q: 'Can I import my feeds from Feeder into Curated Feeds?',
    a: 'Yes. In Feeder, export your OPML file, open it in any text editor, and copy the feed URLs into Curated Feeds. Any RSS 2.0, Atom, or RDF URL works immediately.',
  },
  {
    q: 'Does either app track my reading habits or serve ads?',
    a: 'Neither app serves ads. Feeder is completely open source with zero tracking. Curated Feeds records only anonymous aggregate installation counters via Firebase and never logs personal reading history, feed URLs, or IP addresses.',
  },
  {
    q: 'Which app should I choose?',
    a: 'Choose Feeder if you prefer a traditional headline-list reader with OPML import/export and full open-source licensing. Choose Curated Feeds if you want a modern, card-based interface designed specifically for rapid one-handed mobile reading and zero feed inbox anxiety.',
  },
];

export default function WhyFeederPage() {
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
            'Curated Feeds versus Feeder: reading interface, card swipe triage, account requirements, privacy, offline caching, and navigation compared honestly.',
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
        <h1>Curated Feeds vs Feeder</h1>
        <p className="page-lede">
          Feeder is one of the most respected privacy-first RSS readers on Android: no account, no
          tracking, and no ads. Curated Feeds shares that exact privacy philosophy, but reimagines
          how you consume content through a swipeable card deck. Here is how they compare.
        </p>
      </section>

      <section className="page-section" aria-labelledby="glance-title">
        <h2 id="glance-title">The comparison at a glance</h2>
        <div className="table-wrap">
          <table className="data-table" aria-label="Curated Feeds compared with Feeder">
            <thead>
              <tr>
                <td />
                <th scope="col">Curated Feeds</th>
                <th scope="col">Feeder</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.cf}</td>
                  <td>{row.feeder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Sources, checked November 2026:{' '}
          <a href="https://github.com/spacecowboy/Feeder" target="_blank" rel="noopener noreferrer">
            Feeder GitHub repository
          </a>{' '}
          and its Google Play listing. Both apps run locally on your phone without remote accounts.
        </p>
      </section>

      <section className="page-section" aria-labelledby="better-title">
        <h2 id="better-title">When Feeder is the better choice</h2>
        <p>
          Feeder has been actively maintained since 2014 and is licensed under GPL-3.0. If you
          require fully open-source code audited on F-Droid, or if you manage a massive archive of
          hundreds of feeds imported via OPML files, Feeder is a fantastic, proven utility.
        </p>
        <p>
          It also suits readers who prefer standard email-style list views where dozens of article
          titles are visible on screen simultaneously.
        </p>
      </section>

      <section className="page-section" aria-labelledby="cf-better-title">
        <h2 id="cf-better-title">When Curated Feeds is the better choice</h2>
        <p>
          If scrolling through an endless list of unread headlines feels like a chore, Curated Feeds
          fixes feed fatigue. Instead of managing unread badge counts, you triage your queue one
          card at a time: swipe right to save what matters, swipe left to clear the rest.
        </p>
        <p>
          The next story is already pre-loaded under your thumb, making reading fast, focused, and
          ergonomically effortless on modern large-screen Android phones.
        </p>
      </section>

      <section className="page-section" aria-labelledby="switch-title">
        <h2 id="switch-title">How to switch from Feeder</h2>
        <ol>
          <li>In Feeder, go to Settings &gt; Import/Export and export your OPML file.</li>
          <li>Open the OPML file in any text editor on your phone or PC to view your feed URLs.</li>
          <li>In Curated Feeds, tap add-feed and paste each URL. All standard RSS 2.0, Atom, and RDF feeds work out of the box.</li>
          <li>Try the swipe queue for a few days to experience distraction-free reading.</li>
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
          <a
            href={SITE.app.uptodown}
            className="cta-button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on Uptodown
          </a>
          <Link href="/blog/best-rss-readers-android-2026/" className="cta-button secondary">
            All 8 readers compared
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
