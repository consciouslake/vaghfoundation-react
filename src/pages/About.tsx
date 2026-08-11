import { about } from '../content/about'
import { SEO } from '../components/SEO'
import { PageHeader } from '../components/PageHeader'
import { PageLead } from '../components/PageLead'
import { MissionStatement } from '../components/MissionStatement'
import { FeatureCard } from '../components/FeatureCard'
import { SectionHead } from '../components/SectionHead'
import { ColourCards, type ColourCard } from '../components/ColourCards'
import { ValuesGrid } from '../components/ValuesGrid'
import { TeamGrid } from '../components/TeamGrid'
import { FAQAccordion } from '../components/FAQAccordion'
import { EmailSignup, EmailSignupForm } from '../components/EmailSignup'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'

/** The journey entries render as colour cards — the year is the eyebrow. */
const journeyCards: ColourCard[] = about.timeline.entries.map((e) => ({
  eyebrow: e.year,
  title: e.title,
  body: e.body,
}))

export default function About() {
  return (
    <>
      <SEO
        title="About us"
        description="The story behind Vagh Foundation: our values, timeline, and the people whose steady, everyday work shapes lives with dignity and care."
        path="/about"
      />
      <PageHeader data={about.header} tone="orange" />
      <PageLead image={about.header.image} arch="tr" />

      <MissionStatement
        statementMarked={about.missionStatementMarked}
        btnText={about.missionCta.label}
        btnUrl={about.missionCta.href}
      />

      <FeatureCard data={about.gateMission} tone="blue" />

      <section className="section" id="our-story">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <span className="kicker">{about.story.eyebrow}</span>
              <h2>
                <Marked>{about.story.headingMarked}</Marked>
              </h2>
            </Reveal>
            <Reveal>
              {about.story.paragraphs.map((p, i) => (
                <p key={i} className="lede">
                  <Marked>{p}</Marked>
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <SectionHead
            eyebrow={about.timeline.eyebrow}
            heading="Milestones along the way"
            headingMarked={about.timeline.headingMarked}
            intro={about.timeline.intro}
            rays
          />
        </div>
        <ColourCards items={journeyCards} label="Our journey" />
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

      <section className="section">
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

      <section className="section">
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
