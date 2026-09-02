import { Link } from 'react-router-dom'
import { getInvolved } from '../content/get-involved'
import { SEO } from '../components/SEO'
import { SectionHead } from '../components/SectionHead'
import { ColourCards, type ColourCard } from '../components/ColourCards'
import { EmailSignup } from '../components/EmailSignup'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { ArrowRight } from '../components/ArrowRight'

const DOODLES = ['squiggle-arrow', 'steps', 'rays'] as const

const wayCards: ColourCard[] = getInvolved.ways.map((w, i) => ({
  title: w.title,
  body: w.body,
  href: w.btnHref,
  linkText: w.btnText,
  doodle: DOODLES[i % DOODLES.length],
  share: w.title === 'Spread the word',
  // Pinned off the amber slot the position cycle would otherwise give
  // it — this page already opens on an amber hero and closes on an
  // amber signup band, so a third amber block here read as too much.
  tone: w.title === 'Support our cause' ? 'green' : undefined,
}))

export default function GetInvolved() {
  return (
    <>
      <SEO
        title="Get involved"
        description="Four ways to join the Vagh Foundation movement: volunteer your time, support the cause, spread the word, or partner with us."
        path="/get-involved"
      />

      {/* Hero — custom editorial layout matching reference */}
      <section className="gi-hero">
        <div className="gi-hero__grid wrap">
          <Reveal className="gi-hero__left">
            {getInvolved.header.tag && (
              <span className="gi-hero__tag">{getInvolved.header.tag}</span>
            )}
            <h1 className="gi-hero__title">
              <Marked>{getInvolved.header.h1Marked}</Marked>
            </h1>
            <p className="gi-hero__lede">
              <Marked>{getInvolved.header.lede}</Marked>
            </p>
            <div className="gi-hero__cta">
              <a href="#ways-to-give" className="btn btn--primary btn--pill">
                {getInvolved.header.btnText || 'Ways to contribute'} <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="gi-hero__right">
            <div className="gi-hero__card-wrap">
              <figure className="gi-hero__card">
                <div className="gi-hero__card-inner">
                  <div className="gi-hero__card-photo">
                    <img src={getInvolved.header.image} alt="Join the movement" />
                  </div>
                </div>
              </figure>

              {/* Floating dark badge at bottom-left */}
              <div className="gi-hero__badge">
                <div className="gi-hero__badge-num">{getInvolved.header.badgeNumber || 'Join us'}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="ways-to-give">
        <div className="wrap">
          <SectionHead
            eyebrow={getInvolved.section.eyebrow}
            heading="Find your way to give"
            headingMarked={getInvolved.section.headingMarked}
          />
        </div>
        <ColourCards items={wayCards} label="Ways to contribute" />
      </section>

      <EmailSignup
        titleWithEm={getInvolved.emailSignup.titleWithEm}
        body={getInvolved.emailSignup.body}
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
