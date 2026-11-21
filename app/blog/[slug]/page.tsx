import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../components/PageShell';
import { articleLd, itemListLd, qaPageLd } from '../../lib/seo';
import { pageMetadata, pageUrl, SITE } from '../../lib/site';
import { getPost, POSTS, readTimeFor } from '../../lib/posts/data';

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    path: `/blog/${slug}/`,
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    type: 'article',
    article: {
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      author: SITE.author,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = pageUrl(`/blog/${slug}/`);
  const related = POSTS.filter((p) => p.slug !== slug)
    .slice(-3)
    .map((p) => ({ slug: p.slug, title: p.title }));
  const ldNodes: Record<string, unknown>[] = [
    articleLd({
      path: `/blog/${slug}/`,
      title: post.title,
      description: post.description,
      body: post.body,
      author: SITE.author,
      authorUrl: SITE.authorUrl,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      ...(post.schemaType ? { type: post.schemaType } : {}),
    }),
  ];
  if (post.apps) ldNodes.push(itemListLd(post.apps.map((name) => ({ name })), url));
  if (post.qa) ldNodes.push(qaPageLd(post.qa, url));

  return (
    <PageShell data={ldNodes} mainClass="blog-post-page">
      <article className="blog-post-article">
        <header className="blog-post-header">
          <div className="blog-post-meta-top">
            <Link href="/blog" className="blog-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to blog
            </Link>
          </div>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {post.datePublished}
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <polyline points="21 3 21 9 15 9" />
              </svg>
              Updated {post.dateModified}
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {readTimeFor(post)}
            </span>
            <span>
              By{' '}
              <a href={SITE.authorUrl} target="_blank" rel="author">
                {SITE.author}
              </a>
            </span>
          </div>
        </header>
        <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
        <footer className="blog-post-footer">
          <div className="author-box">
            <p className="author-label">Written by</p>
            <a href={SITE.authorUrl} target="_blank" rel="author" className="author-name">
              {SITE.author}
            </a>
            <p className="author-title">Founder &amp; Developer, Curated Feeds</p>
          </div>
          <div className="share-section">
            <p>Enjoyed this article?</p>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-link"
            >
              Share on X
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <section className="related-posts" aria-label="Related reading">
            <p className="author-label">Related reading</p>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}/`}>{item.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/why/">Why Curated Feeds instead of Feedly or Inoreader</Link>
              </li>
              <li>
                <Link href="/sources/">Starter feeds to try in any reader</Link>
              </li>
            </ul>
          </section>
        </footer>
      </article>
    </PageShell>
  );
}
