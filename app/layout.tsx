import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AgentationWrapper } from './components/AgentationWrapper';
import FirebaseAnalytics from './components/FirebaseAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Curated Feeds — Beautiful RSS Reader',
  description: 'Experience RSS feeds like never before. Beautiful cards, effortless swipes, and dark-elegant design make reading your favorite sources a daily ritual.',
  keywords: ['RSS reader', 'feed reader', 'news aggregator', 'Flutter', 'mobile app'],
  authors: [{ name: 'Curated Feeds Team' }],
  creator: 'Curated Feeds',
  metadataBase: new URL('https://curatedfeeds.web.app'),
  openGraph: {
    title: 'Curated Feeds — Beautiful RSS Reader',
    description: 'Experience RSS feeds like never before. Beautiful cards, effortless swipes, and dark-elegant design make reading your favorite sources a daily ritual.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Curated Feeds',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curated Feeds — Beautiful RSS Reader',
    description: 'Experience RSS feeds like never before. Beautiful cards, effortless swipes, and dark-elegant design make reading your favorite sources a daily ritual.',
    creator: '@curatedfeeds',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://curatedfeeds.web.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FirebaseAnalytics />
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}