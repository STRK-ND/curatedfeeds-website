import type { MetadataRoute } from 'next';
import { POSTS } from './lib/posts/data';
import { pageUrl } from './lib/site';
import { PLATFORMS } from './lib/data/platforms';
import { CATEGORIES } from './lib/data/categories';
import { PUBLICATIONS } from './lib/data/publications';

export const dynamic = 'force-static';

const SECTIONS_REVIEWED = new Date('2026-11-22T00:00:00Z');
const CHANGELOG_REVISED = new Date('2026-10-30T00:00:00Z');

const STATIC_PATHS = [
  '/',
  '/tools/find-feed/',
  '/directory/',
  '/screenshots/',
  '/blog/',
  '/about/',
  '/privacy/',
  '/sources/',
  '/sources/ai/',
  '/sources/developer/',
  '/why/',
  '/why/feedly/',
  '/why/inoreader/',
  '/why/feeder/',
  '/why/feedflow/',
  '/why/read-you/',
  '/why/newsblur/',
  '/use-cases/',
  '/press/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map((path) => ({ url: pageUrl(path), lastModified: SECTIONS_REVIEWED })),
    { url: pageUrl('/changelog/'), lastModified: CHANGELOG_REVISED },
    ...POSTS.map((post) => ({
      url: pageUrl(`/blog/${post.slug}/`),
      lastModified: new Date(`${post.dateModified}T00:00:00Z`),
    })),
    ...PLATFORMS.map((platform) => ({
      url: pageUrl(`/tools/find-feed/${platform.slug}/`),
      lastModified: SECTIONS_REVIEWED,
    })),
    ...CATEGORIES.map((category) => ({
      url: pageUrl(`/sources/${category.slug}/`),
      lastModified: SECTIONS_REVIEWED,
    })),
    ...PUBLICATIONS.map((pub) => ({
      url: pageUrl(`/directory/${pub.slug}/`),
      lastModified: SECTIONS_REVIEWED,
    })),
  ];
}
