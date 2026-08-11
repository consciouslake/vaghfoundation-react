import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Href, MarkedText } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'

interface MissionStatementProps {
  eyebrow?: string
  statementMarked: MarkedText
  body?: MarkedText
  btnText?: string
  btnUrl?: Href
  id?: string
}

/** The mantra — one large statement, a lead paragraph, a rainbow rule. */
export function MissionStatement({
  eyebrow,
  statementMarked,
  body,
  btnText,
  btnUrl,
  id,
}: MissionStatementProps) {
  return (
    <section className="mission" id={id}>
      <div className="wrap">
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
          <Link to={btnUrl} className="btn btn--ghost btn--pill">
            {btnText}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ) : null}
        <div className="rule-rainbow mission__rule" aria-hidden="true" />
      </div>
    </section>
  )
}
