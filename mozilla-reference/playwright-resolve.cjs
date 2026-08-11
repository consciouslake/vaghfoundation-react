// playwright-resolve.cjs
// Playwright is not a dependency of this app — it is only needed to re-run the
// reference scrape. Resolve it from wherever a copy already exists on the
// machine so `node scrape.cjs` works without adding 200MB to the project.

const path = require('path');

const CANDIDATES = [
  'playwright',                                                    // if installed locally
  path.join(__dirname, 'node_modules', 'playwright'),
  path.join(__dirname, '..', 'node_modules', 'playwright'),
  // the original WordPress repo, where the Gates audit already installed it
  path.join(__dirname, '..', '..', 'VaghFoundation', 'gates-audit', 'node_modules', 'playwright'),
];

let playwright = null;
const tried = [];

for (const c of CANDIDATES) {
  try {
    playwright = require(c);
    break;
  } catch (_) {
    tried.push(c);
  }
}

if (!playwright) {
  console.error(
    'Could not resolve playwright. Tried:\n  ' + tried.join('\n  ') +
    '\n\nInstall it here with:\n  npm i -D playwright && npx playwright install chromium\n'
  );
  process.exit(1);
}

module.exports = playwright;
