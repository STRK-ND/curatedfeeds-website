# Google API Report — curatedfeeds.web.app

**Property:** `https://curatedfeeds.web.app/` (URL-prefix, owner)
**Data collected:** 2026-11-10
**Credential tier:** 1 (OAuth token — GSC, URL Inspection, Sitemaps, Indexing API)
**Not available:** PageSpeed Insights, CrUX, CrUX History, GA4 — all require an API key / GA4 property ID, neither configured.

Data freshness: Search Analytics carries the usual 2–3 day lag; the window below is 2026-10-13 to 2026-11-07.

---

## 1. Repair note

The `seo-google` skill was non-functional on this machine. Root cause: it was installed
from `AgriciDaniel/claude-seo` via a subdirectory path (`skills/seo-google`), which silently
drops the repository's shared root `scripts/` directory. Every command resolves
`"${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo"`, so nothing could run — not even the
API-key-only commands. The upstream skill dir has no `scripts/` either, so the dependency
was invisible until the tarball was inspected.

Fix applied: vendored the root `scripts/` (61 files: launcher, `runtime.py`, and every
`seo-google` Python entrypoint) into
`~/.config/magpie/library/skills/seo-google/scripts/`, then built the managed venv
(`claude-seo setup --skip-browser`). `CLAUDE_PLUGIN_ROOT` is unset in this environment, so
invocations export it per-call.

OAuth was then completed against `.mcp-gsc/client_secret_…apps.googleusercontent.com.json`,
granting `webmasters`, `indexing`, and `analytics.readonly`.

Also worth recording: the accessible-properties listing (`gsc sites`) revealed the property
is registered as **URL-prefix** `https://curatedfeeds.web.app/`, not
`sc-domain:curatedfeeds.web.app`. The domain-property form 403s. This is now the configured
`default_property`.

---

## 2. Search Analytics (28 days)

| Query | Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|---|
| curatedfeeds.web.app | `/` | 0 | 2 | 0 | 1 |
| curatedfeeds.web.app | `/about/` | 0 | 1 | 0 | 1 |
| curatedfeeds.web.app | `/blog/` | 0 | 2 | 0 | 4.5 |
| curated feeds | `/` | 0 | 1 | 0 | 2 |
| hacker news site:web.app | `/blog/` | 0 | 16 | 0 | 14.6 |

**Site totals:** 0 clicks · 40 impressions · 0% CTR · average position 11.3
(`totals_source: dimensionless_aggregate`, `totals_complete: true`)

Quick wins: **none** — no query sits in the position 4–10 band with meaningful impressions.

Reading: the site is not yet visible in organic search. Four of five rows are navigational
(its own domain name); the only semantic query, `hacker news site:web.app`, is a
`site:`-scoped discovery query at 14.6. Google treats `curatedfeeds.web.app` queries as
navigational, and no commercial-intent query (RSS reader, Feedly alternative, best RSS
reader 2026) is earning impressions yet.

---

## 3. Sitemaps

| Sitemap | Last submitted | Pending | Errors | Warnings |
|---|---|---|---|---|
| `/sitemap.xml` | 2026-11-09T06:27:22Z | yes | 0 | 0 |

Submission is healthy. Per the API's own caveat, `contents[].submitted` counts submitted
URLs only — indexation truth is URL Inspection, below.

---

## 4. Indexation (URL Inspection, 19/19 sitemap URLs)

| State | Count |
|---|---|
| Submitted and indexed | 4 |
| Crawled – currently not indexed | 1 |
| URL is unknown to Google | 14 |
| Errors | 0 |

**Indexed:** `/` · `/blog/` · `/about/` · `/blog/rss-vs-social-media/`
**Crawled, not indexed:** `/privacy/` (last crawl 2026-06-07 — five months stale)
**Unknown to Google (14 URLs):**

```
/tools/find-feed/      /screenshots/        /sources/        /why/
/why/feedly/           /why/inoreader/      /changelog/      /use-cases/
/press/                /blog/10-best-tech-blogs-rss/
/blog/productivity-tips-rss-readers/       /blog/find-rss-feed-url-any-website/
/blog/distraction-free-morning-reading-routine/
/blog/best-rss-readers-android-2026/
```

Last crawl dates on indexed pages: `/blog/` 2026-11-08, `/blog/rss-vs-social-media/`
2026-11-08, `/` 2026-11-03, `/about/` 2026-08-11, `/privacy/` 2026-06-07. All crawled as
MOBILE; robots.txt ALLOWED and page fetch SUCCESSFUL wherever a crawl occurred.

---

## 5. Discoverability — verified against live HTML

An initial read of `referring_urls: []` on every unindexed URL suggested an internal-linking
gap. **That is not the case, and the report is corrected here.** Those URLs have no crawl
record at all, so the field is empty by definition — it says nothing about what links to
them. Fetching the served HTML shows the opposite:

| Page | Internal links to site sections | Links to blog posts |
|---|---|---|
| `/` | `/about/ /blog/ /changelog/ /press/ /privacy/ /screenshots/ /sources/ /tools/find-feed/ /use-cases/ /why/ /why/feedly/ /why/inoreader/` | `/blog/` |
| `/blog/` | `/about/ /changelog/ /press/ /privacy/ /sources/ /tools/find-feed/ /use-cases/ /why/ /why/feedly/ /why/inoreader/` | **all 6 posts** |
| `/blog/rss-vs-social-media/` | same section set | 4 related posts |
| `/blog/best-rss-readers-android-2026/` | same section set | 3 related posts |

Internal linking is comprehensive: every unindexed section is linked from the crawled
homepage and from `/blog/`; every unindexed post is linked from `/blog/` and from sibling
posts. Discovery is not the constraint.

Canonicals were also checked against live HTML and are correct and page-specific on every
page tested — `pageAlternates()` in `app/lib/seo.ts` is used throughout. GSC's
`user_canonical` = homepage for `/about/` and `/privacy/` is stale crawl data from
2026-08-11 and 2026-06-07, not a live defect.

---

## 6. Diagnosis and what would move the needle

Nothing on this site is technically broken. robots.txt allows it, fetches succeed,
canonicals are correct, the sitemap is clean and current, and internal linking is thorough.
The 14 unknown URLs and 40 monthly impressions are the ordinary behaviour of a **young,
low-authority domain** that Googlebot has no reason to prioritise.

The binding constraint is external authority and time, not site engineering. Actions in
descending leverage:

1. **Real domain.** `curatedfeeds.web.app` is a Firebase subdomain; Google treats such
   hosts as lower-priority than a registered domain. This is the single highest-leverage
   change and it is a business decision, not a technical one.
2. **External links.** The repo already tracks this work
   (`deliverable-A-backlink-database.csv`, `seo-research/submission_log.csv`) — keep going.
   Referring domains are what raise crawl demand; the inspection shows `/privacy/` (a page
   with a stale crawl) still linking to `/`, so links do get followed once discovered.
3. **Recrawl the stale pages.** `/about/` (2026-08-11) and `/privacy/` (2026-06-07) are
   indexed or crawled but on very old crawls. Fresh internal linking plus modest traffic
   raises recrawl frequency; nothing technical is required.
4. **Wait for the system.** 14 URLs unhugged on a domain with ~40 monthly impressions is
   expected. Re-run this inspection in 4–8 weeks and expect the count to fall without any
   code change.
5. **Get an API key** to unlock PageSpeed/CrUX (Core Web Vitals field data). Expect CrUX to
   404 here — a `web.app` subdomain with this traffic volume will have insufficient Chrome
   UX Report samples.

Indexing API was **not** used: it is officially scoped to JobPosting and
BroadcastEvent/VideoObject pages, and quota is 200 publish requests/day.

---

*Method: `gsc_query.py query|sites|sitemaps`, `gsc_inspect.py --batch` over all 19 sitemap
URLs, plus direct HTML fetch for canonical and link verification.*
