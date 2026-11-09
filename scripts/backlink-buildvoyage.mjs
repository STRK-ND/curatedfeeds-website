// BuildVoyage submission. Usage: node scripts/backlink-buildvoyage.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto('https://buildvoyage.com/submit', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2500);

// Dump category options to pick the right one
const cats = await page.evaluate(() =>
  [...document.querySelectorAll('select[name="category_id"] option')].map((o) => ({ v: o.value, t: o.textContent.trim() })),
);
console.log('categories:', JSON.stringify(cats.slice(0, 25)));

const pick =
  cats.find((c) => /\bnews\b|rss/i.test(c.t)) ||
  cats.find((c) => /productiv/i.test(c.t)) ||
  cats.find((c) => /utilit|other|tool/i.test(c.t)) ||
  cats[1];
console.log('choosing:', JSON.stringify(pick));

await page.locator('input[name="name"]').first().fill('Curated Feeds');
await page.locator('input[name="tagline"]').first().fill('Free, privacy-first RSS reader for Android — swipe to save, read offline.');
await page.locator('input[name="site_url"]').first().fill('https://curatedfeeds.web.app/');
await page.locator('input[name="submitter_email"]').first().fill('hello@curatedfeeds.web.app');
await page.locator('select[name="category_id"]').first().selectOption(pick.v);
await page.locator('input[name="pricing_note"]').first().fill('Free');
await page.locator('input[name="accept_terms"]').first().evaluate((el) => { if (!el.checked) el.click(); });

// The description is a Tiptap rich-text editor (contenteditable), required for submit
const editor = page.locator('[contenteditable="true"]').first();
await editor.scrollIntoViewIfNeeded();
await editor.click();
await editor.type(
  'Curated Feeds is a free RSS reader for Android built for focused, distraction-free reading. Articles arrive as cards you swipe right to save or left to mark done, and sources organize into categories like Tech, Design, News and AI. Articles cache on first read so they stay available offline. No ads, no tracking, and no account required — your feed list and reading history stay on your device. Supports RSS 2.0, Atom and RDF feeds. Free forever, Android 8.0+.',
  { delay: 5 },
);
await page.waitForTimeout(1500);
await page.screenshot({ path: `${shotDir}/buildvoyage-filled.png`, fullPage: true });

const submit = page.locator('button[type="submit"]').first();
for (let i = 0; i < 10; i++) {
  if (await submit.isEnabled()) break;
  await page.waitForTimeout(1000);
}
console.log('submit enabled:', await submit.isEnabled());
console.log('submit button:', JSON.stringify(((await submit.textContent()) || '').trim()));
await submit.click({ force: true }).catch(async () => {
  await submit.evaluate((el) => el.click());
});
await page.waitForTimeout(8000);
await page.screenshot({ path: `${shotDir}/buildvoyage-result.png`, fullPage: true });
console.log('URL now:', page.url());
console.log('Body:', (await page.textContent('body')).replace(/\s+/g, ' ').slice(0, 300));
await browser.close();
