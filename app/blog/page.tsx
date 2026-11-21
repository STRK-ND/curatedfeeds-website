import Link from 'next/link';
import { blogCollectionLd, blogListLd } from '../lib/seo';
import { pageMetadata, SITE } from '../lib/site';
import { POSTS, readTimeFor } from '../lib/posts/data';
import PageShell from '../components/PageShell';
import CtaBand from '../components/CtaBand';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog/' },
];

export const metadata = pageMetadata({
  path: '/blog/',
  title: 'Blog, RSS Tips & Reading Guides',
  description:
    'Practical guides on RSS readers, attention hygiene, and intentional reading, from the team behind the privacy-first RSS reader for Android.',
  keywords: [
    'RSS blog',
    'RSS reader tips',
    'reading guides',
    'RSS vs social media',
    'best RSS reader android 2026',
    'how to find RSS feeds',
    'attention hygiene',
    'productivity reading tips',
    'content curation strategies',
  ],
  socialTitle: 'Blog | Curated Feeds',
  socialDescription: 'RSS tips, productivity techniques, and content curation strategies.',
});

const postSummaries = POSTS.map((post) => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  dateISO: post.datePublished,
}));

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function BlogPage() {
  return (
    <PageShell
      crumbs={CRUMBS}
      mainClass="blog-page"
      data={[blogCollectionLd(postSummaries), blogListLd(postSummaries)]}
    >
      <section className="blog-hero">
        <h1>Blog</h1>
        <p>
          Practical guides on RSS readers, attention hygiene, content curation, and intentional
          reading, from the team behind Curated Feeds.
        </p>
      </section>

      <section className="blog-cards" aria-label="Blog posts">
        {POSTS.map((post) => (
          <article
            key={post.slug}
            className="blog-row"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <h2 itemProp="headline">
              <Link href={`/blog/${post.slug}/`} itemProp="url">
                {post.title}
              </Link>
            </h2>
            <p itemProp="description">{post.excerpt}</p>
            <div className="blog-row-meta">
              <span itemProp="articleSection">{post.category}</span>
              <span>
                <time dateTime={post.datePublished} itemProp="datePublished">
                  {formatDate(post.datePublished)}
                </time>
              </span>
              <span>{readTimeFor(post)}</span>
              {post.tags.length > 0 && <span className="blog-row-tags">{post.tags.join(', ')}</span>}
            </div>
            <meta itemProp="author" content={SITE.author} />
          </article>
        ))}
      </section>

      <CtaBand
        title="Ready to take back your attention?"
        primary={{ label: 'Get the App', href: SITE.app.apk }}
        secondary={{ label: 'Get it on Uptodown', href: SITE.app.uptodown }}
      >
        Download Curated Feeds and start reading on your terms.
      </CtaBand>
    </PageShell>
  );
}
