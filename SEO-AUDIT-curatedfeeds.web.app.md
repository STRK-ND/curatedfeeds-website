# SEO Audit — curatedfeeds.web.app

**Audited:** 2026-11-10 · **Target:** `https://curatedfeeds.web.app/` · **Business type:** Publisher with SaaS product signals
**Property form:** URL-prefix `https://curatedfeeds.web.app/` (NOT `sc-domain:` — that 403s)
**SEO Health Score: 69/100** *(measured categories only — Core Web Vitals is 10% of the weight and could NOT be measured; its weight was re-normalized across the remaining 90%)*

| Category | Weight | Score | Source |
|---|---|---|---|
| Technical SEO | 22% | 75 | slice-reported |
| Content Quality | 23% | **58** | slice-reported |
| On-Page SEO | 20% | 72 | synthesis |
| Schema / Structured Data | 10% | 68 | synthesis |
| Performance (CWV) | 10% | **NOT MEASURED** | excluded — no API key, no CrUX, no Chromium |
| AI Search Readiness | 10% | 72 | slice-reported |
| Images | 5% | 82 | synthesis |

---

## How this audit was produced

Six parallel subagent slices (technical, content, schema, sitemap+images, geo+agentic, sxo+backlinks), each running the bundled `seo-*` scripts through the repaired `claude-seo` launcher. Every finding below was checked against a primary source — live HTML, git history, DNS, Public Suffix List, URL Inspection API, or the verification crawler — and I re-verified the load-bearing ones myself.

**Runtime repair was required first.** All 32 `seo-*` skills were missing their `scripts/` directory (magpie installs each skill by subdirectory path, which drops the repository's shared root `scripts/`). Nothing could run. I vendored the shared runtime into every skill and built the venv.

### Measurement gaps — do not read these as passes

| Gap | Why | Consequence |
|---|---|---|
| **Core Web Vitals (LCP/INP/CLS)** | No PSI API key, no CrUX samples, no Chromium | **No LCP/INP/CLS number is claimed, lab or field.** The whole 10% Performance weight is unscored |
| **Lighthouse Agentic Browsing X/N** | `lighthouse_agentic.py` → HTTP 429 (needs API key), no local fallback | No fraction stated — no number, no N, no percentage |
| **Accessibility tree, CLS, touch-target/font/horizontal-scroll** | Chromium absent (`browser_ready: false`) | `agent_ux_check.py` unusable; markup checks substitute for some audits only |
| **AI-surface citations / SERP features** | No DataForSEO / SE Ranking / Profound / GA4; no SERP-feature source | No ChatGPT/Perplexity/AI-Overview citation data, no PAA/featured-snippet landscape |
| **Moz / Bing backlinks** | No API keys | Free-tier Common Crawl + verification crawler only. **Backlink Health Score = INSUFFICIENT DATA (2/7 factors)** |
| **Apex-domain availability** | `curatedfeeds.com`/`.app`/`.io` timed out from this environment | Flagged for manual check; no finding either way |

---

## PERCEIVE — what is actually true

**The site is technically excellent and commercially invisible.** 19/19 sitemap URLs return 200 with zero redirects, trailing-slash uniformity, depth ≤2, and page-specific canonicals on every page. Security headers are strong (HSTS preloaded, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy). Markup is server-rendered — 973 words without JS, no SPA shell. All 7 `<img>` carry `width`/`height` matching intrinsic size, WebP is served through `<picture><source>` ahead of the JPEG fallback, and the hero has `fetchpriority="high"`. JSON-LD is in initial HTML on every page.

**The numbers are near-zero.** 28-day Search Console: **0 clicks, 40 impressions, 0% CTR, average position 11.3**. Four of five query rows are the site's own domain name. The only non-brand query is `hacker news site:web.app` — a `site:`-scoped probe, not organic discovery.

**14 of 19 URLs have never been crawled.** URL Inspection: 4 PASS (`/`, `/blog/`, `/about/`, `/blog/rss-vs-social-media/`), 1 "Crawled – currently not indexed" (`/privacy/`, last crawled **2026-06-07**), 14 "URL is unknown to Google". The sitemap was submitted 2026-11-09 and is still `pending`.

**The verified link profile is essentially empty.** Of 7 claimed-published links, verification found **4 live** — and only **2 follow-equivalent** (`ugc` and plain-follow). The highest DR in the entire published set is curlship's 51, and it is `nofollow`. So: **zero verified follow links from DR-60+.** The pipeline behind it is stalled at 50/85 prospects unsubmitted, with 39 blocked on account creation and every DR-85+ target unexecuted.

## ANALYZE — connecting it

Four hypotheses looked like code bugs early. I checked all four; **all four are false**, and the audit is worth less for having believed them:

1. **"`layout.tsx:56` makes every page canonicalize to the homepage."** GSC showed `user_canonical` = homepage for `/about/` and `/privacy/`, which fits perfectly. But the served HTML emits correct self-canonicals on every page tested — `pageAlternates()` is used throughout. GSC's values are stale, echoing crawls from 2026-08-11 and 2026-06-07.
2. **"Nothing links to the 14 unknown URLs."** `referring_urls: []` on all 14. But that field is empty *because* those URLs have no crawl record at all — it says nothing about what links to them. The homepage links all 12 sections; `/blog/` links all 6 posts; posts cross-link siblings.
3. **"HowTo schema is emitted."** A name-match found `howToLd` — a *comment* explaining why they don't use it. Dead code, zero call sites, zero `HowTo` nodes on 19 URLs.
4. **"Wrong page type for the keywords."** Every commercial page is correctly typed: `/why/feedly/` and `/why/inoreader/` are genuine comparison pages with honest-loser sections and 9-row tables; `/tools/find-feed/` has a server-rendered input above the fold. Page type is *not* the problem — which eliminates the usual explanation for zero commercial visibility.

What the full picture actually shows: **this is not a code-quality problem.** The site is better built than most audited sites. Passage-level citability is genuinely strong — `/why/feedly/` opens with a clean definition, then the comparison table and a cited-sources note. Every page is substantial and honest.

And one finding that initially looked damning is **explicitly bounded**: `curatedfeeds.web.app` is absent from Common Crawl, but the crawl release is `cc-main-2026-jan-feb-mar` and the acquisition wave is **Oct–Nov 2026 — after that release**. Absence is therefore expected regardless of link quality. It means *"no Common-Crawl-verifiable authority signal yet"*, **not** proof of zero inbound links.

## VALIDATE — bucketed

### CRITICAL

**C1 · `rel=author` points at a domain that does not exist.**
`SITE.authorUrl = 'https://rajatkashyap.com'` (`app/lib/seo.ts:14`) returns **NXDOMAIN for both apex and `www`** — verified with control domains (`example.com`, `google.com`, `uptodown.com` all resolve correctly on this resolver, so the NXDOMAIN is real, not a local DNS fault).
Used in: `rel="author"` byline + author box on all 6 posts, `articleLd` `author.url`, `personLd` `@id`/`url`, Organization `founder.url` + `sameAs`, `aboutPageLd` `mainEntity`, `metadata.authors` in 6 page files, and visible links on `/about/` and `/press/`. **12 occurrences per live post page.**
A `rel=author` link to a dead domain is worse than no link — it is an unverifiable claim of authorship, and the author entity is keyed (`@id`) on an identifier that resolves to nothing. *One constant; the cheapest Critical fix on the site.*

**C2 · `app/sitemap.ts` understates the lastmod of 15 of 19 URLs, by up to 224 days.**
Live JSON-LD `dateModified` is **2026-11-01** for `10-best-tech-blogs-rss`, `rss-vs-social-media`, and `best-rss-readers-android-2026`, while the sitemap declares **2026-03-22** for the first two. Separately, commit `3ed08ed` (2026-11-09) edited main content on `/about/` (37 lines), `/sources/` (36), `/why/feedly/` (33), `/why/` (36), `/why/inoreader/` (28), `/press/`, `/privacy/`, `/use-cases/` and `/blog/` — yet `sitemap.ts:20` stamps all nine **2026-10-31**.
The root cause is structural: `sitemap.ts` hardcodes a duplicate `blogPosts` array, while `data.ts:126` exports `BLOG_LAST_MODIFIED` that is **never imported anywhere**.
Google honours `lastmod` only when it is consistently and verifiably accurate. On a domain with near-zero crawl budget, `lastmod` is the sitemap's *only* lever over recrawl timing — and here it is the sole signal Google has about `/privacy/`, which it last crawled 2026-06-07, before the rebuild existed.

**C3 · The backlink pipeline is stalled, and the links that did land are the wrong currency.**
`seo-research/backlink_database.csv`: 85 prospects — 6 published, **50 not submitted**, 11 rejected, 9 dead, **39 blocked on account creation**. `submission_log.csv` shows one burst on 2026-10-29 and nothing since. Verification of the "published" claims found 4 of 7 live, and 3 dead within ~12 days (`rssamplifier.com` HTTP 402, `zearches.com` brand absent, `techtools.cz` HTTP 301).
The 4 that live: `curated-feeds.en.uptodown.com/android` (follow), `rss.mobi/…` (ugc), `develif.com/s/curated-feeds` (noopener/noreferrer), `curlship.com/l/8227` (**nofollow**, DR 51). **The highest DR in the entire published set is 51, and it is nofollow — so there are zero verified follow links from DR-60+.**
The four target SERPs are held by DR-80+ vendor and editorial domains. A directory profile cannot buy entry there. Meanwhile the correct high-authority targets are already identified and unexecuted: `sindresorhus/awesome` (DR 96), Show HN (DR 90), Product Hunt (DR 91), G2 (DR 91), SourceForge (DR 93), Crunchbase (DR 91), dev.to/Hashnode (DR 87).

### HIGH

**H4 · No off-site entity surface for the brand.** The only external entity is an Uptodown developer profile showing **4 downloads**. No Wikipedia/Wikidata, no Reddit, no YouTube, no LinkedIn, no DEV. Per third-party studies (Ahrefs 75k-brand; Profound: Wikipedia 47.9%, Reddit 11.3%/46.7% of ChatGPT/Perplexity top-10 cites) brand mentions matter more than backlinks for AI visibility — **these are third-party figures, cited as such, not Google rules.**

**H5 · `web.app` is a Public Suffix List domain: no authority can be inherited.** `web.app` confirmed on the PSL, aggregating 34,501 unrelated subdomains (its own PageRank rank 1279 is therefore meaningless here). Every referring domain must be earned on the full host `curatedfeeds.web.app`. The consequence is already measurable in GSC: exact brand **`curatedfeeds` = 0 impressions**, generic **`curated feeds` = 1** (pos 2), `curatedfeeds.web.app` = 4 (all pos 1).

**H6 · 5 of 6 blog posts fail the 1,500-word floor** (456–743 rendered words). Only `best-rss-readers-android-2026` (1,604) clears it — and it is also the only post with a comparison table, 18 vendor citations, 9 in-body internal links, and Q&A. Also failing: `/blog/` (267, floor 400), `/tools/find-feed/` (383, floor 600), `/screenshots/` (364, floor 600), `/sources/` (701), `/use-cases/` (700), `/why/` (793).

**H7 · E-E-A-T 51/100** — Experience 15/20, Expertise 12/25, **Authoritativeness 6/25**, Trust 18/30. Who/How/Why are all genuinely answered (named founder, methodology disclosure, live feed verification); the Who simply cannot be verified off-site. Blocked by C1, then by H4.

**H8 · `/tools/find-feed/` promises "Instantly" in both title and meta description; the architecture cannot guarantee it.** `FeedFinder.tsx fetchViaProxy` routes all lookups through free public CORS proxies, and the page itself states they are "occasionally rate-limited" and then "still lists the likely candidates for your domain". The word doing the selling is exactly the property the design cannot deliver on demand — and a user who waits on a proxy timeout and gets a candidate list pogo-sticks in the same SERP the page competes in.

**H9 · 14 URLs unknown to Google** — grouped here rather than as a code defect because the sitemap is provably sound (0 errors, 0 warnings, all URLs 200) and internal linking is complete. If the sitemap were the failure, GSC would either report sitemap errors or list these as *"Discovered – currently not indexed"* (has the URL, declines). It reports the opposite: no record at all. The constraints are elapsed time and absent crawl demand.

### MEDIUM

**M1 · ~130 RSC `.txt` artifacts are deployed, crawlable, and `index,follow`.** `output: 'export'` emits `index.txt` + `__next.*.txt` beside every `index.html`. Verified live: `/index.txt` 43,320 B, `/about/index.txt` 27,853 B, `/blog/best-rss-readers-android-2026/index.txt` 46,873 B — all carrying `X-Robots-Tag: index, follow` from the `firebase.json` glob. Byte-level duplicates of article content at other URLs, with no canonical.

**M2 · The 19 `.md` Markdown twins carry no robots directive at all** (the glob doesn't match `.md`). Verified: `/about.md` and `/index.md` both 200 `text/markdown` with **no `X-Robots-Tag`**, linked via `link rel="alternate"`.

**M3 · No Content-Security-Policy anywhere.** `firebase.json`'s `"**"` block declares 7 headers, none of them CSP. The other five are passive markers; CSP is the only one that constrains execution. Defense-in-depth, not an active compromise.

**M4 · `www.curatedfeeds.web.app` is a TLS dead end, and HSTS makes it unbypassable.** `www` resolves to the same Firebase IPs, but the wildcard cert covers one label only, so the two-label `www` host fails TLS. `http://www/` → 301 → `https://www/` → cert wall. And `curatedfeeds.web.app` is **preloaded** per hstspreload.org, so there is no click-through. Inbound `www` links land on an error, not a redirect — this must be fixed *before* any citation campaign.

**M5 · `/why/feedly/` and `/why/inoreader/` are near-identical templates.** Identical H2 skeletons, identical table row labels, 2,298 vs 2,349 words, titles differing only by product name — and both carry "Best Free Alternative" while the body concedes "If you read on more than one device, Feedly wins outright". Two pages from one skeleton split signal for overlapping intent; a third would three-way split it.

**M6 · Zero on-page media where it matters most.** `best-rss-readers-android-2026` is 5,780 words with `<img>` count **0**; `/blog/rss-vs-social-media/` is the *only indexed post* and also has 0 images. In an app-comparison SERP the screenshot is the product.

**M7 · `/blog/` fold is bare** — H1 `Blog` then nothing but a card list, no lead paragraph, while the meta description promises guides on four topics. It is the one page actually receiving demand (`hacker news site:web.app` → `/blog/`, pos 14.6).

**M8 · APK-only install path with no friction handling above the fold.** 67 MB direct APK plus Uptodown; no explicit "allow install from unknown sources" step. Every competitor in the target SERP is a Play Store / F-Droid app with install counts.

**M9 · Hero 1920 WebP is 445.8 KB** (variants 33.0/77.0/207.6/445.8 KB — larger encodes quality-inflated past linear pixel scaling). **M10 · The JPEG fallback is 701.5 KB with no resolution switching** — `app/page.tsx:151-152` puts `srcSet`/`sizes` on `<source>` only. *Do not convert `og-image.png` to WebP/AVIF — social scrapers don't support them and it is already 31.5 KB.*

**M11 · QAPage misused on 3 marketing pages** (`/why/feedly/`, `/why/inoreader/`, `/blog/best-rss-readers-android-2026/`) — where the *author* writes the `acceptedAnswer` with 3–4 Questions in one array, against QAPage's contract of user-submitted answers, one Question per page.

**M12 · `isPartOf` `@id` dangles on all 8 article nodes** (`seo.ts:272` emits `.../blog/`, which no node declares), silently severing the publisher→publication graph.

**M13 · Anchor distribution: 0% brand.** Measured anchors on the 4 verified links: `rajatkashyap` ×1, `curatedfeeds.web.app` ×1, naked URL ×1, plus the nofollow pair. **Zero occurrences of "Curated Feeds."** Naked-URL anchors carry no entity signal, and the one non-URL anchor reinforces the founder's personal brand, not the product.

**M14 · The repo's link data overstates reality** — 33/85 rows "Not available" for metric source, 13 estimates, ~42 self-reported DRs from third-party scrapers; `deliverable-A-backlink-database.csv` is 12/12 "Not submitted". The verified live rate of "published" claims is 57%.

### LOW

`/about/` has no page-level JSON-LD and no BreadcrumbList while `personLd()` and `aboutPageLd()` sit as **grep-verified dead code**; `/tools/find-feed/` breadcrumb positions 2 and 3 share one URL; `X-Robots-Tag: index, follow` is served on genuine 404s; `/_not-found/` serves 200 with no directive; blog titles run 77–90 chars (>~60 rendered); `twitter:title/description` inherit homepage values on 9 URLs while `og:*` are page-specific; `inLanguage: "en_US"` is not valid BCP 47 (`og:locale` legitimately wants it — the constant must fork); 3 posts cite zero sources while asserting numbers (`techradar.com/rss` 301s to `/feeds.xml` while the page claims every URL was verified); topic cannibalization between the morning-routine and productivity-tips posts; IndexNow key deployed but no submitter script exists.

### INFO — recorded, no action

**FAQPage is present on 8 URLs.** Google retired FAQ rich results for **all** sites on 2026-05-07. Per the quality gate: **no recommendation to remove it, no AI-citation benefit claimed, no new FAQPage recommended.**
**HowTo: correctly absent.** Zero `HowTo` nodes on 19 URLs; the helper is dead code. Right end state — delete in cleanup, add nothing.
**Content-Signal / `Host:` / `Agentmap:` / `Disallow: /api/`** are an IETF draft, Yandex-only, an ARD draft, and a path that doesn't exist respectively. **Content-Signal is not a ranking factor and must not be credited as one.**
**Toxic-link and velocity scoring — Not Assessed.** 4 live links cannot form a toxic pattern; a numeric backlink score with 2/7 factors would imply measured quality where only presence is measured.
**Chromium-dependent checks and all CWV** — unavailable, listed above.

---

## ACT — prioritized, dependency-sequenced

| # | Action | Bucket | Why this order | Falsifiability ("how would we know it failed?") | Leading indicator |
|---|---|---|---|---|---|
| 1 | **Fix `SITE.authorUrl`** to a resolving page with name + role; add `sameAs` to the Uptodown developer profile | **Critical** | One line, unblocks the author entity on 19 URLs; everything about identity depends on it | `dns.resolve4('rajatkashyap.com')` / HTTP HEAD returns 200 *with credentials on it*. Fails if it 200s but is a different Rajat | HTTP status of the byline destination across 19 URLs (target: 200) |
| 2 | **Fix `sitemap.ts`**: derive post + section dates from `POSTS`/content-change dates, delete the hardcoded duplicate array | **Critical** | The only in-repo finding that changes what Google knows; land before any resubmission so the accelerated signal is honest | Assert `sitemap lastmod === max(dateModified)` per post. Falsified iff no URL's content changed after its declared lastmod | Sitemap `pending → Success`; "unknown to Google" count falling |
| 3 | **Founder creates accounts and executes 4 high-authority targets** (Show HN, `sindresorhus/awesome`, Product Hunt, dev.to or G2) | **Critical** | Requires a founder decision no on-page work can supply. **Nothing else on this list produces a measurable SEO effect before ~15 verified referring domains exist** | After 90 days re-run the verify sweep; if live follow-equivalent referring domains stay ≤ 5 **and** commercial-cluster impressions stay 0, the authority diagnosis is confirmed. If impressions appear with the same profile, the diagnosis inverts | Verified live follow-equivalent referring domains (target ≥ 20 in two quarters; currently 2) |
| 4 | **One `firebase.json` + `robots.txt` edit**: narrow the header glob (M1, M2, 404 noindex) + `Disallow: /__next`, `/_not-found` | **Medium** | Same file, one deploy, zero code risk. **Must land before #6's re-check** so the coverage baseline is clean | `/index.txt` → 404; `.md` twins carry a directive; `curl -sI /nonexistent/` shows `noindex` | "Duplicate" / "Indexed, not submitted in sitemap" rows in GSC Pages |
| 5 | **Remove the stray `www` A/AAAA records** (or provision www and redirect to apex) | **Medium** | Independent; must precede any citation campaign or those links land on a cert wall | `curl -I https://www.curatedfeeds.web.app/` succeeds | Existence of www DNS records |
| 6 | **Resubmit the sitemap, then wait 2–4 weeks** | **High** | Sequenced after #2/#4 so submissions carry honest dates and a clean URL set | Re-inspect the 14 URLs. If they stay "unknown", no sitemap edit was ever going to move them. If they become "Discovered – currently not indexed", the diagnosis was wrong and the cause is page quality | GSC Pages → "Why pages aren't indexed" migrating out of unknown |
| 7 | **Expand the 5 short posts to ≥1,400 words**, each gaining one original screenshot and 2–4 in-body links | **High** | Fixes H6, M6, and the keyword-in-opening-100-words gap in the same edit cycle | `<main>` word count ≥1,400 with no filler; every section answers a distinct sub-question. Fails if the count rises via boilerplate | Rendered main word count per post; share of post queries with ≥1 impression |
| 8 | **Fix `QAPage` on the 3 vendor-FAQ pages**; resolve `isPartOf`; wire `aboutPageLd`/`personLd` on `/about/`; fork `inLanguage`; give `/tools/find-feed/` a 2-crumb trail | **Medium** | Independent; batch into one deploy | Validation shows the `isPartOf` node resolved and `/about/` carrying AboutPage + Person | GSC structured-data errors naming these URLs |
| 9 | **Narrow the "Instantly" claim** on `/tools/find-feed/` and add a worked-example table so the rate-limited path still yields a usable result | **High** | No technical dependency; compounds M7 | Run 20 lookups on 20 real domains across two days. If ≥3/20 return only the fallback note, the claim is demonstrably false | Successful-lookup rate per 20 domains; repeat-lookup rate |
| 10 | **`/blog/`: add a 2–3 sentence lead** answering "which of these six do I read first?" and naming the Hacker News post | **Medium** | Independent, but worthless until indexing lands | `>80%` of `/blog/` sessions exiting without opening a post confirms it | `/blog/` scroll depth and next-click-through |
| 11 | **Add an explicit install-friction step** above the APK CTA | **Medium** | A Play Store / F-Droid listing would remove this permanently (F-Droid is already cited in the site's own listicle) | If APK starts do not move, friction was not the blocker and the constraint is upstream (ranking) | APK download events per session; Uptodown views/downloads (4 currently) |
| 12 | **Add a `Content-Security-Policy`** allowing `apk-download.raj15400881.workers.dev` | **Medium** | After #5's audit of offsite references so the policy isn't instantly wrong | `curl -sI /` returns a non-report-only CSP | Non-report-only CSP on 100% of HTML responses |
| 13 | **Re-encode the hero** (1920 ≤300 KB) **and give the JPEG fallback `srcset`** | **Medium** | Same encode chain, immediately measurable | Hero ≤300 KB at 1920 with no visible artifact. If quality visibly degrades, the *threshold* was wrong, not the size | Hero transfer size at 1920×1080 |
| 14 | **Anchor discipline on all future submissions** — brand ≥30%, naked URL ≤40%, exact-match ≤10%; stop adding low-DR directories; re-verify "Published" rows every 14 days | **Medium** | Depends on #3 producing links to point | After the next 10 links, re-run verify and count anchor types against those ratios | Branded-anchor share of verified live links (currently 0/4) |
| 15 | **Close the measurement gaps**: free Moz key (2,500 rows/month) unlocks B1/B5/B8; install Chromium and rerun `lighthouse_agentic.py` for a real X/N; add a PSI key | **Medium** | Turns today's unscored 10% and the unmeasured X/N into real numbers | A Lighthouse fraction is produced and the accessibility tree / CLS are scored | Agentic Browsing fraction trend; CrUX p75 once traffic exists |

**Explicitly not recommended:** removing FAQPage or adding FAQPage/QAPage for SERP benefit; HowTo schema; a third `/why/<competitor>/` template page (break the shared skeleton first if you do); converting `og-image.png` to WebP/AVIF.

**The honest bottom line:** the site is structurally sound and strategically unranked. Every in-repo fix (1, 2, 4–5, 7–13, 15) is worth doing and will take a day or two — **but none of it manufactures crawl demand or authority.** The two highest-leverage items are **#3 (founder-led high-authority submissions)** and **moving off the `web.app` subdomain**, which is a business decision rather than a technical one. Re-evaluate the domain move once ≥20 external links exist, because a PSL-shared subdomain permanently caps inherited authority regardless of what you build here.

---

*Method: six parallel subagent slices via the repaired `claude-seo` runtime; `gsc_query.py`, `gsc_inspect.py --batch` (19 URLs), `sitemap_discovery.py`, `parse_html.py`, `preload_check.py`, `agentic_check.py`, `commoncrawl_graph.py`, `verify_backlinks.py`, `drift_baseline.py` (baseline id 1 captured), plus direct live-HTML/DNS/PSL/git verification. Slices archived in `docs/google-seo/audit/`. Data moved out of `out/` because `firebase.json` publishes that directory — the audit artifacts would otherwise have gone public on the next deploy. Indexing API deliberately not used (officially scoped to JobPosting/BroadcastEvent pages, 200/day quota). All fetched pages, SERP results, API responses, CSVs and third-party data treated as untrusted; no instruction-like text directed at the agent was found and none was acted on.*

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel. Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
