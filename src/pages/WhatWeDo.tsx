import { Link } from 'react-router-dom'
import { whatWeDo } from '../content/what-we-do'
import { SEO } from '../components/SEO'
import { PageHeader } from '../components/PageHeader'
import { Initiative } from '../components/Initiative'
import { EmailSignup } from '../components/EmailSignup'

export default function WhatWeDo() {
  return (
    <>
      <SEO
        title="What we do"
        description="Our initiatives across nourishment, peace of mind, learning, environmental care, and community wellbeing — turning compassion into meaningful action."
        path="/what-we-do"
      />
      <PageHeader data={whatWeDo.header} />

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
      >
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/volunteer" className="btn btn--on-dark">
            Volunteer with us
          </Link>
          <Link
            to="/donate"
            className="btn"
            style={{
              background: 'var(--white)',
              color: 'var(--ink)',
              borderColor: 'var(--white)',
            }}
          >
            Make a donation
          </Link>
        </div>
      </EmailSignup>
    </>
  )
}
