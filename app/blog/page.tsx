import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Blog | Curated Feeds - RSS Tips & Content Curation Strategies',
  description: 'Learn about RSS readers, productivity tips, and content curation strategies. Discover how to stay informed without the noise of social media.',
  authors: [{ name: 'Rajat Kashyap' }],
  openGraph: {
    title: 'Blog | Curated Feeds',
    description: 'Tips, insights, and strategies for mastering RSS feeds and content curation.',
    type: 'website',
  },
};

const posts = [
  {
    slug: '10-best-tech-blogs-rss',
    title: '10 Best Tech Blogs to Follow in Your RSS Reader',
    excerpt: 'Discover 10 tech blogs with powerful RSS feeds to supercharge your daily reading. From Hacker News to Verge, here\'s the ultimate list.',
    date: 'Mar 20, 2026',
    readTime: '15 min read',
    category: 'Tech',
    tags: ['RSS', 'Tech'],
  },
  {
    slug: 'rss-vs-social-media',
    title: 'RSS vs Social Media: Why RSS Still Wins for Focus',
    excerpt: 'A data-driven analysis with real statistics and personal experience from three years of RSS-first content consumption.',
    date: 'Mar 20, 2026',
    readTime: '15 min read',
    category: 'Focus',
    tags: ['RSS', 'Focus', 'Social Media'],
  },
  {
    slug: 'productivity-tips-rss-readers',
    title: '10 Productivity Tips for RSS Power Users',
    excerpt: 'Transform your information diet with actionable techniques and real metrics from 3+ years of RSS mastery.',
    date: 'Mar 22, 2026',
    readTime: '16 min read',
    category: 'Productivity',
    tags: ['RSS', 'Tips', 'Productivity'],
  },
];

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="blog-page">
        <section className="blog-hero">
          <h1>Blog</h1>
          <p>Tips, strategies, and insights for mastering RSS and taking back your attention.</p>
        </section>

        <section className="blog-cards">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-card-category">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                {post.category}
              </div>
              <h2>
                <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="blog-card-meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {post.date}
                </span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.readTime}
                </span>
              </div>
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}/`} className="blog-card-cta">
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </article>
          ))}
        </section>

        <section className="blog-cta">
          <h2>Ready to take back your attention?</h2>
          <p>Download Curated Feeds and start reading on your terms.</p>
          <Link href="/#download" className="cta-button primary">Get the App</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}