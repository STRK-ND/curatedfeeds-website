import Link from 'next/link';
import { articleLd, qaPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';

const PATH = '/why/feedflow/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Curated Feeds vs FeedFlow: Lightweight Android RSS Alternative (2026/2027)';
const DESCRIPTION =
  'Curated Feeds vs FeedFlow (2026/2027): card triage vs minimalist browser reader, offline caching, UX, and setup. Both are privacy-first with no accounts required.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs FeedFlow', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'FeedFlow alternative',
    'FeedFlow alternative 2027',
    'FeedFlow alternative android',
    'FeedFlow vs Curated Feeds',
    'minimalist RSS reader android 2027',
    'offline RSS reader android',
    'lightweight RSS app',
    'clean RSS reader no account',
    'free feed reader android',
    'distraction free RSS app',
  ],
  type: 'article',
});

const rows: { label: string; cf: string; feedflow: string }[] = [
  { label: 'Price', cf: 'Free forever, no premium tier', feedflow: 'Free, open source' },
  { label: 'Account required', cf: 'No', feedflow: 'No' },
  { label: 'Primary reading flow', cf: 'Swipeable card queue with instant save', feedflow: 'Minimal headline list opening in browser' },
  { label: 'Offline reading', cf: 'Full article cached on first open', feedflow: 'Reader mode / webview caching' },
  { label: 'Platforms', cf: 'Android 8.0+', feedflow: 'Android, Desktop (macOS, Windows, Linux)' },
  { label: 'Backend sync', cf: 'Device only (zero setup)', feedflow: 'Device-local or self-hosted FreshRSS' },
  { label: 'Triage interaction', cf: 'One-thumb gestures (Right=Keep, Left=Done)', feedflow: 'Vertical scrolling & tap-to-open' },
  { label: 'Ad-free & tracker-free', cf: 'Yes', feedflow: 'Yes' },
];

const qa = [
  {
    q: 'How does Curated Feeds compare to FeedFlow?',
    a: 'FeedFlow is an ultra-minimalist reader built to open feeds into clean web views or custom tabs with minimal chrome. Curated Feeds is built specifically around active decision-making: you swipe through articles as a physical deck of cards, separating stories you want to read now or keep for later without cluttering your inbox.',
  },
  {
    q: 'Do either of these apps require registration or a login?',
    a: 'No. Both Curated Feeds and FeedFlow work immediately without creating an account, entering an email address, or accepting third-party cloud terms.',
  },
  {
    q: 'Does Curated Feeds work on desktop like FeedFlow?',
    a: 'Curated Feeds is exclusively focused on Android mobile devices (phones and tablets running Android 8.0+). If you need a single cross-platform client that runs identically on macOS or Linux desktops, FeedFlow is a great option.',
  },
  {
    q: 'Can I read articles offline on a plane or subway?',
    a: 'Yes. Curated Feeds caches articles on first read so you can revisit saved and opened stories without an active internet connection.',
  },
];

export default function WhyFeedFlowPage() {
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
            'Curated Feeds versus FeedFlow: minimalist reading, offline capability, swipe triage versus browser tabs, desktop availability, and privacy compared.',
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
        <h1>Curated Feeds vs FeedFlow</h1>
        <p className="page-lede">
          Both FeedFlow and Curated Feeds reject modern feed bloat: no accounts, no trackers, and no
          noisy algorithms. But their reading mechanics are completely different. Here is the
          honest comparison to help you choose the right reader.
        </p>
      </section>

      <section className="page-section" aria-labelledby="glance-title">
        <h2 id="glance-title">The comparison at a glance</h2>
        <div className="table-wrap">
          <table className="data-table" aria-label="Curated Feeds compared with FeedFlow">
            <thead>
              <tr>
                <td />
                <th scope="col">Curated Feeds</th>
                <th scope="col">FeedFlow</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.cf}</td>
                  <td>{row.feedflow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Sources, checked November 2026:{' '}
          <a href="https://github.com/prof18/feed-flow" target="_blank" rel="noopener noreferrer">
            FeedFlow GitHub repository
          </a>
          . Both apps respect privacy and operate without mandatory cloud services.
        </p>
      </section>

      <section className="page-section" aria-labelledby="better-title">
        <h2 id="better-title">When FeedFlow is the better choice</h2>
        <p>
          FeedFlow is developed with Kotlin Multiplatform and Compose Multiplatform, meaning it runs
          on Android as well as macOS, Windows, and Linux desktops. If cross-platform desktop
          parity is essential to your setup, FeedFlow delivers that well.
        </p>
        <p>
          It also supports syncing with self-hosted FreshRSS instances if you prefer managing your
          own personal sync server.
        </p>
      </section>

      <section className="page-section" aria-labelledby="cf-better-title">
        <h2 id="cf-better-title">When Curated Feeds is the better choice</h2>
        <p>
          Curated Feeds is purpose-built for mobile information diets. Instead of a desktop-style
          headline list that punts reading into browser tabs, Curated Feeds treats your feeds as a
          curated stack of story cards.
        </p>
        <p>
          With fluid one-thumb swipe gestures, you quickly process your daily reading in 15 minutes.
          Stories you swipe right to save are cached on your phone, ready for offline reading
          anywhere without signal.
        </p>
      </section>

      <section className="page-section" aria-labelledby="switch-title">
        <h2 id="switch-title">How to switch from FeedFlow</h2>
        <ol>
          <li>Open FeedFlow and export your subscriptions to OPML via the app settings.</li>
          <li>Open the OPML file to copy your feed addresses.</li>
          <li>Paste the URLs into Curated Feeds. All RSS, Atom, and RDF endpoints are supported.</li>
          <li>Group your feeds into clean categories like Tech, News, or Design to streamline your queue.</li>
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
