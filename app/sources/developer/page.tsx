import { faqPageLd } from '../../lib/seo';
import { pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';
import CtaBand from '../../components/CtaBand';

const PATH = '/sources/developer/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Best Developer & Software Engineering RSS Feeds for 2027';
const DESCRIPTION =
  'The highest-signal software engineering blogs, systems design publications, and developer RSS feeds for 2027 with copy-paste URLs for Curated Feeds on Android.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Starter Feeds', url: '/sources/' },
  { name: 'Developer & Engineering', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'best developer RSS feeds 2027',
    'software engineering RSS feeds',
    'programming blogs to follow 2027',
    'Hacker News RSS feed',
    'Martin Fowler RSS feed',
    'systems engineering blogs',
    'tech blogs for developers',
    'coding RSS feeds list',
  ],
  type: 'article',
});

type Feed = {
  name: string;
  url: string;
  cadence: string;
  blurb: string;
};

const devFeeds: Feed[] = [
  {
    name: 'Hacker News (Y Combinator)',
    url: 'https://news.ycombinator.com/rss',
    cadence: 'Realtime',
    blurb: 'Community-voted engineering links, breakthrough tools, open-source launches, and tech discussions.',
  },
  {
    name: 'Martin Fowler',
    url: 'https://martinfowler.com/feed.atom',
    cadence: 'Weekly',
    blurb: 'Timeless architectural wisdom, refactoring insights, microservices tradeoffs, and design patterns.',
  },
  {
    name: 'Dan Luu',
    url: 'https://danluu.com/atom.xml',
    cadence: 'Monthly',
    blurb: 'Rigorous empirical analyses of hardware performance, systems latency, and engineering cultures.',
  },
  {
    name: 'Julia Evans (jvns.ca)',
    url: 'https://jvns.ca/atom.xml',
    cadence: 'Weekly',
    blurb: 'Clear, delightful explainers demystifying Linux internals, DNS, networking protocols, and Git mechanics.',
  },
  {
    name: 'The Pragmatic Engineer by Gergely Orosz',
    url: 'https://newsletter.pragmaticengineer.com/feed',
    cadence: 'Weekly',
    blurb: 'Inside reporting on big tech hiring, engineering management, compensation, and startup engineering cultures.',
  },
  {
    name: 'GitHub Engineering Blog',
    url: 'https://github.blog/category/engineering/feed/',
    cadence: 'Bi-weekly',
    blurb: 'Scaling MySQL to millions of queries, high-availability architecture, and developer tooling infrastructure.',
  },
  {
    name: 'Stack Overflow Blog',
    url: 'https://stackoverflow.blog/feed/',
    cadence: 'Weekly',
    blurb: 'Developer survey trends, coding ergonomics, language evolutions, and engineering practices.',
  },
  {
    name: 'InfoQ Software Architecture',
    url: 'https://feed.infoq.com/',
    cadence: 'Daily',
    blurb: 'Practitioner-focused news on cloud architectures, DevOps pipelines, distributed databases, and Java/Go.',
  },
];

const faqs = [
  {
    q: 'How many engineering feeds should a developer follow?',
    a: 'A healthy technical diet balances 1 community feed (like Hacker News) with 5 to 7 deep-dive engineering blogs. Following 50+ feeds leads to triage fatigue; sticking to a core curated list keeps your mornings focused.',
  },
  {
    q: 'Can I track open source GitHub releases alongside these feeds?',
    a: 'Yes. Every public GitHub repository supports Atom feeds. Append /releases.atom to any GitHub repo URL to receive release notifications directly in Curated Feeds.',
  },
  {
    q: 'Does Curated Feeds support code syntax highlighting?',
    a: 'Curated Feeds formats technical articles with clean, monospace code blocks, high contrast typography, and dark mode optimized for OLED screens.',
  },
];

export default function DevFeedsPage() {
  return (
    <PageShell crumbs={CRUMBS} mainClass="sources-page" data={faqPageLd(faqs, PAGE_URL)}>
      <section className="page-hero">
        <h1>Best Developer & Engineering RSS Feeds for 2027</h1>
        <p className="page-lede">
          Level up your systems thinking without doomscrolling. These verified feeds deliver deep architecture
          breakdowns, language updates, and post-mortems directly from senior software practitioners.
        </p>
      </section>

      <section className="page-section" aria-labelledby="dev-list-title">
        <h2 id="dev-list-title">Core Engineering & Systems Feeds</h2>
        <p>Verified and active for 2027. Copy any URL below to subscribe instantly.</p>
        {devFeeds.map((feed) => (
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

      <section className="page-section page-faq" aria-labelledby="dev-faq-title">
        <h2 id="dev-faq-title">Frequently asked questions</h2>
        <FaqList items={faqs} openFirst />
      </section>

      <CtaBand
        title="Build your developer intelligence queue"
        primary={{ label: 'Download Curated Feeds', href: SITE.app.apk }}
        secondary={{ label: 'All Starter Feeds', href: '/sources/' }}
      >
        Triage engineering releases and architecture posts with one thumb. Free forever on Android with no account.
      </CtaBand>
    </PageShell>
  );
}
