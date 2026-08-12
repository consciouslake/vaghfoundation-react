import { Link } from 'react-router-dom'
import { Soup, HeartHandshake, BookOpen, Sprout, ArrowRight, type LucideIcon } from 'lucide-react'
import type { HomePage, Pillar } from '../content/types'
import { Marked } from './Marked'
import { useReveal } from '../hooks/useReveal'

interface CausesMosaicProps {
  data: HomePage['pillars']
}

/** One icon per cause, in the order the pillars are authored. */
const ICONS: LucideIcon[] = [Soup, HeartHandshake, BookOpen, Sprout]
/** Plate numbers, engraving-style. */
const PLATES = ['I', 'II', 'III', 'IV']

function CauseCard({ pillar, index, href }: { pillar: Pillar; index: number; href: string }) {
  const ref = useReveal<HTMLAnchorElement>(index)
  const Icon = ICONS[index % ICONS.length]
  return (
    <Link ref={ref} to={href} className={`cause cause--${index + 1} reveal`}>
      <span className="cause__glow" aria-hidden="true" />
      <span className="cause__plate" aria-hidden="true">
        {PLATES[index] ?? index + 1}
      </span>
      <span className="cause__arch" aria-hidden="true">
        <Icon size={30} strokeWidth={1.7} />
      </span>
      {/* The lead plate carries a pinned print of its own subject */}
      {index === 0 ? (
        <div className="cause__print">
          <img src={pillar.image} alt="" />
        </div>
      ) : null}
      <div className="cause__body">
        <h3 className="cause__title">{pillar.title}</h3>
        <p className="cause__desc">
          <Marked>{pillar.body}</Marked>
        </p>
        <span className="cause__go">
          Learn more <ArrowRight size={17} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

/**
 * The four causes as an uneven mosaic — one tall, two small, one wide.
 * This is the centre of the homepage, so it takes the boldest fills.
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
