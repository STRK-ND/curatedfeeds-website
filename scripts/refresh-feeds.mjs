#!/usr/bin/env node
/**
 * Measure every feed in the catalogue and write the snapshot the pages render.
 *
 * Run this on a schedule, not on every build: it makes 34 outbound requests,
 * and a build that depends on third-party hosts is a build that fails when a
 * third-party host is down. The snapshot it writes is committed to the repo,
 * so `npm run build` stays hermetic.
 *
 *   npm run refresh-feeds
 *
 * What gets measured, and why each field earns its place on a page:
 *
 *   itemsPerDay     how much the feed actually publishes, from a bounded
 *                   30-day window rather than the whole archive. This is the
 *                   single most useful number for someone deciding whether to
 *                   subscribe, and it differs per feed by an order of
 *                   magnitude.
 *   publishingDays  how many days in the window had at least one item. A feed
 *                   can publish 50 articles on 3 days or 5 articles on 30 days;
 *                   the volume alone does not tell you whether it is a daily
 *                   publication or a weekend digest.
 *   headlines       the actual titles published recently. This is the most
 *                   differentiated content on each page, and it is real
 *                   content rather than a description of content.
 *   format          RSS 2.0, Atom or RDF, and whether the feed carries full
 *                   article bodies in `content:encoded` or `content` rather
 *                   than summaries.
 *
 * The file it writes is a data source, not page copy. The editorial framing
 * lives in app/lib/feeds/editorial.ts, where a person wrote it.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'app/lib/feeds/feeds.json');
const SOURCE = path.join(ROOT, 'app/lib/feeds/sources.json');

const USER_AGENT =
  'Mozilla/5.0 (compatible; CuratedFeedsFeedCheck/1.0; +https://curatedfeeds.web.app/)';

/** Days of the feed's recent output the cadence figures are measured over. */
const WINDOW_DAYS = 30;

/** How many recent headlines a page shows. */
const HEADLINE_COUNT = 8;

const { feeds: SOURCES } = JSON.parse(await readFileUtf8(SOURCE));

async function readFileUtf8(file) {
  const { readFile } = await import('node:fs/promises');
  return readFile(file, 'utf8');
}

/* ------------------------------------------------------------------ fetching */

async function fetchFeed(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': USER_AGENT, accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*' },
    });
    if (!res.ok) return { ok: false, status: res.status };
    const body = await res.text();
    return { ok: true, status: res.status, body, contentType: res.headers.get('content-type') || '' };
  } catch (err) {
    return { ok: false, status: 0, error: String(err.message || err) };
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------- parsing */

const ATOM = 'http://www.w3.org/2005/Atom';
const CONTENT = 'http://purl.org/rss/1.0/modules/content/';
const DC = 'http://purl.org/dc/elements/1.1/';

/** Pull the child elements of `parent` whose tag ends with `suffix`. */
function childrenByLocalName(parent, suffix) {
  return [...parent.children].filter((el) => el.localName === suffix);
}

function childText(parent, localName) {
  const el = childrenByLocalName(parent, localName)[0];
  return el ? el.textContent.trim() : '';
}

/** The link target of an Atom entry or RSS item: rel="alternate" preferred. */
function entryLink(entry, feedLink) {
  const links = childrenByLocalName(entry, 'link');
  if (links.length) {
    const alternate = links.find((l) => (l.getAttribute('rel') || 'alternate') === 'alternate');
    const href = (alternate || links[0]).getAttribute('href');
    if (href) return href;
  }
  const guid = childText(entry, 'guid');
  if (/^https?:\/\//.test(guid)) return guid;
  return feedLink;
}

/** Parse one feed body into a uniform record. */
function parseFeed(body) {
  const doc = new DOMParser().parseFromString(body, 'application/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) return { ok: false, error: 'XML parse error' };

  const root = doc.documentElement;
  if (!root) return { ok: false, error: 'empty document' };

  const format = root.localName === 'feed' ? 'Atom' : root.localName === 'RDF' ? 'RDF' : 'RSS 2.0';

  let channel = root;
  let itemEls = [];
  let categoryTerms = [];
  let feedTitle = '';
  let feedDescription = '';
  let feedLink = '';
  let lastBuildDate = '';

  if (format === 'Atom') {
    feedTitle = childText(root, 'title');
    feedDescription = childText(root, 'subtitle');
    itemEls = childrenByLocalName(root, 'entry');
    categoryTerms = childrenByLocalName(root, 'category')
      .map((c) => c.getAttribute('term'))
      .filter(Boolean);
    const links = childrenByLocalName(root, 'link');
    feedLink = (links.find((l) => (l.getAttribute('rel') || 'alternate') === 'alternate') || links[0])?.getAttribute('href') || '';
  } else {
    channel = childrenByLocalName(root, 'channel')[0] || root;
    feedTitle = childText(channel, 'title');
    feedDescription = childText(channel, 'description');
    feedLink = childText(channel, 'link');
    lastBuildDate = childText(channel, 'lastBuildDate') || childText(channel, 'pubDate');
    itemEls = childrenByLocalName(channel, 'item');
    categoryTerms = childrenByLocalName(channel, 'category').map((c) => c.textContent.trim()).filter(Boolean);
    if (format === 'RDF') {
      itemEls = childrenByLocalName(root, 'item');
    }
  }

  const items = itemEls.map((el) => {
    const published =
      childText(el, 'pubDate') ||
      childText(el, 'published') ||
      childText(el, 'updated') ||
      childText(el, 'date');
    const bodyEl = el.querySelector('content\\:encoded, content');
    const hasFullText = Boolean(bodyEl && bodyEl.textContent.trim().length > 400);
    return {
      title: childText(el, 'title'),
      link: entryLink(el, feedLink),
      date: parseDate(published),
      hasFullText,
      author: childText(el, 'creator') || childText(el, 'author'),
      categories: childrenByLocalName(el, 'category')
        .map((c) => c.getAttribute('term') || c.textContent.trim())
        .filter(Boolean),
    };
  });

  return {
    ok: true,
    format,
    feedTitle,
    feedDescription,
    feedLink,
    lastBuildDate,
    categories: [...new Set(categoryTerms)].slice(0, 12),
    items,
  };
}

/* -------------------------------------------------------------------- dates */

function parseDate(value) {
  const text = (value || '').trim();
  if (!text) return null;
  const asEpoch = Date.parse(text);
  if (!Number.isNaN(asEpoch)) return new Date(asEpoch);
  const rfc = Date.parse(text.replace(/^[A-Za-z]{3},\s*/, '').replace(/\s+\([A-Z]{3,4}\)$/, ''));
  return Number.isNaN(rfc) ? null : new Date(rfc);
}

const DAY_MS = 86_400_000;

/* ------------------------------------------------------------------ measure */

/**
 * Turn a parsed feed into the measured facts a page shows.
 *
 * Cadence comes from a bounded 30-day window at the head of the feed, not
 * from the archive. An archive spanning three years would report a daily
 * feed as publishing "every three days", which is the wrong number for
 * someone deciding what to subscribe to.
 */
function measure(parsed, source) {
  const dated = parsed.items
    .filter((i) => i.date)
    .sort((a, b) => b.date - a.date);

  const newest = dated[0]?.date || null;
  const windowEnd = newest || new Date();
  const windowStart = new Date(windowEnd.getTime() - WINDOW_DAYS * DAY_MS);

  const inWindow = dated.filter((i) => i.date >= windowStart && i.date <= windowEnd);
  const publishingDays = new Set(inWindow.map((i) => i.date.toISOString().slice(0, 10))).size;

  // A feed that publishes rarely may have no items inside the window at all.
  // Fall back to the whole archive rather than reporting "zero".
  const useWindow = inWindow.length > 0;
  const effective = useWindow ? inWindow : dated;
  const effectiveDays = useWindow
    ? WINDOW_DAYS
    : Math.max(1, Math.round((dated[0].date - dated[dated.length - 1].date) / DAY_MS) + 1);

  const itemsPerDay = effective.length ? effective.length / effectiveDays : 0;
  const itemsPerWeek = itemsPerDay * 7;
  const fullTextCount = effective.filter((i) => i.hasFullText).length;

  const headlines = effective.slice(0, HEADLINE_COUNT).map((i) => ({
    title: i.title,
    link: i.link,
    date: i.date ? i.date.toISOString().slice(0, 10) : null,
  }));

  // Median gap between consecutive posts, in hours. A mean gap is skewed by
  // one long holiday; the median describes the normal rhythm.
  const gaps = [];
  for (let i = 0; i < dated.length - 1; i += 1) {
    gaps.push((dated[i].date - dated[i + 1].date) / 3_600_000);
  }
  gaps.sort((a, b) => a - b);
  const medianGapHours = gaps.length ? Math.round(gaps[Math.floor(gaps.length / 2)]) : null;

  const titleLengths = effective.map((i) => i.title.length).filter(Boolean);
  const avgTitleLength = titleLengths.length
    ? Math.round(titleLengths.reduce((a, b) => a + b, 0) / titleLengths.length)
    : 0;

  return {
    slug: source.slug,
    feedUrl: source.feedUrl,
    siteUrl: source.siteUrl,
    format: parsed.format,
    feedTitle: parsed.feedTitle || source.name,
    feedDescription: parsed.feedDescription,
    feedLink: parsed.feedLink || source.siteUrl,
    publisher: source.publisher,
    category: source.category,
    tags: source.tags,
    categoryTerms: parsed.categories,
    carriesFullText: fullTextCount > 0,
    fullTextShare: effective.length ? Math.round((fullTextCount / effective.length) * 100) : 0,
    itemsInFeed: parsed.items.length,
    itemsInWindow: inWindow.length,
    windowDays: WINDOW_DAYS,
    windowUsed: useWindow,
    itemsPerDay: Math.round(itemsPerDay * 10) / 10,
    itemsPerWeek: Math.round(itemsPerWeek * 10) / 10,
    publishingDays,
    publishingDayShare: Math.round((publishingDays / WINDOW_DAYS) * 100),
    medianGapHours,
    avgTitleLength,
    oldestItem: dated.length ? dated[dated.length - 1].date.toISOString().slice(0, 10) : null,
    newestItem: newest ? newest.toISOString().slice(0, 10) : null,
    archiveSpanDays: dated.length > 1
      ? Math.round((dated[0].date - dated[dated.length - 1].date) / DAY_MS)
      : 0,
    headlines,
    checkedAt: new Date().toISOString(),
  };
}

/* --------------------------------------------------------------------- main */

async function main() {
  const results = [];
  const failures = [];

  // A handful of concurrent requests, not 34 at once: polite to the hosts,
  // and fast enough that the run finishes in about a minute.
  const queue = [...SOURCES];
  const workers = Array.from({ length: 6 }, async () => {
    for (;;) {
      const source = queue.shift();
      if (!source) return;
      const res = await fetchFeed(source.feedUrl);
      if (!res.ok) {
        failures.push({ slug: source.slug, status: res.status, error: res.error || 'HTTP error' });
        console.error(`FAIL ${source.slug} (${res.status}) ${res.error || ''}`);
        continue;
      }
      const parsed = parseFeed(res.body);
      if (!parsed.ok) {
        failures.push({ slug: source.slug, status: res.status, error: parsed.error });
        console.error(`FAIL ${source.slug} ${parsed.error}`);
        continue;
      }
      results.push(measure(parsed, source));
      console.log(`OK   ${source.slug}`);
    }
  });
  await Promise.all(workers);

  if (results.length < SOURCES.length * 0.8) {
    console.error(
      `\nrefresh-feeds: only ${results.length}/${SOURCES.length} feeds responded. ` +
        'Refusing to write a partial snapshot — a directory that silently loses ' +
        'feeds is worse than one that fails loudly.',
    );
    process.exit(1);
  }

  results.sort((a, b) => a.slug.localeCompare(b.slug));
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(
    OUT,
    `${JSON.stringify({ checkedAt: new Date().toISOString(), feeds: results }, null, 2)}\n`,
    'utf8',
  );
  console.log(
    `\nrefresh-feeds: wrote ${results.length} feeds to ${path.relative(ROOT, OUT)}` +
      (failures.length ? ` (${failures.length} failed: ${failures.map((f) => f.slug).join(', ')})` : ''),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
