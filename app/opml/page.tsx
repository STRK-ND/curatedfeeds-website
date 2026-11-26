import PageShell from '../components/PageShell';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';
import { faqPageLd } from '../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../lib/site';

const PATH = '/opml/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Free RSS Feed Bundles & OPML Downloads (2027)';
const DESCRIPTION =
  'Download curated OPML feed bundles for tech, cybersecurity, AI, developer blogs, and global news in 2027. Import in 1 click into Curated Feeds or any RSS reader.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'OPML Bundles', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'RSS feed OPML download 2027',
    'best tech feeds OPML',
    'cybersecurity RSS OPML bundle',
    'AI RSS feeds OPML',
    'developer blogs OPML file',
    'curated RSS subscriptions download',
    'import OPML feeds',
  ],
  type: 'website',
});

const BUNDLES = [
  {
    title: 'Top 50 Global Publications',
    file: '/opml/all-50-publications.opml',
    count: '50 Feeds',
    category: 'Global News & Tech',
    summary:
      'The definitive collection of the world’s leading publications: The Verge, Reuters, BBC, NYT, Wired, Nature, and Ars Technica.',
  },
  {
    title: 'Tech & Startups Bundle',
    file: '/opml/tech-startups.opml',
    count: '15 Feeds',
    category: 'Technology & Startups',
    summary:
      'High-signal tech reporting, venture capital movements, startup launches, and deep technical essays.',
  },
  {
    title: 'AI & Machine Learning Bundle',
    file: '/opml/ai-machine-learning.opml',
    count: '6 Feeds',
    category: 'Artificial Intelligence',
    summary:
      'Frontier lab research, ArXiv pre-prints, Hugging Face models, and engineering logs from OpenAI, DeepMind, and Latent Space.',
  },
  {
    title: 'Cybersecurity & InfoSec Bundle',
    file: '/opml/cybersecurity-2027.opml',
    count: '5 Feeds',
    category: 'Cybersecurity',
    summary:
      'Zero-day disclosures, malware analyses, and threat intelligence feeds from Krebs on Security, Dark Reading, and BleepingComputer.',
  },
  {
    title: 'Developer & Architecture Bundle',
    file: '/opml/developer-engineering.opml',
    count: '5 Feeds',
    category: 'Software Engineering',
    summary:
      'Distributed systems architecture, language internals, and essays from Martin Fowler, Dan Luu, Julia Evans, and GitHub.',
  },
  {
    title: 'Crypto & Web3 Protocol Bundle',
    file: '/opml/crypto-web3.opml',
    count: '5 Feeds',
    category: 'Crypto & Blockchain',
    summary:
      'Protocol governance, DeFi developments, blockchain analytics, and commentary from CoinDesk, Cointelegraph, and Vitalik Buterin.',
  },
  {
    title: 'Science & Aerospace Research Bundle',
    file: '/opml/science-research.opml',
    count: '5 Feeds',
    category: 'Science & Space',
    summary:
      'Peer-reviewed discoveries, astrophysics, and space exploration from Nature, Scientific American, Science Magazine, and NASA.',
  },
  {
    title: 'Master Starter Feeds Collection',
    file: '/opml/all-starter-feeds.opml',
    count: '60+ Feeds',
    category: 'All Categories Combined',
    summary:
      'Comprehensive starter bundle spanning Linux, UX design, indie hacking, climate tech, finance, and productivity.',
  },
];

const faqs = [
  {
    q: 'What is an OPML file?',
    a: 'OPML (Outline Processor Markup Language) is the universal open XML standard for exporting and importing RSS feed collections. Because OPML is supported by virtually every RSS reader, you can switch apps at any time with zero vendor lock-in.',
  },
  {
    q: 'How do I import an OPML file into Curated Feeds on Android?',
    a: 'Download any .opml file from this page to your Android phone. In Curated Feeds, open the feed manager, tap Import OPML, and select the downloaded file. All feeds populate into swipeable cards immediately.',
  },
  {
    q: 'Do these OPML files work with Feedly, Inoreader, or NetNewsWire?',
    a: 'Yes. Every OPML bundle on this page conforms to the official OPML 2.0 specification. You can import them into Feedly, Inoreader, NetNewsWire, FeedFlow, Feeder, or NewsBlur without conversion.',
  },
  {
    q: 'Are the feeds in these bundles free to read?',
    a: 'Yes. All included feeds publish open, standard XML endpoints that require zero accounts or subscriptions to access.',
  },
];

export default function OpmlDirectoryPage() {
  return (
    <PageShell
      crumbs={CRUMBS}
      mainClass="sources-page"
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${PAGE_URL}#collection`,
          name: TITLE,
          url: PAGE_URL,
          description: DESCRIPTION,
        },
        faqPageLd(faqs, PAGE_URL),
      ]}
    >
      <section className="page-hero">
        <h1>Curated RSS Feed Bundles (OPML) for 2027</h1>
        <p className="page-lede">
          Jumpstart your daily reading in seconds. Download pre-packaged, verified OPML collections
          across tech, AI, global news, cybersecurity, and engineering. Ready to import into any RSS reader.
        </p>
      </section>

      <section className="page-section" aria-labelledby="opml-intro-title">
        <h2 id="opml-intro-title">What is OPML & How to Use It</h2>
        <div className="panel-grid">
          <article className="panel">
            <h3>Zero Vendor Lock-In</h3>
            <p>
              OPML files are open XML documents containing your list of RSS subscriptions. You own your
              feed list completely — no proprietary database or cloud account required.
            </p>
          </article>
          <article className="panel">
            <h3>1-Click Mass Import</h3>
            <p>
              Instead of copying 50 feed addresses one by one, an OPML bundle lets your reader ingest
              dozens of high-signal feeds in a single tap.
            </p>
          </article>
          <article className="panel">
            <h3>100% Offline-Friendly</h3>
            <p>
              Curated Feeds parses your imported OPML locally on Android, fetching articles directly
              to your phone with zero intermediate proxies or tracking servers.
            </p>
          </article>
        </div>
      </section>

      <section className="page-section" aria-labelledby="bundles-title">
        <h2 id="bundles-title">Download Curated OPML Collections</h2>
        <p>
          Click any bundle below to download the standard <code>.opml</code> file directly to your device.
        </p>
        <div className="panel-grid">
          {BUNDLES.map((b) => (
            <article key={b.file} className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="source-badge" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                  {b.count} · {b.category}
                </span>
                <h3 style={{ marginTop: '0.2rem' }}>{b.title}</h3>
                <p>{b.summary}</p>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <a
                  href={b.file}
                  download
                  className="cta-button primary"
                  style={{ display: 'inline-flex', padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
                >
                  Download .OPML File
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section page-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <FaqList items={faqs} openFirst />
      </section>

      <CtaBand
        title="Read OPML bundles with zero distractions"
        primary={{ label: 'Download Curated Feeds APK', href: SITE.app.uptodown }}
        secondary={{ label: 'Browse 50 Publications', href: '/directory/' }}
      >
        Version {SITE.app.version}, about {APK_MB} MB. Import any OPML file directly into Curated Feeds
        on Android. Swipe-based reading, full offline caching, no accounts, and zero ads.
      </CtaBand>
    </PageShell>
  );
}
