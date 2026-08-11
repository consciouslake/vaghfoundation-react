import type { FounderMessage } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

export function FoundersMessage({ data }: { data: FounderMessage }) {
  return (
    <section className="founder section">
      <Reveal className="founder__inner">
        <div className="founder__portrait">
          {data.photo ? (
            <img src={data.photo} alt={data.name} />
          ) : (
            <span className="founder__initial">{data.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <span className="kicker">{data.eyebrow}</span>
          <blockquote className="founder__quote">
            <Marked>{data.quote}</Marked>
          </blockquote>
          <div className="founder__attr">
            <strong>{data.name}</strong>
            <span>{data.role}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
