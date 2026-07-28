import { Link } from 'react-router-dom'
import { donate } from '../content/donate'
import { PageHeader } from '../components/PageHeader'
import { EmailSignup } from '../components/EmailSignup'
import { DonateForm } from '../components/DonateForm'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'

export default function Donate() {
  return (
    <>
      <PageHeader data={donate.header} />

      <section className="section">
        <div className="wrap">
          <div className="split-narrow">
            <Reveal>
              <span className="kicker">{donate.section.eyebrow}</span>
              <h2 style={{ marginBottom: '1.4rem', maxWidth: '18ch' }}>
                <Marked>{donate.section.headingMarked}</Marked>
              </h2>
              <p style={{ color: 'var(--ink-2)', fontSize: '1.02rem', marginBottom: '2.4rem' }}>
                <Marked>{donate.section.body}</Marked>
              </p>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {donate.impact.map((item, i) => (
                  <div
                    key={item.title}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr',
                      gap: '1.5rem',
                      padding: '1.3rem 0',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        color: 'var(--accent)',
                        letterSpacing: '0.12em',
                        fontWeight: 600,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.3rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--ink-2)', fontSize: '0.95rem' }}>
                        <Marked>{item.body}</Marked>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: '2.5rem',
                  padding: '1.5rem',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--gate)',
                  background: 'var(--paper)',
                }}
              >
                <h4 style={{ marginBottom: '0.5rem' }}>{donate.trust.title}</h4>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem' }}>
                  <Marked>{donate.trust.body}</Marked>
                </p>
              </div>
            </Reveal>
            <Reveal className="form-card">
              <h3 style={{ marginBottom: '1.4rem' }}>Make a donation</h3>
              <DonateForm
                amountChips={donate.amountChips}
                defaultChip={donate.defaultChip}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <EmailSignup
        titleWithEm={donate.volunteerCta.titleWithEm}
        body={donate.volunteerCta.body}
      >
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={donate.volunteerCta.btnHref} className="btn btn--on-dark">
            {donate.volunteerCta.btnText}
          </Link>
        </div>
      </EmailSignup>
    </>
  )
}
