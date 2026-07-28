import { Link } from 'react-router-dom'
import type { HomePage } from '../content/types'
import { Marked } from './Marked'
import { ArrowRight } from './ArrowRight'

interface HCardsProps {
  cards: HomePage['hCards']
}

export function HCards({ cards }: HCardsProps) {
  return (
    <div className="h-cards">
      <Link to={cards.work.href} className="h-card">
        <div className="h-card-media">
          <img src={cards.work.image} alt="" />
        </div>
        <div className="h-card-body">
          <div className="h-card-title">
            Our <mark>work</mark>
          </div>
          <p className="h-card-desc">
            <Marked>{cards.work.desc}</Marked>
          </p>
          <span className="link">
            See what we do <ArrowRight />
          </span>
        </div>
      </Link>
      <Link to={cards.story.href} className="h-card">
        <div className="h-card-media">
          <img src={cards.story.image} alt="" />
        </div>
        <div className="h-card-body">
          <div className="h-card-title">
            Our <mark>story</mark>
          </div>
          <p className="h-card-desc">
            <Marked>{cards.story.desc}</Marked>
          </p>
          <span className="link">
            Read our story <ArrowRight />
          </span>
        </div>
      </Link>
    </div>
  )
}
