# Mozilla Foundation — Design System Reference

Captured from <https://www.mozillafoundation.org/en/> on 2026-08-11.
Source of truth for the "vibrant" redesign direction requested by the client.

Everything here was extracted from the live site — computed styles via Playwright
(`scrape.cjs` → `output/tokens.json`), plus the site's own compiled stylesheet
(`output/assets/.../home_page.compiled.*.css`). Nothing below is guesswork.

---

## 1. The one-sentence summary

**Flat, loud, unapologetically graphic.** Big saturated colour blocks that bleed
edge-to-edge, black text on colour (never white-on-pastel), a heavy grotesque
display face set with *negative* leading, arch-shaped corner cuts on imagery, and
hand-drawn ink doodles as accents. Zero gradients, zero drop-shadows, zero soft
UI. It is the exact opposite of the current Gates-style editorial serif theme.

---

## 2. Colour

### Core neutrals

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#000000` | All body + heading text, including on colour |
| `--near-black` | `#161616` | Footer background, dark buttons |
| `--paper` | `#FFFFFF` | Default page background |
| `--off-white` | `#F7F7F7` | Text on dark backgrounds, subtle bands |
| `--grey-500` | `#767676` | Meta text, captions |
| `--grey-300` | `#CCCCCC` | Rules, form borders |

### The vibrant palette (this is the whole point)

| Token | Hex | Role |
|---|---|---|
| `--orange-600` | `#D13109` | Link hover, deep accent |
| `--orange-500` | `#F06C13` | **Primary brand orange** — hero bands, page headers |
| `--orange-400` | `#F88539` | Card fills, footer Donate button |
| `--orange-200` | `#FF9E5F` | Carousel arrows, soft fills |
| `--yellow-400` | `#F7EC36` | Highlight bands behind statement text |
| `--yellow-300` | `#EED800` | Card fills |
| `--yellow-100` | `#FFFF6C` | Hover state on dark buttons |
| `--blue-500` | `#23A5E9` | **Primary brand blue** — card fills, stat shapes |
| `--blue-300` | `#50C9F0` | Card fills, separators |
| `--green-500` | `#20C376` | Accent |
| `--green-300` | `#53E17C` | Card fills |

**Ratio observed in the wild** (weighted by painted area across 15 pages): white
dominates ~85%, then near-black `#161616` (footer), then blue `#23A5E9`, orange
`#F88539`, yellow `#F7EC36`. The colour is applied in *large confident blocks*,
not sprinkled as accents.

**Hard rule the site never breaks:** text on a colour block is always
`#000000`. White text appears only on `#161616` / `#000000`.

---

## 3. Typography

Two custom families, both served locally as `woff2` (copies in
`output/assets/.../fonts/`):

| Family | Weights captured | Role |
|---|---|---|
| **Mozilla Headline** | 200–700, roman + italic | All headings, buttons, stat numbers |
| **Mozilla Text** | 200–700, roman + italic | Body copy, nav, forms, footer |

Full stack as declared:
```
font-family: "Mozilla Headline", "Helvetica Neue", Arial, X-LocaleSpecific, sans-serif;
font-family: "Mozilla Text",     "Helvetica Neue", Arial, X-LocaleSpecific, sans-serif;
```

### Type scale (computed, desktop 1440px)

| Role | Family | Size / line-height | Weight | Note |
|---|---|---|---|---|
| Hero wordmark headline | Headline | ~96px / 0.9 | 700 | Multicolour per-letter fills |
| Section statement (h2) | Headline | 52px / 46.8px | 600 | **line-height 0.9 — negative leading** |
| Card heading (h3) | Headline | 32px / 32px | 600 | line-height 1.0 |
| Stat figure | Headline | 32px / 32px | 900 | |
| Sub-heading | Headline | 24px / 26.4px | 700 | |
| Body large | Text | 18px / 27px | 400 | line-height 1.5 |
| **Body default** | Text | **16px / 24px** | 400 | the workhorse — 2,731 hits |
| Body bold | Text | 16px / 24px | 700 | |
| Caption / meta | Text | 12px / 15.6px | 400 | |
| Button label | Text | 16px / 24px | 400 | |

**The single most characteristic typographic move:** display headings run at
`line-height: 0.9` — the lines physically overlap in their boxes. That tight
stacking is what makes the headlines read as graphic blocks rather than prose.
`letter-spacing` is `normal` everywhere; the tension comes from leading alone.

### Font licensing — decision needed

Mozilla Headline and Mozilla Text are Mozilla's own brand typefaces. Even where
the file licence permits reuse, shipping a client site in another foundation's
brand face is a branding problem, not just a legal one. **Recommended
substitutes that carry the same personality:**

- Headline → **Bricolage Grotesque** or **Archivo** (both Google Fonts, both
  have the wide-grotesque flavour and hold up at 0.9 leading)
- Text → **IBM Plex Sans** or **Inter**

I'd pick these unless you get explicit clearance. See §8.

---

## 4. Shape language

This is the second signature after colour, and it is easy to get wrong.

### Asymmetric arch corners

Corners are rounded on **some** corners only, producing an arch / notch. Actual
computed values harvested from the site, in frequency order:

```
0px  0px  0px  32px      /* bottom-left arch — most common */
0px  32px                /* TL+BR pair */
0px  96px  0px  0px      /* large top-right arch */
0px  80px  0px  0px
96px 96px  0px  0px      /* arched top, like a doorway */
32px 32px  0px  0px
0px  160px 160px 0px     /* full right-side capsule */
16px                     /* uniform — used on small UI only */
```

Driven in CSS by a `--card-radius` custom property (`1.5rem` on small cards,
`5.75rem` on large ones) piped through a clip:

```css
--card-radius: 5.75rem;
--image-clip: inset(0 round 0 var(--card-radius) 0 var(--card-radius));
```

**Note this is the inverse of the current Vagh theme's Gates-style *concave*
corner overlays** — Mozilla's are convex rounded cuts, applied asymmetrically.
Those existing overlay elements should be removed, not restyled.

### Rotation

Cards carry `--card-rotation` of `-3deg`, `0deg`, or `3deg` and images a matching
`rotate(±3deg)`. Applied sparingly, to a minority of cards, so the grid still
reads as a grid.

### Angled colour slabs

Statistics use skewed quadrilateral blocks (clip-path polygons) above each
figure — the orange/yellow/blue shapes in the Impact row. Assets are in
`output/assets/.../_images/` as SVG masks (`mask-orange-200.svg`,
`notched-rectangle.svg`, `circle-mask.svg`).

### No shadows, no gradients

`box-shadow` is absent from every component probed. Depth is communicated purely
by colour adjacency and overlap.

---

## 5. Decorative ink assets

Hand-drawn, single-weight black line art, used as punctuation. All captured:

| File | What it is |
|---|---|
| `rays.svg`, `rays-newsletter-signup.svg` | Sunburst / "sparkle" above headings and hero corner |
| `loop-line.svg`, `loop-line-divider.svg` | Wobbly hand-drawn horizontal rule |
| `footer-separator.svg` | Sketchy divider in the footer |
| `separator-{blue-300,blue-600,orange-200}[-large].svg` | Coloured section dividers |
| `double-quote-glyph.svg` | Oversized pull-quote mark |
| `button-arrow-right-{black,white}.svg`, `button-arrow-left-black.svg` | CTA arrows |
| `button-heart-white.svg` | Donate button heart |
| `social-{bluesky,instagram,linkedin,spotify,tiktok}-white.svg` | Footer social row |

These are cheap to reproduce and do a huge amount of the "vibrant, human" work.
Recommend commissioning or drawing equivalents rather than reusing Mozilla's.

---

## 6. Components

### Header
Sticky, white, full-width. Left: multicolour wordmark logo (letters individually
filled orange/blue/yellow/green/black). Centre-left: text nav —
**Meet Mozilla · What We Do ▾ · Join Us · Magazine**. Right: search icon, then a
solid **Donate** button.

Donate button, exactly as computed:
```css
background: #161616;
color: #F7F7F7;
font: 400 16px/24px "Mozilla Text";
padding: 14.4px 24px;
border-radius: 0;        /* square — no pill */
```
Hover flips the background to `#FFFF6C` (yellow) with black text. The heart icon
sits to the right of the label.

On mobile the nav collapses to a hamburger; the Donate button stays visible.

### Hero (homepage)
1. Giant multicolour wordmark headline on white.
2. A **kinetic rotating tagline** — the h2 cycles through "Make good *tech the
   norm* / *things together* / *ideas matter*" (`--kinetic-animation-delay-ms:
   1000`, `--animation-duration-in-ms: 600`).
3. Below it, a full-bleed row: large video still (with a small square play
   button) on the left, and two stacked colour panels on the right — an
   accordion of three panels (`--total-panels: 3`,
   `--closed-panel-width: 100%/3`, `--open-multiplier: 5`) that expand on hover.
4. An orange `#F06C13` caption band sits under the video with a bold white-ish
   heading and body copy.

### Inner page header
Much simpler and very reusable: a full-bleed solid-colour band (orange
`#F06C13`) containing an oversized h1 in black plus a one-line deck. No image.
This is the pattern to use for About / What We Do / Get Involved / Contact.

### Colour cards
Full-bleed colour tile, image inset at the top with an arch corner, black
heading at 32px/1.0, and an underlined text link with a right arrow at the
bottom. Cards sit edge-to-edge in a 3-up row that scrolls horizontally as a
carousel (`1 / 6` counter and circular orange arrow buttons bottom-right).
Padding `32px`; top corners `32px 32px 0 0`.

### Statement band
A block of `#F7EC36` yellow with a 52px/0.9 headline in black, padding
`32px 48px 32px 32px`, and a stepped notch on the right edge. Topped with the
hand-drawn rays doodle. Used as a mid-page interrupt.

### Impact / stats row
Three columns. Each has a skewed colour slab (orange / yellow / blue) above a
900-weight figure and a black description in Headline 32px/1.0.

### Featured card grid
Two-column asymmetric cards: photo on one side clipped with a diagonal edge,
solid colour fill on the other, eyebrow label in caps 12px, then an h3 and an
underlined arrow link.

### Community spotlight carousel
Rotating person cards with prev/next circular arrows.

### Newsletter signup
Appears twice — mid-page (illustrated, with staggered reveal animation:
`--illustrated-newsletter-reveal-delay` 40/100/160/220ms) and in the footer.
Fields: email, country, language, privacy checkbox. Square inputs, white fill,
`#CCC` border, black square Sign Up button with arrow.

### Footer
`#161616` background, `#F7F7F7` text. Left: white wordmark + newsletter form.
Centre: two link columns. Right: orange `#F88539` **Donate** button with arrow,
plus a language `<select>`. A sketchy hand-drawn separator line runs above a
bottom bar with the licensing sentence and five social icons.

Footer link inventory (captured):
- Column 1 — Licensing · Annual Reports & Financials · Press Center · Nothing Personal Magazine · Mozilla Festival · Grants & Funding
- Column 2 — Careers ↗ · Privacy ↗ · Cookies ↗ · Legal ↗ · Participation Guidelines ↗

---

## 7. Layout & responsive

- Content max-width ≈ **1200px**, gutters `120px` at 1440px viewport.
- Breakpoints declared in the stylesheet:
  `small 0em · medium 40em (640px) · large 64em (1024px) · xlarge 75em (1200px) · xxlarge 90em · xxxlarge 120em`
- Vertical section rhythm: `48px` / `80px` / `120px`.
- Colour bands and card rows go **full-bleed**; only text columns respect the
  max-width. This contrast is a big part of the effect.
- Mobile cards go to a `70vw` horizontal scroll-snap carousel
  (`--mobile-card-width: 70vw`, `--mobile-slide-gap: 1rem`).

---

## 8. What this means for this React app

Mapping Mozilla's page types onto the existing routes in [src/pages/](../src/pages/):

| Vagh page | Mozilla reference captured |
|---|---|
| [Home.tsx](../src/pages/Home.tsx) | `home` |
| [About.tsx](../src/pages/About.tsx) | `meet-mozilla`, `person-nabiha-syed` |
| [WhatWeDo.tsx](../src/pages/WhatWeDo.tsx) | `what-we-do`, `what-we-do-imagine/co-create/mobilize` |
| [GetInvolved.tsx](../src/pages/GetInvolved.tsx) | `join-us`, `future-of-tech` |
| [Volunteer.tsx](../src/pages/Volunteer.tsx) | `join-us` |
| [Donate.tsx](../src/pages/Donate.tsx) | donate CTA banner + footer donate block |
| [Contact.tsx](../src/pages/Contact.tsx) | `sample-page` (generic content page) |

**The good news, and it is genuinely good here:** this app already separates
content from presentation. All copy lives in [src/content/](../src/content/) as
typed TS modules, and every page composes presentational components. So a
re-theme touches **components + [src/styles/main.css](../src/styles/main.css)**
and leaves `src/content/*.ts` essentially alone — only additive changes where a
new Mozilla-style block needs a field the old one didn't have (e.g. a per-card
`color` key for the rotating card fills).

Every Mozilla page is built from the same small kit — colour band header, colour
card row, statement band, stat row, newsletter, dark footer — so this is a
component-and-stylesheet job, not an information-architecture job.

### Components that map straight across (restyle, keep)

| Existing component | Becomes |
|---|---|
| [PageHeader.tsx](../src/components/PageHeader.tsx) | Solid colour band + oversized black h1 + deck |
| [SectionHead.tsx](../src/components/SectionHead.tsx) | 52px/0.9 Headline, optional rays doodle |
| [HCards.tsx](../src/components/HCards.tsx) / [IdeasGrid.tsx](../src/components/IdeasGrid.tsx) | Full-bleed colour cards with arch-corner images |
| [StatementQuote.tsx](../src/components/StatementQuote.tsx) | Yellow statement band with stepped notch |
| [EmailSignup.tsx](../src/components/EmailSignup.tsx) | Black/colour newsletter block, square inputs |
| [FourPillars.tsx](../src/components/FourPillars.tsx) / [ValuesGrid.tsx](../src/components/ValuesGrid.tsx) | 3-up skewed colour slabs + 900-weight figures |
| [Footer.tsx](../src/layout/Footer.tsx) | `#161616` footer, orange Donate, sketchy separator |
| [Header.tsx](../src/layout/Header.tsx) / [MegaMenu.tsx](../src/layout/MegaMenu.tsx) | White sticky bar, square black Donate button |
| [ArrowRight.tsx](../src/components/ArrowRight.tsx) | Keep — matches Mozilla's CTA arrow idiom |
| [useCarousel.ts](../src/hooks/useCarousel.ts) | Reuse for the card row + spotlight carousels |

### Components to delete, not restyle

These encode the Gates language and have no Mozilla counterpart:

- [GateFeature.tsx](../src/components/GateFeature.tsx) — the green "gate frame"
- [Marked.tsx](../src/components/Marked.tsx) — italic-serif accent-word emphasis
- [FocusList.tsx](../src/components/FocusList.tsx) — vertical facts list (becomes the stat row)
- [Timeline.tsx](../src/components/Timeline.tsx) — no equivalent; fold into cards if the content is needed
- The concave corner overlays and `--gate*` tokens in `main.css` (Mozilla's arches are **convex**)

### Token migration

`main.css` currently has a `:root` block of Gates tokens (`--paper: #F5F3ED`,
`--navy`, `--accent: #0D8C55`, `--font-serif: 'Noto Serif'`, `--gate-arch`, …).
Replace that block wholesale with [tokens.css](./tokens.css) — the names are
deliberately different so nothing silently inherits the old palette; anything
still referencing `--accent` or `--gate` will fail loudly and show you what's
left to convert.

### New components needed

- Kinetic rotating headline (hero) — cycles phrases on a 1000ms dwell
- Hover-expand panel accordion (hero right side, 3 panels)
- Skewed colour slab (clip-path polygon) for the stat row
- Hand-drawn doodle set — rays, loop-line rule, sketchy separator (see §5)

---

## 9. What's in `output/`

| Path | Contents |
|---|---|
| `output/html/*.html` | Fully-rendered DOM for all 15 pages |
| `output/screenshots/*.png` | Full-page desktop captures @1440 |
| `output/screenshots-mobile/*.png` | Full-page mobile captures @390 |
| `output/tiles/home-*.png` | Viewport-sized homepage tiles (readable detail) |
| `output/assets/` | Every CSS, woff2 and SVG the site served (74 files) |
| `output/tokens.json` | Computed styles + colour/type/radius histograms per page |
| `output/asset-manifest.json` | URL → local path for every captured asset |
| `output/crawl-report.json` | Status of all 15 pages (all 200) |
| `tokens.css` | Palette + type scale, ready to drop into `src/styles/main.css` |

Re-run with `node scrape.cjs` (then `node retry-failed.cjs` for any timeouts).

**Why `.cjs`:** this app is `"type": "module"`, so a plain `.js` file here would
be treated as ESM and these CommonJS scripts would silently export nothing. The
`.cjs` extension pins them to CommonJS.

Playwright is **not** a dependency of this app — [playwright-resolve.cjs](./playwright-resolve.cjs)
finds an existing install (it currently picks up the one in the WordPress repo at
`../../VaghFoundation/gates-audit/node_modules`). If that repo goes away, run
`npm i -D playwright && npx playwright install chromium` in this folder.
