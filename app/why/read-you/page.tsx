import Link from 'next/link';
import { articleLd, qaPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';

const PATH = '/why/read-you/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Curated Feeds vs Read You: Best Android RSS Reader Comparison (2026/2027)';
const DESCRIPTION =
  'Curated Feeds vs Read You (2026/2027): card-deck triage vs Material You Reeder-style reader, offline reliability, and setup. Find the best reader for your Android phone.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs Read You', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Read You alternative',
    'Read You alternative 2027',
    'Read You RSS reader alternative',
    'Read You alternative android',
    'Material You RSS reader android',
    'Reeder alternative for Android',
    'best Android RSS reader 2027',
    'best Android RSS reader 2026',
    'F-Droid RSS reader alternative',
    'no account RSS app android',
    'card swipe feed reader',
  ],
  type: 'article',
});

const rows: { label: string; cf: string; readyou: string }[] = [
  { label: 'Price', cf: 'Free forever, no premium tier', readyou: 'Free, open source (GPL-3.0)' },
  { label: 'Account required', cf: 'No', readyou: 'No (unless syncing with cloud APIs)' },
  { label: 'Setup & complexity', cf: 'Zero-config (paste URL & read)', readyou: 'Can configure Fever, FreshRSS, Google Reader API' },
  { label: 'Reading interface', cf: 'Focused card deck with swipe gestures', readyou: 'Reeder-style Material You multi-pane view' },
  { label: 'Offline reading', cf: 'Full article cache stored locally', readyou: 'Yes' },
  { label: 'App store presence', cf: 'Direct APK download & Uptodown', readyou: 'GitHub Releases & F-Droid (not on Play Store)' },
  { label: 'Triage speed', cf: 'Fast one-thumb swipe triage', readyou: 'Folder navigation & list scrolling' },
  { label: 'Privacy & tracking', cf: 'Zero tracking, no personal logs', readyou: 'Zero tracking, open source' },
];

const qa = [
  {
    q: 'Why look for an alternative to Read You?',
    a: 'Read You is an attractive open-source project, but it is not available on the Google Play Store, requiring manual installation from GitHub or F-Droid. Additionally, it remains in pre-1.0 development with occasional syncing quirks. If you want a polished, zero-setup Android reader with direct APK installation and zero backend configuration, Curated Feeds is a simpler alternative.',
  },
  {
    q: 'Does Curated Feeds support Material You dynamic theming?',
    a: 'Curated Feeds features a sleek, high-contrast dark theme designed to maximize readability, minimize battery consumption on OLED displays, and keep attention focused on typography and content rather than decorative flourishes.',
  },
  {
    q: 'How does the reading experience compare?',
    a: 'Read You follows the traditional multi-tier Reeder pattern (Accounts &gt; Folders &gt; Feed &gt; Article List &gt; Reader). Curated Feeds skips nested folder hierarchies entirely by presenting your unread items as an active card stack. You swipe right to save and left to dismiss, clearing your daily reading queue in minutes.',
  },
  {
    q: 'Can I use Curated Feeds completely offline?',
    a: 'Yes. Articles cache on first read, making Curated Feeds completely reliable in airplane mode, subway transit, and poor reception zones.',
  },
];

export default function WhyReadYouPage() {
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
            'Curated Feeds versus Read You: design aesthetics, card swipe triage versus folder hierarchies, setup requirements, app distribution, and offline reliability compared.',
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
        <h1>Curated Feeds vs Read You</h1>
        <p className="page-lede">
          Read You brought Reeder&apos;s celebrated iOS design aesthetic to Android with Material
          You theming. Curated Feeds takes a different path: stripping away folder hierarchies in
          favor of a fast, tactile card stack. Here is how they stack up.
        </p>
      </section>

      <section className="page-section" aria-labelledby="glance-title">
        <h2 id="glance-title">The comparison at a glance</h2>
        <div className="table-wrap">
          <table className="data-table" aria-label="Curated Feeds compared with Read You">
            <thead>
              <tr>
                <td />
                <th scope="col">Curated Feeds</th>
                <th scope="col">Read You</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.cf}</td>
                  <td>{row.readyou}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Sources, checked November 2026:{' '}
          <a href="https://github.com/Ashinch/ReadYou" target="_blank" rel="noopener noreferrer">
            Read You GitHub repository
          </a>
          . Both apps operate without ad networks and respect reader privacy.
        </p>
      </section>

      <section className="page-section" aria-labelledby="better-title">
        <h2 id="better-title">When Read You is the better choice</h2>
        <p>
          Read You is the ideal choice if you love Android&apos;s dynamic color palette (Material
          Design 3 / Material You) and prefer traditional desktop-like RSS navigation with nested
          folders and multiple sync backends like Fever or FreshRSS.
        </p>
        <p>
          If you already have a self-hosted RSS server and want a beautiful native Android client
          to connect to it, Read You is built for that workflow.
        </p>
      </section>

      <section className="page-section" aria-labelledby="cf-better-title">
        <h2 id="cf-better-title">When Curated Feeds is the better choice</h2>
        <p>
          Curated Feeds is built for users who want zero friction. You don&apos;t need to configure
          API endpoints, deal with self-hosted server certificates, or drill down through three
          layers of folders just to read morning tech updates.
        </p>
        <p>
          The physical card stack interaction reduces decision fatigue: you see one story at a time,
          swipe right to save it to your personal library, or swipe left to clear it. It turns feed
          reading from an inbox chore into a delightful ritual.
        </p>
      </section>

      <section className="page-section" aria-labelledby="switch-title">
        <h2 id="switch-title">How to switch from Read You</h2>
        <ol>
          <li>Export your feed subscriptions from Read You as an OPML file.</li>
          <li>Extract the RSS or Atom URLs from the export.</li>
          <li>Add your favorite feeds into Curated Feeds.</li>
          <li>Assign your feeds to categories like Tech, Business, or Culture to start swiping.</li>
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
