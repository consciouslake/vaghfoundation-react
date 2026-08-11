// scrape.cjs
// Reference crawler for mozillafoundation.org
// Saves raw HTML, desktop+mobile screenshots, downloaded assets (CSS/fonts/icons),
// and extracts computed design tokens into output/tokens.json.
//
// Run:  node scrape.cjs
// Playwright is resolved via ./playwright-resolve.js (not an app dependency).

const path = require('path');
const fs = require('fs');

const { chromium } = require('./playwright-resolve.cjs');

const BASE = 'https://www.mozillafoundation.org';

// Page list chosen to mirror the Vagh Foundation template set:
// front-page / about / what-we-do / get-involved / volunteer / donate / contact
const PAGES = [
  { name: 'home',                  url: `${BASE}/en/`,                                            maps: 'front-page.php' },
  { name: 'meet-mozilla',          url: `${BASE}/en/meet-mozilla/`,                               maps: 'page-about.php' },
  { name: 'person-nabiha-syed',    url: `${BASE}/en/meet-mozilla/nabiha-syed/`,                   maps: 'team member detail' },
  { name: 'press-center',          url: `${BASE}/en/meet-mozilla/press-center/`,                  maps: 'news index' },
  { name: 'press-article',         url: `${BASE}/en/meet-mozilla/press-center/nothing-personal-magazine-launch/`, maps: 'single post' },
  { name: 'annual-reports',        url: `${BASE}/en/meet-mozilla/annual-reports-and-financials/`, maps: 'reports / financials' },
  { name: 'what-we-do',            url: `${BASE}/en/what-we-do/`,                                 maps: 'page-what-we-do.php' },
  { name: 'what-we-do-imagine',    url: `${BASE}/en/what-we-do/imagine/`,                         maps: 'programme detail' },
  { name: 'what-we-do-co-create',  url: `${BASE}/en/what-we-do/co-create/`,                       maps: 'programme detail' },
  { name: 'what-we-do-mobilize',   url: `${BASE}/en/what-we-do/mobilize/`,                        maps: 'programme detail' },
  { name: 'grantmaking',           url: `${BASE}/en/what-we-do/grantmaking/`,                     maps: 'programmes index' },
  { name: 'fellowship',            url: `${BASE}/en/what-we-do/grantmaking/fellowship/`,          maps: 'programme detail' },
  { name: 'join-us',               url: `${BASE}/en/join-us/`,                                    maps: 'page-get-involved.php / page-volunteer.php' },
  { name: 'future-of-tech',        url: `${BASE}/en/join-us/the-future-of-tech/`,                 maps: 'campaign page' },
  { name: 'sample-page',           url: `${BASE}/en/docs/how-do-i-wagtail/general-editing/sample-page/`, maps: 'generic content page' },
];

const OUT        = path.join(__dirname, 'output');
const HTML_DIR   = path.join(OUT, 'html');
const SHOT_DIR   = path.join(OUT, 'screenshots');
const MOBILE_DIR = path.join(OUT, 'screenshots-mobile');
const ASSET_DIR  = path.join(OUT, 'assets');

for (const d of [HTML_DIR, SHOT_DIR, MOBILE_DIR, ASSET_DIR]) {
  fs.mkdirSync(d, { recursive: true });
}

async function dismissCookies(page) {
  const selectors = [
    '#ccc-notify-accept',
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    'button:has-text("I Accept")',
  ];
  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (el && (await el.isVisible())) {
        await el.click({ timeout: 2000 });
        await page.waitForTimeout(400);
        break;
      }
    } catch (_) {}
  }
}

const { TOKEN_PROBE } = require('./probe.cjs');

async function run() {
  const browser = await chromium.launch();
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
  });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // Capture every stylesheet / font / svg icon the site serves, once.
  const seenAssets = new Set();
  const assetManifest = [];
  const captureAsset = async (response) => {
    try {
      const url = response.url();
      if (seenAssets.has(url)) return;
      if (!/\.(css|woff2?|svg)(\?|$)/i.test(url)) return;
      seenAssets.add(url);
      const buf = await response.body();
      const rel = url.replace(/^https?:\/\//, '').split('?')[0];
      const dest = path.join(ASSET_DIR, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      assetManifest.push({ url, file: path.relative(OUT, dest), bytes: buf.length });
    } catch (_) {}
  };

  const page = await desktop.newPage();
  const mpage = await mobile.newPage();
  page.on('response', captureAsset);
  mpage.on('response', captureAsset);

  const report = [];
  const tokens = {};

  for (const p of PAGES) {
    try {
      console.log(`Fetching: ${p.name} -> ${p.url}`);
      const res = await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(1500);
      await dismissCookies(page);
      await page.waitForTimeout(500);

      // Force lazy content in so the full-page screenshot is complete.
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            y += window.innerHeight;
            window.scrollTo(0, y);
            if (y < document.body.scrollHeight) setTimeout(step, 120);
            else { window.scrollTo(0, 0); setTimeout(resolve, 500); }
          };
          step();
        });
      });

      fs.writeFileSync(path.join(HTML_DIR, `${p.name}.html`), await page.content(), 'utf-8');
      await page.screenshot({ path: path.join(SHOT_DIR, `${p.name}.png`), fullPage: true });

      tokens[p.name] = await page.evaluate(TOKEN_PROBE);
      tokens[p.name].mapsToTemplate = p.maps;

      // Mobile pass — layout/nav behaviour differs enough to be worth capturing.
      await mpage.goto(p.url, { waitUntil: 'networkidle', timeout: 60000 });
      await mpage.waitForTimeout(1200);
      await dismissCookies(mpage);
      await mpage.screenshot({ path: path.join(MOBILE_DIR, `${p.name}.png`), fullPage: true });

      report.push({ name: p.name, url: p.url, status: res ? res.status() : 'unknown', title: await page.title(), maps: p.maps });
      console.log(`  ok  ${p.name}`);
    } catch (err) {
      console.error(`  FAIL ${p.name} — ${err.message}`);
      report.push({ name: p.name, url: p.url, status: 'error', error: err.message, maps: p.maps });
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(OUT, 'crawl-report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT, 'tokens.json'), JSON.stringify(tokens, null, 2));
  fs.writeFileSync(path.join(OUT, 'asset-manifest.json'), JSON.stringify(assetManifest, null, 2));

  console.log(`\nDone. ${report.filter(r => r.status === 200).length}/${PAGES.length} pages captured.`);
  console.log(`Assets saved: ${assetManifest.length}`);
  console.log(`Output in ${OUT}`);
}

run();
