'use client';

import { useState } from 'react';

/** Common feed paths by platform family — the heuristic layer, always available. */
const COMMON_PATHS = [
  '/feed/',
  '/feed',
  '/rss',
  '/rss.xml',
  '/feed.xml',
  '/atom.xml',
  '/index.xml',
  '/feeds/',
  '/blog/feed/',
  '/blog/rss/',
  '/?feed=rss2',
];

type Found = { url: string; kind: string; source: 'link-tag' | 'probe' };

function normalizeOrigin(input: string): string | null {
  try {
    const u = new URL(input.startsWith('http') ? input : `https://${input}`);
    if (!u.hostname.includes('.')) return null;
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

/** Fetch text through a proxy chain; returns null if all fail. */
async function fetchViaProxy(url: string): Promise<string | null> {
  const proxies = [
    (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u: string) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  ];
  for (const make of proxies) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(make(url), { signal: ctrl.signal });
      clearTimeout(t);
      if (res.ok) return await res.text();
    } catch {
      /* try next */
    }
  }
  return null;
}

function parseLinkTags(html: string, origin: string): Found[] {
  const out: Found[] = [];
  const re = /<link[^>]+>/gi;
  for (const tag of html.match(re) ?? []) {
    if (!/rel=["'][^"']*alternate[^"']*["']/i.test(tag)) continue;
    const type = /type=["']([^"']+)["']/i.exec(tag)?.[1] ?? '';
    if (!/rss|atom|feed/i.test(type)) continue;
    const href = /href=["']([^"']+)["']/i.exec(tag)?.[1];
    if (!href) continue;
    try {
      const abs = new URL(href, origin).toString();
      if (!out.some((f) => f.url === abs)) {
        out.push({ url: abs, kind: type.includes('atom') ? 'Atom' : 'RSS', source: 'link-tag' });
      }
    } catch {
      /* skip malformed */
    }
  }
  return out;
}

export default function FeedFinder() {
  const [site, setSite] = useState('');
  const [status, setStatus] = useState<'idle' | 'working' | 'done'>('idle');
  const [found, setFound] = useState<Found[]>([]);
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState('');

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(''), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const run = async () => {
    const origin = normalizeOrigin(site.trim());
    if (!origin) {
      setNote('Enter a valid website address, e.g. example.com');
      return;
    }
    setStatus('working');
    setNote('');
    setFound([]);

    // Everything in parallel: homepage markup + common-path probes, so the
    // worst case is one probe timeout (~6s per proxy hop), not a queue.
    const candidates = COMMON_PATHS.map((p) => `${origin}${p}`);
    const [homeResult, probeResults] = await Promise.all([
      fetchViaProxy(origin).then((html) => (html ? parseLinkTags(html, origin) : [])),
      Promise.all(
        candidates.slice(0, 8).map(async (c): Promise<Found | null> => {
          const body = await fetchViaProxy(c);
          if (body && /<rss|<feed|<rdf/i.test(body.slice(0, 600))) {
            return { url: c, kind: /<feed/i.test(body.slice(0, 600)) ? 'Atom' : 'RSS', source: 'probe' };
          }
          return null;
        }),
      ),
    ]);

    const results: Found[] = [...homeResult, ...probeResults.filter((r): r is Found => r !== null)];
    const sawMarkup = homeResult.length > 0 || results.length > 0;

    // De-duplicate: a link-tag hit and a probe hit can point at the same feed
    const unique = results.filter((r, i) => results.findIndex((x) => x.url === r.url) === i);

    setFound(unique);
    if (unique.length === 0) {
      setNote(
        sawMarkup
          ? 'No feed link found in the page markup, and none of the common feed paths resolved. The site may not publish a feed — check for a small RSS icon in its header or footer.'
          : 'Could not reach the site through the lookup proxies (they are free public services and are sometimes rate-limited). The candidate list below still works — paste each into your reader to test.',
      );
    }
    setStatus('done');
  };

  const suggestions = (() => {
    const origin = normalizeOrigin(site.trim());
    return origin ? COMMON_PATHS.slice(0, 6).map((p) => `${origin}${p}`) : [];
  })();

  return (
    <div className="finder">
      <form
        className="finder__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (status !== 'working') void run();
        }}
      >
        <input
          type="text"
          className="finder__input"
          placeholder="example.com"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          aria-label="Website address"
          spellCheck={false}
          autoCapitalize="none"
        />
        <button type="submit" className="btn finder__btn" disabled={status === 'working'}>
          {status === 'working' ? 'Looking…' : 'Find the feed'}
        </button>
      </form>

      {note && (
        <p className="finder__note" role="status">
          {note}
        </p>
      )}

      {found.length > 0 && (
        <ul className="finder__results">
          {found.map((f) => (
            <li key={f.url} className="finder__row">
              <span className="finder__kind">{f.kind}</span>
              <code className="finder__url">{f.url}</code>
              <button type="button" className="finder__copy" onClick={() => void copy(f.url)}>
                {copied === f.url ? 'Copied' : 'Copy'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {status === 'idle' && suggestions.length > 0 && (
        <div className="finder__hints">
          <p className="finder__hints-label">Likely candidates for {normalizeOrigin(site.trim())}:</p>
          <ul>
            {suggestions.map((s) => (
              <li key={s}>
                <code>{s}</code>
              </li>
            ))}
          </ul>
          <p className="finder__hints-note">
            Most sites keep a feed at one of these addresses. Press “Find the feed” to test them
            automatically, or paste them straight into Curated Feeds.
          </p>
        </div>
      )}
    </div>
  );
}
