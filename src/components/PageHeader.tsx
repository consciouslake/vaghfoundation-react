import type { PageHeader as PageHeaderData } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

/** Band fill for the page header. Each page picks one of the 6 brand colours. */
export type Tone = 'amber' | 'coral' | 'teal' | 'blue' | 'green' | 'plum' | 'dark'
  | 'orange' | 'orange-soft' | 'blue-soft' | 'yellow' // legacy aliases kept for compat

interface PageHeaderProps {
  data: PageHeaderData
  tone?: Tone
}

/**
 * Inner-page header — a full-bleed solid colour band.
 * When the page data includes an image it renders as a side-by-side
 * split (text left, photo right) matching the About page hero style.
 * Without an image it falls back to the original text-only layout.
 */
export function PageHeader({ data, tone = 'amber' }: PageHeaderProps) {
  if (data.image) {
    return (
      <section className={`section band band--${tone}`}>
        <div className="wrap split page-hero">
          <Reveal>
            <span className="kicker">{data.eyebrow}</span>
            <h1>
              <Marked>{data.h1Marked}</Marked>
            </h1>
            <p className="lede">
              <Marked>{data.lede}</Marked>
            </p>
          </Reveal>
          <Reveal className="split-image arch-tr">
            <img src={data.image} alt="" />
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className={`page-header band band--${tone}`}>
      <div className="wrap">
        <span className="kicker">{data.eyebrow}</span>
        <h1>
          <Marked>{data.h1Marked}</Marked>
        </h1>
        <p>
          <Marked>{data.lede}</Marked>
        </p>
      </div>
    </section>
  )
}
