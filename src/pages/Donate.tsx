import { Link } from 'react-router-dom'
import { donate } from '../content/donate'
import { SEO } from '../components/SEO'
import { Mechanism } from '../components/Mechanism'
import { EmailSignup } from '../components/EmailSignup'
import { DonateForm } from '../components/DonateForm'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'

export default function Donate() {
  return (
    <>
      <SEO
        title="Donate"
        description="Every contribution creates a ripple of hope. Support Vagh Foundation's work across nourishment, wellbeing, learning, and sustainability."
        path="/donate"
      />

      {/* Hero — a plain full-bleed colour strip, same as the About
          page's own: a heading and a subtitle on solid colour,
          nothing else. Coral — one of the home page's four pillar
          colours (amber/coral/blue/teal). */}
      <section className="page-header band band--amber">
        <div className="wrap">
          <h1>
            <Marked>{donate.header.h1Marked}</Marked>
          </h1>
          <p>
            <Marked>{donate.header.lede}</Marked>
          </p>
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
            <Reveal className="form-card form-card--amber" id="donate-form">
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
