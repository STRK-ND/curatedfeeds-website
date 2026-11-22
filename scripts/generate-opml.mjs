#!/usr/bin/env node
/**
 * Generate validated OPML 2.0 XML files from curated publications and categories.
 * Writes output bundles to public/opml/.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const opmlDir = path.resolve(rootDir, 'public', 'opml');

await mkdir(opmlDir, { recursive: true });

// Import TS data
const { PUBLICATIONS } = await import('../app/lib/data/publications.ts');
const { CATEGORIES } = await import('../app/lib/data/categories.ts');

function xmlEscape(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildOpml(title, outlineXml) {
  const dateStr = new Date('2026-11-22T00:00:00Z').toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>${xmlEscape(title)}</title>
    <dateCreated>${dateStr}</dateCreated>
    <docs>http://opml.org/spec2.opml</docs>
  </head>
  <body>
${outlineXml}
  </body>
</opml>
`;
}

// 1. All 50 Top Publications grouped by category
const pubsByCategory = {};
for (const pub of PUBLICATIONS) {
  if (!pubsByCategory[pub.category]) pubsByCategory[pub.category] = [];
  pubsByCategory[pub.category].push(pub);
}

let allPubsXml = '';
for (const [catName, pubs] of Object.entries(pubsByCategory)) {
  allPubsXml += `    <outline text="${xmlEscape(catName)}" title="${xmlEscape(catName)}">\n`;
  for (const pub of pubs) {
    const htmlUrl = pub.domain.startsWith('http') ? pub.domain : `https://${pub.domain}`;
    allPubsXml += `      <outline type="rss" text="${xmlEscape(pub.name)}" title="${xmlEscape(pub.name)}" xmlUrl="${xmlEscape(pub.feedUrl)}" htmlUrl="${xmlEscape(htmlUrl)}" description="${xmlEscape(pub.summary)}" />\n`;
    if (pub.sectionFeeds?.length) {
      for (const section of pub.sectionFeeds) {
        allPubsXml += `      <outline type="rss" text="${xmlEscape(pub.name + ' - ' + section.name)}" title="${xmlEscape(pub.name + ' - ' + section.name)}" xmlUrl="${xmlEscape(section.url)}" htmlUrl="${xmlEscape(htmlUrl)}" />\n`;
      }
    }
  }
  allPubsXml += `    </outline>\n`;
}

await writeFile(
  path.join(opmlDir, 'all-50-publications.opml'),
  buildOpml('Curated Feeds - 50 Best Global Publications (2027)', allPubsXml),
  'utf8'
);

// 2. Tech & Startups bundle
const techPubs = PUBLICATIONS.filter((p) => p.category === 'Technology' || p.category === 'Business & Markets');
let techXml = `    <outline text="Technology &amp; Startups" title="Technology &amp; Startups">\n`;
for (const pub of techPubs) {
  const htmlUrl = pub.domain.startsWith('http') ? pub.domain : `https://${pub.domain}`;
  techXml += `      <outline type="rss" text="${xmlEscape(pub.name)}" title="${xmlEscape(pub.name)}" xmlUrl="${xmlEscape(pub.feedUrl)}" htmlUrl="${xmlEscape(htmlUrl)}" description="${xmlEscape(pub.summary)}" />\n`;
}
techXml += `    </outline>\n`;

await writeFile(
  path.join(opmlDir, 'tech-startups.opml'),
  buildOpml('Curated Feeds - Tech & Startups OPML Bundle (2027)', techXml),
  'utf8'
);

// 3. Category specific bundles
const bundleMap = [
  { slug: 'cybersecurity', filename: 'cybersecurity-2027.opml', title: 'Cybersecurity & InfoSec RSS Feeds (2027)' },
  { slug: 'crypto', filename: 'crypto-web3.opml', title: 'Crypto & Web3 Protocol RSS Feeds (2027)' },
  { slug: 'science', filename: 'science-research.opml', title: 'Science & Aerospace Research RSS Feeds (2027)' },
];

for (const b of bundleMap) {
  const cat = CATEGORIES.find((c) => c.slug === b.slug);
  if (cat) {
    let catXml = `    <outline text="${xmlEscape(cat.name)}" title="${xmlEscape(cat.name)}">\n`;
    for (const feed of cat.feeds) {
      catXml += `      <outline type="rss" text="${xmlEscape(feed.name)}" title="${xmlEscape(feed.name)}" xmlUrl="${xmlEscape(feed.url)}" description="${xmlEscape(feed.blurb)}" />\n`;
    }
    catXml += `    </outline>\n`;
    await writeFile(path.join(opmlDir, b.filename), buildOpml(b.title, catXml), 'utf8');
  }
}

// 4. AI & Machine Learning Bundle
let aiXml = `    <outline text="AI &amp; Machine Learning" title="AI &amp; Machine Learning">\n`;
const aiFeeds = [
  { name: 'OpenAI News', url: 'https://openai.com/news/rss.xml', blurb: 'Official research releases and announcements' },
  { name: 'Google DeepMind', url: 'https://deepmind.google/blog/rss.xml', blurb: 'Frontier AI research and architecture logs' },
  { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed', blurb: 'Analysis of societal and industrial AI impact' },
  { name: 'ArXiv CS.AI Updates', url: 'https://rss.arxiv.org/rss/cs.AI', blurb: 'Daily pre-print paper abstracts' },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml', blurb: 'Open source models and datasets' },
  { name: 'Latent Space', url: 'https://www.latent.space/feed', blurb: 'AI engineer podcast and deep-dives' },
];
for (const feed of aiFeeds) {
  aiXml += `      <outline type="rss" text="${xmlEscape(feed.name)}" title="${xmlEscape(feed.name)}" xmlUrl="${xmlEscape(feed.url)}" description="${xmlEscape(feed.blurb)}" />\n`;
}
aiXml += `    </outline>\n`;
await writeFile(
  path.join(opmlDir, 'ai-machine-learning.opml'),
  buildOpml('Curated Feeds - AI & Machine Learning OPML Bundle (2027)', aiXml),
  'utf8'
);

// 5. Developer & Engineering Bundle
let devXml = `    <outline text="Developer &amp; Engineering" title="Developer &amp; Engineering">\n`;
const devFeeds = [
  { name: 'Martin Fowler', url: 'https://martinfowler.com/feed.atom', blurb: 'Software design patterns and refactoring' },
  { name: 'GitHub Engineering', url: 'https://github.blog/engineering/feed/', blurb: 'Scale, infrastructure, and distributed systems' },
  { name: 'Dan Luu', url: 'https://danluu.com/atom.xml', blurb: 'Systems performance, hardware, and engineering economics' },
  { name: 'Julia Evans', url: 'https://jvns.ca/atom.xml', blurb: 'Debugging, networking, and developer tools' },
  { name: 'Stripe Increment', url: 'https://increment.com/feed.xml', blurb: 'Software engineering magazine for practitioners' },
];
for (const feed of devFeeds) {
  devXml += `      <outline type="rss" text="${xmlEscape(feed.name)}" title="${xmlEscape(feed.name)}" xmlUrl="${xmlEscape(feed.url)}" description="${xmlEscape(feed.blurb)}" />\n`;
}
devXml += `    </outline>\n`;
await writeFile(
  path.join(opmlDir, 'developer-engineering.opml'),
  buildOpml('Curated Feeds - Developer & Engineering OPML Bundle (2027)', devXml),
  'utf8'
);

// 6. Master Starter Collection (All 12 categories combined)
let allCategoriesXml = '';
for (const cat of CATEGORIES) {
  allCategoriesXml += `    <outline text="${xmlEscape(cat.name)}" title="${xmlEscape(cat.name)}">\n`;
  for (const feed of cat.feeds) {
    allCategoriesXml += `      <outline type="rss" text="${xmlEscape(feed.name)}" title="${xmlEscape(feed.name)}" xmlUrl="${xmlEscape(feed.url)}" description="${xmlEscape(feed.blurb)}" />\n`;
  }
  allCategoriesXml += `    </outline>\n`;
}

await writeFile(
  path.join(opmlDir, 'all-starter-feeds.opml'),
  buildOpml('Curated Feeds - Master Starter Feeds OPML Collection (2027)', allCategoriesXml),
  'utf8'
);

console.log('✔ Successfully generated 7 OPML bundles in public/opml/');
