import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';
import CtaBand from '../../components/CtaBand';
import { articleLd, faqPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import { CATEGORIES, getCategory } from '../../lib/data/categories';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return pageMetadata({
    path: `/sources/${slug}/`,
    title: category.title,
    description: category.description,
    keywords: category.keywords,
    type: 'article',
  });
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const url = pageUrl(`/sources/${slug}/`);
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Starter Feeds', url: '/sources/' },
    { name: category.name, url: `/sources/${slug}/` },
  ];

  const siblingCategories = CATEGORIES.filter((c) => c.slug !== slug).slice(0, 6);

  return (
    <PageShell
      crumbs={crumbs}
      mainClass="sources-page"
      data={[
        articleLd({
          path: `/sources/${slug}/`,
          title: category.title,
          description: category.description,
          body: category.intro,
          author: SITE.author,
          authorUrl: SITE.authorUrl,
          datePublished: '2026-11-22',
          dateModified: '2026-11-22',
          type: 'CollectionPage',
        }),
        faqPageLd(category.faqs, url),
      ]}
    >
      <section className="page-hero">
        <h1>{category.title}</h1>
        <p className="page-lede">{category.intro}</p>
      </section>

      <section className="page-section" aria-labelledby="feeds-title">
        <h2 id="feeds-title">Verified High-Signal Feeds</h2>
        <p>
          Every feed below is tested, actively publishing, and copy-paste ready for Curated Feeds.
        </p>
        {category.feeds.map((feed) => (
          <article key={feed.url} className="feed-row">
            <div>
              <h3>{feed.name}</h3>
              <p>{feed.blurb}</p>
              <a className="feed-url" href={feed.url} target="_blank" rel="noopener noreferrer">
                {feed.url}
              </a>
            </div>
            <div className="feed-side">{feed.cadence}</div>
          </article>
        ))}
      </section>

      <section className="page-section page-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <FaqList items={category.faqs} openFirst />
      </section>

      <section className="page-section" aria-labelledby="other-categories-title">
        <h2 id="other-categories-title">Explore Other Feed Categories</h2>
        <div className="panel-grid">
          {siblingCategories.map((other) => (
            <article key={other.slug} className="panel">
              <h3>
                <Link href={`/sources/${other.slug}/`} className="text-link">
                  {other.name} Feeds
                </Link>
              </h3>
              <p>{other.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title={`Read ${category.name} updates with focus and clarity`}
        primary={{ label: 'Download Curated Feeds APK', href: SITE.app.apk }}
        secondary={{ label: 'All Starter Feeds', href: '/sources/' }}
      >
        Version {SITE.app.version}, about {APK_MB} MB. Keep up with {category.name.toLowerCase()} as focused
        cards on Android. No account, no subscription, 100% offline-ready.
      </CtaBand>
    </PageShell>
  );
}
