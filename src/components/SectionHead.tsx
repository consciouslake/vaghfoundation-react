import type { MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'
import { Doodle } from './Doodle'

interface SectionHeadProps {
  eyebrow?: string
  heading: string
  headingMarked?: MarkedText
  intro?: MarkedText
  /** Draws the sunburst doodle above the heading. */
  rays?: boolean
  /**
   * Turns the head into the editorial three-column variant: a big
   * ordinal on the left, the heading in the middle, the deck on the
   * right. Used for the numbered sections on the homepage.
   */
  index?: string
}

export function SectionHead({
  eyebrow,
  heading,
  headingMarked,
  intro,
  rays,
  index,
}: SectionHeadProps) {
  if (index) {
    return (
      <Reveal className="shead">
        <div className="shead__idx" aria-hidden="true">
          {index}
        </div>
        <div>
          {eyebrow ? <span className="kicker">{eyebrow}</span> : null}
          <h2>{headingMarked ? <Marked>{headingMarked}</Marked> : heading}</h2>
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
      {rays ? <Doodle name="rays" /> : null}
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
