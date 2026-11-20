// ooh.directory — headful handoff: fills the form, then waits for the user to
// tick "I am human" and submit. Usage: node scripts/backlink-ooh-headful.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: false });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto('https://ooh.directory/suggest/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2000);

await page.locator('#id_url').fill('https://curatedfeeds.web.app/blog/', { delay: 25 });
await page.waitForTimeout(1200);
await page.locator('#id_category').selectOption('61'); // Computers, internet, tech
await page.waitForTimeout(1200);
await page.locator('#id_author_names').fill('Rajat Kashyap', { delay: 20 });

console.log('FORM READY — tick "I am human" and press Submit in the open window.');
console.log('Waiting up to 5 minutes...');

try {
  await page.waitForURL(/added|thanks|success/i, { timeout: 300000 });
  console.log('SUBMITTED ✔ —', page.url());
} catch {
  // check for inline confirmation instead
  const body = (await page.textContent('body')).replace(/\s+/g, ' ');
  if (/thank|submitted|received|review/i.test(body)) {
    console.log('SUBMITTED ✔ (inline confirmation)');
  } else {
    console.log('No confirmation detected. Body:', body.slice(0, 300));
  }
}
await page.screenshot({ path: `${shotDir}/ooh-final.png`, fullPage: true });
await page.waitForTimeout(3000);
await browser.close();
