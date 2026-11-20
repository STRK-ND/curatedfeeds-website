import type { MetadataRoute } from 'next';
import { POSTS } from './lib/posts/data';
import { pageUrl } from './lib/site';

export const dynamic = 'force-static';

/**
 * Content-change dates for the static sections.
 *
 * Truthful dates only, never the build date: a lastModified that always equals
 * "now" makes every recrawl a no-op, and Google only honours lastmod when it is
 * consistently accurate. Each value comes from the last commit that changed the
 * page's own content (`git log -1 --format=%ad --date=short -- app/<page>`).
 *
 * Sections that were edited together share one constant, so a coordinated
 * content change is a one-line update rather than nine.
 */
const SECTIONS_REVIEWED = new Date('2026-11-09T00:00:00Z');
const CHANGELOG_REVISED = new Date('2026-10-30T00:00:00Z');

const STATIC_PATHS = [
  '/',
  '/tools/find-feed/',
  '/screenshots/',
  '/blog/',
  '/about/',
  '/privacy/',
  '/sources/',
  '/why/',
  '/why/feedly/',
  '/why/inoreader/',
  '/use-cases/',
  '/press/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map((path) => ({ url: pageUrl(path), lastModified: SECTIONS_REVIEWED })),
    { url: pageUrl('/changelog/'), lastModified: CHANGELOG_REVISED },
    // Post dates come from POSTS, the same list the blog index and the post
    // pages read, so a sitemap entry cannot disagree with its page.
    ...POSTS.map((post) => ({
      url: pageUrl(`/blog/${post.slug}/`),
      lastModified: new Date(`${post.dateModified}T00:00:00Z`),
    })),
  ];
}
