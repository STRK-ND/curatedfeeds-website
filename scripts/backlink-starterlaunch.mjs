// StarterLaunch: paste URL -> listing flow. Usage: node scripts/backlink-starterlaunch.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto('https://starterlaunch.net/submit', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2500);

await page.locator('input[name="url"]').first().fill('https://curatedfeeds.web.app/');
await page.screenshot({ path: `${shotDir}/starterlaunch-step1.png` });

// Click the primary action: the form's submit button, or press Enter
const btn = page.locator('form button[type="submit"], form button').first();
const btnText = ((await btn.count()) ? await btn.textContent() : '') || '';
console.log('clicking button:', JSON.stringify(btnText.trim()));
if (await btn.count()) {
  await btn.click().catch(() => page.keyboard.press('Enter'));
} else {
  await page.keyboard.press('Enter');
}
await page.waitForTimeout(6000);
await page.screenshot({ path: `${shotDir}/starterlaunch-step2.png`, fullPage: true });
console.log('URL now:', page.url());
const body = (await page.textContent('body')).replace(/\s+/g, ' ').slice(0, 400);
console.log('Body:', body);
await browser.close();
