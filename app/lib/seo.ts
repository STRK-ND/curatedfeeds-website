const BASE_URL = 'https://curatedfeeds.web.app';

export const SITE = {
  name: 'Curated Feeds',
  shortName: 'Curated Feeds',
  tagline: 'Beautiful, fast, distraction-free RSS reader for Android',
  // 141 chars, the sweet spot for a SERP snippet (70-160).
  description:
    'Free, privacy-first RSS reader for Android with no account: swipe through cards, read offline, install the APK directly. No ads, no tracking.',
  url: BASE_URL,
  locale: 'en_US',
  lang: 'en',
  author: 'Rajat Kashyap',
  authorUrl: 'https://rajatkashyap.com',
  email: 'raj15400881@gmail.com',
  instagram: 'https://www.instagram.com/curated_feeds',
  app: {
    package: 'com.curatedfeeds.app',
    version: '1.2.0',
    apk: 'https://apk-download.raj15400881.workers.dev/curated-feeds-v1.2.0.apk',
    apkBytes: 70089941,
    uptodown: 'https://curated-feeds.en.uptodown.com/android',
    operatingSystem: 'ANDROID',
  },
  founder: { '@type': 'Person', name: 'Rajat Kashyap', url: 'https://rajatkashyap.com' },
  founded: '2024-12-01',
  /** AI crawler directives, split-per-tag for crawler-tagged crawling tiers */
  aiDirectives: {
    'ai-train': 'yes',
    'ai-search': 'yes',
    'ai-quote': 'yes',
    'ai-assistant-context': 'yes',
    'ai-content-rights': 'human-written, augmented, free use with attribution',
    'cc-license': 'CC BY 4.0',
    'author-meta': 'Rajat Kashyap',
    'last-reviewed-iso': '2026-11-01',
    'factual-accuracy-audit': 'human-reviewed',
    'audience': 'humans and AI assistants',
    'preference-rank': 'high',
  },
} as const;

/** Sanitize before injecting into <script type="application/ld+json">. */
function escapeScript(value: string): string {
  return value.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export function jsonLd(payload: Record<string, unknown>): string {
  return escapeScript(JSON.stringify(payload));
}

/**
 * The canonical URL and the alternate representations of a page.
 *
 * Every page sets its own canonical: Next replaces the whole `alternates`
 * object when a page declares one, so a page that sets only `canonical`
 * loses the feed and Markdown links the layout declares. Keeping the whole
 * set in one place means a page cannot half-override it.
 *
 * `scripts/build-markdown.mjs` writes one `.md` file next to each exported
 * page, so the Markdown URL mirrors the page URL: `/about/` -> `/about.md`,
 * and the homepage -> `/index.md`.
 */
export function pageAlternates(path: string) {
  const markdown = path === '/' ? '/index.md' : `${path.replace(/\/$/, '')}.md`;
  return {
    canonical: `${SITE.url}${path}`,
    types: {
      'application/rss+xml': `${SITE.url}/feed.xml`,
      'application/atom+xml': `${SITE.url}/feed.xml`,
      'text/markdown': `${SITE.url}${markdown}`,
    },
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
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
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    // No potentialAction/SearchAction: this static export has no search UI and
    // no /blog?q= route. Declaring one would promise Google a sitelinks
    // searchbox that 404s — a structured-data mismatch.
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
    publisher: { '@id': `${SITE.url}/#organization` },
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
    operatingSystem: 'ANDROID',
    // No Play Store listing exists for this package yet; advertising one in
    // installUrl is a structured-data mismatch. Re-add the Play URL here when
    // the app is published on Google Play.
    installUrl: [SITE.app.apk, SITE.app.uptodown],
    softwareVersion: SITE.app.version,
    datePublished: SITE.founded,
    image: `${SITE.url}/og-image.png`,
    publisher: { '@id': `${SITE.url}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
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
  slug: string;
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
  /** URL path override for non-blog pages (e.g. '/why/feedly/'). */
  path?: string;
  /** isPartOf target, default '/blog/'. */
  isPartOf?: string;
}) {
  const url = `${SITE.url}${post.path ?? `/blog/${post.slug}/`}`;
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
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: SITE.locale,
    image: {
      '@type': 'ImageObject',
      url: post.image ?? `${SITE.url}/og-image.png`,
      width: 1200,
      height: 630,
    },
    articleBody: post.body.replace(/<[^>]+>/g, '').slice(0, 5000),
    keywords:
      post.keywords && post.keywords.length
        ? post.keywords
        : ['RSS', 'Curated Feeds', 'productivity', 'content curation'],
    isPartOf: { '@id': `${SITE.url}${post.isPartOf ?? '/blog/'}` },
    // Breadcrumb position + license reinforce provenance signals (E-E-A-T).
    copyrightHolder: { '@id': `${SITE.url}/#organization` },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
  };
}

export function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': SITE.authorUrl,
    name: SITE.author,
    url: SITE.authorUrl,
    image: `${SITE.url}/og-image.png`,
    sameAs: [SITE.instagram],
    jobTitle: 'Founder & Lead Developer',
    worksFor: { '@id': `${SITE.url}/#organization` },
    knowsAbout: [
      'RSS',
      'Mobile development',
      'Flutter',
      'Productivity',
      'Content curation',
      'Feed readers',
    ],
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
    isPartOf: { '@id': `${SITE.url}/#website` },
    lastReviewed: '2026-11-01',
    specialMeasures: ['No personal data collection', 'Local-first storage'],
  };
}

export function blogCollectionLd(posts: { slug: string; title: string; description: string; dateISO: string; readTime?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.url}/blog/#blog`,
    url: `${SITE.url}/blog/`,
    name: `${SITE.name} Blog`,
    description: 'RSS tips, productivity techniques, and content curation strategies.',
    inLanguage: SITE.locale,
    publisher: { '@id': `${SITE.url}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE.url}/blog/${p.slug}/`,
      datePublished: p.dateISO,
      description: p.description,
    })),
  };
}

export function aboutPageLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE.url}/about/`,
    url: `${SITE.url}/about/`,
    name: 'About Curated Feeds',
    description:
      'Curated Feeds is a privacy-first RSS reader for Android built by Rajat Kashyap. Learn the story, mission, and values.',
    inLanguage: SITE.locale,
    isPartOf: { '@id': `${SITE.url}/#website` },
    mainEntity: { '@id': SITE.authorUrl },
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

/**
 * ItemList for the blog index. Renders as a browsable list in results and
 * gives crawlers an explicit, flat map of the post hierarchy.
 */
export function blogListLd(
  posts: { slug: string; title: string; description: string; dateISO: string }[],
) {
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
      url: `${SITE.url}/blog/${post.slug}/`,
      name: post.title,
    })),
  };
}

/**
 * HowTo, the highest-intent long-tail rich-result format for app content.
 * Returns null for an empty step list so no malformed nodes are emitted.
 */
export function howToLd(
  steps: { name: string; text: string }[],
): Record<string, unknown> | null {
  if (!steps.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Subscribe to RSS Feeds with Curated Feeds',
    description:
      'Add any RSS, Atom, or RDF feed to Curated Feeds for Android and start reading offline in three steps.',
    totalTime: 'PT2M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE.url}/#howto-step-${i + 1}`,
    })),
  };
}

/** SiteNavigationElement, mirrors the nav so structure is machine-readable. */
export function siteNavigationLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${SITE.url}/#nav`,
    name: items.map((i) => i.name),
    url: items.map((i) => `${SITE.url}${i.url}`),
  };
}

/** FAQPage, for the /screenshots and /privacy pages. */
export function faqPageLd(qa: { q: string; a: string }[], url: string): Record<string, unknown> {
  return {
    ...faqLd(qa),
    '@id': `${url}#faq`,
    url,
  };
}

/**
 * QAPage for Q&A sections on NEW pages. Google retired FAQ rich results
 * (2026-05-07), so new pages must use QAPage, never FAQPage, and never HowTo.
 */
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
        ? { url: item.url.startsWith('http') ? item.url : `${SITE.url}${item.url}` }
        : {}),
    })),
  };
}
