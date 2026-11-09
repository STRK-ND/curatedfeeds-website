// Recon pass: visit each submission URL, dump form fields + buttons + screenshot.
// Usage: node scripts/backlink-recon.mjs <url> [<url> ...]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const shotDir = resolve('scripts/.backlink-shots');
mkdirSync(shotDir, { recursive: true });
const urls = process.argv.slice(2);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

for (const url of urls) {
  const name = url.replace(/[^a-z0-9]+/gi, '_').slice(0, 40);
  console.log(`\n=== ${url}`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3000);
    const fields = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('input, textarea, select')) {
        if (el.type === 'hidden' && !el.name?.startsWith('_')) continue;
        out.push({
          tag: el.tagName.toLowerCase(),
          type: el.type || '',
          name: el.name || '',
          id: el.id || '',
          placeholder: el.placeholder || '',
          required: el.required || false,
          visible: !!(el.offsetParent || el.type === 'hidden'),
        });
      }
      const buttons = [...document.querySelectorAll('button, input[type=submit], a[href^="#submit"]')]
        .filter((b) => b.offsetParent)
        .slice(0, 6)
        .map((b) => (b.textContent || b.value || '').trim().slice(0, 40));
      return { fields: out, buttons, title: document.title.slice(0, 80) };
    });
    console.log('title:', fields.title);
    for (const f of fields.fields) {
      console.log(`  [${f.tag}${f.type ? ':' + f.type : ''}] name=${f.name || '-'} id=${f.id || '-'} ph="${f.placeholder}"${f.required ? ' REQUIRED' : ''}${f.visible ? '' : ' HIDDEN'}`);
    }
    console.log('  buttons:', JSON.stringify(fields.buttons));
    await page.screenshot({ path: `${shotDir}/${name}.png`, fullPage: false });
  } catch (e) {
    console.log('  FAILED:', String(e).slice(0, 140));
  }
}
await browser.close();
