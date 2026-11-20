// Curated Feeds landing. One motif: the card stack. The live queue is the thing.

import Link from 'next/link';
import QueueStage, { type DeckCard } from './components/QueueStage';
import { TrackedDownloadLink } from './components/TrackedDownloadLink';
import {
  softwareApplicationLd,
  mobileApplicationLd,
  faqLd,
  breadcrumbLd,
  speakableLd,
  siteNavigationLd,
} from './lib/seo';
import { APK_MB, pageUrl, SITE } from './lib/site';
import { HOME_NAV } from './lib/nav';
import PageShell from './components/PageShell';

const faqs = [
  {
    q: 'What is Curated Feeds?',
    a: 'A free, privacy-first RSS reader for Android. Swipe right to save an article, left to mark it done. Reads offline, no account, no ads, no tracking.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. 100% free, no ads, no in-app purchases, no premium tier. Reading time is yours, not monetized.',
  },
  {
    q: 'How is my privacy protected?',
    a: 'Your feeds, saved articles and reading history stay on your device. No account, no server sync, no IP logs. Only anonymous Firebase counters; revoke network access to disable.',
  },
  {
    q: 'Will there be an iOS version?',
    a: 'Not at launch. Curated Feeds is Android-first, built in Flutter, tuned for the Android swipe-gesture experience.',
  },
  {
    q: 'Which feeds can I subscribe to?',
    a: 'Any RSS 2.0, Atom or RDF feed. TechCrunch, Hacker News, The Verge, Ars Technica, Stratechery, MIT Technology Review, paste the URL ending in /feed or /rss.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Articles cache on first read so you can revisit them on the train, the plane, or anywhere with no signal.',
  },
  {
    q: 'Where can I download it?',
    a: `Direct APK on this page, version ${SITE.app.version}, ${APK_MB} MB, or from Uptodown. Android 8.0 or later, no permissions beyond storage.`,
  },
];

const steps = [
  {
    name: 'Install the APK',
    text: `Download the file (${APK_MB} MB) and open it on Android 8.0 or later. No store account, no permissions beyond storage for the offline cache.`,
  },
  {
    name: 'Add a feed',
    text: 'Paste any RSS, Atom or RDF URL, or keep one of the eight starter feeds. Group sources into categories like Tech, Design or AI.',
  },
  {
    name: 'Swipe the queue',
    text: 'Right keeps a story, left clears it. The next card is already under your thumb, so the decision takes a second and never comes back.',
  },
];

const features = [
  {
    title: 'Swipe right to keep a story.',
    body: 'The card leaves the queue and lands in Saved, still unread and still yours. No star, no tag, no second filing.',
  },
  {
    title: 'Swipe left and it is gone.',
    body: 'Done means done. The card leaves the stack without a confirmation dialog, and the unread count drops by one.',
  },
  {
    title: 'It reads without a signal.',
    body: 'Every article you open is cached on the phone. The tunnel, the flight, the platform between trains: the story is still there.',
  },
  {
    title: 'No account. No ads. No tracking.',
    body: 'Feeds and history live on your device, not on a server. The only call out is an anonymous counter you can switch off by revoking network access.',
  },
  {
    title: 'Dark, because reading at night is reading.',
    body: 'Indigo ground, paper text, rose for the single active state. The screen steps back so the words can do the work.',
  },
];

const starterFeeds = [
  { name: 'Hacker News', kind: 'Technology' },
  { name: 'TechCrunch', kind: 'Startups' },
  { name: 'The Verge', kind: 'Technology' },
  { name: 'Ars Technica', kind: 'Science' },
  { name: 'MIT Technology Review', kind: 'Research' },
  { name: 'Wired', kind: 'Culture' },
  { name: 'Stratechery', kind: 'Strategy' },
  { name: 'Stripe Increment', kind: 'Engineering' },
];

const deckCards: DeckCard[] = [
  {
    src: '/screenshots/home-feed.webp',
    alt: 'The Curated Feeds queue: cards from TechCrunch, Hacker News, MIT Technology Review and The Verge, 24 unread from 8 sources',
  },
  {
    src: '/screenshots/swipe-gestures.webp',
    alt: 'A Stratechery card marked Saved, tilted over the next card from Ars Technica',
  },
];

export default function Home() {
  return (
    <PageShell
      navOverlay
      data={[
        softwareApplicationLd(),
        mobileApplicationLd(),
        breadcrumbLd([{ name: 'Home', url: '/' }]),
        faqLd(faqs),
        siteNavigationLd(HOME_NAV),
        speakableLd(['h1', '.hero h1'], pageUrl('/')),
      ]}
    >
        {/* 1. Hero: reading in public, the app named once */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__bg">
            {/* Responsive WebP set generated from train-window.jpg (702 KB -> 33-446 KB).
                Keep the JPEG as the last <source>/fallback for old crawlers. */}
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/train-window-640.webp 640w, /assets/train-window-960.webp 960w, /assets/train-window-1440.webp 1440w, /assets/train-window-1920.webp 1920w"
                sizes="100vw"
              />
              <img
                src="/assets/train-window.jpg"
                alt="A newspaper cart and readers at Mathura railway station, with a man reading a Hindi daily in the foreground."
                width={1920}
                height={1440}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          <div className="container hero__inner" data-anim>
            <p className="eyebrow" data-anim-child>
              A free RSS reader for Android
            </p>
            <h1 id="hero-title" data-anim-child>
              Put your <em>reading</em> away.
            </h1>
            <div className="hero__row" data-anim-child>
              <p className="hero__sub">
                A free, privacy-first RSS reader for Android: swipe right to keep a story, left to
                let it go. One card at a time, so the queue never becomes a chore.
              </p>
              <div className="hero__actions">
                <TrackedDownloadLink
                  href={SITE.app.apk}
                  platform="direct"
                  className="btn"
                  ariaLabel={`Download Curated Feeds APK, ${APK_MB} megabytes`}
                >
                  Download the APK
                </TrackedDownloadLink>
                <Link href="/#preview" className="text-link">
                  See the two screens
                </Link>
              </div>
            </div>
            <p className="hero__meta" data-anim-child>
              <span>
                <b>Free</b> forever
              </span>
              <span>
                <b>{APK_MB} MB</b> direct APK
              </span>
              <span>
                <b>Android 8.0</b> or later
              </span>
              <span>
                <b>No account</b>
              </span>
            </p>
          </div>

          <p className="hero__credit">
            Newspapers at Mathura Junction, between trains. Photo:{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:Mathura_railway_station_(42593488361).jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              juggadery, CC BY-SA 2.0
            </a>
          </p>
        </section>

        {/* 2. Statement: why the queue is one card deep */}
        <section className="statement" aria-label="Why one card">
          <div className="container statement__inner" data-anim>
            <p className="eyebrow" data-anim-child>
              Why one card
            </p>
            <p className="statement__lead" data-anim-child>
              The queue is <em>one card deep</em>.
            </p>
            <p className="statement__text" data-anim-child>
              Feeds arrive from everywhere, and the queue gives them one place to land and one
              gesture to clear: right saves a story for later, left marks it done. No stars to find,
              no folders to file, no unread number ticking behind your back.
            </p>
          </div>
        </section>

        {/* 3. Screens: the live queue, and the swipe it produces */}
        <section className="section" id="preview" aria-labelledby="preview-title">
          <div className="container">
            <div className="head" data-anim>
              <div data-anim-child>
                <p className="eyebrow">The two screens</p>
                <h2 id="preview-title">A card, a swipe, and nothing else.</h2>
              </div>
              <p data-anim-child>
                Swipe right to keep a story; swipe left to clear it. The queue stays one card deep,
                so there is never a backlog to manage.
              </p>
            </div>

            <div className="screens">
              <figure className="screens__live" data-anim data-anim-child>
                <QueueStage cards={deckCards} />
                <figcaption className="shot__caption">
                  <b>Fig. 01</b>
                  <span>
                    The live queue. Swipe right to keep a story, left to let it go, and the next
                    card deals up under your thumb.
                  </span>
                </figcaption>
              </figure>

              <figure className="shot" data-anim data-anim-child>
                <img
                  src="/screenshots/swipe-gestures.webp"
                  alt="A Stratechery article card swiped right and marked Saved, with the next Ars Technica card underneath."
                  width={1080}
                  height={1920}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>Fig. 02</b>
                  <span>A right swipe files the story as Saved and deals the next card.</span>
                </figcaption>
              </figure>
            </div>

            <div className="section__foot" data-anim>
              <p data-anim-child>Built for one thumb. Nothing else competes with the story.</p>
              <Link href="/screenshots/" className="text-link" data-anim-child>
                All screenshots
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Features: five behaviours, numbered */}
        <section className="section" id="features" aria-labelledby="features-title">
          <div className="container">
            <div className="head" data-anim>
              <div data-anim-child>
                <p className="eyebrow">What the swipe takes care of</p>
                <h2 id="features-title">Five behaviours, first morning.</h2>
              </div>
              <p data-anim-child>No settings to study, no onboarding carousel.</p>
            </div>

            <div className="features">
              {features.map((f, i) => (
                <article className="feature" key={f.title} data-anim data-anim-child>
                  <span className="features__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Offline: a real platform, a cached story */}
        <section className="offline" id="offline" aria-labelledby="offline-title">
          <div className="container offline__inner" data-anim>
            <div className="offline__copy" data-anim-child>
              <p className="eyebrow">Offline, by design</p>
              <h2 id="offline-title">No signal. The story is still there.</h2>
              <p className="offline__lead">
                Paper does not need a bar of reception. Neither should the article you saved for the
                journey.
              </p>
              <p>
                Open a story once and it is cached on the phone. The underground, the flight, the
                four minutes on a platform with no bars: the article is there exactly where you
                left it.
              </p>
              <Link href="/why/" className="text-link">
                Why offline first
              </Link>
            </div>

            <div className="offline__phone" data-anim-child>
              <div className="offline__note">
                <b>24 unread</b>
                <span>8 sources</span>
              </div>
              <img
                src="/screenshots/home-feed.webp"
                alt="The Curated Feeds queue showing 24 unread articles across 8 sources."
                width={1080}
                height={1920}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* 6. Sources: the eight feeds that are already listed */}
        <section className="section" id="sources" aria-labelledby="sources-title">
          <div className="container">
            <div className="head" data-anim>
              <div data-anim-child>
                <p className="eyebrow">Starter feeds</p>
                <h2 id="sources-title">Eight feeds are already waiting.</h2>
              </div>
              <p data-anim-child>
                The app opens with a starter list covering technology, science, design and
                engineering. Keep all eight, or paste any RSS 2.0, Atom or RDF URL.
              </p>
            </div>

            <ul className="sources__list" data-anim>
              {starterFeeds.map((feed) => (
                <li key={feed.name} data-anim-child>
                  <b>{feed.name}</b>
                  <span>{feed.kind}</span>
                </li>
              ))}
            </ul>

            <div className="sources__foot" data-anim>
              <span data-anim-child>Any RSS 2.0, Atom or RDF feed works.</span>
              <Link href="/sources/" className="text-link" data-anim-child>
                See the full source list
              </Link>
            </div>
          </div>
        </section>

        {/* 7. How it works */}
        <section className="section" id="how-it-works" aria-labelledby="steps-title">
          <div className="container">
            <div className="head" data-anim>
              <div data-anim-child>
                <p className="eyebrow">How it works</p>
                <h2 id="steps-title">Three minutes from APK to first swipe.</h2>
              </div>
              <p data-anim-child>
                No account, no email, no onboarding carousel. Install, add one feed, and the queue
                is yours.
              </p>
            </div>

            <ol className="steps__list" data-anim>
              {steps.map((step) => (
                <li key={step.name} data-anim-child>
                  <h3>{step.name}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. FAQ: native details */}
        <section className="section faq" id="faq" aria-labelledby="faq-title">
          <div className="container faq__grid" data-anim>
            <div className="faq__head" data-anim-child>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title">Straight answers.</h2>
              <p>Privacy, price, iOS, and which feeds work. The why page goes deeper on the rest.</p>
            </div>
            <div className="faq__list" data-anim-child>
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    <span className="q">{f.q}</span>
                    <span className="sign" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Download: the cream field */}
        <section className="download" id="download" aria-labelledby="download-title">
          <div className="container download__inner" data-anim>
            <div data-anim-child>
              <p className="eyebrow">
                Version {SITE.app.version} · {APK_MB} MB
              </p>
              <h2 id="download-title">
                The first step is <em>already open.</em>
              </h2>
              <p className="download__meta">
                No store in between. A direct APK for Android 8.0 or later, free and without an
                account.
              </p>
            </div>
            <div className="download__panel" data-anim-child>
              <p className="download__version">Curated Feeds v{SITE.app.version}</p>
              <p className="download__note">
                No account, no ads, no tracking. Permissions beyond storage: none.
              </p>
              <TrackedDownloadLink
                href={SITE.app.apk}
                platform="direct"
                className="btn"
                ariaLabel={`Download Curated Feeds APK, ${APK_MB} megabytes`}
              >
                Download the APK
              </TrackedDownloadLink>
              <TrackedDownloadLink
                href={SITE.app.uptodown}
                platform="uptodown"
                className="download__alt"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="Get Curated Feeds on Uptodown, opens in a new tab"
              >
                Or get it on Uptodown
              </TrackedDownloadLink>
            </div>
          </div>
        </section>
    </PageShell>
  );
}
