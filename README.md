<div align="center">

# Curated Feeds

**A fast, privacy-first RSS reader for Android built for focused, distraction-free reading.**

[![Platform](https://img.shields.io/badge/Platform-Android_8.0+-3DDC84.svg?style=flat&logo=android&logoColor=white)](https://curatedfeeds.web.app/)
[![Pricing](https://img.shields.io/badge/Price-100%25_Free_Forever-blue.svg)](https://curatedfeeds.web.app/why/)
[![APK Size](https://img.shields.io/badge/APK_Size-~67_MB-orange.svg)](https://pub-2ff655291e5746ad8841a0e14a198544.r2.dev/CuratedFeeds.apk)
[![Website](https://img.shields.io/badge/Website-curatedfeeds.web.app-brightgreen.svg)](https://curatedfeeds.web.app/)
[![OPML Ready](https://img.shields.io/badge/OPML-2.0_Compatible-blueviolet.svg)](https://curatedfeeds.web.app/opml/)

[Official Website](https://curatedfeeds.web.app/) • [Download APK](https://pub-2ff655291e5746ad8841a0e14a198544.r2.dev/CuratedFeeds.apk) • [Uptodown Store](https://curated-feeds.en.uptodown.com/android) • [RSS Directory](https://curatedfeeds.web.app/directory/) • [OPML Bundles](https://curatedfeeds.web.app/opml/)

</div>

---

## ⚡ What is Curated Feeds?

Curated Feeds replaces the endless algorithmic scroll with an intentional deck of cards:
- **Card-Based Triage:** Swipe right to save an article, swipe left to mark it done.
- **No Account Required:** Feeds, saved articles, and reading history stay 100% on your device.
- **Zero Ads & Zero Tracking:** No trackers, no ad networks, no paywall popups.
- **Full Offline Caching:** Articles cache on first read so you can read uninterrupted in flights, subways, and commutes.
- **Built for Android:** Written in Flutter & Dart for fast, fluid performance on Android 8.0+.

---

## 📥 Downloads & Distribution

- **Direct APK (Recommended):** [Download Curated Feeds APK v1.2.0 (~67 MB)](https://pub-2ff655291e5746ad8841a0e14a198544.r2.dev/CuratedFeeds.apk)
- **Uptodown App Store:** [Curated Feeds on Uptodown](https://curated-feeds.en.uptodown.com/android)
- **Minimum Requirements:** Android 8.0 (Oreo) or higher.

---

## 🌐 Web Tools & Curated Resources

Curated Feeds also publishes free tools and verified RSS resources for the open web:

- 🔍 **[RSS Feed Finder Tool](https://curatedfeeds.web.app/tools/find-feed/):** Scan any website address to discover hidden RSS, Atom, and RDF feed URLs instantly.
- 📁 **[Curated OPML Feed Bundles (2027)](https://curatedfeeds.web.app/opml/):** Pre-packaged OPML 2.0 XML collections for 1-click import into Curated Feeds, Feedly, Inoreader, or NetNewsWire:
  - [Top 50 Global Publications OPML](https://curatedfeeds.web.app/opml/all-50-publications.opml)
  - [Tech & Startups OPML Bundle](https://curatedfeeds.web.app/opml/tech-startups.opml)
  - [AI & Machine Learning OPML Bundle](https://curatedfeeds.web.app/opml/ai-machine-learning.opml)
  - [Cybersecurity & InfoSec OPML Bundle](https://curatedfeeds.web.app/opml/cybersecurity-2027.opml)
  - [Developer & Architecture OPML Bundle](https://curatedfeeds.web.app/opml/developer-engineering.opml)
  - [Crypto & Web3 Protocols OPML](https://curatedfeeds.web.app/opml/crypto-web3.opml)
- 📰 **[50 Best Publications RSS Directory (2027)](https://curatedfeeds.web.app/directory/):** Verified feed endpoints for The Verge, BBC, Reuters, NYT, Wired, Nature, TechCrunch, Ars Technica, and more.
- 🛠️ **[Platform RSS Extraction Guides](https://curatedfeeds.web.app/tools/find-feed/):** Step-by-step extraction guides for [Substack](https://curatedfeeds.web.app/tools/find-feed/substack/), [Medium](https://curatedfeeds.web.app/tools/find-feed/medium/), [YouTube](https://curatedfeeds.web.app/tools/find-feed/youtube/), [Reddit](https://curatedfeeds.web.app/tools/find-feed/reddit/), [Ghost](https://curatedfeeds.web.app/tools/find-feed/ghost/), [GitHub](https://curatedfeeds.web.app/tools/find-feed/github/), [Dev.to](https://curatedfeeds.web.app/tools/find-feed/dev-to/), and [Bluesky](https://curatedfeeds.web.app/tools/find-feed/bluesky/).
- ⚖️ **[Honest Head-to-Head Comparisons](https://curatedfeeds.web.app/why/):**
  - [Curated Feeds vs Feedly](https://curatedfeeds.web.app/why/feedly/)
  - [Curated Feeds vs Inoreader](https://curatedfeeds.web.app/why/inoreader/)
  - [Curated Feeds vs Feeder](https://curatedfeeds.web.app/why/feeder/)
  - [Curated Feeds vs FeedFlow](https://curatedfeeds.web.app/why/feedflow/)
  - [Curated Feeds vs Read You](https://curatedfeeds.web.app/why/read-you/)
  - [Curated Feeds vs NewsBlur](https://curatedfeeds.web.app/why/newsblur/)

---

## 💻 Website Tech Stack

The [curatedfeeds.web.app](https://curatedfeeds.web.app/) website is a statically exported Next.js web application:

- **Framework:** Next.js 16 (Turbopack SSG export)
- **UI:** React 19, TypeScript, Tailwind CSS 4, Custom Design System
- **SEO & Indexing:** Complete JSON-LD structured data (`SoftwareApplication`, `TechArticle`, `CollectionPage`, `FAQPage`), XML Sitemap, IndexNow Protocol
- **AI Readiness:** Markdown sibling mirrors for every route + `llms.txt` and `llms-full.txt`

### Local Development

```bash
git clone https://github.com/STRK-ND/curatedfeeds-website.git
cd curatedfeeds-website
npm install
npm run dev
```

### Build & Static Export

```bash
npm run build
```

Exports all 115 static pages and markdown twins into `out/`.

### Submit to Search Engines (IndexNow)

```bash
npm run indexnow
```

---

## 📄 License & Attribution

Built with focus by **Rajat Kashyap** ([rajatkashyap.com](https://rajatkashyap.com)).  
© 2026 Curated Feeds. All rights reserved.
