import { Link } from 'react-router-dom'
import { getInvolved } from '../content/get-involved'
import { SEO } from '../components/SEO'
import { PageHeader } from '../components/PageHeader'
import { SectionHead } from '../components/SectionHead'
import { ColourCards, type ColourCard } from '../components/ColourCards'
import { EmailSignup } from '../components/EmailSignup'

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
      <PageHeader data={getInvolved.header} tone="amber" />

      <section className="section">
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
          <Link to="/donate" className="btn btn--ghost">
            Make a donation
          </Link>
        </div>
      </EmailSignup>
    </>
  )
}
