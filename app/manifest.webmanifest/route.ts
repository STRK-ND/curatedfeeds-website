import { SITE } from '../lib/site';

/**
 * The web app manifest, built from site config so the name, description and
 * download shortcut cannot point at an older build than the rest of the site.
 */
export const dynamic = 'force-static';

const THEME_COLOR = '#0b0a09';

const manifest = {
  name: `${SITE.name} - RSS Reader`,
  short_name: SITE.shortName,
  description:
    'Privacy-first RSS reader for Android. Beautiful, distraction-free. Free, no ads, no tracking.',
  id: '/?source=pwa',
  start_url: '/?source=pwa',
  scope: '/',
  display: 'standalone',
  display_override: ['window-controls-overlay', 'browser', 'standalone'],
  orientation: 'portrait-primary',
  background_color: THEME_COLOR,
  theme_color: THEME_COLOR,
  lang: SITE.lang,
  dir: 'ltr',
  categories: ['news', 'productivity', 'books'],
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.webp', sizes: '512x512', type: 'image/webp', purpose: 'any' },
    { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
  shortcuts: [
    {
      name: 'Download APK',
      short_name: 'Download',
      description: 'Download Curated Feeds for Android',
      url: `https://apk-download.raj15400881.workers.dev/v${SITE.app.version}?source=pwa_shortcut`,
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    {
      name: 'Blog',
      short_name: 'Blog',
      description: 'RSS tips and content curation guides',
      url: '/blog/?source=pwa_shortcut',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    {
      name: 'Screenshots',
      short_name: 'Screenshots',
      description: 'See the app in action',
      url: '/screenshots/?source=pwa_shortcut',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    },
  ],
  screenshots: [
    {
      src: '/og-image.png',
      sizes: '1200x630',
      type: 'image/png',
      form_factor: 'wide',
      label: 'Curated Feeds dashboard',
    },
    {
      src: '/screenshots/home-feed.webp',
      sizes: '1080x1920',
      type: 'image/webp',
      form_factor: 'narrow',
      label: 'Home feed with article cards',
    },
  ],
  prefer_related_applications: false,
  edge_side_panel: { preferred_width: 480 },
};

export function GET() {
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
