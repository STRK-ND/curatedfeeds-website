import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, breadcrumbLd, blogCollectionLd, blogListLd, pageAlternates } from '../lib/seo';
import { StructuredData } from '../components/StructuredData';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { POSTS } from '../lib/posts/data';

export const metadata: Metadata = {
  title: 'Blog, RSS Tips & Reading Guides',
  description:
    'Practical guides on RSS readers, attention hygiene, and intentional reading, from the team behind the privacy-first RSS reader for Android.',
  authors: [{ name: 'Rajat Kashyap', url: SITE.authorUrl }],
  alternates: pageAlternates('/blog/'),
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `${SITE.url}/blog/`,
    siteName: SITE.name,
    title: 'Blog | Curated Feeds',
    description: 'RSS tips, productivity techniques, and content curation strategies.',
    images: [`${SITE.url}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Curated Feeds',
    description: 'RSS tips, productivity techniques, and content curation strategies.',
    images: [`${SITE.url}/og-image.png`],
  },
};

const posts = POSTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  date: new Date(p.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  dateISO: p.datePublished,
  readTime: p.readTime,
  category: p.category,
  tags: p.tags,
  description: p.description,
}));

export default function BlogPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbLd([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]),
          blogCollectionLd(posts),
          // Flat ItemList mirror, helps list carousels and crawl budgets.
          blogListLd(posts),
        ]}
      />
      <Nav />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }]} />
      <main id="main" className="blog-page">
        <section className="blog-hero">
          <h1>Blog</h1>
          <p>Practical guides on RSS readers, attention hygiene, content curation, and intentional reading, from the team behind Curated Feeds.</p>
        </section>

        <section className="blog-cards" aria-label="Blog posts">
          {posts.map((post) => (
            <article key={post.slug} className="blog-row" itemScope itemType="https://schema.org/BlogPosting">
              <h2 itemProp="headline">
                <Link href={`/blog/${post.slug}/`} itemProp="url">{post.title}</Link>
              </h2>
              <p itemProp="description">{post.excerpt}</p>
              <div className="blog-row-meta">
                <span itemProp="articleSection">{post.category}</span>
                <span><time dateTime={post.dateISO} itemProp="datePublished">{post.date}</time></span>
                <span>{post.readTime}</span>
                {post.tags.length > 0 && <span className="blog-row-tags">{post.tags.join(', ')}</span>}
              </div>
              <meta itemProp="author" content={SITE.author} />
            </article>
          ))}
        </section>

        <section className="blog-cta">
          <h2>Ready to take back your attention?</h2>
          <p>Download Curated Feeds and start reading on your terms.</p>
          <div className="blog-cta-actions">
            <Link href={SITE.app.apk} className="cta-button primary">Get the App</Link>
            <Link
              href={SITE.app.uptodown}
              className="cta-button secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get it on Uptodown
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
