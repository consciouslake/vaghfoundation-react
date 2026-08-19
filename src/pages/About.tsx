import { Link } from 'react-router-dom'
import { about } from '../content/about'
import { home } from '../content/home'
import { SEO } from '../components/SEO'
import { SectionHead } from '../components/SectionHead'
import { HistoryTimeline } from '../components/HistoryTimeline'
import { ValuesGrid } from '../components/ValuesGrid'
import { TeamTabs } from '../components/TeamTabs'
import { FAQAccordion } from '../components/FAQAccordion'
import { EmailSignup, EmailSignupForm } from '../components/EmailSignup'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { ArrowRight } from '../components/ArrowRight'
import { FounderSpotlight } from '../components/FounderSpotlight'

/**
 * Everything on this page keeps to the same reading-column width,
 * except two deliberate full-bleed beats: the hero band that opens
 * it, and the closing signup that closes it. Every other section —
 * including the Leadership band — sits in the constrained `.wrap`
 * column, so the colour lands as two clear moments instead of a
 * dozen different-width blocks fighting each other down the page.
 */
export default function About() {
  return (
    <>
      <SEO
        title="About us"
        description="The story behind Vagh Foundation: our mission, our history, and the people whose steady, everyday work shapes lives with dignity and care."
        path="/about"
      />

      {/* Hero — the one full-bleed colour band the page opens on, same
          as every other inner page's header. A statement and a face,
          the way "This is who we are" opens on the reference page. */}
      <section className="section band band--amber">
        <div className="wrap split about-hero">
          <Reveal>
            <span className="kicker">{about.header.eyebrow}</span>
            <h1>
              <Marked>{about.header.h1Marked}</Marked>
            </h1>
            <p className="lede">
              <Marked>{about.header.lede}</Marked>
            </p>
          </Reveal>
          <Reveal className="split-image arch-tr">
            <img src={about.header.image} alt="" />
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <div className="split">
            <Reveal className="split-image arch-tl">
              <img src={about.gateMission.image} alt="" />
            </Reveal>
            <Reveal>
              <span className="kicker">{about.gateMission.kicker}</span>
              <h2>
                <Marked>{about.gateMission.titleMarked}</Marked>
              </h2>
              <p className="lede" style={{ marginBottom: '1.5rem' }}>
                <Marked>{about.gateMission.desc}</Marked>
              </p>
              <Link to={about.gateMission.btnUrl} className="link">
                {about.gateMission.btnText} <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

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

      <div className="about-narrow-band">
        <FounderSpotlight data={home.founder} />
      </div>

      {/* History — a coloured tab per era, one panel that swaps to match */}
      <HistoryTimeline data={about.timeline} />

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

      {/* Leadership — same reading-column width as every other
          section on the page now; only the hero above and the
          closing signup below stay full-bleed. */}
      <section className="section--tight leadership-head">
        <div className="wrap">
          <SectionHead
            eyebrow={about.team.eyebrow}
            heading="The people behind the work"
            headingMarked={about.team.headingMarked}
            intro={about.team.intro}
          />
        </div>
      </section>
      <div className="leadership-band band band--blue about-narrow-band">
        <div className="wrap">
          <TeamTabs tabs={about.team.tabs} />
        </div>
      </div>

      <section className="section">
        <div className="wrap-r">
          <SectionHead eyebrow={about.faq.eyebrow} heading={about.faq.heading} />
          <Reveal>
            <FAQAccordion items={about.faq.items} />
          </Reveal>
        </div>
      </section>

      {/* Last full-bleed beat. */}
      <EmailSignup titleWithEm={about.emailSignup.titleWithEm} body={about.emailSignup.body}>
        <EmailSignupForm />
      </EmailSignup>
    </>
  )
}
