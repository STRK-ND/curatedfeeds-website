# Deliverable D — Content recommendations

**Target:** https://curatedfeeds.web.app

## Existing assets (already good)
- `/` homepage with features, FAQ, download
- `/sources/` starter feeds directory (high link-earning potential)
- `/why/` comparison vs Feedly/Inoreader/NetNewsWire
- `/use-cases/` reader profiles
- `/blog/` 5 posts (tech blogs, RSS vs social media, productivity tips, find RSS URL, morning routine)
- `/press/` press kit
- `/about/`, `/privacy/`, `/screenshots/`, `/changelog/`

## Recommended new/expanded content (avoid cannibalization; only create where gap exists)

1. **Dedicated landing page: "RSS reader for Android"** (`/rss-reader-android/`)
   - Target: "RSS reader for Android", "Android RSS reader", "free RSS reader Android"
   - Consolidates core commercial intent; currently homepage targets broadly.
2. **Feature pages (only where not already covered)**
   - `/features/offline-reading/` — "offline RSS reader"
   - `/features/swipe-triage/` — "swipe to save articles"
   - `/features/dark-theme/` — "dark mode RSS reader"
   - Keep thin; merge into homepage sections if duplication risk.
3. **Comparison hub** (`/compare/`)
   - "Curated Feeds vs Feedly", "vs Inoreader", "vs NetNewsWire", "vs FeedFlow"
   - Expand existing `/why/` into individual comparison pages to capture long-tail comparison queries.
4. **Educational guides (link magnets)**
   - "What is RSS and how does it work" (foundational, earns links from educators)
   - "How to create an RSS feed for your blog/website"
   - "OPML import/export guide" (if app supports; verify first — currently NOT supported; do not claim)
   - "RSS for journalists/researchers" use-case deep dives
5. **Resource: "Curated list of 100 best RSS feeds"** (expand `/sources/`)
   - Highly linkable; update annually; earns editorial backlinks.
6. **Original research**
   - "Attention economics: RSS vs social media" (extend existing blog post with data)
   - Survey of RSS reader usage — earns citations.
7. **Press/brand assets page** already exists; add a `/media-kit/` with downloadable logo pack (already in /press).

## Avoid
- Thin duplicate pages targeting near-identical keywords (e.g., separate pages for "RSS reader" and "feed reader" with same content).
- Pages claiming unsupported features (iOS, OPML, full-text search, sync, desktop).
- Auto-generated doorway pages.

## Internal linking
- Every blog post → `/sources/`, `/why/`, download CTA.
- `/sources/` → relevant blog posts.
- Add breadcrumbs (already component) on all pages.

## Conversion tracking (measurement gap)
- The site tracks `app_download` CTA clicks and a `downloads` counter, but these measure clicks, not actual APK installations.
- Because distribution is a direct APK (no app store), true install/activation cannot be measured from the website. Recommend: add a first-run analytics ping in the app (e.g., on first launch) to count real activations, and tag it by source/referrer where possible. Until then, report CTA clicks and installs separately and never treat clicks as installs.
- Track referral traffic by domain in Firebase/GA4 to attribute backlink value.

## Technical SEO notes (from site audit context)
- Sitemap and robots already correct (recent commit fixed).
- 404 noindex header set.
- Consider adding `llms.txt` (already present) and keep `ai-catalog.json` updated.
- Monitor Core Web Vitals; ensure screenshots WebP.
PYEOF
echo done