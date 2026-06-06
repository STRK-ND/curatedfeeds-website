import type { MetadataRoute } from 'next';

/**
 * Base URL for all sitemap entries. Must exactly match the host registered
 * in Google Search Console (https://curatedfeeds.web.app), otherwise GSC will
 * report "Couldn't fetch" due to a property mismatch.
 */
const BASE_URL = 'https://curatedfeeds.web.app';

/**
 * Blog posts currently published on the deployed site. These live in an older
 * static build and are not yet represented as routes in `app/`. Keep this list
 * in sync until the blog is reintroduced as real Next.js routes, at which point
 * these should be generated from the post source instead of hard-coded.
 */
const BLOG_POSTS: { slug: string; lastModified: string }[] = [
  { slug: '10-best-tech-blogs-rss', lastModified: '2026-03-22T07:23:05.963Z' },
  { slug: 'productivity-tips-rss-readers', lastModified: '2026-03-22T07:23:06.018Z' },
  { slug: 'rss-vs-social-media', lastModified: '2026-03-22T07:23:05.994Z' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
