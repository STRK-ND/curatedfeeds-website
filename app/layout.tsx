import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter_Tight } from 'next/font/google';
import { pageAlternates, SITE } from './lib/site';
import { organizationLd, websiteLd } from './lib/seo';
import { StructuredData } from './components/StructuredData';
import './globals.css';
import { AgentationWrapper } from './components/AgentationWrapper';
import FirebaseAnalytics from './components/FirebaseAnalytics';
import GsapMotion from './components/GsapMotion';

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
    'best RSS reader 2027',
    'best RSS reader android 2027',
    'best free RSS app 2027',
    'RSS feed reader 2027',
    'Feedly alternative 2027',
    'Inoreader alternative 2027',
    'top RSS readers 2027',
    'best RSS reader 2026',
    'RSS reader free no account',
    'feed reader android',
    'news aggregator app',
    'RSS app android',
    'privacy first RSS reader',
    'offline RSS reader android',
    'swipe RSS reader',
    'Feedly alternative free',
    'Inoreader alternative free',
    'FeedFlow alternative',
    'Read You alternative',
    'Feeder alternative android',
    'no account RSS reader',
    'no login RSS reader',
    'free RSS reader android',
    'RSS reader without account',
    'RSS reader offline android',
    'ad free RSS reader',
    'dark theme RSS reader',
    'Flutter RSS app',
    'RSS app APK',
    'APK RSS reader',
    'local RSS reader android',
    'privacy RSS app',
    'open source RSS reader android',
    'content curation app android',
    'news reader app android free',
    'RSS feed reader 2026',
    'atom feed reader android',
    'best free RSS app 2026',
    'distraction free news reader',
    'card swipe RSS reader',
    'minimal RSS reader android',
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
  alternates: pageAlternates('/'),
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
      url: SITE.app.uptodown,
    },
    web: { url: SITE.url },
  },
  verification: {
    google: [
      'm4RPBNg-y7I_JR56cFWIKitjefKdKm8jtlO-2j1vRlo',
      'cEDoPC_UikdZRwrUsZWx4zgejghqlSAC2nAn7Adw02o',
    ],
  },
  other: {
    'google-play-app': `app-id=${SITE.app.package}`,
    'mobile-web-app-capable': 'yes',
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
    'msvalidate.01': '50613961B50BC7701DE68F2ED3791347',
    'yandex-verification': '78897164c49fc106',
    'article:author': SITE.author,
    'article:publisher': SITE.url,
  },
  icons: {
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
  themeColor: '#0b0a09',
  colorScheme: 'dark',
};

// Self-hosted via next/font: no render-blocking request to fonts.googleapis.com,
// automatic size-adjusted fallbacks (no layout shift), display: swap.
// Distinct variable names; tokens.css wraps them with the original families as
// fallbacks, so the visual result is identical if loading ever fails.
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif-web',
  display: 'swap',
});
const interTight = Inter_Tight({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans-web',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang} className={`${instrumentSerif.variable} ${interTight.variable}`}>
      <head>
        <script src="https://lumapush.com/sdk/pp_85e3ae6a4ecec672fa9e8e84ef9caab9/sdk.js" data-cfasync="false" defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "zghtdu2j6m");`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <StructuredData data={[organizationLd(), websiteLd()]} />
        <FirebaseAnalytics />
        <GsapMotion />
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
