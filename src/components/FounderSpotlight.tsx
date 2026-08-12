import { Quote } from 'lucide-react'
import type { FounderMessage } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

interface FounderSpotlightProps {
  data: FounderMessage
}

/**
 * Dark editorial band — the founder's words set large in the accent
 * italic.
 *
 * This slot is where the reference mockups put animated impact
 * counters. Those figures are invented, and this foundation publishes
 * none, so the space carries real words instead. Drop the counters in
 * here the moment there are verified numbers.
 */
export function FounderSpotlight({ data }: FounderSpotlightProps) {
  return (
    <section className="spotlight">
      <Reveal className="spotlight__inner">
        <div className="spotlight__portrait">
          <img src={data.photo} alt={data.name} />
        </div>
        <div>
          <span className="kicker">{data.eyebrow}</span>
          <Quote size={34} strokeWidth={1.6} className="spotlight__mark" aria-hidden="true" />
          <blockquote className="spotlight__quote">
            <Marked>{data.quote}</Marked>
          </blockquote>
          <div className="spotlight__attr">
            <strong>{data.name}</strong>
            <span>{data.role}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

