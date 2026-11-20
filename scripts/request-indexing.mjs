// Requests Google indexing for URLs via the GSC UI, using the real Chrome
// profile (which holds the Google session). Chrome must be fully closed.
//
// Usage: node scripts/request-indexing.mjs <url1> <url2> ...
// Screenshots of each step land in scripts/.indexing-shots/ for debugging.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Chrome (127+) blocks DevTools debugging on the default profile, so we use a
// dedicated automation profile. First run: log into Google once in the opened
// window; the session persists here for all future runs.
const userDataDir = resolve('.gsc-chrome-profile');
const shotDir = resolve('scripts/.indexing-shots');
mkdirSync(shotDir, { recursive: true });

const RESOURCE = encodeURIComponent('https://curatedfeeds.web.app/');
const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('no urls given');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ctx = await chromium.launchPersistentContext(userDataDir, {
  channel: 'chrome',
  headless: false,
  viewport: { width: 1400, height: 950 },
});

const page = ctx.pages()[0] ?? (await ctx.newPage());
let ok = 0;

for (const url of urls) {
  const link = `https://search.google.com/search-console/inspect?resource_id=${RESOURCE}&id=${encodeURIComponent(url)}`;
  console.log(`\n=== ${url}`);
  try {
    await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // First run redirects to Google login — sign in there; the redirect comes
    // back to this inspection page. 10 min covers login + 2FA + captcha.
    await page.waitForSelector('text=/request indexing/i', { timeout: 600000 });
    await sleep(1500);
    await page.screenshot({ path: `${shotDir}/0-inspect.png` });

    await page.getByText(/request indexing/i).first().click();
    console.log('clicked Request Indexing');

    // The live test runs; a captcha may appear — wait long, log state
    const done = await page
      .waitForSelector('text=/indexing requested|request submitted|submitted for indexing/i', {
        timeout: 180000,
      })
      .then(() => true)
      .catch(() => false);

    if (!done) {
      await page.screenshot({ path: `${shotDir}/1-stuck-${Date.now()}.png` });
      const captcha = await page
        .waitForSelector('text=/unusual traffic|confirm you|recaptcha/i', { timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      if (captcha) {
        console.log('CAPTCHA DETECTED — solve it in the open browser window now');
        await page
          .waitForSelector('text=/indexing requested|request submitted/i', { timeout: 300000 })
          .then(() => console.log('completed after captcha'))
          .catch(() => console.log('still not confirmed; check screenshot'));
      } else {
        console.log('no confirmation within 3 min — check screenshot');
      }
    } else {
      console.log('INDEXING REQUESTED ✔');
      ok++;
    }
    await sleep(3000);
  } catch (e) {
    console.log('FAILED:', String(e).slice(0, 200));
    await page.screenshot({ path: `${shotDir}/2-error-${Date.now()}.png` }).catch(() => {});
  }
}

console.log(`\nDone: ${ok}/${urls.length} confirmed requested.`);
await ctx.close();
