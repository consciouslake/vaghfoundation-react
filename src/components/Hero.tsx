import { Link } from 'react-router-dom'
import type { HomePage } from '../content/types'
import { Doodle } from './Doodle'

interface HeroProps {
  data: HomePage
}

/**
 * Splits a MarkedText headline into words so each can rise into place,
 * remembering which words sat inside a <mark> so they keep the
 * underline emphasis.
 */
function riseWords(text: string) {
  const words: { word: string; marked: boolean }[] = []
  const push = (chunk: string, marked: boolean) => {
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push({ word, marked }))
  }
  const re = /<mark>([\s\S]*?)<\/mark>/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) push(text.slice(last, m.index), false)
    push(m[1], true)
    last = m.index + m[0].length
  }
  if (last < text.length) push(text.slice(last), false)
  return words
}

/**
 * Homepage hero — an oversized headline that rises in word by word on
 * the left, and an overlapping collage of three rotated, arch-cornered
 * photographs on the right.
 */
export function Hero({ data }: HeroProps) {
  const lead = data.hero.slides[0]
  const words = riseWords(data.gateFeature.titleMarked)

  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__left">
          <span className="kicker">{data.gateFeature.kicker}</span>
          <h1 className="hero__title">
            {words.map((w, i) => (
              <span key={i}>
                <span
                  className={w.marked ? 'w w--mark' : 'w'}
                  style={{ animationDelay: `${60 + i * 55}ms` }}
                >
                  {w.word}
                </span>{' '}
              </span>
            ))}
          </h1>
          <p className="hero__lede">{lead.lede}</p>
          <div className="btn-row hero__cta">
            <Link to={lead.btnUrl} className="btn btn--primary">
              {lead.btnText}
            </Link>
            {lead.btn2Text && lead.btn2Url ? (
              <Link to={lead.btn2Url} className="btn btn--ghost">
                {lead.btn2Text}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="hero__collage" aria-hidden="true">
          <Doodle name="rays" className="hero__rays" />
          {data.hero.slides.slice(0, 3).map((s, i) => (
            <div key={s.image} className={`hero__photo hero__photo--${i + 1}`}>
              <img src={s.image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
