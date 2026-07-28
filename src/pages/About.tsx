import { about } from '../content/about'
import { SEO } from '../components/SEO'
import { PageHeader } from '../components/PageHeader'
import { MissionStatement } from '../components/MissionStatement'
import { GateFeature } from '../components/GateFeature'
import { SectionHead } from '../components/SectionHead'
import { Timeline } from '../components/Timeline'
import { ValuesGrid } from '../components/ValuesGrid'
import { TeamGrid } from '../components/TeamGrid'
import { FAQAccordion } from '../components/FAQAccordion'
import { EmailSignup, EmailSignupForm } from '../components/EmailSignup'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'

export default function About() {
  return (
    <>
      <SEO
        title="About us"
        description="The story behind Vagh Foundation — our values, timeline, and the people whose steady, everyday work shapes lives with dignity and care."
        path="/about"
      />
      <PageHeader data={about.header} />

      <MissionStatement
        statementMarked={about.missionStatementMarked}
        btnText={about.missionCta.label}
        btnUrl={about.missionCta.href}
      />

      <GateFeature data={about.gateMission} />

      <section className="section" id="our-story">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <span className="kicker">{about.story.eyebrow}</span>
              <h2 style={{ maxWidth: '15ch' }}>
                <Marked>{about.story.headingMarked}</Marked>
              </h2>
            </Reveal>
            <Reveal style={{ paddingTop: '2rem' }}>
              {about.story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    color: 'var(--ink-2)',
                    fontSize: '1.05rem',
                    marginBottom: i === about.story.paragraphs.length - 1 ? 0 : '1.2rem',
                  }}
                >
                  <Marked>{p}</Marked>
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="split-narrow">
            <Reveal>
              <span className="kicker">{about.timeline.eyebrow}</span>
              <h2 style={{ maxWidth: '18ch' }}>
                <Marked>{about.timeline.headingMarked}</Marked>
              </h2>
              <p style={{ color: 'var(--ink-2)', marginTop: '1rem', maxWidth: '40ch' }}>
                <Marked>{about.timeline.intro}</Marked>
              </p>
            </Reveal>
            <Reveal>
              <Timeline entries={about.timeline.entries} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow={about.values.eyebrow}
            heading={about.values.heading}
            intro={about.values.intro}
          />
          <ValuesGrid items={about.values.items} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow={about.team.eyebrow}
            heading="The people behind the work"
            headingMarked={about.team.headingMarked}
            intro={about.team.intro}
          />
          <TeamGrid members={about.team.members} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap-r">
          <SectionHead eyebrow={about.faq.eyebrow} heading={about.faq.heading} />
          <Reveal>
            <FAQAccordion items={about.faq.items} />
          </Reveal>
        </div>
      </section>

      <EmailSignup titleWithEm={about.emailSignup.titleWithEm} body={about.emailSignup.body}>
        <EmailSignupForm />
      </EmailSignup>
    </>
  )
}
