import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { HomePage } from '../content/types'

interface HeroProps {
  data: HomePage
}

type Piece = { text: string; tag: 'plain' | 'mark' | 'em' }

/**
 * Splits a MarkedText headline into words so each can rise into place
 * on its own delay, while keeping track of which emphasis (if any)
 * each word came from. Emphasised words render as real <mark>/<em>
 * elements — the same tags Marked.tsx uses everywhere else — so they
 * pick up the one shared emphasis rule (gradient text-fill inside a
 * display heading) instead of a hero-only treatment.
 */
function toWords(text: string): Piece[] {
  const out: Piece[] = []
  const push = (chunk: string, tag: Piece['tag']) => {
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ text: w, tag }))
  }
  const re = /<(mark|em)>([\s\S]*?)<\/\1>/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) push(text.slice(last, m.index), 'plain')
    push(m[2], m[1] as 'mark' | 'em')
    last = m.index + m[0].length
  }
  if (last < text.length) push(text.slice(last), 'plain')
  return out
}

export function Hero({ data }: HeroProps) {
  const lead = data.hero.slides[0]
  const words = toWords(data.hero.title)
  const collageRef = useRef<HTMLDivElement | null>(null)

  // Pointer parallax — each print drifts a little further than the one
  // behind it. Driven through margin so it never fights the float
  // keyframes, which own `translate`.
  useEffect(() => {
    const root = collageRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const prints = Array.from(root.querySelectorAll<HTMLElement>('.print'))
    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      prints.forEach((p, i) => {
        const depth = (i + 1) * 7
        p.style.marginLeft = `${x * depth}px`
        p.style.marginTop = `${y * depth}px`
      })
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX / window.innerWidth - 0.5
      y = e.clientY / window.innerHeight - 0.5
      if (!raf) raf = window.requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      prints.forEach((p) => {
        p.style.marginLeft = ''
        p.style.marginTop = ''
      })
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__grid">
        <div className="hero__left">

          <h1 className="hero__title">
            {words.map((w, i) => {
              const delay = { animationDelay: `${50 + i * 80}ms` }
              return (
                <Fragment key={i}>
                  {i > 0 ? ' ' : null}
                  <span className="w" style={delay}>
                    {w.tag === 'mark' ? (
                      <mark>{w.text}</mark>
                    ) : w.tag === 'em' ? (
                      <em>{w.text}</em>
                    ) : (
                      w.text
                    )}
                  </span>
                </Fragment>
              )
            })}
          </h1>

          <p className="hero__lede">{lead.lede}</p>

          <div className="btn-row hero__cta">
            <Link to={lead.btnUrl} className="btn btn--primary btn--pill">
              {lead.btnText}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {lead.btn2Text && lead.btn2Url ? (
              <Link to={lead.btn2Url} className="btn btn--ghost btn--pill">
                {lead.btn2Text}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="collage" ref={collageRef}>
          {data.hero.slides.slice(0, 3).map((s, i) => (
            <figure key={s.image} className={`print print--${i + 1}`}>
              <div className="print__slot">
                <img src={s.image} alt="" />
              </div>
              <figcaption>{data.hero.captions[i]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
