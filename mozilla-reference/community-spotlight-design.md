# Community Spotlight — design & interaction audit

Source: `mozillafoundation.org` home page, already captured locally at
`output/html/home.html` (search `community-spotlight` /
`spotlight-card-set`) and `output/assets/.../pages/home_page.compiled.*.css`
(search `spotlight-card`). No live fetch was needed — this was scraped
in an earlier session.

## What it is

A 3-card "who we work with" carousel. One card is "featured" (large,
top-left), the other two sit stacked to its right at decreasing size
("middle", "last"). Clicking either non-featured card promotes it to
the featured slot; the other two rearrange to fill "middle"/"last".
Prev/Next arrows plus a "N / 3" counter step through the same way.
Only one name + bio is ever on screen at a time, in a text panel
below the image stack — not inside each card.

## DOM shape

```html
<div class="spotlight-card-carousel" style="--featured-image-height: 429px; --middle-image-height: 307px; --last-image-height: 184px;">
  <ol class="spotlight-card-carousel__slides">
    <li><article class="spotlight-card" data-carousel-slide="1" data-display-position="1" aria-hidden="false" aria-label="Card 1 of 3">
      <figure class="spotlight-card__image"><img .../></figure>
      <div class="spotlight-card__content"> <!-- name/desc: markup present but display:none --> </div>
    </article></li>
    <li><article class="spotlight-card" data-carousel-slide="2" data-display-position="2" aria-hidden="true" role="button" tabindex="0" aria-label="Card 2 of 3">...</article></li>
    <li><article class="spotlight-card" data-carousel-slide="3" data-display-position="3" aria-hidden="true" role="button" tabindex="0" aria-label="Card 3 of 3">...</article></li>
  </ol>

  <!-- The ONLY visible text — synced to whichever card is data-display-position="1" -->
  <div class="spotlight-card-carousel__teaser" aria-live="polite">
    <span class="spotlight-card__title">Festival Wrangler</span>
    <h3 class="spotlight-card__name">Surabhi Srivastava</h3>
    <div class="spotlight-card__description"><p>...</p></div>
  </div>

  <div class="spotlight-card-carousel__controls">
    <div class="pagination-controls">
      <span class="pagination-controls__current">1</span> / <span class="pagination-controls__total">3</span>
      <button data-direction="prev">‹</button>
      <button data-direction="next">›</button>
    </div>
  </div>
</div>
```

Two attributes do the work, and they're independent of each other:

- **`data-carousel-slide`** — the card's fixed identity (1/2/3), set
  once, never changes. Its colour and mask shape are keyed off this,
  so a given person always has the same silhouette no matter where
  they currently sit in the layout.
- **`data-display-position`** — which visual slot the card currently
  occupies (`1` = featured, `2` = middle, `3` = last). This is what
  changes on click/arrow-press, and CSS positions purely off this
  attribute.

## The three positions (CSS)

```css
.spotlight-card { position: absolute; margin: 0; transition: all .5s ease; }
.spotlight-card[data-display-position="1"] { left: 0; top: 0; width: 58.33%; z-index: 3; }
.spotlight-card[data-display-position="2"] { left: 58.33%; top: calc(var(--last-image-height) + 4.625rem); width: 41.67%; }
.spotlight-card[data-display-position="3"] { left: 58.33%; top: 4.625rem; width: 25%; }
```

Everything reflows via the `transition: all .5s ease` on the card
itself — there's no JS-driven animation library, just changing the
`data-display-position` attribute (which changes `left`/`top`/`width`)
and letting CSS transition between the two states.

The three `--*-image-height` custom properties are set inline by JS
(recalculated from the actual rendered image heights at the current
breakpoint) and consumed by the position math above (`top: calc(...)`)
so the stack's vertical spacing stays correct regardless of card
aspect ratio.

## Per-card identity: colour + mask shape

```css
[data-carousel-slide="1"] .spotlight-card__image { background: #f7ec36; }        /* yellow */
[data-carousel-slide="1"] .spotlight-card__image img { mask-image: url(circle-mask.svg); }

[data-carousel-slide="2"] .spotlight-card__image { background: #ed550a; }        /* orange */
[data-carousel-slide="2"] .spotlight-card__image img { mask-image: url(square-cutout-mask.svg); }

[data-carousel-slide="3"] .spotlight-card__image { background: #50c9f0; }        /* blue */
[data-carousel-slide="3"] .spotlight-card__image img { mask-image: url(trapezoid-mask.svg); }
```

Every photo is `aspect-ratio: 1` (square) before the mask crops it
into its shape — circle, a square with one corner notched out, and a
skewed trapezoid respectively. This is why one of the three always
looks "slanted" in a screenshot regardless of which slide it is: that
card is always slide 3, wearing the trapezoid mask.

## Interaction summary (behaviour, not exact JS)

- Click a non-featured card (`role="button"`, `aria-hidden="true"`,
  `tabindex="0"`) → it becomes `data-display-position="1"`; the
  previous featured card and the remaining one take positions 2/3 in
  some rotation; the teaser panel's text is swapped to match.
- Prev/Next buttons step the same rotation by one in either direction
  (disabled state — greyed icon — at either end, though with only 3
  cards it can also just wrap).
- Counter (`N / total`) reflects the featured card's ordinal
  position, not its fixed `data-carousel-slide` identity.
- `aria-hidden`/`aria-label="Card N of 3"` kept in sync for
  accessibility; the featured card is the only one with
  `aria-hidden="false"`.

## What Vagh's version keeps vs. changes

Kept: the core mechanic (one featured + others stacked smaller, click
any other to promote it and swap the single text panel below), the
prev/next + counter controls, and the "each card has a fixed
identity distinct from its display slot" idea.

Changed, deliberately not a copy of Mozilla's own asset files:
- 4 cards instead of 3 (Vagh's four pillars): one featured photo plus
  three secondary ones, all four always on screen at once (not one
  hidden out of rotation). The three secondaries are arranged as one
  full-width photo over a row of two smaller ones, rather than
  Mozilla's two stacked at decreasing size, so the combined stack's
  height climbs closer to the featured photo's instead of leaving a
  bare gap beneath a single short row.
- Vagh's own brand colours per pillar (amber/teal/blue/green — the
  same mapping already used for these four causes elsewhere on the
  site) instead of Mozilla's yellow/orange/blue palette.
- Vagh's own arch-corner shape language (`arch-tr`/`arch-tl`/
  `arch-bl`/circle) standing in for Mozilla's own circle/notch/
  trapezoid SVG masks — same idea (a fixed, distinct silhouette per
  card identity), different shapes so it doesn't read as a lift of
  Mozilla's actual brand assets.
