import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://curatedfeeds.web.app';

const blogPosts = [
  { slug: '10-best-tech-blogs-rss', lastmod: '2026-03-22' },
  { slug: 'rss-vs-social-media', lastmod: '2026-03-22' },
  { slug: 'productivity-tips-rss-readers', lastmod: '2026-03-22' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/screenshots/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...blogPosts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}/`,
      lastModified: new Date(p.lastmod),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
