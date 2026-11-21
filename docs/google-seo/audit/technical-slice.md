# seo-technical slice — curatedfeeds.web.app (2026-11-10)
Technical Score 75/100 (8 measured categories; CWV NOT measured — no key, no CrUX).

Crawlability warn 78 | Indexability warn 70 | Security warn 80 | URL Structure pass 95
Mobile warn 60 (touch-target/font/hscroll NOT MEASURED — no Chromium) | CWV NOT MEASURED
Structured Data pass 85 | JS Rendering pass 85 | IndexNow warn 50

F1 MEDIUM  RSC .txt payload artifacts deployed, crawlable, index-marked. output:export emits index.txt + 5 __next.*.txt beside every index.html. Live 200s: /index.txt 43320B, /about/index.txt 27853B, /blog/best-rss-readers-android-2026/index.txt 46873B — all with X-Robots-Tag: index,follow from the firebase.json glob **/*.@(html|xml|txt|webmanifest) (INDEPENDENTLY VERIFIED by main agent). A byte-level duplicate of article content at a different URL, no rel=canonical, explicit index directive.
F2 MEDIUM  No Content-Security-Policy on any response. firebase.json final "**" block declares Content-Signal, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS — no CSP. Firebase injects no default CSP. Defense-in-depth, not an active compromise. Any CSP must allow apk-download.raj15400881.workers.dev.
F3 MEDIUM  www.curatedfeeds.web.app is a TLS dead end and HSTS makes it unbypassable. nslookup -> same Firebase IPs; apex cert CN=web.app SAN *.web.app covers ONE label only, so the two-label www host fails SEC_E_WRONG_PRINCIPAL. http://www/ -> 301 -> https://www/ -> TLS error. hstspreload.org: curatedfeeds.web.app is PRELOADED (app TLD entry). Inbound www links land on a cert wall, not a redirect.
F4 LOW     X-Robots-Tag: index,follow is served on genuine 404s (/nonexistent-page-xyz/ and /api/), defeating firebase.json explicit noindex on /404 and /404.html. Same glob as F1.
F5 LOW     /_not-found/ serves HTTP 200 with no robots directive at all (glob misses that path).
F6 HIGH    Indexability state: 14 unknown to Google, /privacy/ crawled-not-indexed (last crawl 2026-06-07). Demand problem, not a technical blocker. Sitemap pending since 2026-11-09.
F7 INFO    CWV measurement limitation, explicitly NOT scored. No LCP/INP/CLS number claimed, lab or field. Rough curl proxy EXPLICITLY LABELED: HTML 79987B uncompressed, gzip transfer 15533B; heaviest page 91630B; ~25 local assets; 3 font preloads; zero third-party render-blocking JS; zero external webfonts; HTML max-age=3600, assets immutable.
F8 INFO    FAQPage present but rich results retired 2026-05-07. No removal recommended.
F9 MEDIUM  IndexNow: key file deployed and correct (200, 32-hex matches local .indexnow-key) but NO submitter script exists and no evidence any URL was ever submitted. Inert.
F10 INFO   Non-Google directives: Content-Signal (Google does not act on it for Search), Host: (Yandex-only), Agentmap: (ARD draft), Disallow:/api/ (path does not exist). Honest but inert.

VERIFIED PASSES: robots.txt<->sitemap agree (0 warnings); canonicals page-specific on 4 live pages (layout.tsx:56 hypothesis DISPROVEN, only stale GSC user_canonical noise); http->https single 301; all 19 URLs 200; /index.html->301; zero http:// subresources; HSTS PRELOADED per hstspreload.org; URLs uniformly trailing-slash, depth<=2; index,follow everywhere; no SPA shell (973 words w/o JS); no history-manipulation/back-button hijack; static Firebase = no stack CVE; viewport on all pages; no 5xx; catch_all_200 false; /google-seo/* verified 404 live.

Breadcrumbs cleaned: all temp files removed; git status back to pre-existing untracked set.
