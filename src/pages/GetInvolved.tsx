import { Link } from 'react-router-dom'
import { getInvolved } from '../content/get-involved'
import { PageHeader } from '../components/PageHeader'
import { SectionHead } from '../components/SectionHead'
import { FocusList } from '../components/FocusList'
import { EmailSignup } from '../components/EmailSignup'

export default function GetInvolved() {
  return (
    <>
      <PageHeader data={getInvolved.header} />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow={getInvolved.section.eyebrow}
            heading="Find your way to give"
            headingMarked={getInvolved.section.headingMarked}
          />
          <FocusList items={getInvolved.ways} />
        </div>
      </section>

      <EmailSignup
        titleWithEm={getInvolved.emailSignup.titleWithEm}
        body={getInvolved.emailSignup.body}
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
