#!/usr/bin/env node
/**
 * Generate the site's full-text Markdown digest, out/llms-full.txt.
 *
 * The previous version of this file was written by hand. It drifted: it
 * claimed a Google Play listing that does not exist, described version
 * numbers and a licence that contradicted the site's own meta tags, and
 * covered only 5 of the 15 pages. Nothing in the repo regenerated it, so
 * every copy of the text was a separate place to be wrong.
 *
 * This script concatenates the Markdown twins that scripts/build-markdown.mjs
 * already writes, so llms-full.txt is a view of the same rendered text the
 * pages serve. A page that changes changes the digest, and a new page appears
 * in it without anyone remembering to edit a text file.
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('out');

/** Page order in the digest: product first, then the deeper pages, then blog. */
const PAGE_ORDER = [
  'index.md',
  'about.md',
  'why.md',
  'why/feedly.md',
  'why/inoreader.md',
  'use-cases.md',
  'sources.md',
  'screenshots.md',
  'press.md',
  'changelog.md',
  'privacy.md',
  'blog.md',
];

/** Files that are not page twins and must never be pulled into the digest. */
const EXCLUDE = new Set(['agent-skill.md', 'llms-full.txt', 'feed.xml']);

async function mdFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '_next' || entry.name === '.firebase') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await mdFiles(full)));
    else if (entry.name.endsWith('.md') && !EXCLUDE.has(entry.name)) {
      out.push(path.relative(OUT_DIR, full));
    }
  }
  return out.sort();
}

/** Newest mtime across the twins, so the stamp tracks real content changes. */
async function lastModified(files) {
  let newest = new Date(0);
  for (const rel of files) {
    const { mtime } = await stat(path.join(OUT_DIR, rel));
    if (mtime > newest) newest = mtime;
  }
  return newest;
}

/** Pretty section title for the digest: "why/feedly.md" -> "Why / Feedly". */
function sectionLabel(rel) {
  return rel
    .replace(/\.md$/, '')
    .split('/')
    .filter(Boolean)
    .map((part) => (part === 'index' ? '' : part))
    .filter(Boolean)
    .map((part) => part.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(' / ') || 'Home';
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error('build-llms-full: out/ not found. Run `next build` first.');
    process.exit(1);
  }

  const all = await mdFiles(OUT_DIR);
  const ordered = [
    ...PAGE_ORDER.filter((p) => all.includes(p)),
    ...all.filter((p) => !PAGE_ORDER.includes(p)), // blog posts, in name order
  ];

  const distase = await lastModified(ordered);
  const stamp = distase.toISOString().slice(0, 10);

  const body = [];
  for (const rel of ordered) {
    let markdown = (await readFile(path.join(OUT_DIR, rel), 'utf8')).trim();
    // The twin's own H1 duplicates the section label printed above it, and its
    // H2/H3 headings have to sit below that label to keep one hierarchy.
    markdown = markdown
      .replace(/^#\s+.+$/m, '')
      .replace(/^(#{1,5}) /gm, '$1# ');
    body.push(`## ${sectionLabel(rel)}\n\n${markdown.trim()}\n`);
  }

  const digest = `# Curated Feeds, full site content (Markdown)

> Privacy-first RSS reader for Android. Beautiful cards, swipe-to-save,
> offline-ready, zero ads, zero tracking. Built by Rajat Kashyap in Flutter.
> Free worldwide.

Everything below is the site's own rendered content, generated from the
Markdown twin of each page at build time (append \`.md\` to any page URL to
fetch that twin directly). Nothing here is written separately from the pages,
so this digest cannot contradict them.

Last built: ${stamp}
Author: Rajat Kashyap (https://rajatkashyap.com)
Site licence: CC BY 4.0 with attribution (https://creativecommons.org/licenses/by/4.0/)
Contact: raj15400881@gmail.com
App download: https://apk-download.raj15400881.workers.dev/curated-feeds-v1.2.0.apk
Alternative download: https://curated-feeds.en.uptodown.com/android
RSS feed: https://curatedfeeds.web.app/feed.xml

---

${body.join('\n---\n\n')}
`;

  await writeFile(path.join(OUT_DIR, 'llms-full.txt'), digest, 'utf8');
  console.log(`build-llms-full: wrote out/llms-full.txt from ${ordered.length} pages`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
