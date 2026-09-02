import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { whatWeDo } from '../content/what-we-do'
import { CAUSE_SLUGS } from '../content/causes'
import { SEO } from '../components/SEO'
import { Initiative } from '../components/Initiative'
import { EmailSignup } from '../components/EmailSignup'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { ArrowRight } from '../components/ArrowRight'

/**
 * One id per initiative, in authored order. The first four line up
 * with CAUSE_SLUGS so the homepage's cause band and cause mosaic can
 * deep-link straight to their section; anything past that (currently
 * just "Health & wellness support") gets its own trailing slug.
 */
const INITIATIVE_IDS = [...CAUSE_SLUGS, 'wellness']

export default function WhatWeDo() {
  const cards = whatWeDo.header.cards || []
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (cards.length <= 1) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % cards.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [cards.length])

  const currentCard = cards[activeIdx] || cards[0]

  return (
    <>
      <SEO
        title="What we do"
        description="Our initiatives across nourishment, peace of mind, learning, environmental care, and community wellbeing. Turning compassion into meaningful action."
        path="/what-we-do"
      />

      {/* Hero — custom editorial layout with rotating single picture frame */}
      <section className="wwd-hero">
        <div className="wwd-hero__grid wrap">
          <Reveal className="wwd-hero__left">
            {whatWeDo.header.tag && (
              <span className="wwd-hero__tag">{whatWeDo.header.tag}</span>
            )}
            <h1 className="wwd-hero__title">
              <Marked>{whatWeDo.header.h1Marked}</Marked>
            </h1>
            <p className="wwd-hero__lede">
              <Marked>{whatWeDo.header.lede}</Marked>
            </p>
            <div className="wwd-hero__cta">
              <a href="#initiatives" className="btn btn--primary btn--pill">
                {whatWeDo.header.btnText || 'Explore programs'} <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="wwd-hero__right">
            <div className="wwd-hero__card-wrap">
              <figure
                className="wwd-hero__card"
                style={{ '--wwd-card-color': `var(--${currentCard?.color || 'teal'})` } as React.CSSProperties}
              >
                <div className="wwd-hero__card-inner">
                  <div className="wwd-hero__card-photo">
                    {cards.map((card, idx) => (
                      <img
                        key={card.title}
                        src={card.image}
                        alt={card.title}
                        className={`wwd-hero__photo-slide${idx === activeIdx ? ' is-active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </figure>

              {/* Floating dark badge at bottom-left */}
              <div className="wwd-hero__badge">
                <div className="wwd-hero__badge-num">{currentCard?.action || 'We nourish'}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="initiatives">
        <div className="wrap">
          {whatWeDo.initiatives.map((init, i) => (
            <Initiative key={init.h3} data={init} index={i} id={INITIATIVE_IDS[i]} />
          ))}
        </div>
      </section>

      <EmailSignup
        titleWithEm={whatWeDo.emailSignup.titleWithEm}
        body={whatWeDo.emailSignup.body}
        tone="amber"
      >
        <div className="btn-row">
          <Link to="/volunteer" className="btn btn--primary">
            Volunteer with us
          </Link>
          <Link to="/donate#donate-form" className="btn btn--ghost">
            Make a donation
          </Link>
        </div>
      </EmailSignup>
    </>
  )
}
