import Link from 'next/link';
import { articleLd, qaPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';

const PATH = '/why/inoreader/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Curated Feeds vs Inoreader: Best Free Alternative (2026/2027)';
const DESCRIPTION =
  'Curated Feeds vs Inoreader (2026/2027): price, accounts, rules, filters, and privacy. Curated Feeds is free forever with no account; Inoreader requires one.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs Inoreader', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Inoreader alternative',
    'Inoreader alternative 2027',
    'Inoreader alternative free',
    'Inoreader alternative free 2027',
    'Inoreader alternative android',
    'free Inoreader alternative 2026',
    'Curated Feeds vs Inoreader',
    'best Inoreader replacement',
    'RSS reader without subscription',
    'Inoreader free plan limit alternative',
    'offline RSS reader android',
    'privacy RSS app android',
  ],
  type: 'article',
});

const rows: { label: string; cf: string; inoreader: string }[] = [
  { label: 'Price', cf: 'Free forever, no premium tier', inoreader: 'Free up to 150 feeds; Pro from $7.50/month billed annually' },
  { label: 'Account required', cf: 'No', inoreader: 'Yes' },
  { label: 'Data stored on', cf: 'Your device only', inoreader: 'Inoreader servers' },
  { label: 'Free-plan limits', cf: 'None beyond Android 8.0+', inoreader: '150 feeds; rules, filters and AI features need Pro' },
  { label: 'Offline reading', cf: 'Full article cache', inoreader: 'Yes' },
  { label: 'Platforms', cf: 'Android 8.0+', inoreader: 'Android, iOS, web' },
  { label: 'Multi-device sync', cf: 'No', inoreader: 'Yes' },
  { label: 'Rules, filters, folders', cf: 'No', inoreader: 'Server-side rules and filters on paid plans' },
  { label: 'Archive search', cf: 'No full-text archive search', inoreader: 'Full-text search across saved articles on paid plans' },
  { label: 'Adding feeds', cf: 'Paste any RSS 2.0 / Atom / RDF URL directly', inoreader: 'Feed directory and search, plus pasted URLs' },
];

const qa = [
  {
    q: 'Can I import my Inoreader subscriptions into Curated Feeds?',
    a: 'Yes, manually. In Inoreader export your subscriptions as an OPML file, open it in a text editor, copy each xmlUrl value, and paste the URLs into Curated Feeds one by one. There is no account-to-account import because Curated Feeds has no account.',
  },
  {
    q: 'Is Curated Feeds really free, or is there a catch?',
    a: 'There is no server bill to cover, so there is no premium tier and no ads. One free build, distributed as a direct APK from this site and from Uptodown, version '    + SITE.app.version + ', about ' + APK_MB + ' MB.',
  },
  {
    q: 'What do I lose by leaving Inoreader?',
    a: 'Cross-device sync, the web reader, server-side rules and filters that sort articles before they reach you, folders, and full-text search across your archive on paid plans. All of those run on Inoreader\'s servers and require an account, which is exactly what Curated Feeds does not have.',
  },
  {
    q: 'Which one should I pick if my workflow depends on rules and filters?',
    a: 'Stay with Inoreader on a paid plan; that is its core strength and Curated Feeds does not attempt it. Choose Curated Feeds when the phone is your only reader and you would rather have no account, no ads, and no server holding your reading history.',
  },
];

export default function WhyInoreaderPage() {
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
              'Curated Feeds versus Inoreader: price, account requirements, data storage, ads, offline reading, platforms, sync, rules, and archive search compared honestly.',
            author: SITE.author,
            authorUrl: SITE.authorUrl,
            datePublished: '2026-10-31',
            dateModified: '2026-10-31',
            isPartOf: '/why/',
          }),
        qaPageLd(qa, PAGE_URL),
      ]}
    >
        <section className="page-hero">
          <h1>Curated Feeds vs Inoreader</h1>
          <p className="page-lede">
            Inoreader is built for people who want the server to do the sorting: rules, filters,
            folders, and archive search. Curated Feeds is built for people who want none of that
            infrastructure attached to their reading. Here is the honest trade, checked in October
            2026.
          </p>
        </section>

        <section className="page-section" aria-labelledby="glance-title">
          <h2 id="glance-title">The comparison at a glance</h2>
          <div className="table-wrap">
            <table className="data-table" aria-label="Curated Feeds compared with Inoreader">
              <thead>
                <tr>
                  <td />
                  <th scope="col">Curated Feeds</th>
                  <th scope="col">Inoreader</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.cf}</td>
                    <td>{row.inoreader}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            Source, checked October 2026:{' '}
            <a href="https://www.inoreader.com/pricing" target="_blank" rel="noopener noreferrer">
              Inoreader&apos;s pricing page
            </a>
            , where the free plan is listed at 150 feeds and Pro at $7.50/month billed annually.
            Limits and prices change, so check their own page before deciding. The structural difference
            does not change: Inoreader&apos;s power features run on its servers, so an account is the
            price of admission, while Curated Feeds runs entirely on your device.
          </p>
        </section>

        <section className="page-section" aria-labelledby="better-title">
          <h2 id="better-title">When Inoreader is the better choice</h2>
          <p>
            If your reading depends on automation, Inoreader wins. Server-side rules can file, flag,
            or mute articles before they ever reach your queue, and folders keep large feed lists
            organized. Paid plans add full-text search across your whole archive.
          </p>
          <p>
            Reading on phone, tablet, and laptop with everything in sync is also Inoreader&apos;s home
            ground. Curated Feeds deliberately does not compete there, because each of those features
            needs a server and an account.
          </p>
        </section>

        <section className="page-section" aria-labelledby="switch-title">
          <h2 id="switch-title">How to switch from Inoreader</h2>
          <ol>
            <li>In Inoreader, export your subscriptions as an OPML file.</li>
            <li>Open the OPML file in any text editor and copy each <code>xmlUrl</code> value, or use the share sheet per feed.</li>
            <li>In Curated Feeds, paste each URL into the add-feed field. Any RSS 2.0, Atom, or RDF URL is accepted directly, with no directory approval step.</li>
            <li>Recreate your categories by hand if you used folders; rules and filters have no equivalent, by design.</li>
          </ol>
          <p>
            Your read state and rule setup stay in Inoreader&apos;s account and do not transfer. The
            feeds themselves are just URLs, and those move over in minutes.
          </p>
        </section>

        <section className="page-section" aria-labelledby="qa-title">
          <h2 id="qa-title">Questions</h2>
          <FaqList items={qa} />
        </section>

        <section className="page-section" aria-labelledby="try-title">
          <h2 id="try-title">Try Curated Feeds</h2>
          <p>
            Free forever, no account, no ads: version {SITE.app.version}, about {APK_MB} MB, Android
            8.0 and up, as a direct APK from this site or from Uptodown. Add a few feeds from the
            starter list and see whether reading without a server behind it suits you.
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
