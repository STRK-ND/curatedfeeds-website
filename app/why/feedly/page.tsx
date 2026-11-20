import Link from 'next/link';
import { articleLd, qaPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';

const PATH = '/why/feedly/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Curated Feeds vs Feedly: Best Free Alternative (2026)';
const DESCRIPTION =
  'Curated Feeds vs Feedly in 2026: price, accounts, privacy, offline reading, and sync. Curated Feeds is free forever with no account; Feedly requires one.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs Feedly', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  type: 'article',
});

const rows: { label: string; cf: string; feedly: string }[] = [
  { label: 'Price', cf: 'Free forever, no premium tier', feedly: 'Free plan for basic reading; Pro and Pro+ are paid' },
  { label: 'Account required', cf: 'No', feedly: 'Yes' },
  { label: 'Data stored on', cf: 'Your device only', feedly: 'Feedly servers' },
  { label: 'Free-plan limits', cf: 'None beyond Android 8.0+', feedly: 'Limited by design; paid plans lift the limits' },
  { label: 'Offline reading', cf: 'Full article cache', feedly: 'Yes' },
  { label: 'Platforms', cf: 'Android 8.0+', feedly: 'Android, iOS, web' },
  { label: 'Multi-device sync', cf: 'No', feedly: 'Yes' },
  { label: 'Boards and AI summaries', cf: 'No', feedly: 'AI feeds and RSS Builder on Pro+' },
  { label: 'Adding feeds', cf: 'Paste any RSS 2.0 / Atom / RDF URL directly', feedly: 'Feed directory and search, plus pasted URLs' },
];

const qa = [
  {
    q: 'Can I import my Feedly subscriptions into Curated Feeds?',
    a: 'Yes, manually. In Feedly open Settings, then export your feeds as an OPML file. Open that file in a text editor, copy each xmlUrl value, and paste the URLs into Curated Feeds one by one. There is no account-to-account import because Curated Feeds has no account.',
  },
  {
    q: 'Is Curated Feeds really free, or is there a catch?',
    a: 'There is no server bill to cover, so there is no premium tier and no ads. One free build, distributed as a direct APK from this site and from Uptodown, version '    + SITE.app.version + ', about ' + APK_MB + ' MB.',
  },
  {
    q: 'What do I lose by leaving Feedly?',
    a: 'Sync across phone, tablet, and laptop; the web reader; boards and collections; and the Pro AI summaries and newsletters. All of those need a server and an account, which is exactly what Curated Feeds does not have.',
  },
  {
    q: 'Which one should I pick if I read on both phone and laptop?',
    a: 'Feedly, if cross-device sync is the point. Curated Feeds is the better fit when the phone is your only reader and you would rather have no account, no ads, and nothing synced to a server.',
  },
];

export default function WhyFeedlyPage() {
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
              'Curated Feeds versus Feedly: price, account requirements, data storage, ads, offline reading, platforms, sync, and AI features compared honestly.',
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
          <h1>Curated Feeds vs Feedly</h1>
          <p className="page-lede">
            Feedly is the default answer when someone asks for an RSS reader: boards, sync, and a
            web app. Curated Feeds is the answer when you do not want an account attached to your
            reading. Here is the honest trade between the two, checked in October 2026.
          </p>
        </section>

        <section className="page-section" aria-labelledby="glance-title">
          <h2 id="glance-title">The comparison at a glance</h2>
          <div className="table-wrap">
            <table className="data-table" aria-label="Curated Feeds compared with Feedly">
              <thead>
                <tr>
                  <td />
                  <th scope="col">Curated Feeds</th>
                  <th scope="col">Feedly</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.cf}</td>
                    <td>{row.feedly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            Sources, checked October 2026:{' '}
            <a href="https://feedly.com/i/pro" target="_blank" rel="noopener noreferrer">
              Feedly&apos;s plans and pricing page
            </a>{' '}
            and their{' '}
            <a href="https://docs.feedly.com/article/140-what-is-the-difference-between-feedly-free-pro-pro-and-enterprise-plans" target="_blank" rel="noopener noreferrer">
              documentation on Free, Pro, Pro+ and Enterprise
            </a>
            . Free-tier limits and prices change, so check Feedly&apos;s own pages before deciding. The
            structural difference does not change: Feedly&apos;s features run on its servers, so an
            account is the price of admission, while Curated Feeds runs entirely on your device.
          </p>
        </section>

        <section className="page-section" aria-labelledby="better-title">
          <h2 id="better-title">When Feedly is the better choice</h2>
          <p>
            If you read on more than one device, Feedly wins outright. Your feed list, read state, and
            boards follow your account to Android, iOS, and the web, and that transfer is the part
            Curated Feeds cannot offer.
          </p>
          <p>
            Server-side organization with boards and collections also belongs to the hosted product,
            as do the AI feeds, AI summaries and newsletters on the paid tiers, and team or shared
            collections. Curated Feeds deliberately does not compete there, because every one of those
            features requires a server and an account.
          </p>
        </section>

        <section className="page-section" aria-labelledby="switch-title">
          <h2 id="switch-title">How to switch from Feedly</h2>
          <ol>
            <li>In Feedly, open Settings and export your subscriptions as an OPML file.</li>
            <li>Open the OPML file in any text editor and copy each <code>xmlUrl</code> value, or use Feedly&apos;s share sheet per feed.</li>
            <li>In Curated Feeds, paste each URL into the add-feed field. Any RSS 2.0, Atom, or RDF URL is accepted directly, with no directory approval step.</li>
            <li>Keep Feedly installed for a week as a fallback, then uninstall it once the new queue feels right.</li>
          </ol>
          <p>
            Your read state does not transfer, because it lives in Feedly&apos;s account. The feeds
            themselves are just URLs, and those move over in minutes.
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
