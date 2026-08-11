// probe.cjs
// Shared computed-style probe, evaluated inside the page by scrape.cjs and retry-failed.cjs.

// Pull computed styles for the roles we actually have to rebuild in the WP theme.
const TOKEN_PROBE = () => {
  const pick = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      selector: el.tagName.toLowerCase() +
        (el.className && typeof el.className === 'string'
          ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.')
          : ''),
      text: (el.textContent || '').trim().slice(0, 80),
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      border: cs.border,
      padding: cs.padding,
      margin: cs.margin,
      boxShadow: cs.boxShadow,
      display: cs.display,
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  };

  const first = (sel) => pick(document.querySelector(sel));
  const all = (sel, limit = 8) =>
    Array.from(document.querySelectorAll(sel)).slice(0, limit).map(pick).filter(Boolean);

  // Frequency histogram of background colours across all rendered elements —
  // this is what reveals the real section-band palette.
  const bgCount = {};
  const colorCount = {};
  const radiusCount = {};
  const fontCount = {};
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 20) return;
    const bg = cs.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)') {
      bgCount[bg] = (bgCount[bg] || 0) + Math.round((r.width * r.height) / 1000);
    }
    colorCount[cs.color] = (colorCount[cs.color] || 0) + 1;
    if (cs.borderRadius && cs.borderRadius !== '0px') {
      radiusCount[cs.borderRadius] = (radiusCount[cs.borderRadius] || 0) + 1;
    }
    fontCount[`${cs.fontFamily} | ${cs.fontWeight} | ${cs.fontSize} | ${cs.lineHeight}`] =
      (fontCount[`${cs.fontFamily} | ${cs.fontWeight} | ${cs.fontSize} | ${cs.lineHeight}`] || 0) + 1;
  });

  const top = (obj, n) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n)
      .map(([k, v]) => ({ value: k, weight: v }));

  return {
    url: location.href,
    title: document.title,
    viewport: { w: innerWidth, h: innerHeight },
    page: {
      body: first('body'),
      main: first('main'),
    },
    roles: {
      header:     first('header'),
      nav:        first('nav'),
      navLinks:   all('header a, nav a', 12),
      h1:         all('h1', 3),
      h2:         all('h2', 6),
      h3:         all('h3', 6),
      paragraph:  all('p', 4),
      buttons:    all('a[class*="btn"], a[class*="button"], button[class*="btn"], .btn, .button', 10),
      cards:      all('[class*="card"]', 8),
      sections:   all('section', 10),
      footer:     first('footer'),
      footerLinks: all('footer a', 12),
    },
    histograms: {
      backgroundColors: top(bgCount, 14),
      textColors:       top(colorCount, 10),
      borderRadii:      top(radiusCount, 10),
      typeScale:        top(fontCount, 18),
    },
    contentModel: {
      navItems: Array.from(document.querySelectorAll('header nav a, header a'))
        .map((a) => ({ text: (a.textContent || '').trim(), href: a.getAttribute('href') }))
        .filter((x) => x.text),
      footerItems: Array.from(document.querySelectorAll('footer a'))
        .map((a) => ({ text: (a.textContent || '').trim(), href: a.getAttribute('href') }))
        .filter((x) => x.text),
      headings: Array.from(document.querySelectorAll('h1,h2,h3'))
        .map((h) => ({ level: h.tagName, text: (h.textContent || '').trim().slice(0, 120) }))
        .filter((x) => x.text),
    },
  };
};

module.exports = { TOKEN_PROBE };
