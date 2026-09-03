import { useCallback, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Href, MarkedText, Src } from '../content/types'
import { Marked } from './Marked'
import { ArrowRight } from './ArrowRight'
import { Doodle } from './Doodle'
import { ShareMenu } from './ShareMenu'

type CardTone = 'amber' | 'coral' | 'teal' | 'blue' | 'green' | 'plum'

const TONE_VAR: Record<CardTone, string> = {
  amber: 'var(--amber)',
  coral: 'var(--coral)',
  teal: 'var(--teal)',
  blue: 'var(--blue-deep)',
  green: 'var(--green-deep)',
  plum: 'var(--plum)',
}

export interface ColourCard {
  /** Caps meta label above the title. */
  eyebrow?: string
  title: string
  body: MarkedText
  image?: Src
  href?: Href
  linkText?: string
  doodle?: 'squiggle-arrow' | 'steps' | 'rays'
  /** Swaps the footer link for a social-share picker instead of navigating. */
  share?: boolean
  /** Pin this card to a specific brand colour instead of the position-based cycle. */
  tone?: CardTone
}

interface ColourCardsProps {
  items: ColourCard[]
  /** Sticky-note treatment: rotated, irregular edges, no imagery. */
  notes?: boolean
  /** Cards visible per row on desktop. Defaults to 3. */
  perView?: 2 | 3
  label?: string
}

function CardInner({ card }: { card: ColourCard }) {
  return (
    <>
      {card.image ? (
        <div className="ccard__media">
          <img src={card.image} alt="" />
        </div>
      ) : null}
      {card.eyebrow ? <div className="ccard__eyebrow">{card.eyebrow}</div> : null}
      <h3 className="ccard__title">{card.title}</h3>
      <p className="ccard__desc">
        <Marked>{card.body}</Marked>
      </p>
      {card.share ? (
        <ShareMenu />
      ) : card.href ? (
        <Link to={card.href} className="link">
          {card.linkText ?? 'Find out more'} <ArrowRight />
        </Link>
      ) : null}
      {card.doodle ? <Doodle name={card.doodle} className="ccard__doodle" /> : null}
    </>
  )
}

/**
 * Full-bleed colour card row — the workhorse of the vibrant theme.
 * Cards sit edge-to-edge, three across, and scroll horizontally as a
 * carousel when there are more than fit. Fills cycle through the
 * palette by index, so no content file needs a colour of its own.
 */
export function ColourCards({ items, notes, perView = 3, label }: ColourCardsProps) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const scrollable = !notes && items.length > perView

  const scrollToCard = useCallback((i: number) => {
    const row = rowRef.current
    if (!row) return
    const clamped = Math.max(0, Math.min(i, row.children.length - 1))
    const card = row.children[clamped] as HTMLElement | undefined
    if (card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft, behavior: 'smooth' })
  }, [])

  const onScroll = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    const width = (row.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1
    setIndex(Math.round(row.scrollLeft / width))
  }, [])

  const fillStyle = (card: ColourCard) =>
    card.tone ? ({ '--ccard-fill': TONE_VAR[card.tone] } as CSSProperties) : undefined

  if (notes) {
    return (
      <div className="ccards ccards--notes">
        {items.map((card) => (
          <div key={card.title} className="ccard" style={fillStyle(card)}>
            <CardInner card={card} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="ccards">
      <div
        ref={rowRef}
        className={`ccards__row${perView === 2 ? ' ccards__row--2up' : ''}`}
        onScroll={scrollable ? onScroll : undefined}
        aria-label={label}
      >
        {items.map((card) => (
          <div key={card.title} className="ccard" style={fillStyle(card)}>
            <CardInner card={card} />
          </div>
        ))}
      </div>

      {scrollable ? (
        <div className="ccards__nav">
          <span className="ccards__count">
            {Math.min(index + 1, items.length)} / {items.length}
          </span>
          <button
            type="button"
            className="ccards__arrow"
            aria-label="Previous cards"
            onClick={() => scrollToCard(index - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="ccards__arrow"
            aria-label="Next cards"
            onClick={() => scrollToCard(index + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  )
}
