import type { FounderMessage } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

export function FoundersMessage({ data }: { data: FounderMessage }) {
  return (
    <section className="founder-msg section">
      <div className="wrap">
        <Reveal className="founder-msg__inner">
          <div className="founder-msg__portrait">
            {data.photo ? (
              <img src={data.photo} alt={data.name} />
            ) : (
              <span className="founder-msg__initial">
                {data.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="founder-msg__body">
            <span className="kicker">{data.eyebrow}</span>
            <blockquote className="founder-msg__quote">
              <Marked>{data.quote}</Marked>
            </blockquote>
            <div className="founder-msg__attr">
              <strong>{data.name}</strong>
              <span>{data.role}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
