import { Link } from 'react-router-dom'
import type { HomePage } from '../content/types'
import { Marked } from './Marked'

export function CTATogether({ data }: { data: HomePage['cta'] }) {
  return (
    <section className="cta-together">
      <div className="wrap">
        <h2 className="cta-together__title">
          <Marked>{data.headingMarked}</Marked>
        </h2>
        <p className="cta-together__body">
          <Marked>{data.body}</Marked>
        </p>
        <div className="cta-together__buttons">
          <Link to={data.btn1Href} className="btn btn--yellow">
            {data.btn1Text}
          </Link>
          <Link to={data.btn2Href} className="btn btn--on-dark">
            {data.btn2Text}
          </Link>
        </div>
      </div>
    </section>
  )
}
