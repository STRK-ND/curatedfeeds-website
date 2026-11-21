import Link from 'next/link';
import PageShell from '../components/PageShell';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';
import { faqPageLd } from '../lib/seo';
import { APK_MB, pageMetadata, pageUrl, SITE } from '../lib/site';
import { PUBLICATIONS } from '../lib/data/publications';

const PATH = '/directory/';
const PAGE_URL = pageUrl(PATH);
const TITLE = 'RSS Feed Directory: 50 Best Publications & News Sites (2027)';
const DESCRIPTION =
  'Verified, official RSS feed URLs for 50 leading publications across tech, global news, business, science, and culture in 2027. Copy URLs directly into your reader.';

const CRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Directory', url: PATH },
];

export const metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'RSS feed directory 2027',
    'best RSS feeds list',
    'news RSS feeds',
    'publication RSS feed URLs',
    'verified RSS feeds',
    'tech news RSS directory',
    'financial news RSS feeds',
  ],
  type: 'website',
});

const categories = Array.from(new Set(PUBLICATIONS.map((p) => p.category)));

const faqs = [
  {
    q: 'How do I add a publication feed to Curated Feeds?',
    a: 'Copy any feed URL from the directory below, open Curated Feeds on Android, tap add-feed, and paste the URL. The app immediately validates the feed and adds it to your queue.',
  },
  {
    q: 'What if a publication is not listed in this directory?',
    a: 'Use our free RSS Feed Finder tool to automatically scan any website address for hidden or unadvertised RSS, Atom, and RDF endpoints.',
  },
  {
    q: 'Are these feeds completely free to read?',
    a: 'Yes. All publications in this directory publish open XML feeds that can be read in standard RSS readers with zero subscriptions.',
  },
];

export default function DirectoryPage() {
  return (
    <PageShell
      crumbs={CRUMBS}
      mainClass="sources-page"
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${PAGE_URL}#collection`,
          name: TITLE,
          url: PAGE_URL,
          description: DESCRIPTION,
        },
        faqPageLd(faqs, PAGE_URL),
      ]}
    >
      <section className="page-hero">
        <h1>The RSS Publication Directory (2027)</h1>
        <p className="page-lede">
          Verified, official RSS and Atom feed endpoints for 50 of the world&apos;s leading technology,
          financial, science, and culture publications. Tested and resolving in November 2026.
        </p>
      </section>

      {categories.map((catName) => {
        const pubs = PUBLICATIONS.filter((p) => p.category === catName);
        return (
          <section key={catName} className="page-section" aria-labelledby={`cat-${catName}`}>
            <h2 id={`cat-${catName}`}>{catName}</h2>
            {pubs.map((pub) => (
              <article key={pub.slug} className="feed-row">
                <div>
                  <h3>
                    <Link href={`/directory/${pub.slug}/`} className="text-link">
                      {pub.name}
                    </Link>
                  </h3>
                  <p>{pub.summary}</p>
                  <a className="feed-url" href={pub.feedUrl} target="_blank" rel="noopener noreferrer">
                    {pub.feedUrl}
                  </a>
                </div>
                <div className="feed-side">{pub.domain}</div>
              </article>
            ))}
          </section>
        );
      })}

      <section className="page-section page-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <FaqList items={faqs} openFirst />
      </section>

      <CtaBand
        title="Read 50+ publications without popups or tracking"
        primary={{ label: 'Download Curated Feeds APK', href: SITE.app.apk }}
        secondary={{ label: 'Test URL in Finder', href: '/tools/find-feed/' }}
      >
        Version {SITE.app.version}, about {APK_MB} MB. Triage your favorite publications on Android
        with zero ads, no accounts, and full offline caching.
      </CtaBand>
    </PageShell>
  );
}
