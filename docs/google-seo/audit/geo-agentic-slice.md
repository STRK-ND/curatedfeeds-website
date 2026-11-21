# seo-geo + seo-agentic slice — curatedfeeds.web.app (2026-11-10)
Tools: agentic_check.py (17 checks), lighthouse_agentic.py, agent_ux_check.py, live probes of all discovery/markdown paths.

## MEASUREMENT GAPS (explicit — do NOT read as passes)
- Lighthouse Agentic Browsing X/N: NOT MEASURED. lighthouse_agentic.py --strategy both -> psi-mobile and psi-desktop both HTTP 429 Quota exceeded, needs a Google API key. No local fallback (Chromium absent). No number, no N, no percentage is stated. agent-accessibility-tree and CLS cannot be scored by any other route.
- agent_ux_check.py 0-100: unavailable. playwright error: chromium_headless_shell-1254 chrome-headless-shell.exe missing.
- AI-surface citation visibility (ChatGPT/Perplexity/AI Mode/AI Overviews): NOT measured. No DataForSEO/SE Ranking/Profound/GA4 here. GSC is the only ground truth.
- WAF/UA-matrix behaviour: not tested (no authorization for UA-token probing).

Substituting static partials that DO work: server-rendered PASS (973 words without JS, js_shell_marker false), robots-reachable PASS (11 groups), robots-ai-groups PASS, llms-txt PASS, markdown-delivery PASS, http-404 PASS, ard-catalog PASS.

## PASSES (structural)
F1  AI crawler access policy correct+complete but carries NO ranking value. robots.txt: 11 named groups all Allow:/, all with Content-Signal. orphan_content_signal [], named_groups_without_signal []. Content-Signal is a Cloudflare/CC0 + IETF-draft PREFERENCE, not enforcement; Google states it does not act on it for Google Search. Must not be credited as a ranking factor. search_crawlers_blocked_at_root: [].
F2  Markdown for agents: 19/19 pages return 200 text/markdown with 2.0K-10.9K real content, no stubs. index.md 6049B, about.md 4351B, why/feedly.md 4051B. Advertised via pageAlternates() link rel=alternate. Built from rendered <main> at build time so it cannot drift. Content negotiation is NOT implemented (Accept: text/markdown still returns HTML) — that is the conformant "alternate URL" pattern.
F4  llms-full.txt: 200, 1835+ lines, ## sections for all 19 pages, "Last built: 2026-11-09", CC BY 4.0. Generated from the .md twins.
F12 server-side rendering: PASS. Next.js 16 static export; full HTML to every agent.
F14 404 semantics: PASS. Real 404 (catch_all_200 false); firebase.json sets X-Robots-Tag noindex on /404 and /404.html. /.well-known/security.txt, /mcp.json, /ucp all real 404 — no soft-200 traps.
F5  /.well-known/ai-catalog.json 200 application/json 946B — PRIOR HYPOTHESIS DISPROVEN. It resolves because firebase.json rewrites it to /ai-catalog.json. ard-catalog PASS, entries 1, specVersion 1.0, 3 representativeQueries. ARD is a v0.91 Proposal (2026-08-26), a draft.
F6  FAQPage on homepage (7 Question/Answer) — INFO per retirement 2026-05-07. No removal recommended; no AI-citation claim; no new FAQPage.

## LOW findings
F3  /tools/find-feed/ absent from llms.txt ## Pages (18 links vs 19 sitemap URLs). llms.txt has NO weight with Google Search — completeness issue only.
F9  Invented meta tags in layout.tsx: ai-train, ai-search, ai-quote, ai-assistant-context, ai-content-rights, ai-content-declaration, content-signal-preference, preference-rank: high (meaningless), factual-accuracy-audit, last-reviewed-iso, author-meta. All non-standard. Dead weight + head bytes on 19 pages.
F11 RSL 1.0 licensing not implemented (CC BY 4.0 prose only). No Google Search effect documented.
F13 No WebMCP — correctly N/A; webmcp-tools info, registerTool_call_sites 0, forms 0. Do not recommend.

## HIGH / MEDIUM
F8  Brand/entity mentions essentially zero off-site. Repo seo-research/ (86 rows) shows only low-authority directories published (uptodown DR-live 4 downloads, rssamplifier, develif, curlship, tehtools->techtools, rss.mobi); every high-value target "Not submitted (account required)" in the P4 queue: Show HN, Product Hunt, dev.to, Hashnode, IndieHackers, GitHub awesome-lists. No Wikipedia/Wikidata, no Reddit, no YouTube, no LinkedIn. Third-party studies (Ahrefs 75k-brand 2025-12-12; Profound 2025-06-05: Wikipedia 47.9%, Reddit 11.3%/46.7% of ChatGPT/Perplexity top-10) are cited AS SUCH, not as Google rules.
F7  Passage-level citability is the strongest asset on the site: /why/feedly/ opens with a clean definition + 9-row comparison table + a "When Feedly is the better choice" concession block + OPML steps + 4 self-contained Q&A; sources are linked primary pages (feedly.com/i/pro, inoreader.com/pricing "$7.50/month billed annually"). best-rss-readers-android-2026 has an 8-app table with per-row Source links. Recency risk (Medium): 3 posts lastmod 2026-03-13/03-20/03-22, ~7.5 months stale, past the 6-month threshold in SE Ranking 1.3M-citation study (third-party figure).
F10 Access policy reported per purpose: Training (GPTBot/ClaudeBot/anthropic-ai) Allow; Search/citability (OAI-SearchBot/Claude-SearchBot/PerplexityBot) Allow, and Googlebot alone governs AI Overviews/AI Mode; User-triggered Allow but Google-Agent ignores robots.txt; only Disallow is /api/ which does not exist on the static export (harmless dead directive).

## ACTION ORDER
1 (Critical) get 14 unknown URLs crawled/indexed — no dependency  2 (High) ship queued brand mentions: Show HN, Product Hunt, dev.to/Hashnode, GitHub awesome-list PRs  3 (Medium) refresh 3 stale March-2026 posts  4 (Low) add /tools/find-feed/ to llms.txt  5 (Low) make Agentmap: absolute  6 (Low) drop invented ai-* meta block (keep last-reviewed-iso)  7 (Low) optional Applebot/CCBot/RSL  8 (Low) close gaps: install Chromium and rerun lighthouse_agentic.py for a real X/N.

NOT RECOMMENDED (guardrails honored): no HowTo schema; no new FAQPage, no removal; no claim that llms.txt / Content-Signal / Google-Extended affects Google Search; no FID references (no CWV data exists — PSI and CrUX unavailable); no WebMCP.
