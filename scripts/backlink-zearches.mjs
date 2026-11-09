// Zearches free website submission. Usage: node scripts/backlink-zearches.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto('https://zearches.com/submit-website-free.php', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2000);

const dirs = await page.evaluate(() =>
  [...document.querySelectorAll('select[name="directory"] option')].map((o) => ({ v: o.value, t: o.textContent.trim() })),
);
console.log('directory options:', JSON.stringify(dirs.slice(0, 20)));
const pick =
  dirs.find((d) => /software|saas/i.test(d.t)) ||
  dirs.find((d) => /tech|app/i.test(d.t)) ||
  dirs[1];
console.log('choosing:', JSON.stringify(pick));

await page.locator('input[name="url"]').first().fill('https://curatedfeeds.web.app/', { delay: 30 });
await page.waitForTimeout(1500);
await page.locator('input[name="title"]').first().fill('Curated Feeds — Free Privacy-First RSS Reader for Android', { delay: 15 });
await page.waitForTimeout(1500);
await page.locator('select[name="directory"]').first().selectOption(pick.v);
await page.waitForTimeout(2000);
await page
  .locator('textarea[name="description"]')
  .first()
  .type(
    'Curated Feeds is a free, privacy-first RSS reader for Android. Articles arrive as cards you swipe right to save or left to mark done; sources organize into categories like Tech, Design, News and AI; and articles cache on first read so they stay available offline. No ads, no tracking, and no account required. Supports RSS 2.0, Atom and RDF feeds. Free forever, Android 8.0+.',
    { delay: 8 },
  );
await page.waitForTimeout(6000);
await page.screenshot({ path: `${shotDir}/zearches-filled.png`, fullPage: true });

const submit = page.locator('button:has-text("Submit website for free")').first();
await submit.click();
await page.waitForTimeout(8000);
await page.screenshot({ path: `${shotDir}/zearches-result.png`, fullPage: true });
console.log('URL now:', page.url());
console.log('Body:', (await page.textContent('body')).replace(/\s+/g, ' ').slice(0, 400));
await browser.close();
