import type { MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

interface SectionHeadProps {
  eyebrow?: string
  heading: string
  headingMarked?: MarkedText
  intro?: MarkedText
  /** Centred plate-style head — kicker, title, deck stacked. */
  center?: boolean
}

export function SectionHead({ eyebrow, heading, headingMarked, intro, center }: SectionHeadProps) {
  const title = headingMarked ? <Marked>{headingMarked}</Marked> : heading

  if (center) {
    return (
      <Reveal className="shead shead--center">
        {eyebrow ? <span className="kicker">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {intro ? (
          <p className="shead__deck">
            <Marked>{intro}</Marked>
          </p>
        ) : null}
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
