import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Soup, HeartHandshake, BookOpen, Sprout,
  ArrowRight, ArrowLeft,
  type LucideIcon,
} from 'lucide-react'
import type { HomePage, Pillar } from '../content/types'
import { CAUSE_SLUGS } from '../content/causes'
import { Marked } from './Marked'

interface CausesMosaicProps {
  data: HomePage['pillars']
}

const ICONS: LucideIcon[] = [Soup, HeartHandshake, BookOpen, Sprout]
const FILLS = ['var(--amber)', 'var(--teal)', 'var(--blue-deep)', 'var(--green-deep)']
const INKS  = ['var(--ink-warm)', 'var(--paper-warm)', 'var(--paper-warm)', 'var(--paper-warm)']
const ROTATE_MS = 4500

function mod(n: number, m: number) { return ((n % m) + m) % m }

/* ── Active (left) card ───────────────────────────────────── */
function ActiveCard({ pillar, index, href }: { pillar: Pillar; index: number; href: string }) {
  const Icon = ICONS[index % ICONS.length]
  const slug = CAUSE_SLUGS[index]
  const to   = slug ? `${href}#${slug}` : href

  return (
    <div
      className="cmos__active"
      style={{ '--cmos-fill': FILLS[index], '--cmos-ink': INKS[index] } as React.CSSProperties}
    >
      <div className="cmos__photo" aria-hidden="true">
        <img key={index} src={pillar.image} alt="" />
      </div>
      <div className="cmos__body">
        <span className="cmos__arch" aria-hidden="true">
          <Icon size={26} strokeWidth={1.7} />
        </span>
        <h3 className="cmos__title">{pillar.title}</h3>
        <p className="cmos__desc">
          <Marked>{pillar.body}</Marked>
        </p>
        <Link to={to} className="cmos__go">
          Learn more <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

/* ── Preview (right / stacked) cards ─────────────────────── */
function PreviewCard({
  pillar, index, row, href, onSelect,
}: {
  pillar: Pillar; index: number; row: 1 | 2 | 3; href: string; onSelect: () => void
}) {
  const Icon = ICONS[index % ICONS.length]
  const slug = CAUSE_SLUGS[index]
  const to   = slug ? `${href}#${slug}` : href

  return (
    <div
      /* Use a CSS class for grid-row so mobile breakpoints can override it
         (inline styles cannot be overridden by media queries). */
      className={`cmos__preview cmos__preview--r${row}`}
      style={{ '--cmos-fill': FILLS[index], '--cmos-ink': INKS[index] } as React.CSSProperties}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }}
      aria-label={`Show ${pillar.title}`}
    >
      <span className="cmos__parch" aria-hidden="true">
        <Icon size={20} strokeWidth={1.7} />
      </span>
      <div className="cmos__pbody">
        <p className="cmos__ptitle">{pillar.title}</p>
        <Link to={to} className="cmos__pgo" onClick={(e) => e.stopPropagation()} tabIndex={0}>
          Learn more <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

/**
 * Four coloured cause cards.
 * Desktop: LEFT large active (photo + text) | RIGHT 3 compact preview tiles.
 * Mobile:  Active card compact row at top, 3 preview tiles stacked below.
 * BELOW:   [Explore CTA .....  1/4  ← →]
 */
export function CausesMosaic({ data }: CausesMosaicProps) {
  const total = data.items.length
  const [active, setActive] = useState(0)
  const pausedRef   = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % total)
    }, ROTATE_MS)
  }, [total])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    startTimer()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startTimer])

  const select = (i: number) => { setActive(i); startTimer() }
  const go     = (dir: 1 | -1) => select(mod(active + dir, total))

  const previews = [1, 2, 3].map((off) => mod(active + off, total))

  return (
    <>
      <div
        className="cmos"
        onMouseEnter={() => { pausedRef.current = true  }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <ActiveCard pillar={data.items[active]} index={active} href={data.btnHref} />
        {previews.map((idx, slot) => (
          <PreviewCard
            key={idx}
            pillar={data.items[idx]}
            index={idx}
            row={(slot + 1) as 1 | 2 | 3}
            href={data.btnHref}
            onSelect={() => select(idx)}
          />
        ))}
      </div>

      {/* One row: [Explore CTA]  ·····  [counter ← →] */}
      <div className="cmos__bar">
        <Link to={data.btnHref} className="btn btn--primary cmos__explore">
          {data.btnText}
        </Link>
        <div className="cmos__nav">
          <span className="cmos__count">{active + 1} / {total}</span>
          <button className="cmos__btn"                onClick={() => go(-1)} aria-label="Previous cause">
            <ArrowLeft size={16} />
          </button>
          <button className="cmos__btn cmos__btn--next" onClick={() => go(1)}  aria-label="Next cause">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
