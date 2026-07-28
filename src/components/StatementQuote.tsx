import type { MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

export function StatementQuote({ text }: { text: MarkedText }) {
  return (
    <section className="section statement-section">
      <div className="wrap">
        <Reveal as="p" className="statement-quote">
          <Marked>{text}</Marked>
        </Reveal>
      </div>
    </section>
  )
}
