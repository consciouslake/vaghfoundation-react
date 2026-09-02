import { Link } from 'react-router-dom'
import { donate } from '../content/donate'
import { SEO } from '../components/SEO'
import { Mechanism } from '../components/Mechanism'
import { EmailSignup } from '../components/EmailSignup'
import { DonateForm } from '../components/DonateForm'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { ArrowRight } from '../components/ArrowRight'

export default function Donate() {
  return (
    <>
      <SEO
        title="Donate"
        description="Every contribution creates a ripple of hope. Support Vagh Foundation's work across nourishment, wellbeing, learning, and sustainability."
        path="/donate"
      />

      {/* Hero — custom editorial layout matching reference */}
      <section className="donate-hero">
        <div className="donate-hero__grid wrap">
          <Reveal className="donate-hero__left">
            {donate.header.tag && (
              <span className="donate-hero__tag">{donate.header.tag}</span>
            )}
            <h1 className="donate-hero__title">
              <Marked>{donate.header.h1Marked}</Marked>
            </h1>
            <p className="donate-hero__lede">
              <Marked>{donate.header.lede}</Marked>
            </p>
            <div className="donate-hero__cta">
              <a href="#donate-form" className="btn btn--primary btn--pill">
                {donate.header.btnText || 'Make a donation'} <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="donate-hero__right">
            <div className="donate-hero__card-wrap">
              <figure className="donate-hero__card">
                <div className="donate-hero__card-inner">
                  <div className="donate-hero__card-photo">
                    <img src={donate.header.image} alt="Support Vagh Foundation" />
                  </div>
                </div>
              </figure>

              {/* Floating dark badge at bottom-left */}
              <div className="donate-hero__badge">
                <div className="donate-hero__badge-num">{donate.header.badgeNumber || 'Every bit counts'}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-narrow">
            <Reveal>
              <span className="kicker">{donate.section.eyebrow}</span>
              <h2>
                <Marked>{donate.section.headingMarked}</Marked>
              </h2>
              <p className="lede donate-intro">
                <Marked>{donate.section.body}</Marked>
              </p>
              <div className="trust-note band band--amber">
                <h4>{donate.trust.title}</h4>
                <p>
                  <Marked>{donate.trust.body}</Marked>
                </p>
              </div>
            </Reveal>
            <Reveal className="form-card form-card--grey" id="donate-form">
              <h3>Make a donation</h3>
              <DonateForm amountChips={donate.amountChips} defaultChip={donate.defaultChip} />
            </Reveal>
          </div>
        </div>
      </section>



      {/* What happens after you give — Give, Prepare, Deliver, Thrive */}
      <Mechanism data={donate.mechanism} />

      <EmailSignup
        titleWithEm={donate.volunteerCta.titleWithEm}
        body={donate.volunteerCta.body}
      >
        <div className="btn-row">
          <Link to={donate.volunteerCta.btnHref} className="btn btn--primary">
            {donate.volunteerCta.btnText}
          </Link>
        </div>
      </EmailSignup>
    </>
  )
}
