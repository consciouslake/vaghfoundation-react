import { Link } from 'react-router-dom'
import type { HomePage } from '../content/types'
import { Marked } from './Marked'

export function CTATogether({ data }: { data: HomePage['cta'] }) {
  return (
    <section className="cta-band">
      <div className="cta-band__inner">
        <h2 className="cta-band__title">
          <Marked>{data.headingMarked}</Marked>
        </h2>
        <p className="cta-band__body">
          <Marked>{data.body}</Marked>
        </p>
        <div className="btn-row cta-band__buttons">
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
