# seo-schema slice — curatedfeeds.web.app (2026-11-10)

Method: parse_html.py --json over all 19 sitemap URLs (103 LD nodes), cross-checked
against app/lib/seo.ts and every page StructuredData call site. Markup is
server-rendered static HTML, so the unavailable Playwright/JS-rendering checks do
not limit these findings.
Unavailable checks (browser_ready=FALSE): Rich Results Test screenshots,
agentic_check.py, render_page.py — not run, no results faked.

## Inventory
/  Organization, WebSite, SoftwareApplication, MobileApplication, BreadcrumbList(1), FAQPage, SiteNavigationElement, WebPage+Speakable
/tools/find-feed/  + inline WebApplication, BreadcrumbList(3), FAQPage
/blog/  BreadcrumbList(2), Blog(blogPost x6), ItemList(#feed,6)
/about/  Organization + WebSite ONLY — no page-level node, no BreadcrumbList
/privacy/  WebPage, BreadcrumbList(2)
/screenshots/ /sources/ /why/ /changelog/ /use-cases/ /press/  BreadcrumbList(2), FAQPage each
/why/feedly/ /why/inoreader/  BreadcrumbList(3), Article, QAPage
6 blog posts  BreadcrumbList(3), Article(5)/BlogPosting(1); ItemList#list on best-rss post

## Findings
F1 HIGH   QAPage misused on /why/feedly/, /why/inoreader/, /blog/best-rss-readers-android-2026/ (seo.ts:431-444; called p91/p92/[slug]:84). QAPage contract = users submit answers; these are first-party copy with acceptedAnswer by the author, 3-4 Questions in one mainEntity array.
F2 MEDIUM isPartOf @id dangles on all 8 article nodes (seo.ts:272) -> emits .../blog/ which no node declares (Blog declares .../blog/#blog at seo.ts:308). Only /privacy/ resolves.
F3 MEDIUM /about/ has no page-level JSON-LD, no BreadcrumbList; personLd (seo.ts:267) and aboutPageLd (seo.ts:325) are grep-verified dead code.
F4 MEDIUM /tools/find-feed/ breadcrumb positions 2 and 3 share one URL (page.tsx:62-69).
F5 MEDIUM /blog/ nested blogPost BlogPosting children lack author/image/publisher/dateModified; ItemList#feed uses url instead of item (seo.ts:376, 446-459); in-article ItemList name-only.
F6 MEDIUM twitter:title/description inherit homepage values on 9 URLs (layout.tsx:88-93); page-specific on only 10/19. og:* IS page-specific everywhere.
F7 LOW    Article @id collides with its own mainEntityOfPage WebPage @id (seo.ts:255-260).
F8 LOW    breadcrumb item URLs /blog and /privacy omit canonical trailing slash (blog/page.tsx:50, privacy/page.tsx:31).
F9 LOW    inLanguage "en_US" is not valid BCP 47 (seo.ts:9); og:locale DOES want en_US so the constant must fork, not change.
F10 LOW   SoftwareApplication + MobileApplication both emitted on / with separate @id and Offer.
F11 LOW   og:image site-wide, no alt/dimensions on inner pages; all 8 Articles default to the same og-image.png (seo.ts:246-250). File verified 1200x630.
F12 INFO  FAQPage retired for ALL sites 2026-05-07; present on 8 URLs. Info only. No removal recommendation; no AI-citation claim; no new FAQPage recommendation.
F13 INFO  HowTo: howToLd() (seo.ts:385-406) is dead code, zero call sites, commented out at app/page.tsx:121-123, zero HowTo nodes on 19 URLs. Correct end state; delete the function in cleanup.
F14 INFO  Speakable + SiteNavigationElement on / — supported but featureless.
F15 INFO  stale comment drift seo.ts:418.

NO Critical findings in this slice.
