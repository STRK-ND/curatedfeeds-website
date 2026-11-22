#!/usr/bin/env node
/**
 * Submits all canonical URLs to the IndexNow API (Bing, Yandex, Seznam, Naver).
 * Uses the verified IndexNow key in public/9a822be5b9176b6f478b66126111832f.txt.
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = 'curatedfeeds.web.app';
const KEY = '9a822be5b9176b6f478b66126111832f';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.resolve(rootDir, 'out', 'sitemap.xml');

let urls = [];

if (existsSync(SITEMAP_PATH)) {
  const sitemapXml = await readFile(SITEMAP_PATH, 'utf8');
  const locMatches = sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g);
  for (const match of locMatches) {
    if (match[1]) urls.push(match[1].trim());
  }
}

if (!urls.length) {
  console.log('out/sitemap.xml not found or empty, importing sitemap generator directly...');
  const { default: sitemap } = await import('../app/sitemap.ts');
  const entries = sitemap();
  urls = entries.map((e) => e.url);
}

// Deduplicate and filter to ensure matching host
urls = Array.from(new Set(urls)).filter((u) => u.startsWith(`https://${HOST}`));

console.log(`Found ${urls.length} URLs to submit to IndexNow for ${HOST}`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

console.log('Sending batch request to https://api.indexnow.org/indexnow ...');

try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  console.log(`HTTP Status: ${response.status} ${response.statusText}`);
  if (responseText) {
    console.log(`Response body: ${responseText}`);
  }

  if (response.status === 200 || response.status === 202) {
    console.log(`✔ SUCCESS! ${urls.length} URLs successfully submitted to IndexNow (Bing/Yandex/Naver).`);
  } else {
    console.error(`✖ IndexNow submission returned unexpected status: ${response.status}`);
  }
} catch (err) {
  console.error('Failed to submit to IndexNow:', err);
}
