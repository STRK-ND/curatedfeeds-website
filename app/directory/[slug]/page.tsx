import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../components/PageShell';
import FaqList from '../../components/FaqList';
import CtaBand from '../../components/CtaBand';
import { articleLd, faqPageLd } from '../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../lib/site';
import { PUBLICATIONS, getPublication } from '../../lib/data/publications';

export function generateStaticParams() {
  return PUBLICATIONS.map((pub) => ({ slug: pub.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) return {};

  return pageMetadata({
    path: `/directory/${slug}/`,
    title: `${pub.name} RSS Feed URL & Section Feeds (2027)`,
    description: pub.description,
    keywords: [
      `${pub.name.toLowerCase()} rss feed`,
      `${pub.name.toLowerCase()} rss url 2027`,
      `how to get ${pub.name.toLowerCase()} rss`,
      `${pub.name.toLowerCase()} feed address`,
      `read ${pub.name.toLowerCase()} without ads`,
      'rss feed url 2027',
    ],
    type: 'article',
  });
}

export default async function PublicationFeedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const url = pageUrl(`/directory/${slug}/`);
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Directory', url: '/directory/' },
    { name: pub.name, url: `/directory/${slug}/` },
  ];

  const relatedPubs = PUBLICATIONS.filter(
    (p) => p.slug !== slug && (p.category === pub.category || true)
  ).slice(0, 6);

  const steps = [
    {
      name: 'Copy the feed address',
      text: `Copy ${pub.feedUrl} or one of the section feeds listed below.`,
    },
    {
      name: 'Open Curated Feeds',
      text: 'Open the app on your Android device and tap the add-source button in the top bar.',
    },
    {
      name: 'Paste and read',
      text: `Paste the link. Curated Feeds parses the ${pub.name} XML feed instantly and caches stories for offline reading.`,
    },
  ];

  return (
    <PageShell
      crumbs={crumbs}
      mainClass="sources-page"
      data={[
        articleLd({
          path: `/directory/${slug}/`,
          title: `${pub.name} RSS Feed URL & Section Feeds (2027)`,
          description: pub.description,
          body: pub.summary,
          author: SITE.author,
          authorUrl: SITE.authorUrl,
          datePublished: '2026-11-22',
          dateModified: '2026-11-22',
          type: 'NewsArticle',
        }),
        faqPageLd(pub.faqs, url),
      ]}
    >
      <section className="page-hero">
        <h1>{pub.name} RSS Feed URL (2027)</h1>
        <p className="page-lede">{pub.summary}</p>
      </section>

      <section className="page-section" aria-labelledby="feed-box-title">
        <h2 id="feed-box-title">Primary RSS Feed Endpoint</h2>
        <div className="table-wrap">
          <table className="data-table" aria-label={`${pub.name} primary feed details`}>
            <thead>
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Publication</strong></td>
                <td>{pub.name} ({pub.domain})</td>
              </tr>
              <tr>
                <td><strong>Category</strong></td>
                <td>{pub.category}</td>
              </tr>
              <tr>
                <td><strong>Official Feed URL</strong></td>
                <td><code>{pub.feedUrl}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {pub.sectionFeeds && pub.sectionFeeds.length > 0 && (
        <section className="page-section" aria-labelledby="sections-title">
          <h2 id="sections-title">Additional Section Feeds</h2>
          <p>
            Prefer specific topics? {pub.name} provides specialized feeds for different editorial desks:
          </p>
          <div className="table-wrap">
            <table className="data-table" aria-label={`${pub.name} section feeds`}>
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Feed Address</th>
                </tr>
              </thead>
              <tbody>
                {pub.sectionFeeds.map((sec) => (
                  <tr key={sec.url}>
                    <td><strong>{sec.name}</strong></td>
                    <td><code>{sec.url}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="page-section" aria-labelledby="how-to-title">
        <h2 id="how-to-title">How to Subscribe in Curated Feeds</h2>
        <div className="panel-grid">
          {steps.map((step, idx) => (
            <article key={step.name} className="panel">
              <span className="panel-icon" aria-hidden="true" style={{ fontWeight: 700 }}>
                {idx + 1}
              </span>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section page-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <FaqList items={pub.faqs} openFirst />
      </section>

      <section className="page-section" aria-labelledby="related-title">
        <h2 id="related-title">Explore Related Publications</h2>
        <div className="panel-grid">
          {relatedPubs.map((other) => (
            <article key={other.slug} className="panel">
              <h3>
                <Link href={`/directory/${other.slug}/`} className="text-link">
                  {other.name} RSS Feed
                </Link>
              </h3>
              <p>{other.summary}</p>
            </article>
          ))}
        </div>
        <p className="note" style={{ marginTop: '1.5rem' }}>
          Browse all 50 top sources in our complete{' '}
          <Link href="/directory/" className="text-link">
            RSS Publication Directory
          </Link>
          .
        </p>
      </section>

      <CtaBand
        title={`Read ${pub.name} without ads or popups`}
        primary={{ label: 'Download Curated Feeds APK', href: SITE.app.apk }}
        secondary={{ label: 'View All Publications', href: '/directory/' }}
      >
        Version {SITE.app.version}, about {APK_MB} MB, Android 8.0+. Enjoy {pub.name} as clean, tactile
        cards that read offline anywhere.
      </CtaBand>
    </PageShell>
  );
}
