import { volunteer } from '../content/volunteer'
import { SEO } from '../components/SEO'
import { PageHeader } from '../components/PageHeader'
import { PageLead } from '../components/PageLead'
import { SectionHead } from '../components/SectionHead'
import { ColourCards, type ColourCard } from '../components/ColourCards'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { VolunteerForm } from '../components/VolunteerForm'

const wayCards: ColourCard[] = volunteer.ways.map((w) => ({
  title: w.title,
  body: w.body,
  href: w.btnHref,
  linkText: w.btnText,
}))

export default function Volunteer() {
  return (
    <>
      <SEO
        title="Volunteer with us"
        description="Your time is a gift that transforms lives. Sign up to help with food distribution, resource coordination, awareness, or skill-based work."
        path="/volunteer"
      />
      <PageHeader data={volunteer.header} tone="green" />
      <PageLead image={volunteer.header.image} arch="tl" />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow={volunteer.section.eyebrow}
            heading="Every helping hand strengthens our work"
            headingMarked={volunteer.section.headingMarked}
            intro={volunteer.section.body}
          />
        </div>
        <ColourCards items={wayCards} label="Ways to help" />
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-narrow">
            <Reveal>
              <span className="kicker">{volunteer.form.eyebrow}</span>
              <h2>
                <Marked>{volunteer.form.headingMarked}</Marked>
              </h2>
              <p className="lede volunteer-intro">
                <Marked>{volunteer.form.body}</Marked>
              </p>
              <div className="check-list">
                {volunteer.form.checks.map((c) => (
                  <div key={c.title} className="check-item">
                    <h4>{c.title}</h4>
                    <p>
                      <Marked>{c.body}</Marked>
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="form-card">
              <h3>Sign up to volunteer</h3>
              <VolunteerForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
