import type { ReactElement } from 'react';
import Link from 'next/link';
import { faqPageLd } from '../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../lib/site';
import PageShell from '../components/PageShell';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Why Curated Feeds', url: '/why/' },
];

export const metadata = pageMetadata({
  path: '/why/',
  title: 'Why Curated Feeds, An Honest Comparison',
  description:
    'An honest comparison of Curated Feeds against Feedly, Inoreader, and NetNewsWire: what you gain, what you give up, and who the app is not for.',
  keywords: [
    'why curated feeds',
    'RSS reader comparison',
    'Feedly alternative',
    'Inoreader alternative',
    'NetNewsWire alternative android',
    'best RSS reader android',
    'free RSS reader no account',
    'device-local RSS reader',
    'offline feed reader',
    'privacy first RSS app',
  ],
  socialTitle: 'Why Curated Feeds, An Honest Comparison',
  socialDescription:
    'The case for an account-free, device-local RSS reader on Android, and the features it deliberately leaves out.',
});

const tradeIcons: Record<'desktop' | 'search' | 'sync', ReactElement> = {
  desktop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
      <path d="M8.5 8.5l5 5M13.5 8.5l-5 5" />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 18.5A4.5 4.5 0 016.4 9.6A6 6 0 0118 10.2 4 4 0 0117.5 18.5" />
      <path d="M4 4l16 16" />
    </svg>
  ),
};

/** Column order is the product, row order is the price paid. */
const comparisonRows: { label: string; cells: string[] }[] = [
  { label: 'Price', cells: ['Free forever', 'Free plan plus paid Pro', 'Free to 150 feeds, then paid', 'Free, open source'] },
  { label: 'Account required', cells: ['No account', 'Account required', 'Account required', 'No account'] },
  { label: 'Data stored on', cells: ['Your device only', 'Their servers', 'Their servers', 'Device, optional sync'] },
  { label: 'Free-plan limits', cells: ['None beyond Android 8.0+', 'Limited by design', '150 feeds', 'None'] },
  { label: 'Platform', cells: ['Android 8.0+', 'Android, iOS, Web', 'Android, iOS, Web', 'iPhone, iPad, Mac'] },
  { label: 'Offline reading', cells: ['Full article caching', 'Yes', 'Yes', 'Yes'] },
  { label: 'Source model', cells: ['Unlimited RSS 2.0, Atom, RDF', 'Feeds and boards', 'Rules and filters', 'Standard RSS'] },
];

/** Where the competitor columns come from, so a reader can check them. */
const sources: { label: string; href: string }[] = [
  { label: 'Feedly plans and pricing', href: 'https://feedly.com/i/pro' },
  { label: 'Feedly plan documentation', href: 'https://docs.feedly.com/article/140-what-is-the-difference-between-feedly-free-pro-pro-and-enterprise-plans' },
  { label: 'Inoreader pricing', href: 'https://www.inoreader.com/pricing' },
  { label: 'NetNewsWire', href: 'https://netnewswire.com/' },
];

const competitors = ['Curated Feeds', 'Feedly', 'Inoreader', 'NetNewsWire'];

const tradeoffs: { icon: 'desktop' | 'search' | 'sync'; title: string; body: string }[] = [
  {
    icon: 'desktop',
    title: 'No desktop app',
    body:
      'Android is the whole delivery surface today. There is no Windows, Linux, or Mac client, and no web reader you open in a browser tab on a laptop.',
  },
  {
    icon: 'search',
    title: 'No full-text search across feeds',
    body:
      'Nothing indexes every article from every feed you follow. If your habit is to search back months through a complete archive, this is the gap that shows up first.',
  },
  {
    icon: 'sync',
    title: 'No multi-device sync',
    body:
      'Every feed, saved article, and read state lives on the one device you installed it on. A new phone means adding your feeds again by hand.',
  },
];

const faqs = [
  {
    q: 'How is this free?',
    a: `There is no server bill to cover. Your feeds, saved articles, and reading history stay on your device, so there is no storage, sync, or delivery infrastructure to fund, and no premium tier to gate those things behind. There is one free build, version ${SITE.app.version}, distributed directly from this site and from Uptodown.`,
  },
  {
    q: 'Is my reading history really private?',
    a: 'Reading history is written to your device and nowhere else. There is no account to attach it to and no server-side copy that could leak or be handed over. The website and the app do collect anonymous aggregate counts through Firebase Analytics, and nothing that identifies you.',
  },
  {
    q: 'Why Android only?',
    a: 'The reading experience is a card deck driven by swipe gestures, which is a phone interaction first. Android 8.0 and up is where that interaction could be built and tested properly before it spread thin across three platforms.',
  },
  {
    q: 'Can I import feeds from Feedly or Inoreader?',
    a: 'There is no account-to-account import. You add feeds by pasting a feed URL, and you can copy that URL out of any reader, from a share sheet or by opening the feed and copying its address. It takes a few minutes of manual work rather than a migration tool.',
  },
  {
    q: 'Will there be an iPhone version?',
    a: 'Not at launch. The app is Android-first, built in Flutter, and focused on the Android swipe-gesture experience. There is no iOS release date to announce, and no iOS build to download.',
  },
];

export default function WhyPage() {
  return (
    <PageShell crumbs={CRUMBS} mainClass="why-page" data={faqPageLd(faqs, pageUrl('/why/'))}>
        <section className="page-hero">
          <h1>Why another RSS reader</h1>
          <p className="page-lede">
            Most readers ask for an account before they show you anything, mirror your reading history
            to a company server, and monetize the attention you brought with you. This one does none
            of that. It is Android-first, free forever, and it keeps everything on the device in your
            pocket. Comparison rows checked against each vendor&apos;s own pages in October 2026.
          </p>
        </section>

        <section className="page-section" aria-labelledby="short-version-title">
          <h2 id="short-version-title">The short version</h2>
          <div className="table-wrap">
            <table className="data-table" aria-label="Curated Feeds compared with Feedly, Inoreader, and NetNewsWire">
              <thead>
                <tr>
                  <td />
                  {competitors.map((name) => (
                    <th key={name} scope="col">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.cells.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            Feedly and Inoreader are mature products with capabilities this app does not attempt to
            match, and NetNewsWire is a strong open-source choice if Apple platforms are where you
            read. The rows above are the whole trade: an account, a server, and a subscription are
            the price of server-side features, and this app declines all three.
          </p>
          <p className="note">
            Sources for the competitor columns:{' '}
            {sources.map((source, index) => (
              <span key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.label}
                </a>
                {index < sources.length - 1 ? '. ' : '.'}
              </span>
            ))}{' '}
            Checked October 2026; prices and limits change without notice.
          </p>
        </section>

        <section className="page-section" aria-labelledby="deep-dives-title">
          <h2 id="deep-dives-title">Head-to-head comparisons</h2>
          <p>
            Detailed breakdowns comparing Curated Feeds directly against the most popular hosted and open-source readers:
          </p>
          <div className="panel-grid">
            <div className="panel">
              <h3><Link href="/why/feedly/" className="text-link">vs Feedly</Link></h3>
              <p>Accounts, cloud sync, boards, and free-plan limits compared.</p>
            </div>
            <div className="panel">
              <h3><Link href="/why/inoreader/" className="text-link">vs Inoreader</Link></h3>
              <p>150-feed caps, server-side rules, archive search, and subscription tiers.</p>
            </div>
            <div className="panel">
              <h3><Link href="/why/feeder/" className="text-link">vs Feeder</Link></h3>
              <p>Card-swipe triage vs classic headline lists for privacy-focused Android users.</p>
            </div>
            <div className="panel">
              <h3><Link href="/why/feedflow/" className="text-link">vs FeedFlow</Link></h3>
              <p>Tactile card decks vs minimalist browser-tab reader mode.</p>
            </div>
            <div className="panel">
              <h3><Link href="/why/read-you/" className="text-link">vs Read You</Link></h3>
              <p>Zero-configuration triage vs Material You multi-pane Reeder styling.</p>
            </div>
            <div className="panel">
              <h3><Link href="/why/newsblur/" className="text-link">vs NewsBlur</Link></h3>
              <p>Unlimited device-local reading vs 64-site caps and $36/year subscriptions.</p>
            </div>
          </div>
        </section>

        <section className="page-section" aria-labelledby="tradeoffs-title">
          <h2 id="tradeoffs-title">What you give up by choosing this</h2>
          <div className="panel-grid">
            {tradeoffs.map((item) => (
              <div key={item.title} className="panel">
                <span className="panel-icon">{tradeIcons[item.icon]}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <p className="note">
            This list is deliberate, not an omission. There is no server to sync through, no account
            to attach history to, and no revenue to protect, so anything that needs those things is
            not here. The{' '}
            <Link href="/blog/best-rss-readers-android-2026/" className="text-link">
              eight-reader comparison
            </Link>{' '}
            covers the same trade-offs on a wider field, and the{' '}
            <Link href="/use-cases/" className="text-link">
              reader profiles
            </Link>{' '}
            say which habits fit an account-free reader.
          </p>
        </section>

        <section className="page-section" aria-labelledby="not-for-title">
          <h2 id="not-for-title">Who it is not for</h2>
          <p>
            If your reading happens with other people, look elsewhere. Shared collections, team
            folders, and sending an article to a colleague are not features of this app, and nothing
            on its roadmap adds a collaborator to your feed list.
          </p>
          <p>
            If automation is what you need, look elsewhere as well. Server-side rules that sort,
            tag, or filter incoming articles as they arrive require a server, and this app fetches
            straight from your device.
          </p>
          <p>
            And if you read on a Mac or an iPhone today, that is a real constraint, not a
            ditch-this-app warning. Android 8.0 and up is the platform it ships on, and it ships
            there properly rather than thinly on every platform at once.
          </p>
        </section>

        <section className="page-section page-faq" aria-labelledby="why-faq-title">
          <h2 id="why-faq-title">Questions this raises</h2>
          <FaqList items={faqs} openFirst />
        </section>

        <CtaBand
          title="Read on your own terms"
          primary={{ label: 'Download Curated Feeds', href: SITE.app.uptodown }}
          secondary={{ label: 'Read the FAQ', href: '/#faq' }}
        >
          Version {SITE.app.version}, about {APK_MB} MB, Android 8.0 and up. No account, no ads, no
          server.
        </CtaBand>
    </PageShell>
  );
}
