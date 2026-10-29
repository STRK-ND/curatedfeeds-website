/**
 * Single source of truth for blog post metadata.
 * Consumed by the sitemap, RSS feed, blog index, and blog post pages
 * so slugs, dates, and descriptions can never drift apart.
 */
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string; // ISO 8601
  dateModified: string; // ISO 8601
  category: string;
  readTime: string;
  tags: string[];
  keywords: string[];
};

export const POSTS: PostMeta[] = [
  {
    slug: '10-best-tech-blogs-rss',
    title: '10 Best Tech Blogs to Follow in Your RSS Reader',
    description:
      'A comprehensive guide to the most valuable technology sources for developers, entrepreneurs, and tech enthusiasts worldwide in 2026.',
    excerpt:
      'Follow 10 tech blogs in your RSS reader. Hacker News, The Verge, and more, curated for depth over noise.',
    datePublished: '2026-03-13',
    dateModified: '2026-03-22',
    category: 'Tech',
    readTime: '15 min read',
    tags: ['RSS', 'Tech'],
    keywords: ['best tech blogs', 'RSS feeds', 'tech RSS', 'feeds 2026'],
  },
  {
    slug: 'rss-vs-social-media',
    title: 'RSS vs Social Media: Why RSS Still Wins for Focus',
    description:
      'A data-driven analysis of attention economics and personal experience from three years of RSS-first content consumption.',
    excerpt:
      'A data-driven analysis with real statistics and personal experience from three years of RSS-first content consumption.',
    datePublished: '2026-03-20',
    dateModified: '2026-03-22',
    category: 'Focus',
    readTime: '15 min read',
    tags: ['RSS', 'Focus', 'Social Media'],
    keywords: ['RSS vs social media', 'attention', 'focus', 'productivity'],
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
    readTime: '16 min read',
    tags: ['RSS', 'Tips', 'Productivity'],
    keywords: ['RSS productivity', 'reading habits', 'feed management'],
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
    readTime: '9 min read',
    tags: ['RSS', 'How-to', 'Feeds'],
    keywords: ['find RSS feed URL', 'RSS autodiscovery', 'Atom feed', 'feed URL tricks'],
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
    readTime: '8 min read',
    tags: ['RSS', 'Focus', 'Routine'],
    keywords: ['morning reading routine', 'distraction free reading', 'RSS routine', 'attention hygiene'],
  },
];

export const BLOG_LAST_MODIFIED = POSTS.reduce(
  (latest, post) => (post.dateModified > latest ? post.dateModified : latest),
  POSTS[0].dateModified,
);
