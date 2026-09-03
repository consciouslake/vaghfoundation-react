import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Soup, HeartHandshake, BookOpen, Sprout,
  ArrowRight, ArrowLeft,
} from 'lucide-react'
import type { HomePage } from '../content/types'
import { CAUSE_SLUGS } from '../content/causes'
import { Marked } from './Marked'
import { Doodle } from './Doodle'

interface CausesMosaicProps {
  data: HomePage['pillars']
}

/* Pillar metadata for eyebrows & icons matching Mozilla spotlight style */
const PILLAR_METAS = [
  { eyebrow: 'Food Distribution', icon: Soup },
  { eyebrow: 'Inner Wellbeing', icon: HeartHandshake },
  { eyebrow: 'Learning & Growth', icon: BookOpen },
  { eyebrow: 'Environmental Care', icon: Sprout },
]

/* Each card colour is fixed to its identity (index), not its slot */
const FILLS = ['var(--amber)', 'var(--coral)', 'var(--blue-deep)', 'var(--teal)']
const ROTATE_MS = 5000

function mod(n: number, m: number) { return ((n % m) + m) % m }

/**
 * Styled exactly after the Mozilla Community Spotlight mechanic with 4 touching square boxes:
 *   pos 1 = featured (large square, left)
 *   pos 3 = top-right small square (touching pos 1)
 *   pos 4 = top far-right small square (touching pos 3)
 *   pos 2 = bottom-right medium square (touching pos 1 on left, pos 3 & pos 4 on top)
 * All 4 square boxes are adjacent and touch each other with 0px gap.
 * Cards animate between slots via CSS transition on data-pos.
 * The teaser panel sits below the image stack, synced to pos 1.
 */
export function CausesMosaic({ data }: CausesMosaicProps) {
  const total = data.items.length
  const loopedItems = [...data.items, ...data.items, ...data.items]
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slidesRef = useRef<HTMLOListElement | null>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isAnimatingRef = useRef(false)
  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollToSlide = (targetIdx: number) => {
    if (typeof window === 'undefined' || !slidesRef.current) return
    const container = slidesRef.current
    if (window.innerWidth <= 960) {
      const firstChild = container.firstElementChild as HTMLElement | null
      if (!firstChild) return
      const itemWidth = firstChild.offsetWidth + 12
      const currentScroll = container.scrollLeft
      const currentStreamIdx = Math.round(currentScroll / itemWidth)
      const currentNorm = mod(currentStreamIdx, total)

      let delta = targetIdx - currentNorm
      if (delta > total / 2) delta -= total
      if (delta < -total / 2) delta += total

      const nextStreamIdx = currentStreamIdx + delta
      isScrollingRef.current = true
      container.scrollTo({
        left: nextStreamIdx * itemWidth,
        behavior: 'smooth',
      })
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        if (!slidesRef.current) return
        const pos = Math.round(slidesRef.current.scrollLeft / itemWidth)
        if (pos >= total * 2) {
          slidesRef.current.scrollLeft -= total * itemWidth
        } else if (pos < total) {
          slidesRef.current.scrollLeft += total * itemWidth
        }
      }, 450)
    }
  }

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current && !isAnimatingRef.current) {
        setActive((a) => {
          const next = (a + 1) % total
          scrollToSlide(next)
          return next
        })
      }
    }, ROTATE_MS)
  }, [total])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 960 && slidesRef.current) {
      const container = slidesRef.current
      const firstChild = container.firstElementChild as HTMLElement | null
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 12
        container.scrollLeft = total * itemWidth
      }
    }
  }, [total])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current)
    }
  }, [startTimer])

  const select = (i: number) => {
    setActive(i)
    startTimer()
    scrollToSlide(i)
  }

  const stepBy = (dir: number) => {
    setActive((prev) => {
      const next = mod(prev + dir, total)
      scrollToSlide(next)
      return next
    })
    startTimer()
  }

  const go = (dir: number) => stepBy(dir)

  const handleScroll = () => {
    if (isScrollingRef.current || !slidesRef.current) return
    const container = slidesRef.current
    const scrollLeft = container.scrollLeft
    const firstItem = container.firstElementChild as HTMLElement | null
    if (!firstItem) return
    const itemWidth = firstItem.offsetWidth + 12 // width + 0.75rem gap
    const streamIdx = Math.round(scrollLeft / itemWidth)
    const normalizedIdx = mod(streamIdx, total)
    if (normalizedIdx !== active) {
      setActive(normalizedIdx)
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      if (!slidesRef.current) return
      const pos = Math.round(slidesRef.current.scrollLeft / itemWidth)
      if (pos >= total * 2) {
        slidesRef.current.scrollLeft -= total * itemWidth
      } else if (pos < total) {
        slidesRef.current.scrollLeft += total * itemWidth
      }
    }, 150)
  }

  /* Circular queue positions:
     Slot 1: Featured (Left, 45% width)
     Slot 2: Top-Right (17% width)
     Slot 3: Middle-Right (26% width)
     Slot 4: Bottom-Right (37% width)
     
     Queue direction: Slot 1 -> Slot 2 -> Slot 3 -> Slot 4 -> Slot 1
     This matches the arrow doodle pointing RIGHT and DOWN.
     
     diff = mod(cardIdx - active, total)
     diff 0 -> pos 1 (Featured)
     diff 1 -> pos 4 (Bottom-Right, next in line to become Featured)
     diff 2 -> pos 3 (Middle-Right, 2 steps in line)
     diff 3 -> pos 2 (Top-Right, 3 steps in line)
  */
  const posOf = (cardIdx: number): number => {
    const diff = mod(cardIdx - active, total)
    if (diff === 0) return 1
    if (diff === 1) return 4
    if (diff === 2) return 3
    return 2
  }

  const handleCardClick = (idx: number) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 960) {
      select(idx)
      return
    }

    if (isAnimatingRef.current) return

    const pos = posOf(idx)

    // 1. Featured card (pos 1): rotation should not happen
    if (pos === 1) {
      return
    }

    // 2. Top-most smallest card (pos 2): rotate anticlockwise
    if (pos === 2) {
      stepBy(-1)
      return
    }

    // 3. Middle card (pos 3): rotate by two clockwise in visible circular flow
    //    Step 1: moves to Pos 4 (bottom); Step 2: moves into Pos 1 (featured)
    if (pos === 3) {
      isAnimatingRef.current = true
      stepBy(1)
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current)
      stepTimeoutRef.current = setTimeout(() => {
        stepBy(1)
        setTimeout(() => {
          isAnimatingRef.current = false
        }, 320)
      }, 300)
      return
    }

    // 4. Bottom card (pos 4): rotate by one clockwise
    stepBy(1)
  }

  const pillar = data.items[active]
  const meta = PILLAR_METAS[active % PILLAR_METAS.length]
  const Icon = meta.icon
  const slug = CAUSE_SLUGS[active]
  const to = slug ? `${data.btnHref}#${slug}` : data.btnHref

  return (
    <div
      className="cmos"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      {/* 4 Square boxes touching each other.
          CSS transitions handle animation between slots. */}
      <div className="cmos__carousel">
        <ol
          className="cmos__slides"
          ref={slidesRef}
          onScroll={handleScroll}
        >
          {loopedItems.map((item, fullIdx) => {
            const idx = fullIdx % total
            const pos = posOf(idx)
            const isFeatured = pos === 1
            return (
              <li key={fullIdx}>
                <article
                  className="cmos__card"
                  data-pos={pos}
                  data-slide={idx + 1}
                  aria-hidden={!isFeatured}
                  aria-label={`Pillar ${idx + 1} of ${total}`}
                  style={{ '--cmos-fill': FILLS[idx] } as React.CSSProperties}
                  role={isFeatured ? undefined : 'button'}
                  tabIndex={isFeatured ? -1 : 0}
                  onClick={() => handleCardClick(idx)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCardClick(idx)
                  }}
                >
                  <figure className="cmos__figure">
                    <img src={item.image} alt={item.title} />
                  </figure>
                </article>
              </li>
            )
          })}
        </ol>

        {/* Hand-drawn arrow doodle indicating circular queue flow */}
        <button
          type="button"
          className="cmos__arrow-btn"
          onClick={() => go(1)}
          aria-label="Next cause"
          title="Next cause"
        >
          <Doodle name="corner-arrow" className="cmos__arrow" />
        </button>

        {/* Text block positioned directly in the open space below the featured card */}
        <div className="cmos__text" aria-live="polite">
          <span className="cmos__eyebrow" style={{ color: FILLS[active] }}>
            <Icon size={16} strokeWidth={2.6} aria-hidden="true" />
            {meta.eyebrow}
          </span>
          <h3 className="cmos__name">{pillar.title}</h3>
          <p className="cmos__desc">
            <Marked>{pillar.body}</Marked>
          </p>
          <div className="cmos__links">
            <Link to={to} className="cmos__go">
              Learn more <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link to={data.btnHref} className="btn btn--primary cmos__explore">
              {data.btnText}
            </Link>
          </div>
        </div>

        {/* Navigation counter and prev/next controls positioned below the right stack */}
        <div className="cmos__nav">
          <span className="cmos__count">{active + 1} / {total}</span>
          <button
            type="button"
            className="cmos__btn"
            onClick={() => go(-1)}
            aria-label="Previous cause"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="cmos__btn cmos__btn--next"
            onClick={() => go(1)}
            aria-label="Next cause"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}