import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { HomePage } from '../content/types'

interface HeroProps {
  data: HomePage
}

type Piece = { text: string; tag: 'plain' | 'accent' }

/** Splits a MarkedText headline into words, keeping the emphasis flag. */
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
    push(m[2], 'accent')
    last = m.index + m[0].length
  }
  if (last < text.length) push(text.slice(last), 'plain')
  return out
}

function wrap(piece: Piece, node: ReactNode) {
  return piece.tag === 'accent' ? <mark>{node}</mark> : node
}

/**
 * Homepage hero.
 *
 * The right side is a colonnade of three arches — the shape carried
 * out of the "A" in the wordmark, where an arch shelters a small form.
 * Staggered heights so the row reads as a gathering rather than a grid.
 */
export function Hero({ data }: HeroProps) {
  const lead = data.hero.slides[0]
  const words = toWords(data.hero.title)

  return (
    <section className="hero">
      <div className="hero__grid">
        <div className="hero__left">
          <span className="hero__eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            {data.hero.eyebrow}
          </span>

          <h1 className="hero__title">
            {words.map((w, i) => (
              <Fragment key={i}>
                {/* No space before punctuation — the tags split the
                    string there, so a comma arrives as its own token. */}
                {i > 0 && !/^[,.;:!?)\]]/.test(w.text) ? ' ' : null}
                <span className="w" style={{ animationDelay: `${90 + i * 50}ms` }}>
                  {wrap(w, w.text)}
                </span>
              </Fragment>
            ))}
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

        <div className="hero__arches">
          {data.hero.slides.slice(0, 3).map((s, i) => (
            <figure
              key={s.image}
              className={`arch arch--${i + 1}`}
              style={{ animationDelay: `${240 + i * 130}ms` }}
            >
              <div className="arch__frame">
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
