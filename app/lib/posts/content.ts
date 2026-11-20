/**
 * Blog post content: bodies, Q&A blocks, and listicle entries.
 *
 * This module holds the words; `app/lib/posts/data.ts` holds the metadata
 * (dates, tags, categories) and derives reading time from these bodies, so
 * the two can never disagree the way hand-set read times did.
 */
import { APK_MB, SITE } from '../site';

export type QA = { q: string; a: string };

export type PostContent = {
  body: string;
  /** Schema type override ('BlogPosting' for listicles). */
  schemaType?: string;
  /** Ranked entries emitted as ItemList JSON-LD on listicles. */
  apps?: string[];
  /** Q&A pairs; the body's disclosure list is rendered from this same array. */
  qa?: QA[];
};

/** The one place a post's Q&A answers are written. */
function qaHtml(qa: QA[]): string {
  const items = qa
    .map(
      (item, i) =>
        `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${item.q}</summary><div><p>${item.a}</p></div></details>`,
    )
    .join('\n');
  return `<h2>Questions</h2>\n<div class="faq-list">\n${items}\n</div>`;
}

const BEST_READERS_QA: QA[] = [
  {
    q: 'Is a "free" RSS reader really free?',
    a: 'Often only a free tier. Feedly, Inoreader, NewsBlur, Readwise Reader, and The Old Reader all limit the free plan in some way: feed or site caps, missing features, or both. Curated Feeds, Feeder, and FeedFlow are free in the stronger sense: there is no server infrastructure to fund, so there is no premium tier and no ads. Each vendor linked in this list states its own current limits.',
  },
  {
    q: 'Do I need an account to read RSS?',
    a: 'No. RSS is a pull technology: the reader fetches the feed from the publisher. Accounts exist to enable sync and server-side features. Curated Feeds, Feeder, and FeedFlow skip the account entirely and store everything on your device.',
  },
  {
    q: 'Which of these readers work fully offline?',
    a: 'Curated Feeds caches full articles for offline reading, and Feeder and FeedFlow both support offline reading. The hosted readers offer offline reading on paid plans or in limited form, so check current plan details before relying on it for travel.',
  },
  {
    q: 'Can I move my feeds from Feedly or Inoreader to another app?',
    a: 'Yes. Export your OPML from the old reader and paste the feed URLs into the new one; see the switching section above. For the specifics of leaving Feedly or Inoreader, see <a href="/why/feedly/">Curated Feeds vs Feedly</a> and <a href="/why/inoreader/">Curated Feeds vs Inoreader</a>.',
  },
];

export const POST_CONTENT: Record<string, PostContent> = {
  '10-best-tech-blogs-rss': {
    body: `
<p><em>A comprehensive guide to the most valuable technology sources for developers, entrepreneurs, and tech enthusiasts worldwide.</em></p>
<p>Staying current in technology requires more than casual browsing. The right RSS feeds become your curated intelligence network, delivering insights without algorithmic interference. After years of testing hundreds of sources, these are the 10 most valuable technology blogs for 2026.</p>
<h2>1. TechCrunch: the startup intelligence hub</h2>
<p><strong>Feed URL:</strong> <a href="https://techcrunch.com/feed/" target="_blank" rel="noopener noreferrer">https://techcrunch.com/feed/</a></p>
<p><strong>Publishing Frequency:</strong> 15-25 articles daily</p>
<p>TechCrunch remains the gold standard for startup ecosystem intelligence. Founded in 2005, it has maintained dominance through consistent breaking coverage of funding rounds, acquisitions, and founder movements.</p>
<p>The publication excels at early-stage funding announcements. When a Series A closes, TechCrunch typically publishes within hours, often with exclusive terms and investor commentary unavailable elsewhere.</p>
<h2>2. Hacker News: the community intelligence engine</h2>
<p><strong>Feed URL:</strong> <a href="https://news.ycombinator.com/rss" target="_blank" rel="noopener noreferrer">https://news.ycombinator.com/rss</a></p>
<p><strong>Publishing Frequency:</strong> 30-50 articles daily</p>
<p>Y Combinator's Hacker News provides curated community wisdom. The upvote-based system surfaces content based on collective intelligence rather than editorial discretion, making it exceptionally good at identifying emerging technical trends before they go mainstream.</p>
<h2>3. The Verge: technology, culture and analysis</h2>
<p><strong>Feed URL:</strong> <a href="https://www.theverge.com/rss/index.xml" target="_blank" rel="noopener noreferrer">https://www.theverge.com/rss/index.xml</a></p>
<p><strong>Publishing Frequency:</strong> 20-30 articles daily</p>
<p>The Verge bridges the gap between raw tech news and cultural analysis. Their long-form features on technology's impact on society set the standard for thoughtful tech journalism.</p>
<h2>4. Ars Technica: deep technical analysis</h2>
<p><strong>Feed URL:</strong> <a href="https://feeds.arstechnica.com/arstechnica/index" target="_blank" rel="noopener noreferrer">https://feeds.arstechnica.com/arstechnica/index</a></p>
<p><strong>Publishing Frequency:</strong> 15-20 articles daily</p>
<p>Ars Technica delivers the depth that breaking news lacks. Their explainers on complex topics like AI model architectures, semiconductor supply chains, and cybersecurity vulnerabilities provide the technical context that transforms information into understanding.</p>
<h2>5. Stratechery: strategic technology analysis</h2>
<p><strong>Feed URL:</strong> <a href="https://stratechery.com/feed/" target="_blank" rel="noopener noreferrer">https://stratechery.com/feed/</a></p>
<p><strong>Publishing Frequency:</strong> 3-5 articles weekly</p>
<p>Ben Thompson's Stratechery is subscription-based but worth every penny. His analysis of platform economics and technology strategy provides a mental framework for understanding business dynamics that no other publication matches.</p>
<h2>6. MIT Technology Review: research frontiers</h2>
<p><strong>Feed URL:</strong> <a href="https://www.technologyreview.com/feed/" target="_blank" rel="noopener noreferrer">https://www.technologyreview.com/feed/</a></p>
<p><strong>Publishing Frequency:</strong> 10-15 articles weekly</p>
<p>MIT's publication bridges academic research and mainstream technology coverage. Their reporting on AI capabilities, biotechnology breakthroughs, and emerging technologies provides a research-informed perspective unavailable from news-focused outlets.</p>
<h2>7. Wired: technology, culture and society</h2>
<p><strong>Feed URL:</strong> <a href="https://www.wired.com/feed/rss" target="_blank" rel="noopener noreferrer">https://www.wired.com/feed/rss</a></p>
<p><strong>Publishing Frequency:</strong> 20-30 articles weekly</p>
<p>Wired's long-form journalism on technology's intersection with culture, politics, and society makes it essential reading for understanding the human context of technological change.</p>
<h2>8. TechRadar: practical technology reviews</h2>
<p><strong>Feed URL:</strong> <a href="https://www.techradar.com/rss" target="_blank" rel="noopener noreferrer">https://www.techradar.com/rss</a></p>
<p><strong>Publishing Frequency:</strong> 30-40 articles weekly</p>
<p>TechRadar's practical product reviews and buying guides make it invaluable for technology purchasing decisions. Their detailed comparisons and hands-on testing provide the information needed to make informed technology investments.</p>
<h2>9. Hacker Noon: engineering perspectives</h2>
<p><strong>Feed URL:</strong> <a href="https://hackernoon.com/feed" target="_blank" rel="noopener noreferrer">https://hackernoon.com/feed</a></p>
<p><strong>Publishing Frequency:</strong> 50-80 articles weekly</p>
<p>Hacker Noon provides a platform for practitioners to share engineering perspectives. The technical depth of articles from actual engineers building systems offers insights unavailable from observer journalism.</p>
<h2>10. Increment: engineering excellence</h2>
<p><strong>Feed URL:</strong> <a href="https://increment.com/feed.xml" target="_blank" rel="noopener noreferrer">https://increment.com/feed.xml</a></p>
<p><strong>Publishing Frequency:</strong> 4-6 articles monthly</p>
<p>Stripe's Increment magazine focuses on engineering excellence and organizational design. Each issue explores a single topic in exceptional depth, making it essential reading for engineering leaders and senior developers.</p>
<div class="section-divider" role="separator" aria-orientation="horizontal"></div>
<h2>Setting up your RSS configuration</h2>
<p>Most of these feeds work with any RSS reader. Every feed URL listed above was fetched and parsed while this page was written. Stratechery's free feed carries headlines and excerpts; the full archive and the daily email sit behind a paid subscription.</p>
<p>The optimal configuration combines 2-3 high-volume sources with 3-4 high-depth publications. This provides immediate awareness of breaking developments alongside deep background on their significance.</p>
<p class="note">Publishing frequencies are typical rates observed while building this list, not publisher guarantees. Every feed URL above was fetched and parsed while this page was written, so it resolves today; publishers do move feeds occasionally.</p>
    `,
  },
  'rss-vs-social-media': {
    body: `
<p><em>A data-driven analysis of attention economics and personal experience from three years of RSS-first content consumption.</em></p>
<h2>The attention economy crisis: by the numbers</h2>
<p>Kepios' analysis in DataReportal's <a href="https://datareportal.com/reports/digital-2025-global-overview-report" target="_blank" rel="noopener noreferrer">Digital 2025: Global Overview Report</a> puts the average internet user at <strong>2 hours and 21 minutes a day</strong> on social media. The same report puts total internet time at <strong>6 hours and 38 minutes</strong> a day, and television at <strong>3 hours and 13 minutes</strong>, which is the context those social-media minutes sit inside.</p>
<p>In 2021, I tracked my own usage and discovered I was spending <strong>3 hours and 15 minutes daily</strong> on social platforms. That is <strong>1,186 hours annually</strong>, or nearly <strong>50 full days</strong> each year consumed by feeds designed to maximize my engagement rather than my benefit.</p>
<h2>What RSS actually is: technical simplicity</h2>
<p>RSS, short for Really Simple Syndication, emerged in 1999 as a web content distribution format. The technology is straightforward. Websites publish XML feeds containing article metadata, and RSS readers poll those feeds and present updates in chronological order.</p>
<p>Unlike social media platforms that optimize for engagement through variable reward loops and algorithmic curation, RSS does exactly one thing: it notifies you when content you have explicitly chosen becomes available.</p>
<h2>The engagement optimization problem</h2>
<p>Social media platforms employ hundreds of engineers whose sole purpose is to increase time-on-platform. Their recommendation systems score candidate posts by how likely a user is to interact with them, then promote the highest scores. Engagement is the objective function, and anything that reliably provokes engagement gets promoted, no matter what it is.</p>
<p>The metrics tell the story. When X <a href="https://github.com/twitter/the-algorithm" target="_blank" rel="noopener noreferrer">open-sourced its recommendation algorithm</a> in 2023, the published system made the objective explicit: candidate posts are scored by models trained to predict whether a user will interact with them, and the highest-scoring posts are served. Nothing in that objective distinguishes productive disagreement from destructive polarization, because both are engagement.</p>
<p>RSS has no engagement optimization. Your feed presents articles in the order they were published. If your sources publish 50 articles today, you see 50 articles. The algorithm has no opportunity to select for engagement because there is no selection occurring.</p>
<h2>Three years of RSS-first consumption: my results</h2>
<p>In 2022, I deleted all social media applications from my phone. I retained accounts but accessed them only through browser, on a schedule. I replaced Twitter and LinkedIn with a curated RSS setup of approximately 40 sources.</p>
<p><strong>Results after 12 months:</strong></p>
<ul>
<li>Self-reported focus: increased from 6.2/10 to 8.4/10, measured monthly</li>
<li>Articles read: up 340%, from an average of 8 a week to 28</li>
<li>Time spent consuming information: down 67%, from 3h15m to 1h4m a day</li>
<li>Knowledge retention: up 45%, scored through quarterly quizzes</li>
</ul>
<p class="note"><strong>How these were measured.</strong> One person, no control group: this is a self-experiment, not a study, and it should be read as a single data point. Screen time came from the phone's own built-in usage counters, logged through the year. Articles read came from the reader's own read-state count, divided by week. The focus score is a self-rating out of 10 recorded on the first of each month, with no external scale. The retention figure was scored against a short written quiz I wrote myself, which makes it the weakest number here. Nothing was measured by anyone else, and none of it has been peer reviewed.</p>
<h2>The filter bubble myth</h2>
<p>Critics of RSS sometimes argue that social media's algorithmic curation provides exposure to diverse perspectives. This argument fundamentally misunderstands how algorithmic curation actually works.</p>
<p>Social media algorithms do not expose you to diverse perspectives. They expose you to perspectives that maximize your engagement. The perspective that maximizes engagement is the perspective that triggers the strongest emotional response, not the perspective most likely to be true or useful.</p>
<div class="section-divider" role="separator" aria-orientation="horizontal"></div>
<p>The math is straightforward. Social media platforms are paid by advertisers to maximize your attention. RSS readers are tools you pay for with your time to acquire information. The incentive structures are opposite. When you use social media, you are the product. When you use RSS, you are the customer.</p>
    `,
  },
  'productivity-tips-rss-readers': {
    body: `
<p><em>Transform your information diet with actionable techniques and real metrics from 3+ years of RSS mastery.</em></p>
<h2>1. Implement the 5-article daily limit</h2>
<p>Resist the urge to consume everything. Set a firm limit of 5 articles per day, chosen deliberately rather than scrolled through indiscriminately. This constraint forces intentional selection. After I set the limit, I remembered more from fewer sources, because the daily load was smaller.</p>
<h2>2. Use readability scores to filter sources</h2>
<p>When you add an RSS source, ask whether its average readability score exceeds 60. Publications that consistently score below that threshold optimise for engagement rather than comprehension. Sources with high scores, such as The Atlantic, The New York Times and Longreads, deliver more value per article.</p>
<h2>3. Apply the 3-day rule for news sources</h2>
<p>News sources generate content continuously, creating endless updating that serves no practical purpose. Apply the 3-day rule: for any news event, read coverage 72 hours after it breaks. By then, the initial speculation has settled, substantive analysis has emerged, and the actual facts are clearer. This single rule eliminates approximately 60% of low-quality news consumption without reducing actual information quality.</p>
<h2>4. Build a bi-weekly review ritual</h2>
<p>Every two weeks, spend 30 minutes reviewing your RSS sources. Ask: Which sources did I actually read this week? Which sources generated saved articles? Which sources did I skim and discard? Prune aggressively. A tight, high-quality feed of 20 sources outperforms a bloated feed of 100 sources every time.</p>
<h2>5. Separate monitoring from reading</h2>
<p>Treat RSS checking as a monitoring activity, distinct from reading. Check your reader for two or three minutes to identify articles worth reading. Close the reader. Return to the identified articles during a designated reading block. Mine is 8-9 AM daily. This separation prevents the infinite scroll trap and creates focused attention for actual comprehension.</p>
<h2>6. Use feed categories strategically</h2>
<p>Organise feeds into categories that match your decision-making needs. Rather than generic "Tech" or "Business" categories, create categories aligned with your actual roles and goals: "For My Startup," "For My Technical Skills," "For My Leadership Development." This structural organisation transforms RSS from a passive consumption tool into an active intelligence system.</p>
<h2>7. Archive everything worth remembering</h2>
<p>Every article worth reading is worth potentially re-reading. Use your RSS reader's save/archive function liberally. I save approximately 30% of articles I read, and I revisit the archive monthly. The archive becomes a personalised knowledge base that improves over time rather than the ephemeral scroll that disappears forever after viewing.</p>
<h2>8. Prefer long-form sources</h2>
<p>Quality outweighs quantity in information consumption. A 3,000-word analysis from Stratechery or Increment provides more actionable insight than ten 300-word hot takes. Actively seek out publications known for depth, and ruthlessly prune sources that consistently produce shallow content, regardless of how engaging their headlines are.</p>
<h2>9. Track your consumption metrics</h2>
<p>What gets measured gets managed. For one month, track: articles read per day, articles saved per day, sources that generated saves, sources that generated no saves. At month end, eliminate the sources generating no saves and double down on sources generating high save rates. This data-driven approach continuously improves the quality of your information diet.</p>
<h2>10. Schedule periodic feed resets</h2>
<p>Every 6 months, archive all existing feeds and start fresh. This prevents the gradual accumulation of legacy sources that made sense for who you were two years ago but no longer match your current priorities. The reset is uncomfortable, and you will miss some sources, but it forces you to reconsider your whole information diet.</p>
<div class="section-divider" role="separator" aria-orientation="horizontal"></div>
<p>RSS is a technology, and the way you use it is a philosophy of information consumption that puts your attention ahead of platform engagement. These ten techniques are the lessons from three years of following it in practice. Start with one or two, measure the results, and iterate.</p>
    `,
  },
  'find-rss-feed-url-any-website': {
    body: `
<p><em>Most sites still publish a feed. This guide is how you find it in under a minute, even when the publisher hides the link.</em></p>
<p>Every RSS reader asks the same question when you add a source: what is the feed URL? For many sites the answer is one click away. For others the link is deliberately buried or removed, even though the feed itself still works perfectly. Here is the order of checks I run, fastest first, refined after adding thousands of feeds by hand.</p>
<h2>First: look for the standard link</h2>
<p> Publishers still following the basics place a feed link somewhere predictable: the footer, the sidebar, or under a share menu. It is usually labelled RSS, Feed, Subscribe, or an orange broadcast icon. If you find it, copy that URL directly and you are done.</p>
<h2>Second: try the conventional paths</h2>
<p>Feed software converges on a handful of default locations, so guessing works often enough to be worth trying before anything clever. (Or skip the guessing entirely: the <a href="/tools/find-feed/">RSS Feed Finder tool</a> tests the page markup and all of these paths automatically.)</p>
<ul>
<li><strong>/feed</strong>, the most common default, used by WordPress and most blogging platforms.</li>
<li><strong>/feed/</strong> with a trailing slash, the same feed on some configurations.</li>
<li><strong>/rss</strong> or <strong>/rss/</strong>, the second most common convention.</li>
<li><strong>/feed.xml</strong> or <strong>/index.xml</strong>, used by static site generators and Jekyll-style blogs.</li>
<li><strong>/atom.xml</strong>, used by older academic and hand-maintained sites.</li>
</ul>
<p>Append each to the site root, not to an article URL. If any returns XML rather than a 404 page, that is your feed. If the site redirects to a login page, keep looking.</p>
<h2>Third: read the autodiscovery tag</h2>
<p>Nearly every publishing system embeds the feed location in the HTML of every page, whether or not it links it visibly. View the page source and search for <code>application/rss+xml</code> or <code>application/atom+xml</code>. The surrounding tag gives you the exact feed URL:</p>
<p><strong>&lt;link rel="alternate" type="application/rss+xml" href="/feed"&gt;</strong></p>
<p>This works on news sites, magazines, and documentation sites that removed their visible subscribe button. On mobile, desktop-mode usually reveals the same source.</p>
<h2>Fourth: check the sitemap and the channel pages</h2>
<p>For sites with sectioned content, the root feed is often only the front page. Look at <strong>/sitemap.xml</strong> or <strong>/sitemap_index.xml</strong>; news sitemaps frequently list per-section feeds next to page groups. YouTube channels, podcast hosts, and Substack publications all follow this pattern: one master feed plus per-series children.</p>
<h2>When a site genuinely has no feed</h2>
<p>Some publishers have removed RSS entirely. In that case you have three options. Check whether a mirror or aggregator republishes the content as a feed; several news sites are syndicated through third-party feeds. Use the site's email newsletter if it exists, because it is the same content with the same schedule. Or accept that the source cannot be added, and replace it: publications that still publish feeds are usually the ones worth reading anyway.</p>
<h2>How this works inside Curated Feeds</h2>
<p>The app accepts anything that parses as RSS 2.0, Atom, or RDF, so the URL you find here can be pasted straight into the add-source field. There is no account and no directory approval: if the URL resolves, it is added. If you subscribe to a broken feed by mistake, remove it from the source list and nothing else is affected.</p>
<div class="section-divider" role="separator" aria-orientation="horizontal"></div>
<p>Finding a feed is a mechanical skill, and it gets faster every time you do it. After a few weeks of adding sources you will stop running the checklist and try /feed first, because it works most of the time.</p>
    `,
  },
  'distraction-free-morning-reading-routine': {
    body: `
<p><em>Twenty minutes, two phases, one rule: when the block ends, the app closes.</em></p>
<p>The morning is when reading habits are won or lost. The phone is the first screen most people touch, and whatever it shows becomes the tone for the day. A feed reader is only useful if the routine around it is deliberate. This is the routine I have kept for three years, and it takes twenty minutes.</p>
<h2>Phase one: monitoring, three minutes</h2>
<p>Open Curated Feeds and triage, do not read. Swipe left on everything you do not want, swipe right on anything worth the time. The goal is not to consume; it is to decide. A tight queue of five to ten articles is a successful morning; an untouched backlog of fifty is a broken routine.</p>
<p>Monitoring and reading are different activities with different mindsets. Checking the feed is quick pattern-matching. Reading is slow comprehension. The moment you open an article to skim it "just to see", the twenty minutes become ninety.</p>
<h2>Phase two: reading, fifteen to twenty minutes</h2>
<p>The articles you saved in phase one are the reading list. Read them in full, one at a time, with the app in whatever posture suits the environment: dark theme in a dark room, offline cache on a train. If you finish the saved batch early, stop. Do not refill the queue from the unread list. The constraint is the point.</p>
<h2>The closing rule</h2>
<p>When the block ends, close the app. Not "one more article". Closed. The unread list will still be there, and it will be smaller tomorrow if the triage was honest. This one rule does more for attention than any feature, because it converts reading from an infinite activity into a bounded one.</p>
<h2>Why this survives real weeks</h2>
<ul>
<li><strong>It has a stopping condition.</strong> "Read until done" never ends; "read for twenty minutes" always ends.</li>
<li><strong>Triage is cheap.</strong> Swiping is a decision, not a commitment. It removes the guilt that makes feed reading feel like a chore.</li>
<li><strong>The queue stays honest.</strong> If sources are earning their place, the queue is consistently finishable. If it is not, that is the signal to prune a source, which is itself a useful outcome of the routine.</li>
</ul>
<p>For a deeper version of these ideas, including the weekly prune and the archive review, see the full guide to <a href="/blog/productivity-tips-rss-readers/">RSS productivity techniques</a>. And if you are still assembling your source list, the <a href="/sources/">starter feeds</a> are a reasonable first week.</p>
<div class="section-divider" role="separator" aria-orientation="horizontal"></div>
<p>RSS rewards deliberate use more than any other reading tool, because it does the opposite of what social platforms do: it never pushes, it never notifies, and it never decides for you. The routine above is just the smallest structure that lets that property work in your favour.</p>
    `,
  },
  'best-rss-readers-android-2026': {
    schemaType: 'BlogPosting',
    apps: ['Curated Feeds', 'Feedly', 'Inoreader', 'NewsBlur', 'Feeder', 'FeedFlow', 'Readwise Reader', 'The Old Reader'],
    qa: BEST_READERS_QA,
    body: `
<p><em>Eight Android RSS readers compared on what actually changes your mornings: price, whether you need an account, offline reading, ads, and how each app treats your attention. Checked against public store listings, pricing pages, and documentation in October 2026, and every entry below links to the source it came from.</em></p>
<p>RSS readers are the quiet corner of the app store. Nobody advertises them, yet they decide what you read every day. This list covers eight Android readers that are actively maintained in 2026. No placement was paid for, and no star ratings are quoted, because store ratings measure popularity, not fit for your habits.</p>
<h2>The best RSS readers for Android at a glance</h2>
<div class="table-wrap">
<table class="data-table" aria-label="Eight Android RSS readers compared">
<thead><tr><th scope="col">App</th><th scope="col">Price</th><th scope="col">Account</th><th scope="col">Offline</th><th scope="col">Source</th><th scope="col">Best for</th></tr></thead>
<tbody>
<tr><td>Curated Feeds</td><td>Free forever</td><td>No</td><td>Full article cache</td><td><a href="/why/" target="_self">This site</a></td><td>No-account, privacy-first reading</td></tr>
<tr><td>Feedly</td><td>Free plan, paid Pro and Pro+</td><td>Yes</td><td>Yes</td><td><a href="https://feedly.com/i/pro" target="_blank" rel="noopener noreferrer">Plans</a></td><td>Sync, boards, AI on paid tiers</td></tr>
<tr><td>Inoreader</td><td>Free to 150 feeds, then paid</td><td>Yes</td><td>Yes</td><td><a href="https://www.inoreader.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></td><td>Rules and filters</td></tr>
<tr><td>NewsBlur</td><td>Free to 64 sites, then paid</td><td>Yes</td><td>Yes</td><td><a href="https://www.newsblur.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></td><td>Training and social features</td></tr>
<tr><td>Feeder</td><td>Free, open source</td><td>No</td><td>Yes</td><td><a href="https://f-droid.org/en/packages/com.nononsenseapps.feeder/" target="_blank" rel="noopener noreferrer">F-Droid</a></td><td>Minimal F-Droid reading</td></tr>
<tr><td>FeedFlow</td><td>Free, open source</td><td>No</td><td>Offline reading</td><td><a href="https://f-droid.org/en/packages/com.prof18.feedflow/" target="_blank" rel="noopener noreferrer">F-Droid</a></td><td>Lightweight offline reader</td></tr>
<tr><td>Readwise Reader</td><td>Free tier, paid</td><td>Yes</td><td>Yes</td><td><a href="https://readwise.io/read" target="_blank" rel="noopener noreferrer">Product page</a></td><td>RSS plus read-it-later</td></tr>
<tr><td>The Old Reader</td><td>Free tier, paid</td><td>Yes</td><td>Limited on free</td><td><a href="https://theoldreader.com/" target="_blank" rel="noopener noreferrer">Homepage</a></td><td>Google Reader-style reading</td></tr>
</tbody>
</table>
</div>
<p class="note">Prices and free-tier limits change often; each vendor's own page, linked in the Source column, is the authority. "Free plan" or "free tier" means usable but deliberately limited, which is not the same as free with no strings.</p>
<h2>Best RSS reader for each need</h2>
<ul>
<li><strong>No account, no server, no ads:</strong> Curated Feeds, or Feeder if you want open source from F-Droid.</li>
<li><strong>One reading list on phone, tablet, and laptop:</strong> Feedly, Inoreader, or NewsBlur. Sync is exactly what an account buys you.</li>
<li><strong>Server-side rules that sort incoming articles:</strong> Inoreader on a paid plan.</li>
<li><strong>AI summaries and digest newsletters:</strong> Feedly Pro or Readwise Reader.</li>
<li><strong>Read-it-later combined with RSS:</strong> Readwise Reader.</li>
<li><strong>Maximum offline on a train or a plane:</strong> Curated Feeds, Feeder, or FeedFlow.</li>
</ul>
<h2>1. Curated Feeds: the no-account default</h2>
<p>Curated Feeds is the app this site ships: free forever, no account, and everything stored on the device. You swipe through articles as cards, group sources into categories, and the full article cache works offline. There are no ads and no tracking, and version ${SITE.app.version} installs directly from this site as an APK of about ${APK_MB} MB for Android 8.0 and up, or from Uptodown, because it is deliberately not on the Play Store.</p>
<p>The honest trade-offs: it is Android-only, there is no multi-device sync, no desktop or web reader, and no full-text search across your whole archive, because all of those require a server. If your reading stays on one phone, none of that costs you anything. See <a href="/why/">the full comparison</a> and the head-to-head pages against <a href="/why/feedly/">Feedly</a> and <a href="/why/inoreader/">Inoreader</a>.</p>
<h2>2. Feedly: the sync-everywhere standard</h2>
<p>Feedly is the most widely used reader on this list: boards and collections, clean cross-platform sync across Android, iOS, and web, and paid tiers that add an AI layer, AI feeds, and the RSS Builder. The free plan is genuinely usable for a few dozen feeds but is limited by design, and the paid tiers lift those limits (see Feedly's <a href="https://feedly.com/i/pro" target="_blank" rel="noopener noreferrer">plans and pricing page</a> and their <a href="https://docs.feedly.com/article/140-what-is-the-difference-between-feedly-free-pro-pro-and-enterprise-plans" target="_blank" rel="noopener noreferrer">plan documentation</a>). You need an account, and your reading history lives on Feedly's servers.</p>
<h2>3. Inoreader: the power user's filter engine</h2>
<p>Inoreader's differentiator is rules: server-side filters, folders, and automation that sort articles as they arrive, plus search across your archive. The free plan is capped at 150 feeds, and Pro starts at $7.50 a month billed annually, per <a href="https://www.inoreader.com/pricing" target="_blank" rel="noopener noreferrer">Inoreader's pricing page</a>. Like Feedly it is account-based and synced, on Android, iOS, and web.</p>
<h2>4. NewsBlur: reading with a social layer</h2>
<p>NewsBlur mixes RSS with sharing: you can follow other readers' blurblogs, and its training modes learn which stories you care about. The free plan follows up to 64 sites, and Premium starts at $36 a year, per <a href="https://www.newsblur.com/pricing" target="_blank" rel="noopener noreferrer">NewsBlur's pricing page</a>. Account-based and synced, on Android, iOS, and web, and open source if you would rather run it yourself.</p>
<h2>5. Feeder: the minimal open-source pick</h2>
<p>Feeder is a free, open-source reader distributed on <a href="https://f-droid.org/en/packages/com.nononsenseapps.feeder/" target="_blank" rel="noopener noreferrer">F-Droid</a> and the Play Store. No account, no ads, a straightforward article list with offline reading and a clean design. It deliberately skips sync and server features, which is exactly why it stays fast and private. A solid choice if you want something simpler than Feedly with none of the upsells.</p>
<h2>6. FeedFlow: offline-first and lightweight</h2>
<p>FeedFlow is another free, open-source reader, also on <a href="https://f-droid.org/en/packages/com.prof18.feedflow/" target="_blank" rel="noopener noreferrer">F-Droid</a>, focused on offline reading and reader mode, with sync options only if you configure them yourself. It is the lightest app on this list and a good fit when storage and battery matter.</p>
<h2>7. Readwise Reader: RSS meets read-it-later</h2>
<p>Readwise Reader combines RSS with highlights, a read-it-later queue, and AI features on the paid plan. The free tier is limited. It is account-based and synced across devices, and it suits people who want one place for articles, newsletters, and things to read later rather than a pure feed list; see the <a href="https://readwise.io/read" target="_blank" rel="noopener noreferrer">product page</a> for the current plan structure.</p>
<h2>8. The Old Reader: the Google Reader revival</h2>
<p>The Old Reader rebuilds the classic Google Reader experience: folders, sharing, and a familiar layout. It is account-based and synced, with Android and web clients, and its <a href="https://theoldreader.com/" target="_blank" rel="noopener noreferrer">own site</a> lists the current free and paid limits.</p>
<h2>How to choose an RSS reader</h2>
<p>Start with where your data lives, because that decision is hard to reverse. Account-based readers such as Feedly, Inoreader, NewsBlur, Readwise and The Old Reader give you sync and server-side features in exchange for storing your reading history on their servers. Device-local readers such as Curated Feeds, Feeder and FeedFlow keep everything on the phone and give you nothing to log into.</p>
<p>Second, look at the price model rather than the price. A limited free plan usually means a subsidy: someone pays for the server, and that someone is either you on a paid tier or an advertiser. "Free forever" with no server bill is a different promise, and it only holds where there is no server to fund. Third, test offline behavior on your actual commute. Fourth, confirm the platform list matches the devices you actually read on.</p>
<p>Then try two or three readers with the same feeds for one week. The real differences show up in daily use, not in feature lists. The <a href="/sources/">starter feed list</a> is a good test set.</p>
<h2>What this list deliberately leaves out</h2>
<p>Self-hosted options like <a href="https://freshrss.org/" target="_blank" rel="noopener noreferrer">FreshRSS</a> and <a href="https://miniflux.app/" target="_blank" rel="noopener noreferrer">Miniflux</a> are excellent if you run a server, but they are not Android apps you install and open, so they are out of scope here. <a href="https://netnewswire.com/" target="_blank" rel="noopener noreferrer">NetNewsWire</a> is a strong open-source reader but Apple-only. And app-store ratings were left out on purpose: a 4.8 with 200k reviews tells you a product is popular, not that it fits the way you read.</p>
<h2>Switching readers without losing your feeds</h2>
<p>Every reader on this list can export your subscriptions as an OPML file, and every reader can add a feed by pasting its URL. To switch: export the OPML from your current reader, open it in a text editor, and copy each <code>xmlUrl</code> value, or add feeds one by one from the original app's share sheet. In Curated Feeds there is no directory approval step: paste any URL that parses as RSS 2.0, Atom, or RDF and it is added. See <a href="/blog/find-rss-feed-url-any-website/">how to find the feed URL of any website</a> if a source does not advertise its feed.</p>
${qaHtml(BEST_READERS_QA)}
<h2>Try Curated Feeds</h2>
<p>If the comparison points anywhere for a phone-only, no-account setup, it points here. Version ${SITE.app.version}, about ${APK_MB} MB, Android 8.0 and up, free forever with no ads. Download the APK directly from this site or find it on Uptodown, add a few feeds from the <a href="/sources/">starter list</a>, and see how reading feels when nothing is synced, tracked, or sold.</p>
    `,
  },
};


