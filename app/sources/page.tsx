import Link from 'next/link';
import { faqPageLd } from '../lib/seo';
import { pageMetadata, pageUrl, SITE } from '../lib/site';
import { CATEGORIES } from '../lib/data/categories';
import PageShell from '../components/PageShell';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Starter Feeds', url: '/sources/' },
];

export const metadata = pageMetadata({
  path: '/sources/',
  title: 'Starter Feeds for Your First Week',
  description:
    'The highest-signal RSS feeds to add on day one: technology, business, world, and science sources with copy-paste ready URLs for Curated Feeds on Android.',
  keywords: [
    'best RSS feeds',
    'starter RSS feeds',
    'RSS feed list 2026',
    'top technology RSS feeds',
    'business RSS feeds',
    'science RSS feeds',
    'verified RSS feed URLs',
    'RSS feed directory',
    'feeds to subscribe to',
  ],
  socialTitle: 'Starter Feeds for Your First Week | Curated Feeds',
  socialDescription:
    'A curated starter-feed directory: verified RSS URLs across technology, business, world, and science.',
});

type Feed = {
  name: string;
  url: string;
  cadence: string;
  blurb: string;
};

const techFeeds: Feed[] = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    cadence: 'Daily',
    blurb:
      'Startups, venture funding rounds, and product launches, reported as it happens and updated through the day.',
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    cadence: 'Daily',
    blurb:
      'Consumer technology, gadgets, and the policy and culture stories that sit alongside them.',
  },
  {
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    cadence: 'Daily',
    blurb:
      'Longer technical reporting on software, security, space, and science, with the detail intact.',
  },
  {
    name: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    cadence: 'Daily',
    blurb:
      'Emerging technology and the research behind it, from a newsroom attached to an engineering institution.',
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com/feed/rss',
    cadence: 'Daily',
    blurb:
      'How technology reshapes culture, business, and politics, written for a general audience.',
  },
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com/rss',
    cadence: 'Realtime',
    blurb:
      'A running stream of links submitted and discussed by a technical community, ranked by reader interest.',
  },
  {
    name: 'Hacker Noon',
    url: 'https://hackernoon.com/feed',
    cadence: 'Daily',
    blurb:
      'First-person technical writing from practitioners on software, blockchain, and building products.',
  },
  {
    name: 'TechRadar',
    url: 'https://www.techradar.com/rss',
    cadence: 'Daily',
    blurb:
      'Buying advice, reviews, and comparisons across phones, computing, audio, and home tech.',
  },
];

const businessFeeds: Feed[] = [
  {
    name: 'Stratechery',
    url: 'https://stratechery.com/feed/',
    cadence: 'Weekly essays',
    blurb:
      'Analysis of technology strategy and business models, published as a weekly essay rather than a news ticker.',
  },
  {
    name: 'Stripe Increment',
    url: 'https://increment.com/feed.xml',
    cadence: 'Quarterly',
    blurb:
      'Issue-based reporting on software engineering practice, one theme per issue, written for working engineers.',
  },
];

const worldFeeds: Feed[] = [
  {
    name: 'The Guardian',
    url: 'https://www.theguardian.com/world/rss',
    cadence: 'Continuous',
    blurb:
      'World news coverage that updates through the day, with a broad international editorial desk.',
  },
];

const steps: { icon: 'paste' | 'read'; name: string; text: string }[] = [
  {
    icon: 'paste',
    name: 'Paste the feed URL',
    text: 'Open the add-source field in Curated Feeds and paste any URL from this page. Feeds ending in /feed or /rss point at the full article list rather than a homepage, and the app parses RSS 2.0, Atom, and RDF.',
  },
  {
    icon: 'read',
    name: 'Read and categorise',
    text: 'New articles arrive as cards. Swipe right to save the ones worth keeping, left to mark them done, and group each source into a category.',
  },
];

const faqs = [
  {
    q: 'Are these feeds free to subscribe to?',
    a: 'Yes. Every feed listed on this page is free to subscribe to. RSS is an open format, and Curated Feeds is free itself, with no ads and no account required.',
  },
  {
    q: 'Do I need an account on these sites to read their feeds?',
    a: 'No. A feed carries the published articles, so you can read them in any RSS reader without creating an account on the publisher site. The reader can also cache articles on your device for offline reading.',
  },
  {
    q: 'What if a feed URL stops working?',
    a: 'Publishers occasionally move a feed. When that happens, the app reports a fetch failure for that source, and a fresh URL is usually published somewhere on the site, often near a feed or subscribe link. Remove the old source and paste the new one.',
  },
  {
    q: 'Can I add a feed that is not on this list?',
    a: 'Yes. This page is a starting point, not a limit. Any standard RSS 2.0, Atom, or RDF feed URL works, which means blogs, newsletters, changelogs, and podcasts are all fair game.',
  },
];

const stepIcons = {
  paste: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h3" />
    </svg>
  ),
  read: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 016.5 3H12v18H6.5A2.5 2.5 0 014 18.5z" />
      <path d="M20 5.5A2.5 2.5 0 0017.5 3H12v18h5.5A2.5 2.5 0 0020 18.5z" />
    </svg>
  ),
};

function FeedSection({
  id,
  title,
  intro,
  feeds,
}: {
  id: string;
  title: string;
  intro: string;
  feeds: Feed[];
}) {
  return (
    <section className="page-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{intro}</p>
      {feeds.map((feed) => (
        <article key={feed.url} className="feed-row">
          <div>
            <h3>{feed.name}</h3>
            <p>{feed.blurb}</p>
            <a className="feed-url" href={feed.url} target="_blank" rel="noopener noreferrer">
              {feed.url}
            </a>
          </div>
          <div className="feed-side">{feed.cadence}</div>
        </article>
      ))}
    </section>
  );
}

export default function SourcesPage() {
  return (
    <PageShell crumbs={CRUMBS} mainClass="sources-page" data={faqPageLd(faqs, pageUrl('/sources/'))}>
        <section className="page-hero">
          <h1>Starter feeds for your first week</h1>
          <p className="page-lede">
            These are the sources the founder reads daily. Every URL below was fetched and parsed as
            RSS, Atom or RDF in November 2026, and each one is copy-paste ready for Curated Feeds, so
            your first week of reading starts with signal rather than noise.
          </p>
        </section>

        <FeedSection
          id="technology"
          title="Technology and engineering"
          intro="The general-interest technology desk, from fast-breaking startup news to deeper reporting on research and engineering practice. Start here if you want to know what shipped."
          feeds={techFeeds}
        />

        <FeedSection
          id="business"
          title="Business and strategy"
          intro="Two slower, denser sources. These publish less often, and each piece is an argument about how technology businesses actually work."
          feeds={businessFeeds}
        />

        <FeedSection
          id="world"
          title="World and science"
          intro="One wire-service-scale desk for the rest of the story. Everything else on this page is trade press; this is the context it sits inside of."
          feeds={worldFeeds}
        />

        <section className="page-section" aria-labelledby="hubs-title">
          <h2 id="hubs-title">Specialized Topic Feed Directories (2027)</h2>
          <p>
            Looking for high-signal RSS sources in specific fields? Explore our curated directories:
          </p>
          <div className="panel-grid">
            <article className="panel">
              <h3><Link href="/sources/ai/" className="text-link">AI & Machine Learning</Link></h3>
              <p>Frontier model labs, deep learning research, and local LLM logs.</p>
            </article>
            <article className="panel">
              <h3><Link href="/sources/developer/" className="text-link">Developer & Engineering</Link></h3>
              <p>Distributed systems architecture, language internals, and senior blogs.</p>
            </article>
            {CATEGORIES.map((cat) => (
              <article key={cat.slug} className="panel">
                <h3><Link href={`/sources/${cat.slug}/`} className="text-link">{cat.name}</Link></h3>
                <p>{cat.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="how-to-add-title">
          <h2 id="how-to-add-title">How to add these</h2>
          <p>
            Paste any URL on this page into the add-source field in Curated Feeds. URLs ending in
            /feed or /rss are the full article list rather than a homepage, and the app parses RSS
            2.0, Atom, and RDF, which covers every source here.
          </p>
          <div className="panel-grid">
            {steps.map((step) => (
              <article key={step.name} className="panel">
                <span className="panel-icon" aria-hidden="true">
                  {stepIcons[step.icon]}
                </span>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <p className="note">
            The app fetches these feeds on your device. No server account is involved, and nothing
            here is proxied through an intermediary that could log what you read. For a source that
            does not advertise its feed,{' '}
            <Link href="/blog/find-rss-feed-url-any-website/" className="text-link">
              this guide finds almost any feed URL
            </Link>
            , and the{' '}
            <Link href="/blog/best-rss-readers-android-2026/" className="text-link">
              reader comparison
            </Link>{' '}
            uses the same list as its test set.
          </p>
        </section>

        <section className="page-section page-faq" aria-labelledby="sources-faq-title">
          <h2 id="sources-faq-title">Starter feed questions</h2>
          <FaqList items={faqs} openFirst />
        </section>

        <CtaBand
          title="Add them all in an evening"
          primary={{ label: 'Download Curated Feeds', href: SITE.app.uptodown }}
          secondary={{ label: 'See screenshots', href: '/screenshots/' }}
        >
          Download Curated Feeds for Android, free, no ads, no account. Paste a feed URL and start
          swiping.
        </CtaBand>
    </PageShell>
  );
}
