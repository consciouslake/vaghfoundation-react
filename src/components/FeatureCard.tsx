import { Link } from 'react-router-dom'
import type { FeatureBlock } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'
import { ArrowRight } from './ArrowRight'

interface FeatureCardProps {
  data: FeatureBlock
  /** Colour fill behind the copy. */
  tone?: 'orange' | 'blue' | 'green' | 'yellow'
  /** Puts the photo on the right instead of the left. */
  flip?: boolean
}

/**
 * Two-column asymmetric feature — photo on one side clipped with a
 * diagonal edge, solid colour fill on the other carrying an eyebrow,
 * an h3 and an underlined arrow link.
 */
export function FeatureCard({ data, tone = 'orange', flip }: FeatureCardProps) {
  const toneClass = tone === 'orange' ? '' : ` feature--${tone}`
  return (
    <section className={`feature${toneClass}${flip ? ' feature--flip' : ''}`}>
      <div className="feature__media">
        <img src={data.image} alt="" />
      </div>
      <Reveal className="feature__body">
        <span className="feature__eyebrow">{data.kicker}</span>
        <h2 className="feature__title">
          <Marked>{data.titleMarked}</Marked>
        </h2>
        <p className="feature__desc">
          <Marked>{data.desc}</Marked>
        </p>
        <Link to={data.btnUrl} className="link">
          {data.btnText} <ArrowRight />
        </Link>
      </Reveal>
    </section>
  )
}
