import { POSTS } from '../lib/posts/data';
import { pageUrl, SITE } from '../lib/site';

/**
 * The blog RSS feed, generated from POSTS.
 *
 * It used to be a hand-written file in public/, which meant every post's
 * title, description, date and category was copied by hand and drifted: the
 * listicle was filed under "Tech" in the feed and "Comparisons" everywhere
 * else. Generating it from the same list the site renders removes the copy.
 */
export const dynamic = 'force-static';

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const rfc822 = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`).toUTCString();

export function GET() {
  const newest = POSTS.reduce(
    (latest, post) => (post.dateModified > latest ? post.dateModified : latest),
    POSTS[0].dateModified,
  );

  const items = [...POSTS]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .map((post) => {
      const url = pageUrl(`/blog/${post.slug}/`);
      return [
        '    <item>',
        `      <title>${xmlEscape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description><![CDATA[${post.description}]]></description>`,
        `      <category>${xmlEscape(post.category)}</category>`,
        `      <author>${SITE.email} (${SITE.author})</author>`,
        `      <pubDate>${rfc822(post.datePublished)}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xmlEscape(SITE.name)} Blog</title>
    <link>${pageUrl('/blog/')}</link>
    <atom:link href="${pageUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>RSS tips, productivity techniques, and content curation strategies from the ${xmlEscape(SITE.name)} team.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(newest)}</lastBuildDate>
${items}
    <generator>Next.js static export</generator>
    <copyright>Copyright ${new Date(newest).getUTCFullYear()} ${xmlEscape(SITE.name)}</copyright>
    <managingEditor>${SITE.email} (${SITE.author})</managingEditor>
    <webMaster>${SITE.email} (${SITE.author})</webMaster>
    <ttl>60</ttl>
    <image>
      <url>${pageUrl('/icon-192.svg')}</url>
      <title>${xmlEscape(SITE.name)}</title>
      <link>${pageUrl('/blog/')}</link>
      <width>192</width>
      <height>192</height>
    </image>
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
