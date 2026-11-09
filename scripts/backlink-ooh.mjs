// ooh.directory blog suggestion (Django form, CSRF via browser session).
// Usage: node scripts/backlink-ooh.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto('https://ooh.directory/suggest/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2000);

await page.locator('#id_url').fill('https://curatedfeeds.web.app/blog/', { delay: 25 });
await page.waitForTimeout(1500);
// "Computers, internet, tech" is a top-level category
await page.locator('#id_category').selectOption({ label: 'Computers, internet, tech' }).catch(async () => {
  const v = await page.evaluate(() => {
    const opt = [...document.querySelectorAll('#id_category option')].find((o) => o.textContent.trim() === 'Computers, internet, tech');
    return opt ? opt.value : null;
  });
  if (v) await page.locator('#id_category').selectOption(v);
});
await page.waitForTimeout(1500);
const author = page.locator('#id_author_names');
if (await author.count()) await author.fill('Rajat Kashyap', { delay: 20 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${shotDir}/ooh-filled.png`, fullPage: true });

await page.locator('button[type="submit"]').first().click();
await page.waitForTimeout(8000);
await page.screenshot({ path: `${shotDir}/ooh-result.png`, fullPage: true });
console.log('URL now:', page.url());
console.log('Body:', (await page.textContent('body')).replace(/\s+/g, ' ').slice(0, 400));
await browser.close();
