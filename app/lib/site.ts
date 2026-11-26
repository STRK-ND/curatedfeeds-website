import type { Metadata } from 'next';

/**
 * Everything about the site that more than one file needs: the origin, the
 * shipped app version, the APK size, and the metadata shape every page
 * shares. Pages supply words; this module supplies the rest.
 */
const BASE_URL = 'https://curatedfeeds.web.app';
const APP_VERSION = '1.2.0';

export const SITE = {
  name: 'Curated Feeds',
  shortName: 'Curated Feeds',
  // 141 chars, the sweet spot for a SERP snippet (70-160).
  description:
    'Free, privacy-first RSS reader for Android with no account: swipe through cards, read offline, install the APK directly. No ads, no tracking.',
  url: BASE_URL,
  locale: 'en_US',
  lang: 'en',
  author: 'Rajat Kashyap',
  authorUrl: 'https://curatedfeeds.web.app',
  email: 'raj15400881@gmail.com',
  instagram: 'https://www.instagram.com/curated_feeds',
  app: {
    package: 'com.curatedfeeds.app',
    version: APP_VERSION,
    apk: `https://apk-download.raj15400881.workers.dev/curated-feeds-v${APP_VERSION}.apk`,
    apkBytes: 70089941,
    uptodown: 'https://curated-feeds.en.uptodown.com/android',
    operatingSystem: 'ANDROID',
  },
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

/** The size the download buttons quote, derived from the shipped build. */
export const APK_MB = Math.round(SITE.app.apkBytes / 1048576);

export const pageUrl = (path: string) => `${SITE.url}${path}`;

/**
 * The canonical URL and the alternate representations of a page.
 *
 * Next replaces the whole `alternates` object when a page declares one, so
 * every page has to carry the feed and Markdown links or lose them. Keeping
 * the whole set here means a page cannot half-override it.
 *
 * `scripts/build-markdown.mjs` writes one `.md` file next to each exported
 * page, so the Markdown URL mirrors the page URL: `/about/` -> `/about.md`,
 * and the homepage -> `/index.md`.
 */
export function pageAlternates(path: string) {
  const markdown = path === '/' ? '/index.md' : `${path.replace(/\/$/, '')}.md`;
  return {
    canonical: pageUrl(path),
    types: {
      'application/rss+xml': `${SITE.url}/feed.xml`,
      'application/atom+xml': `${SITE.url}/feed.xml`,
      'text/markdown': `${SITE.url}${markdown}`,
    },
  };
}

const OG_IMAGE = `${SITE.url}/og-image.png`;

type PageMetadata = {
  path: string;
  title: string;
  description: string;
  /** Heading used by OpenGraph and Twitter when it should differ from the title. */
  socialTitle?: string;
  socialDescription?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  robots?: Metadata['robots'];
  article?: { publishedTime: string; modifiedTime: string; author: string };
};

/**
 * The metadata block every page shares. A page names its path and its words;
 * the canonical, feed alternates, OpenGraph and Twitter cards follow from
 * that, so no page can ship with half a card or the wrong canonical.
 */
export function pageMetadata({
  path,
  title,
  description,
  socialTitle,
  socialDescription,
  keywords,
  type = 'website',
  robots,
  article,
}: PageMetadata): Metadata {
  const shareTitle = socialTitle ?? title;
  const shareDescription = socialDescription ?? description;
  return {
    title,
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    authors: [{ name: SITE.author, url: SITE.authorUrl }],
    alternates: pageAlternates(path),
    ...(robots ? { robots } : {}),
    openGraph: {
      type,
      locale: SITE.locale,
      url: pageUrl(path),
      siteName: SITE.name,
      title: shareTitle,
      description: shareDescription,
      images: [OG_IMAGE],
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [article.author],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [OG_IMAGE],
    },
  };
}
