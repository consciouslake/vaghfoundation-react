import { Link } from 'react-router-dom'
import { whatWeDo } from '../content/what-we-do'
import { SEO } from '../components/SEO'
import { PageHeader } from '../components/PageHeader'
import { PageLead } from '../components/PageLead'
import { Initiative } from '../components/Initiative'
import { EmailSignup } from '../components/EmailSignup'

export default function WhatWeDo() {
  return (
    <>
      <SEO
        title="What we do"
        description="Our initiatives across nourishment, peace of mind, learning, environmental care, and community wellbeing. Turning compassion into meaningful action."
        path="/what-we-do"
      />
      <PageHeader data={whatWeDo.header} tone="blue" />
      <PageLead image={whatWeDo.header.image} arch="tl" />

      <section className="section">
        <div className="wrap">
          {whatWeDo.initiatives.map((init, i) => (
            <Initiative key={init.h3} data={init} index={i} />
          ))}
        </div>
      </section>

      <EmailSignup
        titleWithEm={whatWeDo.emailSignup.titleWithEm}
        body={whatWeDo.emailSignup.body}
        tone="yellow"
      >
        <div className="btn-row">
          <Link to="/volunteer" className="btn btn--primary">
            Volunteer with us
          </Link>
          <Link to="/donate" className="btn btn--ghost">
            Make a donation
          </Link>
        </div>
      </EmailSignup>
    </>
  )
}
