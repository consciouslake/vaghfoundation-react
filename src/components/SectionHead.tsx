import type { MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

interface SectionHeadProps {
  eyebrow?: string
  heading: string
  headingMarked?: MarkedText
  intro?: MarkedText
}

export function SectionHead({ eyebrow, heading, headingMarked, intro }: SectionHeadProps) {
  return (
    <Reveal className="section-head">
      {eyebrow ? <span className="kicker">{eyebrow}</span> : null}
      <h2>{headingMarked ? <Marked>{headingMarked}</Marked> : heading}</h2>
      {intro ? (
        <p>
          <Marked>{intro}</Marked>
        </p>
      ) : null}
    </Reveal>
  )
}
