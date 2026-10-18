import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, breadcrumbLd, blogCollectionLd, blogListLd } from '../lib/seo';
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
  alternates: { canonical: `${SITE.url}/blog/` },
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
            <article key={post.slug} className="blog-card" itemScope itemType="https://schema.org/BlogPosting">
              <div className="blog-card-category">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span itemProp="articleSection">{post.category}</span>
              </div>
              <h2 itemProp="headline">
                <Link href={`/blog/${post.slug}/`} itemProp="url">{post.title}</Link>
              </h2>
              <p itemProp="description">{post.excerpt}</p>
              <div className="blog-card-meta">
                <span><time dateTime={post.dateISO} itemProp="datePublished">{post.date}</time></span>
                <span>{post.readTime}</span>
              </div>
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}/`} className="blog-card-cta" aria-label={`Read: ${post.title}`}>
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <meta itemProp="author" content={SITE.author} />
            </article>
          ))}
        </section>

        <section className="blog-cta">
          <h2>Ready to take back your attention?</h2>
          <p>Download Curated Feeds and start reading on your terms.</p>
          <Link href={SITE.app.apk} className="cta-button primary">Get the App</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
