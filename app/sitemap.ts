import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://curatedfeeds.web.app';

const blogPosts = [
  { slug: '10-best-tech-blogs-rss', lastmod: '2026-03-22' },
  { slug: 'rss-vs-social-media', lastmod: '2026-03-22' },
  { slug: 'productivity-tips-rss-readers', lastmod: '2026-03-22' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Truthful content-change dates, never the build date: a lastModified that
  // always equals "now" makes every recrawl a no-op. changefreq and priority
  // are omitted - Google disregards both and they add noise.
  const PAGES_LAST_REVIEW = new Date('2026-03-22');
  const HOME_LAST_MODIFIED = new Date('2026-10-21');
  return [
    { url: `${BASE_URL}/`, lastModified: HOME_LAST_MODIFIED },
    { url: `${BASE_URL}/blog/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/about/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/privacy/`, lastModified: PAGES_LAST_REVIEW },
    { url: `${BASE_URL}/screenshots/`, lastModified: PAGES_LAST_REVIEW },
    ...blogPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}/`,
      lastModified: new Date(p.lastmod),
    })),
  ];
}
