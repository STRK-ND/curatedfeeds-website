import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, breadcrumbLd, faqPageLd, pageAlternates } from '../lib/seo';
import { StructuredData } from '../components/StructuredData';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Changelog, Every Public Build of Curated Feeds',
  description:
    'Release history of Curated Feeds for Android: the current version 1.2.0 build and the 1.0.0 initial public release, with direct APK downloads and the update policy.',
  alternates: pageAlternates('/changelog/'),
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `${SITE.url}/changelog/`,
    siteName: SITE.name,
    title: 'Curated Feeds Changelog | Version History',
    description:
      'Every public build of Curated Feeds, newest first, with direct APK links and the update policy.',
    images: [`${SITE.url}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curated Feeds Changelog',
    description:
      'Version 1.2.0 and the 1.0.0 initial public release, with direct APK downloads and update policy.',
    images: [`${SITE.url}/og-image.png`],
  },
};

const faqs = [
  {
    q: 'Which version of Curated Feeds should I download?',
    a: 'Version 1.2.0. It is the current public build and the one linked from the download section of this site. It runs on Android 8.0 (Oreo) and later and is roughly 67 MB.',
  },
  {
    q: 'Is version 1.0.0 still available for download?',
    a: 'Not from this site. The download section always points at the newest build. Version 1.0.0 is listed here as the record of the initial public release rather than as a download.',
  },
  {
    q: 'Will updating wipe my feeds or saved articles?',
    a: 'No. Your feed list, saved articles, and reading history are stored on your device, so they carry over when you install a newer build. Nothing has to be re-added or exported first.',
  },
  {
    q: 'How do I find out when a new version is released?',
    a: 'New builds are announced on this page. There is no auto-updater: the app does not update itself in the background, and you download the new APK the same way you did the first one.',
  },
  {
    q: 'How can I check the APK I downloaded is genuine?',
    a: 'Compare the SHA-256 checksum of the file you downloaded with the checksum published in the download section on the home page. The build distributed from this site is signed and verified.',
  },
];

export default function ChangelogPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbLd([
            { name: 'Home', url: '/' },
            { name: 'Changelog', url: '/changelog/' },
          ]),
          faqPageLd(faqs, `${SITE.url}/changelog/`),
        ]}
      />
      <Nav />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Changelog', url: '/changelog/' },
        ]}
      />
      <main id="main" className="changelog-page">
        <section className="page-hero">
          <h1>Changelog</h1>
          <p className="page-lede">
            Every public build of Curated Feeds, newest first. Direct APK downloads, SHA-256 verified
            signed builds, no app store in the middle.
          </p>
        </section>

        <section className="page-section" aria-labelledby="release-history-title">
          <h2 id="release-history-title">Release history</h2>

          <div className="release">
            <div className="release-head">
              <span className="release-version">v1.2.0</span>
              <span className="release-date">Current release</span>
            </div>
            <p>
              The build this site distributes today. The feed is the centre of the app: cards from every
              source you follow, with unread counts and category filters so you can start with what
              matters and close the rest without a second thought.
            </p>
            <ul>
              <li>Home feed with unread counts and category filters across all your sources.</li>
              <li>
                Swipe a card right to save an article for later and left to mark it done, so triage never
                needs a menu.
              </li>
              <li>Dark indigo reading theme tuned for long sessions in low light.</li>
              <li>
                Offline caching: articles are stored as you read them, so they stay open in airplane mode,
                on the subway, and in low-signal areas.
              </li>
              <li>Category organisation for Tech, Design, News, and AI, for focused browsing.</li>
            </ul>
            <a
              href={SITE.app.apk}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M8 3v10M3 8l5 5 5-5" />
              </svg>
              Download v1.2.0, {Math.round(SITE.app.apkBytes / 1048576)} MB
            </a>
          </div>

          <div className="release">
            <div className="release-head">
              <span className="release-version">v1.0.0</span>
              <span className="release-date">2025, Initial public release</span>
            </div>
            <p>
              Version 1.0 was the first stable build, and it already carried the shape of the app: core
              swipe triage, an unlimited list of RSS sources, and offline caching so an article read on the
              train still opens in a tunnel. The public beta ran through 2024 and worked through feedback on
              categories, search, and offline behaviour; stable 1.0 followed in 2025, as the timeline on the
              about page records. Everything since has been refinement of the same idea rather than a new
              direction.
            </p>
          </div>
        </section>

        <section className="page-section" aria-labelledby="update-policy-title">
          <h2 id="update-policy-title">Update policy</h2>
          <p>
            Builds are published as direct APKs on this site. The download section on the home page always
            shows the current version, its size, and the Android version it needs, so you can confirm what
            you are about to install before you tap download. Nothing is fetched from a store, and nothing
            is installed on your behalf.
          </p>
          <p>
            There is no auto-updater. Curated Feeds does not update itself in the background and does not
            check for new builds on its own. When a version is ready, it is announced on this page, and you
            download it the same way you did the first time.
          </p>
        </section>

        <section className="page-section" aria-labelledby="before-update-title">
          <h2 id="before-update-title">Before you update</h2>
          {/* The `.release` scope is the only place the shared list styling
              (bulleted rows at body size) lives in globals.css, so the checklist
              borrows it rather than introducing a second list convention. */}
          <div className="release">
            <ul>
              <li>
                The current APK is about 67 MB, so download it over Wi-Fi rather than mobile data.
              </li>
              <li>Curated Feeds runs on Android 8.0 (Oreo) and later.</li>
              <li>
                Installing an APK downloaded from this site asks for permission to install from your
                browser once. Allow it in that prompt and the install continues as usual.
              </li>
              <li>
                Your feed list and saved articles live on the device, so they survive the update. Nothing
                to re-add and nothing to back up first.
              </li>
            </ul>
          </div>
          <p className="note">
            The version and SHA-256 checksum of the current build are listed in the download section of the
            home page. Verify the checksum of the file you downloaded before installing it.
          </p>
        </section>

        <section className="page-faq" aria-labelledby="changelog-faq-title">
          <h2 id="changelog-faq-title">Questions about updates</h2>
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
          <h2>Install the current build</h2>
          <p>Curated Feeds is free forever, with no ads, no account, and no tracking.</p>
          <div className="blog-cta-actions">
            <a
              href={SITE.app.apk}
              className="cta-button primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download v{SITE.app.version}
            </a>
            <Link href="/screenshots/" className="cta-button secondary">
              Screenshots
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
