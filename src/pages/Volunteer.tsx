import { volunteer } from '../content/volunteer'
import { PageHeader } from '../components/PageHeader'
import { SectionHead } from '../components/SectionHead'
import { FocusList } from '../components/FocusList'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { VolunteerForm } from '../components/VolunteerForm'

export default function Volunteer() {
  return (
    <>
      <PageHeader data={volunteer.header} />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow={volunteer.section.eyebrow}
            heading="Every helping hand strengthens our work"
            headingMarked={volunteer.section.headingMarked}
            intro={volunteer.section.body}
          />
          <FocusList items={volunteer.ways} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="split-narrow">
            <Reveal>
              <span className="kicker">{volunteer.form.eyebrow}</span>
              <h2 style={{ marginBottom: '1.4rem', maxWidth: '16ch' }}>
                <Marked>{volunteer.form.headingMarked}</Marked>
              </h2>
              <p style={{ color: 'var(--ink-2)', fontSize: '1rem', marginBottom: '1.8rem' }}>
                <Marked>{volunteer.form.body}</Marked>
              </p>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.4rem' }}>
                {volunteer.form.checks.map((c) => (
                  <div
                    key={c.title}
                    style={{ padding: '1.1rem 0', borderBottom: '1px solid var(--line)' }}
                  >
                    <h4 style={{ marginBottom: '0.3rem' }}>{c.title}</h4>
                    <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem' }}>
                      <Marked>{c.body}</Marked>
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="form-card">
              <h3 style={{ marginBottom: '1.4rem' }}>Sign up to volunteer</h3>
              <VolunteerForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
