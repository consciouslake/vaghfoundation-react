import type { PageHeader as PageHeaderData } from '../content/types'
import { Marked } from './Marked'

/** Band fill for the header. Pages cycle these so the set feels varied. */
export type Tone = 'orange' | 'orange-soft' | 'blue' | 'blue-soft' | 'yellow' | 'green'

interface PageHeaderProps {
  data: PageHeaderData
  tone?: Tone
}

/**
 * Inner-page header — a full-bleed solid colour band holding an
 * oversized black h1 and a one-line deck. No image: the page's photo
 * is placed further down the page by the page itself.
 */
export function PageHeader({ data, tone = 'orange' }: PageHeaderProps) {
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
