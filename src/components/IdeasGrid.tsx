import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { HomePage, IdeaCard } from '../content/types'
import { Marked } from './Marked'
import { useReveal } from '../hooks/useReveal'

type Topic = 'all' | IdeaCard['topic']

const TABS: { label: string; topic: Topic }[] = [
  { label: 'All stories',  topic: 'all' },
  { label: 'Nourishment',  topic: 'nourishment' },
  { label: 'Learning',     topic: 'learning' },
  { label: 'Wellbeing',    topic: 'wellbeing' },
]

function ArticlePromo({ card, index }: { card: IdeaCard; index: number }) {
  const ref = useReveal<HTMLAnchorElement>(index)
  return (
    <Link ref={ref} to="/what-we-do" className="article-promo reveal" data-topic={card.topic}>
      <div className="article-promo__media">
        <img src={card.image} alt="" />
      </div>
      <div className="article-promo__kicker">{card.kicker}</div>
      <h3 className="article-promo__title">{card.title}</h3>
      <p className="article-promo__desc">
        <Marked>{card.body}</Marked>
      </p>
      <span className="article-promo__link">Read it here</span>
    </Link>
  )
}

export function IdeasGrid({ data }: { data: HomePage['ideas'] }) {
  const [active, setActive] = useState<Topic>('all')
  const visible = data.items.filter((c) => active === 'all' || c.topic === active)

  return (
    <section className="ideas-section section">
      <div className="wrap">
        <span className="kicker">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
          <Marked>{data.sub}</Marked>
        </p>

        <div className="topic-tabs" role="tablist" aria-label="Story topics">
          {TABS.map((tab) => {
            const isActive = active === tab.topic
            return (
              <button
                key={tab.topic}
                type="button"
                className={`topic-tab${isActive ? ' active' : ''}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.topic)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="ideas-grid" role="tabpanel">
          {visible.length ? (
            visible.map((card, i) => <ArticlePromo key={card.title} card={card} index={i} />)
          ) : (
            <p
              className="ideas-empty"
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', gridColumn: '1 / -1' }}
            >
              No stories in this topic yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
