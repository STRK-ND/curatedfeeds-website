/**
 * One definition of the site's links, shared by the desktop nav, the mobile
 * menu, the footer and the homepage's SiteNavigationElement JSON-LD. A page
 * added to a list here appears in all of them, so they cannot drift apart.
 */

export type NavLink = { name: string; url: string };

export const PRIMARY_NAV: NavLink[] = [
  { name: 'Screens', url: '/#preview' },
  { name: 'Features', url: '/#features' },
  { name: 'Sources', url: '/sources/' },
  { name: 'FAQ', url: '/#faq' },
];

/** Primary links plus the one call to action the phone menu adds. */
export const MOBILE_NAV: Array<NavLink & { cta?: boolean }> = [
  ...PRIMARY_NAV,
  { name: 'Download', url: '/#download', cta: true },
];

export const FOOTER_NAV: NavLink[] = [
  { name: 'Screens', url: '/#preview' },
  { name: 'Features', url: '/#features' },
  { name: 'How it works', url: '/#how-it-works' },
  { name: 'Starter feeds', url: '/sources/' },
  { name: 'AI feeds (2027)', url: '/sources/ai/' },
  { name: 'Dev feeds (2027)', url: '/sources/developer/' },
  { name: 'Feed finder', url: '/tools/find-feed/' },
  { name: 'RSS Directory (2027)', url: '/directory/' },
  { name: 'FAQ', url: '/#faq' },
  { name: 'Why Curated Feeds', url: '/why/' },
  { name: 'vs Feedly', url: '/why/feedly/' },
  { name: 'vs Inoreader', url: '/why/inoreader/' },
  { name: 'vs Feeder', url: '/why/feeder/' },
  { name: 'vs FeedFlow', url: '/why/feedflow/' },
  { name: 'vs Read You', url: '/why/read-you/' },
  { name: 'vs NewsBlur', url: '/why/newsblur/' },
  { name: 'Blog', url: '/blog/' },
  { name: 'Use cases', url: '/use-cases/' },
  { name: 'Changelog', url: '/changelog/' },
  { name: 'About', url: '/about/' },
  { name: 'Privacy policy', url: '/privacy/' },
  { name: 'Press kit', url: '/press/' },
];

/** The homepage sections, in the order the page presents them. */
export const HOME_NAV: NavLink[] = [
  { name: 'Home', url: '/' },
  { name: 'Screens', url: '/#preview' },
  { name: 'Features', url: '/#features' },
  { name: 'How it works', url: '/#how-it-works' },
  { name: 'Sources', url: '/sources/' },
  { name: 'FAQ', url: '/#faq' },
  { name: 'Download', url: '/#download' },
];
