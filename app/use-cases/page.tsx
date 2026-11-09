import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, breadcrumbLd, faqPageLd, pageAlternates } from '../lib/seo';
import { StructuredData } from '../components/StructuredData';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Use Cases, Built for How You Read',
  description:
    'Reader profiles mapped to real Curated Feeds capabilities: commuting offline, developer changelogs, research triage, minimalist news, night reading, and privacy-first reading on Android.',
  alternates: pageAlternates('/use-cases/'),
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `${SITE.url}/use-cases/`,
    siteName: SITE.name,
    title: 'Curated Feeds Use Cases, Built for How You Read',
    description:
      'Six reading habits and the app features that serve each one, from offline caching to on-device privacy.',
  images: [`${SITE.url}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curated Feeds Use Cases',
    description: 'Six reading habits, mapped to the features that serve them.',
    images: [`${SITE.url}/og-image.png`],
  },
};

const faqs = [
  {
    q: 'Does it work offline?',
    a: 'Yes. Articles cache on first read, so saved and already-opened articles stay available in airplane mode, on the subway, or in low-signal areas. You add and refresh feeds when you are back on a connection.',
  },
  {
    q: 'How many feeds can I add?',
    a: 'Unlimited, across any mix of RSS 2.0, Atom, and RDF feeds. The practical limit is your own attention, which is why the app organizes sources into categories instead of one endless list.',
  },
  {
    q: 'Can I organise by topic?',
    a: 'Yes. Feeds are grouped into categories that you define, so work sources, news, and hobby reading stay separate. Swipe-to-save triage then keeps the unread queue short in each one.',
  },
  {
    q: 'Does it need an account?',
    a: 'No. Curated Feeds requires no sign-up, no email, and no password. Your feed list, categories, saved articles, and reading history stay on your device, and the only telemetry is anonymous analytics counters.',
  },
];

/** One reader habit per card, mapped to features the app actually ships. */
const readers = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 019 9" />
        <path d="M12 7a5 5 0 015 5" />
        <path d="M4 4l16 16" />
      </svg>
    ),
    title: 'The Commuter',
    body: 'Articles cache on first read, so reading continues on the subway, on a plane, or anywhere the signal drops. Adding feeds and refreshing them is a task for Wi-Fi at home, not for a moving train.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 6l-5 6 5 6" />
        <path d="M16 6l5 6-5 6" />
      </svg>
    ),
    title: 'The Developer',
    body: 'Unlimited RSS 2.0, Atom, and RDF feeds mean changelogs, release notes, engineering blogs, and Hacker News all arrive in one card feed. Categories keep work sources separate from everything else.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
    title: 'The Researcher',
    body: 'Categories follow your fields, so a literature review and a news scan never collide. Swipe triage keeps the unread list short, and saved articles accumulate as a personal reference shelf you can revisit.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        <path d="M4 12h3M17 12h3" />
      </svg>
    ),
    title: 'The News Minimalist',
    body: 'A small, deliberate source list, read card by card. There is no algorithmic feed, no infinite scroll, and no notification badges pulling you back before you decide to open the app.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
      </svg>
    ),
    title: 'The Night Reader',
    body: 'The dark indigo theme is tuned for long low-light sessions, so late reading is easy on the eyes and does not flood the room with a bright white screen.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </svg>
    ),
    title: 'The Privacy-First Reader',
    body: 'No account, no ad SDKs, and no reading-habit tracking. Your feed list and history stay on your device, and the only analytics are anonymous counters that cannot be tied back to you.',
  },
];

export default function UseCasesPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbLd([
            { name: 'Home', url: '/' },
            { name: 'Use Cases', url: '/use-cases/' },
          ]),
          faqPageLd(faqs, `${SITE.url}/use-cases/`),
        ]}
      />
      <Nav />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Use Cases', url: '/use-cases/' },
        ]}
      />
      <main id="main" className="use-cases-page">
        <section className="page-hero">
          <h1>Built for how you read</h1>
          <p className="page-lede">
            One app, several reading habits. Every profile below is mapped to features Curated
            Feeds actually has: offline caching, unlimited RSS feeds, categories, swipe triage, a
            dark theme, and on-device privacy. Feature list reviewed against version{' '}
            {SITE.app.version} on November 1, 2026.
          </p>
        </section>

        <section className="page-section" aria-label="Reader profiles">
          <div className="panel-grid">
            {readers.map((reader) => (
              <article key={reader.title} className="panel">
                <span className="panel-icon">{reader.icon}</span>
                <h3>{reader.title}</h3>
                <p>{reader.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="a-day-title">
          <h2 id="a-day-title">A day with Curated Feeds</h2>
          <p>
            The app separates monitoring from reading, so checking what arrived is a thirty-second
            task and reading is a deliberate block. The same split runs through our{' '}
            <Link href="/blog/productivity-tips-rss-readers/">productivity tips for RSS readers</Link>
            .
          </p>
          <h3>1. Morning triage</h3>
          <p>
            Open the feed once and swipe through the new cards. Swipe right to save what deserves a
            read, left to mark the rest done. In half a minute the unread list is short and the
            queue holds only what survived a decision.
          </p>
          <h3>2. The reading block</h3>
          <p>
            Later, with time set aside, open your saved articles. Cached pages stay available
            offline, so the block is yours even on a train, a plane, or a café with poor signal.
          </p>
          <h3>3. Close the app</h3>
          <p>
            When the block ends, close the app with nothing chasing you. No notification badges and
            no infinite scroll wait on the other side, so the next open starts from your list
            rather than from habit.
          </p>
        </section>

        <section className="page-section" aria-labelledby="feed-list-title">
          <h2 id="feed-list-title">Feed list sizes that work</h2>
          <p>
            A tight list beats a bloated one. Between ten and thirty sources is a range most people
            can actually finish, and every addition past that point is more likely to become noise
            than signal. Categories help more than folders: group feeds by topic so each opening of
            the app is a short, titled list rather than one undifferentiated stream.
          </p>
          <p>
            Prune on a schedule. Once a month, scan each category for sources whose last several
            posts you never saved, and unsubscribe without ceremony. A smaller list that you finish
            reading is worth a list you finish, not a stream you scroll past, and our{' '}
            <Link href="/blog/productivity-tips-rss-readers/">RSS productivity guide</Link> and{' '}
            <Link href="/sources/">starter feeds</Link> are good places to build one from.
          </p>
        </section>

        <section className="page-section page-faq" aria-labelledby="use-cases-faq-title">
          <h2 id="use-cases-faq-title">Questions</h2>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <details key={item.q} className="faq-item" open={i === 0}>
                <summary>{item.q}</summary>
                <div>
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="blog-cta">
          <h2>Find your reading profile?</h2>
          <p>
            Download Curated Feeds for Android, free forever, no ads, no account required, version{' '}
            {SITE.app.version}.
          </p>
          <div className="blog-cta-actions">
            <Link href={SITE.app.apk} className="cta-button primary">
              Download APK
            </Link>
            <Link href="/sources/" className="cta-button secondary">
              Starter feeds
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
