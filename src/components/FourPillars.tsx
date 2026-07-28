import { Link } from 'react-router-dom'
import type { HomePage, Pillar } from '../content/types'
import { Marked } from './Marked'
import { Reveal } from './Reveal'
import { ArrowRight } from './ArrowRight'
import { useReveal } from '../hooks/useReveal'

interface FourPillarsProps {
  data: HomePage['pillars']
}

function PillarCard({ pillar, index, href }: { pillar: Pillar; index: number; href: string }) {
  const ref = useReveal<HTMLAnchorElement>(index)
  return (
    <Link ref={ref} to={href} className="pillar-card reveal">
      <div className="pillar-card__media">
        <img src={pillar.image} alt="" />
      </div>
      <div className="pillar-card__num">0{index + 1}</div>
      <h3 className="pillar-card__title">{pillar.title}</h3>
      <p className="pillar-card__desc">
        <Marked>{pillar.body}</Marked>
      </p>
    </Link>
  )
}

export function FourPillars({ data }: FourPillarsProps) {
  return (
    <section className="section section-alt">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">{data.eyebrow}</span>
          <h2>
            <Marked>{data.headingMarked}</Marked>
          </h2>
          <p>
            <Marked>{data.sub}</Marked>
          </p>
        </Reveal>
        <div className="pillars-grid">
          {data.items.map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} href={data.btnHref} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to={data.btnHref} className="btn btn--ghost">
            {data.btnText}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
