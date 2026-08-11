import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import type { HomePage } from '../content/types'
import { Marked } from './Marked'
import { Doodle } from './Doodle'

export function CTATogether({ data }: { data: HomePage['cta'] }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band__inner">
        <Doodle name="rays" className="cta-band__rays" />
        <h2 className="cta-band__title">
          <Marked>{data.headingMarked}</Marked>
        </h2>
        <p className="cta-band__body">
          <Marked>{data.body}</Marked>
        </p>
        <div className="btn-row cta-band__buttons">
          <Link to={data.btn1Href} className="btn btn--coral btn--pill">
            {data.btn1Text}
            <Heart size={17} aria-hidden="true" />
          </Link>
          <Link to={data.btn2Href} className="btn btn--ghost btn--pill">
            {data.btn2Text}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
