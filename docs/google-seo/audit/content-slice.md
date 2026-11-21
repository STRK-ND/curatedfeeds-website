# seo-content slice — curatedfeeds.web.app (2026-11-10)
Rendered word counts = live <main>, tags stripped, vs references/quality-gates.md floors.

/ 888 (floor 500) PASS        /blog/ 267 (400) FAIL      /why/ 793 (800) FAIL
/sources/ 701 (800) FAIL      /use-cases/ 700 (800) FAIL /tools/find-feed/ 383 (600) FAIL
/screenshots/ 364 (600) FAIL  /about/ 592 (400) PASS     /privacy/ 485 PASS (updated Nov 1 2026)
/press/ 541 PASS (reviewed Nov 1 2026)   /changelog/ 680 PASS

BLOG POSTS (floor 1500) — source body / rendered main; ext links; in-body internal links; imgs
rss-vs-social-media       665 / 743   ext 2   int 0   img 0   FAIL
10-best-tech-blogs-rss    611 / 689   ext 10  int 0   img 0   FAIL
productivity-tips         644 / 719   ext 0   int 0   img 0   FAIL
find-rss-feed-url         586 / 661   ext 0   int 2   img 0   FAIL
morning-reading-routine   456 / 531   ext 0   int 2   img 0   FAIL
best-rss-readers-2026    1529 /1604   ext 18  int 9   img 0   PASS

Readability: ASL 13.0-20.1; zero AI-phrasing-table matches; 0 shared sentences across section pages (no template duplication).

CRITICAL
C1  SITE.authorUrl = https://rajatkashyap.com (app/lib/seo.ts:14) NXDOMAIN for apex AND www (independently verified with control domains). Used in: rel=author byline + author box on all 6 posts ([slug]/page.tsx:126,136), articleLd author.url (seo.ts:244), personLd @id/url (seo.ts:271-273), org founder.url + sameAs (seo.ts:90,92), aboutPageLd mainEntity (seo.ts:336), metadata.authors in 6 files, visible links on /about/ and /press/:237-240. 12 occurrences per live post page. A real external identity exists: https://en.uptodown.com/developer/rajatkashyap. A rel=author link to a dead domain is an unverifiable authorship claim — worse than no link.

HIGH
H1  5 of 6 posts fail the 1500-word floor (456-743). Only best-rss-readers-2026 clears it and is also the only post with a comparison table, 18 vendor citations, 9 in-body internal links, Q&A.
H2  E-E-A-T 51/100 (Experience 15/20, Expertise 12/25, Authoritativeness 6/25, Trust 18/30). Who/How/Why are all answered; the Who cannot be verified off-site.
H3  /blog/ index fails category floor: 267 words, one boilerplate sentence of unique intro.

MEDIUM
M1  Topic cannibalization: morning-routine (456w) and productivity-tips tip #5 describe the same routine; 4 pages reuse the same 2022 self-experiment narrative.
M2  Zero multimedia in all 6 posts despite screenshots existing in public/screenshots/.
M3  Primary keyword absent from opening 100 words on 4-5 of 6 posts (abstract ledes).
M4  Freshness: productivity-tips dateModified 2026-03-22 never updated; visible meta renders raw ISO, not human-readable. Crawl gap: /about/ 2026-08-11, /privacy/ 2026-06-07.
M5  3 posts cite zero sources yet assert numbers; techradar.com/rss 301s to /feeds.xml while the page claims every URL was verified.
M6  Feature pages just under the 800 floor: /why 793, /sources 701, /use-cases 700.

LOW/INFO
L1 blog titles 77-90 chars (>~60 rendered). L2 productivity-tips meta desc 105 (<120), best-rss 176 (>160).
L3 no TOC on the 1529-word listicle. L4 ASL 19.1-20.1 on 2 posts (not a ranking factor, no action).
L5 howToLd() dead helper in seo.ts (correctly not emitted). L6 FAQPage retired 2026-05-07 — INFO only, no removal recommended.

SCORES: Content Quality 58/100 · E-E-A-T 51/100 · AI Citation Readiness 72/100

ACTION ORDER: C1 (one line, unblocks 19 URLs) -> recrawl/stale pages -> H1 expand 5 posts (fixes H1+M2+M3+M6 together) -> H3 /blog/ intro -> M1 de-cannibalize -> M5 cite sources -> L1-L3 batched metadata.
