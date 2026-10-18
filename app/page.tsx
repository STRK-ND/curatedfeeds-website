import Link from 'next/link';
import FevIcon from './components/FevIcon';
import MobileMenu from './components/MobileMenu';
import VisitorStats from './components/VisitorStats';
import { TrackedLink, TrackedDownloadLink } from './components/TrackedLink';
import {
  SITE,
  softwareApplicationLd,
  mobileApplicationLd,
  faqLd,
  breadcrumbLd,
  howToLd,
  siteNavigationLd,
  speakableLd,
} from './lib/seo';
import { StructuredData } from './components/StructuredData';

const features = [
  { title: 'Swipe & Save', description: 'Swipe right to save, left to done. Intuitive gestures make managing your reading list effortless.' },
  { title: 'Beautiful Cards', description: 'Elegant card-based interface with smooth animations and carefully crafted typography.' },
  { title: 'Multiple Sources', description: 'Add unlimited RSS feeds from tech, design, news, science, finance, and any topic you care about.' },
  { title: 'Offline Ready', description: 'Articles cache locally so you can read on the train, on a plane, or anywhere without signal.' },
  { title: 'Dark Theme', description: 'Indigo-purple gradient theme tuned for night reading. Easy on your eyes during long sessions.' },
  { title: 'Categories', description: 'Organize feeds by topic, Tech, Design, News, AI, for focused browsing.' },
];

/** Three onboarding steps, published as HowTo rich results. */
const howToSteps = [
  {
    name: 'Download the free APK',
    text: `Tap Download APK on this page and open the file (version ${SITE.app.version}, about ${Math.round(SITE.app.apkBytes / 1048576)} MB). Curated Feeds installs on Android 8.0 and up, needs no account, and asks for no permissions beyond storage for offline caching.`,
  },
  {
    name: 'Add your first RSS feeds',
    text: 'Paste any RSS 2.0, Atom, or RDF feed URL, usually ending in /feed or /rss, into the add-source field. Start with a few favourites such as Hacker News, TechCrunch, or The Verge.',
  },
  {
    name: 'Swipe to read and organise',
    text: 'Swipe a card right to save an article for later and left to mark it done. Group sources into categories like Tech, Design, or AI to keep your feed focused.',
  },
];

const faqs = [
  {
    q: 'What is Curated Feeds?',
    a: 'Curated Feeds is a free, privacy-first RSS reader for Android. It lets you follow unlimited RSS feeds from tech blogs, news sites, and podcasts in one distraction-free app with swipe-to-save cards. There are no ads, no tracking, and no server-stored reading history.',
  },
  {
    q: 'Is Curated Feeds really free?',
    a: 'Yes. Curated Feeds is 100% free with no ads, no in-app purchases, and no premium tier. We believe reading should not be monetized through attention, your reading time belongs to you.',
  },
  {
    q: 'How does Curated Feeds protect my privacy?',
    a: 'Your feed list, saved articles, and reading history stay on your device. We do not run our own feed-parsing server, do not require an account, do not store IP logs, and do not sell any data. Only anonymous Firebase Analytics counters are recorded; you can disable analytics by turning off network access for the app.',
  },
  {
    q: 'How does Curated Feeds compare to Feedly, Inoreader, or NetNewsWire?',
    a: 'Curated Feeds is offline-first and account-free, unlike Feedly and Inoreader which require accounts and use server-side sync. Unlike NetNewsWire (iOS/Mac only), Curated Feeds targets Android with a swipe-first mobile UX, dark-elegant design, and one-tap categorization. It is built for people who want the simplicity of RSS without the overhead of an account.',
  },
  {
    q: 'Which feeds can I subscribe to?',
    a: 'Any standard RSS 2.0, Atom, or RDF feed URL works. This includes TechCrunch, Hacker News, The Verge, Ars Technica, Stratechery, MIT Technology Review, Wired, TechRadar, Hacker Noon, and hundreds of thousands of others. Paste the feed URL, usually ending in /feed or /rss, into the app.',
  },
  {
    q: 'Does Curated Feeds work without internet?',
    a: 'Yes. Articles cache on first read so you can revisit them in airplane mode, on the subway, or in low-signal areas. The home feed is also available offline once cached.',
  },
  {
    q: 'Where can I download Curated Feeds?',
    a: `Direct APK download is available on this page, version ${SITE.app.version}, about ${Math.round(SITE.app.apkBytes / 1048576)} MB. The app works on Android 8.0 and up, needs no account, and asks for no permissions beyond storage for offline caching.`,
  },
  {
    q: 'Will there be an iOS version?',
    a: 'Not at launch. The app is Android-first, built in Flutter, focused on the Android swipe-gesture experience.',
  },
];

export default function Home() {
  return (
    <>
      <StructuredData
        data={[
          softwareApplicationLd(),
          mobileApplicationLd(),
          breadcrumbLd([{ name: 'Home', url: '/' }]),
          faqLd(faqs),
          howToLd(howToSteps),
          siteNavigationLd([
            { name: 'Home', url: '/' },
            { name: 'Features', url: '/#features' },
            { name: 'Preview', url: '/#preview' },
            { name: 'FAQ', url: '/#faq' },
            { name: 'Blog', url: '/blog/' },
            { name: 'About', url: '/about/' },
            { name: 'Screenshots', url: '/screenshots/' },
            { name: 'Download', url: '/#download' },
          ]),
          // Passages that read cleanly aloud, for voice and AI-assistant answers.
          speakableLd(['h1', '.hero-description', '.faq-item summary'], `${SITE.url}/`),
        ]}
      />

      <div className="noise-overlay" />

      <nav className="nav" aria-label="Primary">
        <div className="nav-content">
          <Link href="/" className="logo" aria-label="Curated Feeds home">
            <FevIcon />
            <span>Curated</span>
          </Link>
          <div className="nav-links">
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/#preview" className="nav-link">Preview</Link>
            <Link href="/blog/" className="nav-link">Blog</Link>
            <Link href="/screenshots/" className="nav-link">Screenshots</Link>
            <Link href="/about/" className="nav-link">About</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
            <Link href="/#download" className="nav-link nav-cta">Download</Link>
          </div>
          <MobileMenu />
        </div>
      </nav>

      <main id="main">
      <header className="hero">
        <div className="hero-content">
          {/* One small element only (Rule 4.7 stack discipline). v1.0.0 was a
              version-label Tell; platform + privacy carry the real signal. */}
          <div className="hero-badges">
            <span className="badge badge-platform" aria-label="Android">Android</span>
            <span className="badge badge-version" aria-label={`Version ${SITE.app.version}`}>v{SITE.app.version}</span>
            <span className="badge badge-privacy" aria-label="Privacy first">Privacy-First</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Your feeds,</span>
            <span className="title-line title-gradient">curated.</span>
          </h1>
          <p className="hero-description">
            A free, distraction-free RSS reader for Android. Swipe through your sources, save for later,
            and read offline. No ads, no tracking.
          </p>
          <div className="hero-actions">
            <TrackedDownloadLink
              href={SITE.app.apk}
              platform="direct"
              className="btn btn-primary"
              ariaLabel={`Download Curated Feeds v${SITE.app.version} for Android (APK, ${(SITE.app.apkBytes / 1048576).toFixed(0)} MB)`}
            >
              <span>Download Free</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 3v10M3 8l5 5 5-5" /></svg>
            </TrackedDownloadLink>
            <TrackedLink href="#preview" event="See Preview" location="hero" className="btn btn-secondary">
              <span>See Preview</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="M8 5v6M5 8h6" /></svg>
            </TrackedLink>
          </div>
        </div>
        {/* Rule 9.F bans div-based fake product UI. The real product shot
            already exists in public/screenshots/, so use it: real asset,
            correct intrinsic dimensions, and it is the LCP element. */}
        <aside className="hero-visual">
          <div className="hero-visual-frame">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export has no image optimizer; asset is pre-optimised WebP */}
            <img
              src="/screenshots/home-feed.webp"
              width={1080}
              height={1920}
              alt="Curated Feeds home feed showing article cards from TechCrunch, Hacker News, MIT Technology Review, and The Verge, with unread count and category filters"
              className="hero-shot"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
        </aside>
      </header>

      <section id="features" className="features" aria-labelledby="features-title">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 id="features-title" className="section-title">Crafted for focused reading</h2>
        </div>
        {/* Cell-count rule (Section 4.7): 6 items in a 2-column grid with a
            full-width lead would strand the 6th in a half-empty row. So the lead
            spans both columns, four sit 2x2, and the last closes the grid at full
            width. Every cell is filled; the composition has rhythm. */}
        <div className="features-grid">
          {features.map((feature, i) => (
            <article
              key={feature.title}
              className={
                i === 0 || i === features.length - 1 ? 'feature-card feature-card-lead' : 'feature-card'
              }
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="howitworks" className="howitworks" aria-labelledby="howitworks-title">
        <div className="section-header">
          <span className="section-label">How it works</span>
          <h2 id="howitworks-title" className="section-title">Get started in three steps</h2>
        </div>
        <ol className="howitworks-steps" aria-label="Steps to start reading with Curated Feeds">
          {howToSteps.map((step, i) => (
            <li key={step.name} className="howitworks-step">
              <span className="howitworks-number" aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="preview" className="preview" aria-labelledby="preview-title">
        <div className="preview-container">
          <div className="preview-left">
            <h2 id="preview-title" className="section-title">Elegant by design</h2>
            <p className="preview-description">
              Every interaction is crafted with intention. From the gentle card animations to the
              perfectly tuned typography, Curated Feeds turns reading into a deliberate daily
              ritual rather than an infinite feed battle.
            </p>
            <dl className="preview-stats" aria-label="Key product statistics">
              <div className="stat"><dt className="sr-only">Cost</dt><dd className="stat-value">100%</dd><dd className="stat-label">Free</dd></div>
              <div className="stat"><dt className="sr-only">Sources</dt><dd className="stat-value">Unlimited</dd><dd className="stat-label">Sources</dd></div>
              <div className="stat"><dt className="sr-only">Ads</dt><dd className="stat-value">0</dd><dd className="stat-label">Ads</dd></div>
            </dl>
          </div>
          {/* Rule 9.F bans div-based fake product UI. Real WebP shots instead:
              the hero shows the feed, so these two cover the variants it does not. */}
          <div className="preview-right">
            <figure className="preview-figure">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-optimised WebP asset */}
              <img
                src="/screenshots/swipe-gestures.webp"
                width={1080}
                height={1920}
                alt="Swipe an article card right to save it, with a second card queued underneath"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Swipe right to save, left to mark done</figcaption>
            </figure>
            <figure className="preview-figure">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-optimised WebP asset */}
              <img
                src="/screenshots/dark-theme.webp"
                width={1080}
                height={1920}
                alt="Dark indigo-purple reading theme with article rows tuned for night reading"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Dark indigo-purple theme for night reading</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="faq" className="faq" aria-labelledby="faq-title">
        <div className="section-header">
          <h2 id="faq-title" className="section-title">Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <div>
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="download" className="download" aria-labelledby="download-title">
        <div className="download-content">
          <div className="download-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M24 28l8 8 8-8" />
              <path d="M32 12v24" />
              <path d="M12 36v8a8 8 0 008 8h24a8 8 0 008-8v-8" />
            </svg>
          </div>
          <h2 id="download-title" className="download-title">Ready to take back your attention?</h2>
          <p className="download-description">
            Download Curated Feeds for Android, free forever, no ads, no account required. Available worldwide.
          </p>
          <div className="download-actions">
            <TrackedDownloadLink
              href={SITE.app.apk}
              platform="direct"
              className="download-btn"
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="Download Curated Feeds APK (Android, free)"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M20 8v20M10 18l10 10 10-10" stroke="white" strokeWidth="2" fill="none" />
                <path d="M10 26v6h20v-6" stroke="white" strokeWidth="2" fill="none" />
              </svg>
              <span>Direct<br /><strong>Download APK</strong></span>
            </TrackedDownloadLink>
          </div>
          <p className="download-meta">
            Version <strong>{SITE.app.version}</strong> · {Math.round(SITE.app.apkBytes / 1048576)} MB · Android{' '}
            {SITE.app.operatingSystem === 'ANDROID' ? '8.0+' : SITE.app.operatingSystem} · SHA-256 verified signed build
          </p>
        </div>
      </section>

      <section className="learn" aria-labelledby="learn-title">
        <div className="section-header">
          <h2 id="learn-title" className="section-title">Get more out of your feeds</h2>
        </div>
        <ul className="learn-list">
          <li>
            <Link href="/blog/10-best-tech-blogs-rss/">
              10 Best Tech Blogs to Follow in Your RSS Reader
            </Link>
            <span>The highest-signal tech sources, with feed URLs and update cadence.</span>
          </li>
          <li>
            <Link href="/blog/rss-vs-social-media/">
              RSS vs Social Media: Why RSS Still Wins for Focus
            </Link>
            <span>Attention economics, with measured numbers from three years of RSS-first reading.</span>
          </li>
          <li>
            <Link href="/blog/productivity-tips-rss-readers/">
              10 Productivity Tips for RSS Power Users
            </Link>
            <span>Habits that compound: daily limits, pruning rituals, and archive reviews.</span>
          </li>
          <li>
            <Link href="/screenshots/">See Curated Feeds in action</Link>
            <span>App screenshots of the home feed, swipe gestures, and dark theme.</span>
          </li>
        </ul>
      </section>

      </main>

      <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <div className="footer-logo">
            <FevIcon width={24} height={24} />
            <span>Curated Feeds</span>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <Link href="/blog/">Blog</Link>
            <Link href="/screenshots/">Screenshots</Link>
            <Link href="/about/">About</Link>
            <Link href="/privacy/">Privacy</Link>
            <a href="/sitemap.xml">Sitemap</a>
            <a href="/feed.xml" rel="alternate" type="application/rss+xml">RSS</a>
          </nav>
        </div>
        <VisitorStats />
        <div className="footer-copy">© 2024-{new Date().getFullYear()} {SITE.name}. Made by Rajat Kashyap.</div>
      </footer>
    </>
  );
}
