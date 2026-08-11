import { Link } from 'react-router-dom'
import type { HomePage } from '../content/types'
import { Marked } from './Marked'
import { Doodle } from './Doodle'

export function CTATogether({ data }: { data: HomePage['cta'] }) {
  return (
    <section className="cta-band band band--orange">
      <div className="wrap">
        <Doodle name="rays" />
        <h2 className="cta-band__title">
          <Marked>{data.headingMarked}</Marked>
        </h2>
        <p className="cta-band__body">
          <Marked>{data.body}</Marked>
        </p>
        <div className="btn-row">
          <Link to={data.btn1Href} className="btn btn--primary">
            {data.btn1Text}
          </Link>
          <Link to={data.btn2Href} className="btn btn--ghost">
            {data.btn2Text}
          </Link>
        </div>
      </div>
    </section>
  )
}
