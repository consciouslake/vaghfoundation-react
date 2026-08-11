import type { MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

interface SectionHeadProps {
  eyebrow?: string
  heading: string
  headingMarked?: MarkedText
  intro?: MarkedText
  /**
   * Editorial two-column variant: heading on the left, deck set small
   * on the right. Used for the major sections on the homepage.
   */
  split?: boolean
}

export function SectionHead({ eyebrow, heading, headingMarked, intro, split }: SectionHeadProps) {
  const title = headingMarked ? <Marked>{headingMarked}</Marked> : heading

  if (split) {
    return (
      <Reveal className="shead">
        <div>
          <span className="rule-sm" aria-hidden="true" />
          {eyebrow ? <span className="kicker">{eyebrow}</span> : null}
          <h2>{title}</h2>
        </div>
        {intro ? (
          <p className="shead__deck">
            <Marked>{intro}</Marked>
          </p>
        ) : (
          <span />
        )}
      </Reveal>
    )
  }

  return (
    <Reveal className="section-head">
      <span className="rule-sm" aria-hidden="true" />
      {eyebrow ? <span className="kicker">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {intro ? (
        <p>
          <Marked>{intro}</Marked>
        </p>
      ) : null}
    </Reveal>
  )
}
