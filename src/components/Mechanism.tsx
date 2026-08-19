import type { MechanismData } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

/**
 * The mechanism — how a contribution travels, drawn as four geared
 * stages rather than described in a paragraph. Numbered because these
 * are steps in sequence, which is the one place a number carries
 * meaning rather than decoration.
 */
export function Mechanism({ data }: { data: MechanismData }) {
  return (
    <section className="mechanism">
      <div className="mechanism__inner">
        <Reveal className="shead shead--center shead--dark">
          <span className="kicker">{data.eyebrow}</span>
          <h2>{data.heading}</h2>
          <p className="shead__deck">
            <Marked>{data.deck}</Marked>
          </p>
        </Reveal>

        <ol className="stages">
          {data.stages.map((s, i) => (
            <li key={s.label} className="stage">
              <span className={`stage__disc stage__disc--${i + 1}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="stage__label">{s.label}</span>
              <span className="stage__body">{s.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
