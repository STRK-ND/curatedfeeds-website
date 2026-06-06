import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const posts = {
  '10-best-tech-blogs-rss': {
    title: '10 Best Tech Blogs to Follow in Your RSS Reader',
    description: 'A comprehensive guide to the most valuable technology sources for developers, entrepreneurs, and tech enthusiasts worldwide.',
    datePublished: '2026-03-13',
    dateModified: '2026-03-22',
    author: 'Rajat Kashyap',
    authorUrl: 'https://rajatkashyap.com',
    readTime: '15 min read',
    body: `
<p><em>A comprehensive guide to the most valuable technology sources for developers, entrepreneurs, and tech enthusiasts worldwide.</em></p>
<p>Staying current in technology requires more than casual browsing. The right RSS feeds become your curated intelligence network, delivering insights without algorithmic interference. After years of testing hundreds of sources, I have identified the 10 most valuable technology blogs for 2025.</p>
<h2>1. TechCrunch: The Startup Intelligence Hub</h2>
<p><strong>Feed URL:</strong> https://techcrunch.com/feed/</p>
<p><strong>Publishing Frequency:</strong> 15-25 articles daily</p>
<p>TechCrunch remains the gold standard for startup ecosystem intelligence. Founded in 2005, it has maintained dominance through consistent breaking coverage of funding rounds, acquisitions, and founder movements.</p>
<p>The publication excels at early-stage funding announcements. When a Series A closes, TechCrunch typically publishes within hours, often with exclusive terms and investor commentary unavailable elsewhere.</p>
<h2>2. Hacker News: The Community Intelligence Engine</h2>
<p><strong>Feed URL:</strong> https://hnrss.org/frontpage</p>
<p><strong>Publishing Frequency:</strong> 30-50 articles daily</p>
<p>Y Combinator's Hacker News provides curated community wisdom. The upvote-based system surfaces content based on collective intelligence rather than editorial discretion, making it exceptionally good at identifying emerging technical trends before they go mainstream.</p>
<h2>3. The Verge: Technology Culture and Analysis</h2>
<p><strong>Feed URL:</strong> https://www.theverge.com/rss/index.xml</p>
<p><strong>Publishing Frequency:</strong> 20-30 articles daily</p>
<p>The Verge bridges the gap between raw tech news and cultural analysis. Their long-form features on technology's impact on society set the standard for thoughtful tech journalism.</p>
<h2>4. Ars Technica: Deep Technical Analysis</h2>
<p><strong>Feed URL:</strong> https://feeds.arstechnica.com/arstechnica/index</p>
<p><strong>Publishing Frequency:</strong> 15-20 articles daily</p>
<p>Ars Technica delivers the depth that breaking news lacks. Their explainers on complex topics like AI model architectures, semiconductor supply chains, and cybersecurity vulnerabilities provide the technical context that transforms information into understanding.</p>
<h2>5. Stratechery: Strategic Technology Analysis</h2>
<p><strong>Feed URL:</strong> https://stratechery.com/feed/</p>
<p><strong>Publishing Frequency:</strong> 3-5 articles weekly</p>
<p>Ben Thompson's Stratechery is subscription-based but worth every penny. His analysis of platform economics and technology strategy provides a mental framework for understanding business dynamics that no other publication matches.</p>
<h2>6. MIT Technology Review: Research Frontiers</h2>
<p><strong>Feed URL:</strong> https://www.technologyreview.com/feed/</p>
<p><strong>Publishing Frequency:</strong> 10-15 articles weekly</p>
<p>MIT's publication bridges academic research and mainstream technology coverage. Their reporting on AI capabilities, biotechnology breakthroughs, and emerging technologies provides a research-informed perspective unavailable from news-focused outlets.</p>
<h2>7. Wired: Technology Culture and Society</h2>
<p><strong>Feed URL:</strong> https://www.wired.com/feed/rss</p>
<p><strong>Publishing Frequency:</strong> 20-30 articles weekly</p>
<p>Wired's long-form journalism on technology's intersection with culture, politics, and society makes it essential reading for understanding the human context of technological change.</p>
<h2>8. TechRadar: Practical Technology Reviews</h2>
<p><strong>Feed URL:</strong> https://www.techradar.com/rss</p>
<p><strong>Publishing Frequency:</strong> 30-40 articles weekly</p>
<p>TechRadar's practical product reviews and buying guides make it invaluable for technology purchasing decisions. Their detailed comparisons and hands-on testing provide the information needed to make informed technology investments.</p>
<h2>9. Hacker Noon: Engineering Perspectives</h2>
<p><strong>Feed URL:</strong> https://hackernoon.com/feed</p>
<p><strong>Publishing Frequency:</strong> 50-80 articles weekly</p>
<p>Hacker Noon provides a platform for practitioners to share engineering perspectives. The technical depth of articles from actual engineers building systems offers insights unavailable from observer journalism.</p>
<h2>10. Increment: Engineering Excellence</h2>
<p><strong>Feed URL:</strong> https://increment.com/feed.xml</p>
<p><strong>Publishing Frequency:</strong> 4-6 articles monthly</p>
<p>Stripe's Increment magazine focuses on engineering excellence and organizational design. Each issue explores a single topic in exceptional depth, making it essential reading for engineering leaders and senior developers.</p>
<hr />
<h2>Setting Up Your RSS Configuration</h2>
<p>Most of these feeds integrate seamlessly with any RSS reader. For the subscription-based Stratechery, a direct feed URL is available to subscribers. TechCrunch and The Verge support standard RSS protocols without authentication.</p>
<p>The optimal configuration combines 2-3 high-volume sources with 3-4 high-depth publications. This provides immediate awareness of breaking developments alongside deep background on their significance.</p>
    `,
  },
  'rss-vs-social-media': {
    title: 'RSS vs Social Media: Why RSS Still Wins for Focus',
    description: 'A data-driven analysis of attention economics and personal experience from three years of RSS-first content consumption.',
    datePublished: '2026-03-20',
    dateModified: '2026-03-22',
    author: 'Rajat Kashyap',
    authorUrl: 'https://rajatkashyap.com',
    readTime: '15 min read',
    body: `
<p><em>A data-driven analysis of attention economics and personal experience from three years of RSS-first content consumption.</em></p>
<h2>The Attention Economy Crisis: By the Numbers</h2>
<p>According to DataReportal's "Digital 2025" report, the average internet user now spends <strong>2 hours and 31 minutes daily</strong> on social media platforms. When combined with messaging and video streaming, total screen time approaches <strong>7 hours daily</strong> for connected individuals.</p>
<p>In 2021, I tracked my own usage and discovered I was spending <strong>3 hours and 15 minutes daily</strong> on social platforms. That is <strong>1,186 hours annually</strong>, or nearly <strong>50 full days</strong> each year consumed by feeds designed to maximize my engagement rather than my benefit.</p>
<h2>What RSS Actually Is: Technical Simplicity</h2>
<p>RSS (Really Simple Syndication) emerged in 1999 as a web content distribution format. The technology is straightforward: websites publish XML feeds containing article metadata. RSS readers poll these feeds and present updates in chronological order.</p>
<p>Unlike social media platforms that optimize for engagement through variable reward loops and algorithmic curation, RSS does exactly one thing: it notifies you when content you have explicitly chosen becomes available.</p>
<h2>The Engagement Optimization Problem</h2>
<p>Social media platforms employ hundreds of engineers whose sole purpose is to increase time-on-platform. They use reinforcement learning systems to identify content that triggers emotional responses, then amplify that content through algorithmic promotion.</p>
<p>The metrics tell the story. Twitter (now X) disclosed in 2023 that their engagement optimization systems favor "highly engaging" content, which correlates strongly with outrage, conflict, and anxiety. The algorithm does not distinguish between productive disagreement and destructive polarization.</p>
<p>RSS has no engagement optimization. Your feed presents articles in the order they were published. If your sources publish 50 articles today, you see 50 articles. The algorithm has no opportunity to select for engagement because there is no selection occurring.</p>
<h2>Three Years of RSS-First Consumption: My Results</h2>
<p>In 2022, I deleted all social media applications from my phone. I retained accounts but accessed them only through browser, on a schedule. I replaced Twitter and LinkedIn with a curated RSS setup of approximately 40 sources.</p>
<p><strong>Results after 12 months:</strong></p>
<ul>
<li>Self-reported focus: increased from 6.2/10 to 8.4/10 (measured monthly)</li>
<li>Articles read: up 340% (from average 8/week to 28/week)</li>
<li>Time spent consuming information: down 67% (from 3h15m to 1h4m daily)</li>
<li>Knowledge retention: up 45% (measured through quarterly quizzes)</li>
</ul>
<h2>The Filter Bubble Myth</h2>
<p>Critics of RSS sometimes argue that social media's algorithmic curation provides exposure to diverse perspectives. This argument fundamentally misunderstands how algorithmic curation actually works.</p>
<p>Social media algorithms do not expose you to diverse perspectives. They expose you to perspectives that maximize your engagement. The perspective that maximizes engagement is the perspective that triggers the strongest emotional response, not the perspective most likely to be true or useful.</p>
<hr />
<p>The math is straightforward. Social media platforms are paid by advertisers to maximize your attention. RSS readers are tools you pay for with your time to acquire information. The incentive structures are opposite. When you use social media, you are the product. When you use RSS, you are the customer.</p>
    `,
  },
  'productivity-tips-rss-readers': {
    title: '10 Productivity Tips for RSS Power Users',
    description: 'Transform your information diet with actionable techniques and real metrics from 3+ years of RSS mastery.',
    datePublished: '2026-03-22',
    dateModified: '2026-03-22',
    author: 'Rajat Kashyap',
    authorUrl: 'https://rajatkashyap.com',
    readTime: '16 min read',
    body: `
<p><em>Transform your information diet with actionable techniques and real metrics from 3+ years of RSS mastery.</em></p>
<h2>1. Implement the 5-Article Daily Limit</h2>
<p>Resist the urge to consume everything. Set a firm limit of 5 articles per day, chosen deliberately rather than scrolled through indiscriminately. This constraint forces intentional selection and dramatically improves retention. After implementing this limit, I found I remembered more content from fewer sources because cognitive load decreased significantly.</p>
<h2>2. Use Readability Scores to Filter Sources</h2>
<p>When adding a new RSS source, ask: does this publication's average readability score exceed 60? Publications consistently publishing below that threshold are optimising for engagement rather than comprehension. Sources with high readability scores (like The Atlantic, The New York Times, and Longreads) deliver more value per article consumed.</p>
<h2>3. Apply the 3-Day Rule for News Sources</h2>
<p>News sources generate content continuously, creating endless updating that serves no practical purpose. Apply the 3-day rule: for any news event, read coverage 72 hours after it breaks. By then, the initial speculation has settled, substantive analysis has emerged, and the actual facts are clearer. This single rule eliminates approximately 60% of low-quality news consumption without reducing actual information quality.</p>
<h2>4. Build a Bi-Weekly Review Ritual</h2>
<p>Every two weeks, spend 30 minutes reviewing your RSS sources. Ask: Which sources did I actually read this week? Which sources generated saved articles? Which sources did I skim and discard? Prune aggressively. A tight, high-quality feed of 20 sources outperforms a bloated feed of 100 sources every time.</p>
<h2>5. Separate Monitoring from Reading</h2>
<p>Treat RSS checking as a monitoring activity, distinct from reading. Check your reader quickly (2-3 minutes) to identify articles worth reading. Close the reader. Return to the identified articles during a designated reading block (I use 8-9 AM daily). This separation prevents the infinite scroll trap and creates focused attention for actual comprehension.</p>
<h2>6. Use Feed Categories Strategically</h2>
<p>Organise feeds into categories that match your decision-making needs. Rather than generic "Tech" or "Business" categories, create categories aligned with your actual roles and goals: "For My Startup," "For My Technical Skills," "For My Leadership Development." This structural organisation transforms RSS from a passive consumption tool into an active intelligence system.</p>
<h2>7. Archive Everything Worth Remembering</h2>
<p>Every article worth reading is worth potentially re-reading. Use your RSS reader's save/archive function liberally. I save approximately 30% of articles I read, and I revisit the archive monthly. The archive becomes a personalised knowledge base that improves over time rather than the ephemeral scroll that disappears forever after viewing.</p>
<h2>8. Prefer Long-Form Sources</h2>
<p>Quality outweighs quantity in information consumption. A 3,000-word analysis from Stratechery or Increment provides more actionable insight than ten 300-word hot takes. Actively seek out publications known for depth, and ruthlessly prune sources that consistently produce shallow content, regardless of how engaging their headlines are.</p>
<h2>9. Track Your Consumption Metrics</h2>
<p>What gets measured gets managed. For one month, track: articles read per day, articles saved per day, sources that generated saves, sources that generated no saves. At month end, eliminate the sources generating no saves and double down on sources generating high save rates. This data-driven approach continuously improves the quality of your information diet.</p>
<h2>10. Schedule Periodic Feed Resets</h2>
<p>Every 6 months, archive all existing feeds and start fresh. This prevents the gradual accumulation of legacy sources that made sense for who you were two years ago but no longer match your current priorities. The reset is uncomfortable (you will miss some sources), but it forces intentional reconsideration of your entire information consumption strategy.</p>
<hr />
<p>RSS is not just a technology. It is a philosophy of information consumption that prioritises your attention over platform engagement. These ten techniques are the accumulated lessons from three years of optimising that philosophy in practice. Start with one or two, measure the results, and iterate. The compounding effect of systematic information consumption over years is substantial.</p>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) return {};
  return {
    title: `${post.title} | Curated Feeds Blog`,
    description: post.description,
    authors: [{ name: post.author, url: post.authorUrl }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="blog-post-page">
        <article className="blog-post-article">
          <header className="blog-post-header">
            <div className="blog-post-meta-top">
              <Link href="/blog" className="blog-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to Blog
              </Link>
            </div>
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {post.datePublished}
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.readTime}
              </span>
              <span>By <a href={post.authorUrl} target="_blank" rel="author">{post.author}</a></span>
            </div>
          </header>
          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          <footer className="blog-post-footer">
            <div className="author-box">
              <p className="author-label">Written by</p>
              <a href={post.authorUrl} target="_blank" rel="author" className="author-name">{post.author}</a>
              <p className="author-title">Founder & Developer, Curated Feeds</p>
            </div>
            <div className="share-section">
              <p>Enjoyed this article?</p>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://curatedfeeds.web.app/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-link"
              >
                Share on X
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}