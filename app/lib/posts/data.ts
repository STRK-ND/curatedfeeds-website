/**
 * Single source of truth for blog posts: metadata plus the body from
 * content.ts. The sitemap, the RSS feed, the blog index and the post pages
 * all read POSTS, so slugs, dates, titles and bodies cannot drift apart.
 */
import { POST_CONTENT, type PostContent } from './content';

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string; // ISO 8601
  dateModified: string; // ISO 8601
  category: string;
  tags: string[];
  keywords: string[];
};

export type Post = PostMeta & PostContent;

/** Plain words in a post body: tags stripped, entities collapsed. */
function bodyWords(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Reading time, derived from the post's own body. Hand-set read-time strings
 * used to be copied in two places and drifted badly (a 600-word post labelled
 * "15 min read").
 */
export function readTimeFor(post: Post): string {
  return `${Math.max(1, Math.round(bodyWords(post.body) / 230))} min read`;
}

const POST_META: PostMeta[] = [
  {
    slug: '10-best-tech-blogs-rss',
    title: '10 Best Tech Blogs to Follow in Your RSS Reader',
    description:
      'A comprehensive guide to the most valuable technology sources for developers, entrepreneurs, and tech enthusiasts worldwide in 2026.',
    excerpt:
      'Follow 10 tech blogs in your RSS reader. Hacker News, The Verge, and more, curated for depth over noise.',
    datePublished: '2026-03-13',
    dateModified: '2026-11-01',
    category: 'Tech',
    tags: ['RSS', 'Tech'],
    keywords: [
      'best tech blogs to follow',
      'best tech RSS feeds 2026',
      'technology RSS feeds list',
      'top developer blogs RSS',
      'Hacker News RSS feed',
      'The Verge RSS feed',
      'tech blogs for programmers',
      'tech RSS feed directory',
      'programming blogs RSS',
      'must read tech blogs 2026',
    ],
  },
  {
    slug: 'rss-vs-social-media',
    title: 'RSS vs Social Media: Why RSS Still Wins for Focus',
    description:
      'A data-driven analysis of attention economics and personal experience from three years of RSS-first content consumption.',
    excerpt:
      'A data-driven analysis with real statistics and personal experience from three years of RSS-first content consumption.',
    datePublished: '2026-03-20',
    dateModified: '2026-11-01',
    category: 'Focus',
    tags: ['RSS', 'Focus', 'Social Media'],
    keywords: [
      'RSS vs social media',
      'RSS vs algorithms',
      'algorithmic feeds vs RSS',
      'stop doomscrolling with RSS',
      'digital detox RSS reader',
      'chronological feed vs algorithmic feed',
      'attention economy RSS',
      'distraction free news reading',
      'RSS for productivity',
      'why use RSS in 2026',
    ],
  },
  {
    slug: 'productivity-tips-rss-readers',
    title: '10 Productivity Tips for RSS Power Users',
    description:
      'Transform your information diet with actionable techniques and real metrics from 3+ years of RSS mastery.',
    excerpt:
      'Transform your information diet with actionable techniques and real metrics from 3+ years of RSS mastery.',
    datePublished: '2026-03-22',
    dateModified: '2026-03-22',
    category: 'Productivity',
    tags: ['RSS', 'Tips', 'Productivity'],
    keywords: [
      'RSS productivity tips',
      'how to organize RSS feeds',
      'RSS power user guide',
      'feed management strategies',
      'information diet RSS',
      'curate RSS feeds',
      'manage unread RSS count',
      'RSS reading habits',
      'effective RSS workflows',
    ],
  },
  {
    slug: 'find-rss-feed-url-any-website',
    title: 'How to Find the RSS Feed URL for Any Website',
    description:
      'A practical field guide to locating RSS, Atom, and RDF feeds on any site in under a minute, whether or not the publish link is visible.',
    excerpt:
      'Conventions, source-code tricks, and autodiscovery tags that locate almost any feed in seconds. Works for blogs, news sites, podcasts, and YouTube channels.',
    datePublished: '2026-10-24',
    dateModified: '2026-10-24',
    category: 'How-to',
    tags: ['RSS', 'How-to', 'Feeds'],
    keywords: [
      'how to find RSS feed URL',
      'find RSS feed of any website',
      'RSS feed URL finder',
      'RSS autodiscovery guide',
      'YouTube channel RSS feed URL',
      'Substack RSS feed URL',
      'Medium RSS feed URL',
      'WordPress RSS feed URL',
      'locate Atom feeds',
      'hidden RSS feeds lookup',
    ],
  },
  {
    slug: 'distraction-free-morning-reading-routine',
    title: 'The Distraction-Free Morning Reading Routine',
    description:
      'A twenty-minute RSS routine that replaces doomscrolling with deliberate reading, built on monitoring and reading as two separate activities.',
    excerpt:
      'Separate monitoring from reading, cap the queue, and close the app when the block ends. The full routine, step by step.',
    datePublished: '2026-10-24',
    dateModified: '2026-10-24',
    category: 'Focus',
    tags: ['RSS', 'Focus', 'Routine'],
    keywords: [
      'distraction free morning reading',
      'morning RSS routine',
      'replace doomscrolling in the morning',
      'intentional news consumption',
      'mindful reading routine',
      'calm morning news habits',
      'RSS morning newsletter alternative',
      'digital wellness reading',
    ],
  },
  {
    slug: 'best-rss-readers-android-2026',
    title: 'Best RSS Readers for Android in 2026: 8 Apps Compared',
    description:
      '8 Android RSS readers compared on price, accounts, offline reading and free-plan limits: Curated Feeds, Feedly, Inoreader, Feeder, FeedFlow, NewsBlur, Readwise, The Old Reader.',
    excerpt:
      'Eight Android RSS readers compared on price, account requirements, offline reading and free-plan limits, with a pick for every need.',
    datePublished: '2026-10-31',
    dateModified: '2026-11-01',
    category: 'Comparisons',
    tags: ['RSS', 'Comparison', 'Android'],
    keywords: [
      'best RSS readers 2026',
      'best RSS reader android',
      'best RSS readers android 2026',
      'top android RSS readers 2026',
      'free RSS reader android no account',
      'open source RSS reader android',
      'Feedly alternatives android',
      'Inoreader alternatives android',
      'Feeder android review',
      'FeedFlow android review',
      'Read You android review',
      'offline RSS reader android',
      'best feed reader app android',
      'RSS reader app comparison 2026',
      'minimalist RSS reader android',
      'ad free RSS reader android',
    ],
  },
  {
    slug: 'best-rss-readers-android-2027',
    title: 'Best RSS Readers for Android in 2027: 10 Apps Compared',
    description:
      '10 Android RSS readers compared for 2027 on price, accounts, offline reading, swipe triage, and limits: Curated Feeds, Feedly, Inoreader, Feeder, FeedFlow, Read You, NewsBlur, Readwise, Capy Reader, The Old Reader.',
    excerpt:
      'Ten Android RSS readers compared for 2027 on privacy, price, offline reading, gesture ergonomics, and freedom from algorithm traps.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'Comparisons',
    tags: ['RSS', 'Comparison', 'Android', '2027'],
    keywords: [
      'best RSS readers 2027',
      'best RSS reader android 2027',
      'top android RSS apps 2027',
      'free RSS reader android 2027',
      'RSS reader comparison 2027',
      'Feedly alternative 2027',
      'Inoreader alternative 2027',
      'privacy RSS reader 2027',
      'card swipe RSS reader android',
    ],
  },
  {
    slug: 'how-to-get-youtube-channel-rss-feed',
    title: 'How to Get an RSS Feed for Any YouTube Channel in 2027',
    description:
      'Learn how to get the RSS feed URL for any YouTube channel in 2027 without an API key or account. Follow creators, bypass recommendations, and watch distraction-free.',
    excerpt:
      'The universal YouTube RSS URL format, how to locate any channel ID in seconds, and how to follow creators without algorithmic rabbit holes.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'How-to',
    tags: ['RSS', 'How-to', 'YouTube', '2027'],
    keywords: [
      'youtube channel rss feed 2027',
      'how to get youtube rss feed',
      'youtube rss feed url format',
      'youtube to rss 2027',
      'follow youtube in rss reader',
      'youtube channel id to rss',
      'watch youtube without algorithm',
    ],
  },
  {
    slug: 'how-to-get-reddit-rss-feeds',
    title: 'How to Use Reddit RSS Feeds in 2027 (Subreddits, Users, & Multireddits)',
    description:
      'Complete guide to Reddit RSS feeds in 2027: append .rss to any subreddit, user profile, or search query. Read Reddit cleanly without ads, algorithms, or logins.',
    excerpt:
      'Subreddit feeds, multireddit combinations, and search query feeds: how to read Reddit discussions cleanly via RSS in 2027.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'How-to',
    tags: ['RSS', 'How-to', 'Reddit', '2027'],
    keywords: [
      'reddit rss feed url 2027',
      'how to get reddit rss feed',
      'subreddit rss feed format',
      'read reddit without account 2027',
      'reddit multireddit rss',
      'reddit user profile rss feed',
      'reddit without app',
    ],
  },
  {
    slug: 'how-to-follow-substack-with-rss',
    title: 'How to Read Substack Newsletters with RSS in 2027 (Without Email Clutter)',
    description:
      'Step-by-step guide to reading any Substack newsletter in an RSS reader in 2027. Avoid email inbox overload and enjoy clean, distraction-free reading.',
    excerpt:
      'Free your email inbox by reading Substack publications in your personal RSS reader: standard URLs, custom domains, and distraction-free triage.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'How-to',
    tags: ['RSS', 'How-to', 'Substack', 'Newsletters', '2027'],
    keywords: [
      'substack rss feed 2027',
      'how to read substack with rss',
      'substack rss url format',
      'read substack without email 2027',
      'follow substack in rss reader',
      'substack newsletter rss feed',
    ],
  },
  {
    slug: 'github-releases-commits-rss-feed',
    title: 'How to Track GitHub Releases and Commits via RSS in 2027',
    description:
      'Track any open-source GitHub repository releases, tags, and commits using native Atom and RSS feeds in 2027 without a GitHub account or spammy email alerts.',
    excerpt:
      'Native GitHub Atom feeds for releases, tags, and commits: monitor open-source frameworks and libraries directly in your reader.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'How-to',
    tags: ['RSS', 'How-to', 'GitHub', 'Developer', '2027'],
    keywords: [
      'github releases rss feed 2027',
      'github atom feed format',
      'track github releases with rss',
      'github commits rss feed',
      'github releases feed url',
      'open source release tracker 2027',
    ],
  },
  {
    slug: 'why-rss-is-making-a-comeback-2027',
    title: 'Why RSS Is Making a Massive Comeback in 2027 (The Antidote to Algorithmic Fatigue)',
    description:
      'Why millions of readers are abandoning algorithmic feeds and AI content slop to return to open, decentralized RSS in 2027. Regain ownership over your reading.',
    excerpt:
      'Algorithmic fatigue, synthetic AI content, and platform lock-in are driving a massive RSS revival. Why intentional, chronological reading is winning again.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'Focus',
    tags: ['RSS', 'Focus', 'Algorithms', '2027'],
    keywords: [
      'why RSS is making a comeback 2027',
      'RSS revival 2027',
      'algorithmic fatigue news 2027',
      'stop doomscrolling with RSS',
      'open web RSS 2027',
      'RSS vs AI algorithms',
      'privacy first news reading',
      'decentralized web news reader',
      'return to RSS feeds',
    ],
  },
  {
    slug: 'read-newsletters-via-rss-2027',
    title: 'How to Read Email Newsletters via RSS in 2027 (Substack, Beehiiv, & Ghost)',
    description:
      'Reclaim your email inbox in 2027 by extracting clean RSS feeds from Substack, Beehiiv, Ghost, Medium, and Buttondown. Read long-form essays with zero email clutter.',
    excerpt:
      'Free your email inbox: step-by-step extraction guide to read Substack, Beehiiv, Ghost, and Medium newsletters in your RSS reader without inbox clutter.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'How-to',
    tags: ['RSS', 'How-to', 'Newsletters', 'Substack', 'Beehiiv', '2027'],
    keywords: [
      'read newsletters in RSS 2027',
      'beehiiv rss feed url',
      'ghost newsletter rss 2027',
      'substack rss feeds',
      'read newsletters without email inbox',
      'inbox zero with RSS reader',
      'how to follow newsletters in feed reader',
      'newsletter to rss guide',
    ],
  },
  {
    slug: 'minimalist-android-setup-2027',
    title: 'The Minimalist Android Setup for 2027: Digital Decluttering with Card-Based RSS',
    description:
      'How to turn your Android smartphone into a calm, distraction-free reading tool in 2027 using digital minimalism, Google Discover removal, and card-based RSS triage.',
    excerpt:
      'Turn your Android smartphone from a dopamine slot machine into an intentional reading tool: disable Discover, banish notification badges, and triage with RSS cards.',
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    category: 'Productivity',
    tags: ['RSS', 'Productivity', 'Android', 'Minimalism', '2027'],
    keywords: [
      'minimalist android setup 2027',
      'digital minimalism android phone',
      'distraction free android apps 2027',
      'calm phone setup android',
      'replace google discover with RSS',
      'mindful smartphone reading 2027',
      'offline android news reader',
      'ad free android apps list',
    ],
  },
];

const contentFor = (slug: string): PostContent => {
  const content = POST_CONTENT[slug];
  if (!content) throw new Error(`Missing body for blog post "${slug}"`);
  return content;
};

export const POSTS: Post[] = POST_META.map((meta) => ({ ...meta, ...contentFor(meta.slug) }));

export const getPost = (slug: string): Post | undefined => POSTS.find((post) => post.slug === slug);
