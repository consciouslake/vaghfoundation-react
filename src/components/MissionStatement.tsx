import { Link } from 'react-router-dom'
import type { Href, MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'
import { Doodle } from './Doodle'

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
    <section className="mission">
      <div className="wrap">
        <Doodle name="rule" />
        {eyebrow ? <span className="kicker">{eyebrow}</span> : null}
        <Reveal as="h2" className="mission__text">
          <Marked>{statementMarked}</Marked>
        </Reveal>
        {body ? (
          <p className="mission__body">
            <Marked>{body}</Marked>
          </p>
        ) : null}
        {btnText && btnUrl ? (
          <Link to={btnUrl} className="btn btn--ghost">
            {btnText}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
