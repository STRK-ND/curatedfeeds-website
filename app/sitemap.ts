import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://curatedfeeds.web.app';

const blogPosts = [
  { slug: '10-best-tech-blogs-rss', lastmod: '2026-03-22' },
  { slug: 'rss-vs-social-media', lastmod: '2026-03-22' },
  { slug: 'productivity-tips-rss-readers', lastmod: '2026-03-22' },
  { slug: 'find-rss-feed-url-any-website', lastmod: '2026-10-24' },
  { slug: 'distraction-free-morning-reading-routine', lastmod: '2026-10-24' },
  { slug: 'best-rss-readers-android-2026', lastmod: '2026-10-31' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Truthful content-change dates, never the build date: a lastModified that
  // always equals "now" makes every recrawl a no-op. changefreq and priority
  // are omitted - Google disregards both and they add noise.
  const PAGES_LAST_REVIEW = new Date('2026-10-31');
  const HOME_LAST_MODIFIED = new Date('2026-11-09');
  const SCREENSHOTS_LAST_MODIFIED = new Date('2026-11-09');
  return [
    { url: `${BASE_URL}/`, lastModified: HOME_LAST_MODIFIED },
    { url: `${BASE_URL}/blog/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/about/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/privacy/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/screenshots/`, lastModified: SCREENSHOTS_LAST_MODIFIED },
    { url: `${BASE_URL}/sources/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/why/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/why/feedly/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/why/inoreader/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/changelog/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/use-cases/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/press/`, lastModified: PAGES_LAST_REVIEW },
    ...blogPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}/`,
      lastModified: new Date(p.lastmod),
    })),
  ];
}
