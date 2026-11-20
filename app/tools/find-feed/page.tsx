import Link from 'next/link';
import FeedFinder from '../../components/FeedFinder';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';
import { faqPageLd } from '../../lib/seo';
import { pageMetadata, pageUrl, SITE } from '../../lib/site';

const PATH = '/tools/find-feed/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'RSS Feed Finder: Find Any Site\'s Feed URL Instantly';
const DESCRIPTION =
  'Free tool: enter any website address and find its RSS or Atom feed URL instantly. Checks the page markup and common feed paths, with copy-paste results. No signup.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: PATH },
  { name: 'RSS Feed Finder', url: PATH },
];

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const faqs = [
  {
    q: 'How does the RSS Feed Finder work?',
    a: 'It reads the page markup for declared feed links (the <link rel="alternate"> tags publishers use to advertise feeds) and, if none are declared, tests the common feed addresses most publishing platforms use: /feed/, /rss, /atom.xml, /index.xml and similar.',
  },
  {
    q: 'Why does a lookup sometimes fail?',
    a: 'The network lookups run through free public CORS proxies, which are sometimes rate-limited or temporarily down. The tool always shows the likely feed addresses for your domain even when the live check cannot complete. Paste any of them into your reader to test.',
  },
  {
    q: 'What can I do with the feed URL once I have it?',
    a: 'Paste it into any RSS reader. In Curated Feeds, tap add-feed, paste the URL, and the source joins your queue. Every RSS 2.0, Atom and RDF feed is accepted.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. No signup, no limits, no tracking. It runs in your browser.',
  },
];

export default function FindFeedPage() {
  return (
    <PageShell
      crumbs={CRUMBS}
      mainClass="tool-page"
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': `${PAGE_URL}#app`,
          name: 'RSS Feed Finder',
          url: PAGE_URL,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any (web browser)',
          description: DESCRIPTION,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          publisher: { '@id': `${SITE.url}/#organization` },
        },
        faqPageLd(faqs, PAGE_URL),
      ]}
    >
        <section className="page-hero">
          <h1>RSS Feed Finder</h1>
          <p className="page-lede">
            Paste a website address and get its feed URL in seconds. The finder reads the page for
            declared feed links, tests the common paths publishing platforms use, and hands you a
            copy-paste result. Free, no signup, runs in your browser.
          </p>
        </section>

        <section className="page-section" aria-label="The tool">
          <FeedFinder />
        </section>

        <section className="page-section" aria-labelledby="how-title">
          <h2 id="how-title">How it finds the feed</h2>
          <ol>
            <li>
              <strong>Declared links first.</strong> Well-built sites advertise their feeds in the
              page head with <code>&lt;link rel=&quot;alternate&quot;&gt;</code> tags. The finder reads
              those and returns exactly what the publisher intended.
            </li>
            <li>
              <strong>Common paths second.</strong> WordPress keeps its feed at <code>/feed/</code>,
              Ghost at <code>/rss/</code>, Jekyll and Hugo sites at <code>/index.xml</code> or{' '}
              <code>/atom.xml</code>, Substack at <code>/feed</code>. The finder probes the standard
              addresses and verifies the response is a real feed, not an error page.
            </li>
            <li>
              <strong>Honest limits.</strong> The live lookups pass through free public proxies,
              which are occasionally rate-limited. When they are, the tool still lists the likely
              candidates for your domain. One of them is usually right.
            </li>
          </ol>
          <p>
            New to feeds? The{' '}
            <Link href="/blog/find-rss-feed-url-any-website/" className="text-link">
              field guide to finding feed URLs
            </Link>{' '}
            explains the manual method, and{' '}
            <Link href="/sources/" className="text-link">
              the source list
            </Link>{' '}
            has 8 ready-made feeds if you just want to start reading.
          </p>
        </section>

        <section className="page-section" aria-labelledby="faq-title">
          <h2 id="faq-title">Questions</h2>
          <FaqList items={faqs} />
        </section>

        <section className="page-section" aria-labelledby="use-title">
          <h2 id="use-title">Use the feed you found</h2>
          <p>
            Curated Feeds takes any RSS 2.0, Atom or RDF URL, organizes sources into categories, and
            caches everything you read for offline. Free forever, no account, no ads.
          </p>
          <div className="blog-cta-actions">
            <Link href="/#download" className="cta-button primary">
              Download for Android
            </Link>
            <Link href="/use-cases/" className="cta-button secondary">
              See how people read with it
            </Link>
          </div>
        </section>
    </PageShell>
  );
}
