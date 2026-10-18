import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SITE, organizationLd, websiteLd } from './lib/seo';
import { StructuredData } from './components/StructuredData';
import './globals.css';
import { AgentationWrapper } from './components/AgentationWrapper';
import FirebaseAnalytics from './components/FirebaseAnalytics';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}, Free Privacy-First RSS Reader for Android`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'RSS reader',
    'RSS reader android',
    'best RSS reader 2026',
    'feed reader',
    'news aggregator',
    'RSS app',
    'privacy first RSS',
    'offline RSS reader',
    'swipe RSS app',
    'Feedly alternative',
    'Inoreader alternative',
    'no ads RSS reader',
    'free RSS reader',
    'dark theme RSS',
    'Flutter RSS app',
  ],
  authors: [{ name: SITE.author, url: SITE.authorUrl }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  category: 'productivity',
  classification: 'Productivity, News',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    // Self-canonical for the homepage only. Every other page sets its own
    // alternates.canonical, no hardcoded <link rel="canonical"> in <head>.
    canonical: SITE.url,
    types: {
      'application/rss+xml': `${SITE.url}/feed.xml`,
      'application/atom+xml': `${SITE.url}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}, Beautiful, Privacy-First RSS Reader for Android`,
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Curated Feeds, privacy-first RSS reader for Android',
        type: 'image/png',
      },
    ],
    countryName: 'Worldwide',
    emails: [SITE.email],
    phoneNumbers: [],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.name}, Beautiful, Privacy-First RSS Reader`,
    description: SITE.description,
    images: [`${SITE.url}/og-image.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE.name,
  },
  appLinks: {
    android: {
      package: SITE.app.package,
      url: SITE.app.apk,
    },
    web: { url: SITE.url },
  },
  other: {
    'google-play-app': `app-id=${SITE.app.package}`,
    'mobile-web-app-capable': 'yes',
    // AI crawler directives, each tag is its own name=key for crawl-tier parsing
    'ai-train': SITE.aiDirectives['ai-train'],
    'ai-search': SITE.aiDirectives['ai-search'],
    'ai-quote': SITE.aiDirectives['ai-quote'],
    'ai-assistant-context': SITE.aiDirectives['ai-assistant-context'],
    'ai-content-rights': SITE.aiDirectives['ai-content-rights'],
    'cc-license': SITE.aiDirectives['cc-license'],
    'author-meta': SITE.aiDirectives['author-meta'],
    'last-reviewed-iso': SITE.aiDirectives['last-reviewed-iso'],
    'factual-accuracy-audit': SITE.aiDirectives['factual-accuracy-audit'],
    'ai-content-declaration': `${SITE.aiDirectives['ai-content-rights']} · audience=${SITE.aiDirectives.audience} · review=${SITE.aiDirectives['factual-accuracy-audit']}`,
    'content-signal-preference': `ai-train=${SITE.aiDirectives['ai-train']}, ai-search=${SITE.aiDirectives['ai-search']}, ai-quote=${SITE.aiDirectives['ai-quote']}, ai-assistant-context=${SITE.aiDirectives['ai-assistant-context']}`,
    'preference-rank': SITE.aiDirectives['preference-rank'],
    // Search Console verification token (docs/search-console.md).
    'google-site-verification': 'CikowM8TK0sklZUlYWe2jZVcJrbNtr5l4oF-v0c4HMU',
    // Steward of the content, per Google's E-E-A-T guidance.
    'article:author': SITE.author,
    'article:publisher': SITE.url,
  },
  icons: {
    // PNG first: some crawlers and legacy launchers do not resolve SVG icons.
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      { url: '/icon-192.svg', type: 'image/svg+xml', sizes: '192x192' },
      { url: '/icon-512.svg', type: 'image/svg+xml', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0e1a' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Keyboard/screen-reader landmark skip link, an accessibility
            signal Google folds into its page-experience evaluation. */}
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <StructuredData data={[organizationLd(), websiteLd()]} />
        <FirebaseAnalytics />
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
