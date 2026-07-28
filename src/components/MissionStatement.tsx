import { Link } from 'react-router-dom'
import type { Href, MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

interface MissionStatementProps {
  eyebrow?: string
  statementMarked: MarkedText
  body?: MarkedText
  btnText?: string
  btnUrl?: Href
}

export function MissionStatement({
  eyebrow,
  statementMarked,
  body,
  btnText,
  btnUrl,
}: MissionStatementProps) {
  return (
    <section className="mission-statement">
      <div className="wrap">
        {eyebrow ? <span className="mission-statement__kicker">{eyebrow}</span> : null}
        <Reveal className="mission-statement__text">
          <Marked>{statementMarked}</Marked>
        </Reveal>
        {body ? (
          <p className="mission-statement__body">
            <Marked>{body}</Marked>
          </p>
        ) : null}
        {btnText && btnUrl ? (
          <Link to={btnUrl} className="btn btn--ghost mission-statement__link">
            {btnText}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
