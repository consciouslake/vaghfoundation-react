import { Link } from 'react-router-dom'
import { whatWeDo } from '../content/what-we-do'
import { CAUSE_SLUGS } from '../content/causes'
import { SEO } from '../components/SEO'
import { Initiative } from '../components/Initiative'
import { EmailSignup } from '../components/EmailSignup'
import { Marked } from '../components/Marked'

/**
 * One id per initiative, in authored order. The first four line up
 * with CAUSE_SLUGS so the homepage's cause band and cause mosaic can
 * deep-link straight to their section; anything past that (currently
 * just "Health & wellness support") gets its own trailing slug.
 */
const INITIATIVE_IDS = CAUSE_SLUGS

export default function WhatWeDo() {
  return (
    <>
      <SEO
        title="What we do"
        description="Our initiatives across nourishment, peace of mind, learning, environmental care, and community wellbeing. Turning compassion into meaningful action."
        path="/what-we-do"
      />

      {/* Hero — a plain full-bleed colour strip, same as the About
          page's own: a heading and a subtitle on solid colour,
          nothing else. Blue — one of the home page's four pillar
          colours (amber/coral/blue/teal). */}
      <section className="page-header band band--blue">
        <div className="wrap">
          <h1>
            <Marked>{whatWeDo.header.h1Marked}</Marked>
          </h1>
          <p>
            <Marked>{whatWeDo.header.lede}</Marked>
          </p>
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
