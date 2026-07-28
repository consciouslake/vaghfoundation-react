import { Link } from 'react-router-dom'
import type { GateFeature as GateFeatureData } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'
import { ArrowRight } from './ArrowRight'

export function GateFeature({ data }: { data: GateFeatureData }) {
  return (
    <section className="gate-feature">
      <div className="gate-feature__inner">
        <Reveal className="gate-feature__media">
          <img src={data.image} alt="" />
        </Reveal>
        <Reveal className="gate-feature__body">
          <span className="gate-feature__kicker">{data.kicker}</span>
          <h2 className="gate-feature__title">
            <Marked>{data.titleMarked}</Marked>
          </h2>
          <p className="gate-feature__desc">
            <Marked>{data.desc}</Marked>
          </p>
          <Link to={data.btnUrl} className="btn btn--ghost">
            {data.btnText} <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
