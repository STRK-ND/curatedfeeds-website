// Fills and submits the AppRater "add app" form for Curated Feeds.
// Usage: node scripts/backlink-apprater.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });

const DATA = {
  title: 'Curated Feeds',
  appUrl: 'https://curatedfeeds.web.app/',
  description:
    'Curated Feeds is a free RSS reader for Android built for focused, distraction-free reading. Articles arrive as cards you swipe right to save or left to mark done; sources organize into categories like Tech, Design, News and AI; and articles cache on first read so they stay available offline. There are no ads, no tracking, and no account required — your feed list and reading history stay on your device. Supports RSS 2.0, Atom and RDF feeds. Free forever, ~67 MB, Android 8.0+.',
  tags: 'RSS reader, News, Productivity, Privacy',
  imageUrl: 'https://curatedfeeds.web.app/icon-512.png',
  submitterName: 'Rajat Kashyap',
  submitterEmail: 'hello@curatedfeeds.web.app',
  website: 'https://curatedfeeds.web.app/',
};

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto('https://apprater.net/add/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2500);

// The app form is the one containing input[name=appUrl]
const form = page.locator('form', { has: page.locator('input[name="appUrl"]') }).first();

await form.locator('input[name="title"]').first().fill(DATA.title);
await form.locator('input[name="appUrl"]').first().fill(DATA.appUrl);
await form.locator('textarea[name="description"]').first().fill(DATA.description);
await form.locator('input[name="tags"]').first().fill(DATA.tags);
await form.locator('input[name="imageUrl"]').first().fill(DATA.imageUrl);
await form.locator('input[name="submitterName"]').first().fill(DATA.submitterName);
await form.locator('input[name="submitterEmail"]').first().fill(DATA.submitterEmail);
await form.locator('input[name="website"]').first().fill(DATA.website);

// Check the Android platform checkbox (React-controlled, so click via DOM)
await form
  .locator('input[name="platform"][value="Android"]')
  .first()
  .evaluate((el) => {
    if (!el.checked) el.click();
  });

// Dismiss cookie/consent popup if present
for (const t of ['Accept', 'Got it', 'OK', 'I understand', 'Allow all']) {
  const b = page.locator(`button:has-text("${t}")`).first();
  if (await b.isVisible().catch(() => false)) await b.click().catch(() => {});
}
await page.waitForTimeout(800);

// Verify the Android checkbox actually registered in React state
const checked = await form
  .locator('input[name="platform"][value="Android"]')
  .first()
  .evaluate((el) => el.checked);
console.log('Android checkbox checked:', checked);

await page.screenshot({ path: `${shotDir}/apprater-filled.png`, fullPage: true });

// Submit: the exact button text
const submitBtn = form.getByRole('button', { name: /submit for review/i }).first();
await submitBtn.scrollIntoViewIfNeeded();
await submitBtn.click();
await page.waitForTimeout(10000);
await page.screenshot({ path: `${shotDir}/apprater-result.png`, fullPage: true });

const body = (await page.textContent('body')).slice(0, 600);
console.log('URL now:', page.url());
console.log('Body snippet:', body.replace(/\s+/g, ' '));
await browser.close();
