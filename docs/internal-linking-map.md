# Internal Linking Map — curatedfeeds.web.app

Documented per the content-optimization spec (3.5.7). Every link is contextual,
descriptive-anchored, and points to a page that earns the click. No orphan pages:
every URL in the sitemap is reachable from the nav or another page.

## Conversion pages (download funnels)

| Page | Linked from |
|---|---|
| `/` (download section `/#download`) | every page's nav + footer; `/screenshots/` CTA; `/blog/` CTA |
| APK (external, `SITE.app.apk`) | homepage hero + download panel, `/press/`, `/about/`, blog CTAs |
| Uptodown (external) | homepage download panel, `/blog/` CTA, `/press/` |

## Hub and money pages

| Page | Role | Linked from |
|---|---|---|
| `/blog/best-rss-readers-android-2026/` | commercial listicle — primary money page | `/blog/` index (newest first), `/why/feedly/` CTA ("All 8 readers compared"), `/about/` founder bio |
| `/why/feedly/` | single-alternative comparison | `/why/` hub, `/blog/best-rss-readers-android-2026/` (cross-link between alternatives) |
| `/why/inoreader/` | single-alternative comparison | `/why/` hub, listicle cross-link |
| `/why/` | comparison hub | homepage (`/offline/` section "Why offline first"), screenshots page |

## Supporting pages

| Page | Linked from |
|---|---|
| `/use-cases/` | homepage features section, `/screenshots/` "Reading the interface" |
| `/sources/` | homepage starter-feeds section, `/use-cases/` |
| `/screenshots/` | homepage "All screenshots" link, `/press/` assets list |
| `/changelog/` | `/about/` timeline, `/press/` FAQ (version verification) |
| `/about/` | footer, `/blog/` author context |
| `/privacy/` | footer, `/press/` FAQ |
| `/press/` | footer |

## Blog → commercial page links (supporting → money)

| Post | Links to |
|---|---|
| `best-rss-readers-android-2026` | `/why/feedly/`, `/why/inoreader/` (per-app deep dives), APK download |
| `rss-vs-social-media` | `/about/` (origin story), homepage |
| `productivity-tips-rss-readers` | `/use-cases/`, homepage |
| `find-rss-feed-url-any-website` | `/sources/` (ready-made feed list) |
| `distraction-free-morning-reading-routine` | `/use-cases/` (The Commuter, The Night Reader) |
| `10-best-tech-blogs-rss` | `/sources/` |

## Rules applied

1. Supporting blog posts link up to money pages with descriptive anchors — never "click here".
2. Comparison pages cross-link each other and the listicle, so a visitor comparing apps always has the next step.
3. No page links to itself except via breadcrumbs.
4. Anchor text names the destination's content ("All 8 readers compared", not "read more").
5. External links (Feedly pricing docs, CC license, Wikimedia) use `rel="noopener noreferrer"` and are citations, not link swaps.
