import { Link } from 'react-router-dom'
import type { HomePage, Pillar } from '../content/types'
import { Marked } from './Marked'
import { ArrowRight } from './ArrowRight'
import { useReveal } from '../hooks/useReveal'

interface CausesMosaicProps {
  data: HomePage['pillars']
}

function CauseCard({ pillar, index, href }: { pillar: Pillar; index: number; href: string }) {
  const ref = useReveal<HTMLAnchorElement>(index)
  return (
    <Link ref={ref} to={href} className={`cause cause--${index + 1} reveal`}>
      <div className="cause__media">
        <img src={pillar.image} alt="" />
      </div>
      <div className="cause__body">
        <div className="cause__no">0{index + 1}</div>
        <h3 className="cause__title">{pillar.title}</h3>
        <p className="cause__desc">
          <Marked>{pillar.body}</Marked>
        </p>
        <span className="link">
          Learn more <ArrowRight />
        </span>
      </div>
    </Link>
  )
}

/**
 * The four causes, laid out as an uneven mosaic rather than a row of
 * equal cards: one tall, two small, one wide. This is the centre of
 * the homepage, so it gets the most graphic treatment on the page.
 */
export function CausesMosaic({ data }: CausesMosaicProps) {
  return (
    <div className="causes">
      {data.items.map((p, i) => (
        <CauseCard key={p.title} pillar={p} index={i} href={data.btnHref} />
      ))}
    </div>
  )
}
