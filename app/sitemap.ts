import type { MetadataRoute } from 'next';

/**
 * Pages that existed in a previous build but are pending restoration in source.
 * When these routes are re-implemented in `app/`, add them back to this sitemap.
 *
 * Pending restoration:
 *   - /blog/         (blog index page)
 *   - /about/        (about page)
 *   - /privacy/      (privacy policy page)
 *   - /blog/10-best-tech-blogs-rss/
 *   - /blog/productivity-tips-rss-readers/
 *   - /blog/rss-vs-social-media/
 */

const BASE_URL = 'https://curatedfeeds.web.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
