import { faqPageLd } from '../../lib/seo';
import { pageMetadata, pageUrl, SITE } from '../../lib/site';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';
import CtaBand from '../../components/CtaBand';

const PATH = '/sources/ai/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'Best AI & Machine Learning RSS Feeds to Follow in 2027';
const DESCRIPTION =
  'Verified, high-signal AI and machine learning RSS feeds for 2027: research labs, engineering blogs, and frontier AI insights with copy-paste URLs for your reader.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Starter Feeds', url: '/sources/' },
  { name: 'AI & Machine Learning', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'best AI RSS feeds 2027',
    'machine learning RSS feeds',
    'artificial intelligence RSS feeds list',
    'OpenAI blog RSS feed',
    'deep learning blogs to follow',
    'frontier AI research feeds',
    'Hugging Face RSS feed',
    'AI engineering blogs 2027',
  ],
  type: 'article',
});

type Feed = {
  name: string;
  url: string;
  cadence: string;
  blurb: string;
};

const aiFeeds: Feed[] = [
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/news/rss.xml',
    cadence: 'Weekly',
    blurb: 'Frontier model releases, research breakthroughs, safety evaluations, and technical updates directly from OpenAI.',
  },
  {
    name: 'Google DeepMind Research',
    url: 'https://deepmind.google/blog/rss.xml',
    cadence: 'Weekly',
    blurb: 'DeepMind research papers, Gemini updates, science breakthroughs, and robotics advancements.',
  },
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    cadence: 'Daily',
    blurb: 'Open-source models, quantization techniques, fine-tuning guides, and community benchmarks.',
  },
  {
    name: 'MIT Technology Review: AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    cadence: 'Daily',
    blurb: 'In-depth reporting on machine learning frontiers, policy debates, and industry impacts.',
  },
  {
    name: 'Simon Willison’s Weblog',
    url: 'https://simonwillison.net/atom/everything/',
    cadence: 'Daily',
    blurb: 'Hands-on exploration of local LLMs, prompt engineering, security vulnerabilities, and tool-augmented AI.',
  },
  {
    name: 'Ahead of AI by Sebastian Raschka',
    url: 'https://magazine.sebastianraschka.com/feed',
    cadence: 'Bi-weekly',
    blurb: 'Accessible, rigorous breakdowns of state-of-the-art architectures and transformer pre-training.',
  },
  {
    name: 'Berkeley AI Research (BAIR) Blog',
    url: 'https://bair.berkeley.edu/blog/feed.xml',
    cadence: 'Bi-weekly',
    blurb: 'Academic depth from Berkeley doctoral researchers covering reinforcement learning, computer vision, and NLP.',
  },
  {
    name: 'The Gradient',
    url: 'https://thegradient.pub/rss/',
    cadence: 'Monthly',
    blurb: 'Thoughtful essays and perspectives bridging technical ML research and cultural philosophy.',
  },
];

const faqs = [
  {
    q: 'Why follow AI research through RSS instead of Twitter/X or LinkedIn?',
    a: 'Social media algorithms prioritize hot takes, drama, and sensational hype. AI research moves fast, but the signal comes from primary source papers, benchmark announcements, and thoughtful engineering logs. RSS delivers these updates in strict chronological order with zero algorithmic hysteria.',
  },
  {
    q: 'How do I add these AI feeds to Curated Feeds?',
    a: 'Copy any of the URLs above, open Curated Feeds on Android, tap add-feed, and paste the URL. You can assign them to a dedicated "AI" category to keep your queue organized.',
  },
  {
    q: 'Can I read AI papers and blog posts offline?',
    a: 'Yes. In Curated Feeds, stories cache locally on first read, meaning you can read long-form technical breakdowns on flights, trains, or low-connectivity environments.',
  },
];

export default function AiFeedsPage() {
  return (
    <PageShell crumbs={CRUMBS} mainClass="sources-page" data={faqPageLd(faqs, PAGE_URL)}>
      <section className="page-hero">
        <h1>Best AI & Machine Learning RSS Feeds for 2027</h1>
        <p className="page-lede">
          Cut through AI hype. These verified RSS feeds deliver direct research updates, frontier model
          benchmarks, and practical engineering breakthroughs straight from the creators—without
          algorithmic distortion or sponsored engagement traps.
        </p>
      </section>

      <section className="page-section" aria-labelledby="ai-list-title">
        <h2 id="ai-list-title">Frontier Labs & Research Engineering Feeds</h2>
        <p>Tested and resolving in November 2026. Every feed below is copy-paste ready for your RSS reader.</p>
        {aiFeeds.map((feed) => (
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

      <section className="page-section page-faq" aria-labelledby="ai-faq-title">
        <h2 id="ai-faq-title">Frequently asked questions</h2>
        <FaqList items={faqs} openFirst />
      </section>

      <CtaBand
        title="Triage AI updates without information overload"
        primary={{ label: 'Download Curated Feeds', href: SITE.app.uptodown }}
        secondary={{ label: 'All Starter Feeds', href: '/sources/' }}
      >
        Swipe right to save insightful technical papers; swipe left to clear the rest. Version {SITE.app.version},
        free forever with no account on Android.
      </CtaBand>
    </PageShell>
  );
}
