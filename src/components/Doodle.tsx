/**
 * Hand-drawn ink accents — single-weight black line art used as
 * punctuation throughout the vibrant theme.
 *
 * These are drawn from scratch for Vagh Foundation. The reference
 * site's own doodle SVGs are part of Mozilla's brand identity and are
 * deliberately not reused; only the idiom (loose, single-weight,
 * slightly irregular pen strokes) is carried across.
 */

type DoodleName = 'rays' | 'rule' | 'separator' | 'squiggle-arrow' | 'corner-arrow' | 'steps' | 'heart'

interface DoodleProps {
  name: DoodleName
  className?: string
}

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function Doodle({ name, className }: DoodleProps) {
  const cls = className ? `doodle ${className}` : 'doodle'

  switch (name) {
    /* Sunburst — sits above statement headings and hero corners. The
       rays deliberately don't converge on a single point. */
    case 'rays':
      return (
        <svg viewBox="0 0 100 62" className={`${cls} doodle--rays`} aria-hidden="true">
          <g {...STROKE} strokeWidth={2.6}>
            <path d="M50 56 Q50 38 48.5 19" />
            <path d="M58 55 Q61.5 40 65 24" />
            <path d="M42 55 Q38.5 40 34.5 25" />
            <path d="M65 52 Q72.5 41 80.5 30" />
            <path d="M35 52 Q27.5 41 19.5 31" />
            <path d="M71 50 Q82 45 93 40.5" />
            <path d="M29 50 Q18 45 7 40.5" />
          </g>
        </svg>
      )

    /* Wobbly horizontal rule with a looped flourish — mid-page divider. */
    case 'rule':
      return (
        <svg
          viewBox="0 0 1200 44"
          preserveAspectRatio="none"
          className={`${cls} doodle--rule`}
          aria-hidden="true"
        >
          <path
            {...STROKE}
            strokeWidth={2.4}
            d="M3 29 C 150 21 300 33 470 27 C 518 25 538 7 557 11 C 574 15 557 37 545 29 C 533 21 552 5 572 11 C 590 17 601 27 641 25 C 800 19 1000 31 1197 25"
          />
        </svg>
      )

    /* Sketchy multi-stroke divider — footer. */
    case 'separator':
      return (
        <svg
          viewBox="0 0 1200 16"
          preserveAspectRatio="none"
          className={`${cls} doodle--rule`}
          aria-hidden="true"
        >
          <g {...STROKE} strokeWidth={1.6}>
            <path d="M2 9 C 130 4 250 13 385 8 C 520 3 645 13 782 8 C 905 4 1055 12 1198 7" />
            <path d="M28 11 C 165 7 305 14 448 10" />
            <path d="M712 10 C 860 6 1010 13 1186 9" />
          </g>
        </svg>
      )

    /* Rising zigzag arrow — dropped into colour cards. */
    case 'squiggle-arrow':
      return (
        <svg viewBox="0 0 84 86" className={`${cls} doodle--mark`} aria-hidden="true">
          <g {...STROKE} strokeWidth={2.6}>
            <path d="M7 79 L31 41 L45 63 L74 9" />
            <path d="M60 12 L75 8 L78 23" />
          </g>
        </svg>
      )

    /* Elbow arrow — runs along flat, then bends and drops straight
       down into an arrowhead. Connects two stacked elements the way
       the reference site's own carousel doodle does. */
    case 'corner-arrow':
      return (
        <svg viewBox="0 0 130 170" className={`${cls} doodle--mark`} aria-hidden="true" style={{ overflow: 'visible' }}>
          <g {...STROKE} strokeWidth={4.5}>
            <path d="M10 24 C 42 20 72 26 96 23 C 112 21 116 30 114 56 C 112 90 114 122 113 144" />
            <path d="M97 130 L113 160 L125 130" />
          </g>
        </svg>
      )

    /* Staircase — dropped into colour cards. */
    case 'steps':
      return (
        <svg viewBox="0 0 84 86" className={`${cls} doodle--mark`} aria-hidden="true">
          <path
            {...STROKE}
            strokeWidth={2.6}
            d="M5 80 L6 59 L28 58 L27 38 L51 37 L50 17 L75 16 L76 80"
          />
        </svg>
      )

    /* Outline heart — rides in the Donate button. */
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            {...STROKE}
            strokeWidth={1.9}
            d="M12 20.5 C4.2 14.6 2.2 10 4.7 6.6 C7.2 3.2 11 4.7 12 7.2 C13 4.7 16.8 3.2 19.3 6.6 C21.8 10 19.8 14.6 12 20.5 Z"
          />
        </svg>
      )
  }
}
