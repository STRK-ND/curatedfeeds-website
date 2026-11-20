import { SITE, pageUrl } from './site';

/** Sanitize before injecting into <script type="application/ld+json">. */
function escapeScript(value: string): string {
  return value.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export function jsonLd(payload: Record<string, unknown>): string {
  return escapeScript(JSON.stringify(payload));
}

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const OG_IMAGE = `${SITE.url}/og-image.png`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: SITE.description,
    founder: { '@type': 'Person', name: SITE.author, url: SITE.authorUrl },
    foundingDate: SITE.founded,
    sameAs: [SITE.instagram, SITE.authorUrl],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.email,
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    // No potentialAction/SearchAction: this static export has no search UI and
    // no /blog?q= route. Declaring one would promise Google a sitelinks
    // searchbox that 404s, a structured-data mismatch.
  };
}

export function softwareApplicationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE.url}/#software`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    applicationCategory: 'NewsApplication',
    applicationSubCategory: 'RSS Reader',
    operatingSystem: 'Android 8.0+',
    downloadUrl: SITE.app.apk,
    softwareVersion: SITE.app.version,
    datePublished: SITE.founded,
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Swipe right to save, left to mark done',
      'Card-based reading interface',
      'Unlimited RSS feed sources',
      'Offline article caching',
      'Night-and-cream dark theme',
      'Feed organization by category',
      'No advertisements',
      'No tracking of reading habits',
    ],
    screenshot: [
      { '@type': 'ImageObject', url: `${SITE.url}/screenshots/home-feed.webp` },
      { '@type': 'ImageObject', url: `${SITE.url}/screenshots/swipe-gestures.webp` },
    ],
    softwareRequirements: 'Android 8.0 or later',
    storageRequirements: '~25 MB',
  };
}

export function mobileApplicationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${SITE.url}/#mobileapp`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    applicationCategory: 'NewsApplication',
    operatingSystem: SITE.app.operatingSystem,
    // No Play Store listing exists for this package yet; advertising one in
    // installUrl is a structured-data mismatch. Re-add the Play URL here when
    // the app is published on Google Play.
    installUrl: [SITE.app.apk, SITE.app.uptodown],
    softwareVersion: SITE.app.version,
    datePublished: SITE.founded,
    image: OG_IMAGE,
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumbLd(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.url),
    })),
  };
}

export function faqLd(qa: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function articleLd(post: {
  /** Page path, e.g. '/blog/find-rss-feed-url-any-website/'. */
  path: string;
  title: string;
  description: string;
  body: string;
  author: string;
  authorUrl: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  keywords?: string[];
  /** Schema type override, e.g. 'BlogPosting' for listicles. Default 'Article'. */
  type?: string;
  /** isPartOf target, default '/blog/'. */
  isPartOf?: string;
}) {
  const url = pageUrl(post.path);
  return {
    '@context': 'https://schema.org',
    '@type': post.type ?? 'Article',
    '@id': url,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl,
    },
    publisher: { '@id': ORG_ID },
    inLanguage: SITE.locale,
    image: {
      '@type': 'ImageObject',
      url: post.image ?? OG_IMAGE,
      width: 1200,
      height: 630,
    },
    articleBody: post.body.replace(/<[^>]+>/g, '').slice(0, 5000),
    keywords:
      post.keywords && post.keywords.length
        ? post.keywords
        : ['RSS', 'Curated Feeds', 'productivity', 'content curation'],
    isPartOf: { '@id': pageUrl(post.isPartOf ?? '/blog/') },
    copyrightHolder: { '@id': ORG_ID },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
  };
}

export function privacyPolicyLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/privacy/`,
    url: `${SITE.url}/privacy/`,
    name: 'Privacy Policy',
    description:
      'Curated Feeds privacy policy. We do not collect personal data; all reading activity stays on your device.',
    inLanguage: SITE.locale,
    isPartOf: { '@id': WEBSITE_ID },
    lastReviewed: '2026-11-01',
    specialMeasures: ['No personal data collection', 'Local-first storage'],
  };
}

export function blogCollectionLd(
  posts: { slug: string; title: string; description: string; dateISO: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.url}/blog/#blog`,
    url: `${SITE.url}/blog/`,
    name: `${SITE.name} Blog`,
    description: 'RSS tips, productivity techniques, and content curation strategies.',
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: pageUrl(`/blog/${p.slug}/`),
      datePublished: p.dateISO,
      description: p.description,
    })),
  };
}

/**
 * Speakable, names the passages that read well aloud so assistants and
 * voice surfaces can lift them directly as answers.
 */
export function speakableLd(cssSelectors: string[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
    url,
  };
}

/** ItemList for the blog index: a flat, browsable map of the post hierarchy. */
export function blogListLd(posts: { slug: string; title: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE.url}/blog/#feed`,
    name: 'Curated Feeds Blog',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: pageUrl(`/blog/${post.slug}/`),
      name: post.title,
    })),
  };
}

/** SiteNavigationElement, mirrors the nav so structure is machine-readable. */
export function siteNavigationLd(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${SITE.url}/#nav`,
    name: items.map((i) => i.name),
    url: items.map((i) => pageUrl(i.url)),
  };
}

/**
 * FAQPage with an @id and url, for the pages that publish an FAQ section.
 * The head-to-head pages use qaPageLd instead, because their Q&A is about one
 * comparison rather than a general FAQ.
 */
export function faqPageLd(qa: { q: string; a: string }[], url: string): Record<string, unknown> {
  return {
    ...faqLd(qa),
    '@id': `${url}#faq`,
    url,
  };
}

/** QAPage for Q&A sections on newer pages (never FAQPage, never HowTo). */
export function qaPageLd(qa: { q: string; a: string }[], url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    '@id': `${url}#qa`,
    url,
    mainEntity: qa.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** ItemList for in-article ranked lists (e.g. the compared apps in a listicle). */
export function itemListLd(
  items: { name: string; url?: string }[],
  url: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#list`,
    url,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url
        ? { url: item.url.startsWith('http') ? item.url : pageUrl(item.url) }
        : {}),
    })),
  };
}
