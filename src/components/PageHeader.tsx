import type { PageHeader as PageHeaderData } from '../content/types'
import { Marked } from './Marked'

/**
 * Photo-variant page header used by every inner page. Renders an arch-
 * framed hero with kicker + h1 (may contain <mark>) + lede, plus the
 * 4 concave corner spans (matches the WP has-photo layout exactly).
 * Falls back to a text-only header if no image is provided.
 */
export function PageHeader({ data }: { data: PageHeaderData }) {
  if (!data.image) {
    return (
      <section className="page-header">
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
  return (
    <section className="page-header has-photo">
      <div className="header-frame">
        <div className="hero-bg" style={{ backgroundImage: `url('${data.image}')` }} />
        <div className="header-content">
          <span className="kicker">{data.eyebrow}</span>
          <h1>
            <Marked>{data.h1Marked}</Marked>
          </h1>
          <p>
            <Marked>{data.lede}</Marked>
          </p>
        </div>
        <span className="hero-arch-corner hero-arch-corner--tl" aria-hidden="true" />
        <span className="hero-arch-corner hero-arch-corner--tr" aria-hidden="true" />
        <span className="hero-arch-corner hero-arch-corner--bl" aria-hidden="true" />
        <span className="hero-arch-corner hero-arch-corner--br" aria-hidden="true" />
      </div>
    </section>
  )
}
