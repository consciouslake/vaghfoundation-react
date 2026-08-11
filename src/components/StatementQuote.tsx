import type { MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'
import { Doodle } from './Doodle'

/**
 * Mid-page interrupt — a full-bleed yellow slab with a stepped right
 * edge, display type at 0.9 leading, topped with the sunburst doodle.
 */
export function StatementQuote({ text }: { text: MarkedText }) {
  return (
    <section className="statement-section">
      <Doodle name="rays" />
      <Reveal className="statement-band">
        <p className="statement-band__text">
          <Marked>{text}</Marked>
        </p>
      </Reveal>
    </section>
  )
}
