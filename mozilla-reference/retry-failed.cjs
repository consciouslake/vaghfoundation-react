// retry-failed.cjs
// Re-captures pages that timed out on `networkidle` (embedded media holds
// connections open indefinitely). Uses `load` + a fixed settle delay instead,
// then merges results back into output/tokens.json and crawl-report.json.

const path = require('path');
const fs = require('fs');
const { chromium } = require('./playwright-resolve.cjs');

const OUT = path.join(__dirname, 'output');
const report = JSON.parse(fs.readFileSync(path.join(OUT, 'crawl-report.json'), 'utf-8'));
const tokens = JSON.parse(fs.readFileSync(path.join(OUT, 'tokens.json'), 'utf-8'));

const failed = report.filter((r) => r.status !== 200);
if (!failed.length) {
  console.log('Nothing to retry.');
  process.exit(0);
}

// Same probe as scrape.js — kept in sync by reading it out of the source file
// would be fragile, so it is duplicated deliberately and minimally.
const { TOKEN_PROBE } = require('./probe.cjs');

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const mpage = await mctx.newPage();

  for (const entry of failed) {
    try {
      console.log(`Retrying: ${entry.name}`);
      const res = await page.goto(entry.url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(3000);
      try { const b = await page.$('#ccc-notify-accept'); if (b) await b.click({ timeout: 2000 }); } catch (_) {}
      await page.waitForTimeout(500);

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

      fs.writeFileSync(path.join(OUT, 'html', `${entry.name}.html`), await page.content(), 'utf-8');
      await page.screenshot({ path: path.join(OUT, 'screenshots', `${entry.name}.png`), fullPage: true });

      tokens[entry.name] = await page.evaluate(TOKEN_PROBE);
      tokens[entry.name].mapsToTemplate = entry.maps;

      await mpage.goto(entry.url, { waitUntil: 'load', timeout: 60000 });
      await mpage.waitForTimeout(2500);
      await mpage.screenshot({ path: path.join(OUT, 'screenshots-mobile', `${entry.name}.png`), fullPage: true });

      entry.status = res ? res.status() : 'unknown';
      entry.title = await page.title();
      delete entry.error;
      console.log(`  ok  ${entry.name}`);
    } catch (err) {
      console.error(`  FAIL ${entry.name} — ${err.message.split('\n')[0]}`);
      entry.error = err.message.split('\n')[0];
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, 'crawl-report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT, 'tokens.json'), JSON.stringify(tokens, null, 2));
  console.log(`\n${report.filter((r) => r.status === 200).length}/${report.length} pages now captured.`);
}

run();
