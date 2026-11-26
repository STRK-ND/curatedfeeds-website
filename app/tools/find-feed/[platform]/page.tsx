import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../components/PageShell';
import FaqList from '../../../components/FaqList';
import CtaBand from '../../../components/CtaBand';
import { articleLd, faqPageLd } from '../../../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../../../lib/site';
import { PLATFORMS, getPlatform } from '../../../lib/data/platforms';

export function generateStaticParams() {
  return PLATFORMS.map((platform) => ({ platform: platform.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};

  return pageMetadata({
    path: `/tools/find-feed/${slug}/`,
    title: platform.title,
    description: platform.description,
    keywords: platform.keywords,
    type: 'article',
  });
}

export default async function PlatformGuidePage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const url = pageUrl(`/tools/find-feed/${slug}/`);
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/find-feed/' },
    { name: 'RSS Feed Finder', url: '/tools/find-feed/' },
    { name: platform.name, url: `/tools/find-feed/${slug}/` },
  ];

  const adjacentPlatforms = PLATFORMS.filter((p) => p.slug !== slug).slice(0, 6);

  return (
    <PageShell
      crumbs={crumbs}
      mainClass="tools-page"
      data={[
        articleLd({
          path: `/tools/find-feed/${slug}/`,
          title: platform.title,
          description: platform.description,
          body: platform.summary,
          author: SITE.author,
          authorUrl: SITE.authorUrl,
          datePublished: '2026-11-22',
          dateModified: '2026-11-22',
          type: 'TechArticle',
        }),
        faqPageLd(platform.faqs, url),
      ]}
    >
      <section className="page-hero">
        <h1>{platform.title}</h1>
        <p className="page-lede">{platform.summary}</p>
      </section>

      <section className="page-section" aria-labelledby="url-pattern-title">
        <h2 id="url-pattern-title">{platform.name} RSS Feed URL Pattern</h2>
        <div className="table-wrap">
          <table className="data-table" aria-label={`${platform.name} feed address template`}>
            <thead>
              <tr>
                <th scope="col">Format Type</th>
                <th scope="col">URL Pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard Template</strong></td>
                <td><code>{platform.urlPattern}</code></td>
              </tr>
              <tr>
                <td><strong>Example Website</strong></td>
                <td><a href={platform.exampleUrl} target="_blank" rel="noopener noreferrer">{platform.exampleUrl}</a></td>
              </tr>
              <tr>
                <td><strong>Working Feed URL</strong></td>
                <td><code>{platform.exampleFeedUrl}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="page-section" aria-labelledby="how-to-title">
        <h2 id="how-to-title">Step-by-Step: How to Get the Feed</h2>
        <div className="panel-grid">
          {platform.howToSteps.map((step, idx) => (
            <article key={step.step} className="panel">
              <span className="panel-icon" aria-hidden="true" style={{ fontWeight: 700 }}>
                {idx + 1}
              </span>
              <h3>{step.step}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
        <p className="note" style={{ marginTop: '1.5rem' }}>
          Need to verify an address? Try our free{' '}
          <Link href="/tools/find-feed/" className="text-link">
            RSS Feed Finder tool
          </Link>{' '}
          to automatically check page tags and headers.
        </p>
      </section>

      <section className="page-section page-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <FaqList items={platform.faqs} openFirst />
      </section>

      <section className="page-section" aria-labelledby="other-platforms-title">
        <h2 id="other-platforms-title">Other Platform Feed Guides</h2>
        <div className="panel-grid">
          {adjacentPlatforms.map((other) => (
            <article key={other.slug} className="panel">
              <h3>
                <Link href={`/tools/find-feed/${other.slug}/`} className="text-link">
                  {other.name} RSS Feeds
                </Link>
              </h3>
              <p>{other.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title={`Read ${platform.name} feeds without algorithmic noise`}
        primary={{ label: 'Download Curated Feeds APK', href: SITE.app.uptodown }}
        secondary={{ label: 'Test Feed in Finder', href: '/tools/find-feed/' }}
      >
        Version {SITE.app.version}, about {APK_MB} MB. Paste your {platform.name} feed and swipe through stories
        as tactile cards on Android. No account, no ads, no trackers.
      </CtaBand>
    </PageShell>
  );
}
