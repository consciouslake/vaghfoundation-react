import { volunteer } from '../content/volunteer'
import { SEO } from '../components/SEO'
import { SectionHead } from '../components/SectionHead'
import { ColourCards, type ColourCard } from '../components/ColourCards'
import { Reveal } from '../components/Reveal'
import { Marked } from '../components/Marked'
import { VolunteerForm } from '../components/VolunteerForm'
import { ArrowRight } from '../components/ArrowRight'

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

      {/* Hero — custom editorial layout matching reference */}
      <section className="volunteer-hero">
        <div className="volunteer-hero__grid wrap">
          <Reveal className="volunteer-hero__left">
            {volunteer.header.tag && (
              <span className="volunteer-hero__tag">{volunteer.header.tag}</span>
            )}
            <h1 className="volunteer-hero__title">
              <Marked>{volunteer.header.h1Marked}</Marked>
            </h1>
            <p className="volunteer-hero__lede">
              <Marked>{volunteer.header.lede}</Marked>
            </p>
            <div className="volunteer-hero__cta">
              <a href="#volunteer-form" className="btn btn--primary btn--pill">
                {volunteer.header.btnText || 'Volunteer today'} <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="volunteer-hero__right">
            <div className="volunteer-hero__card-wrap">
              <figure className="volunteer-hero__card">
                <div className="volunteer-hero__card-inner">
                  <div className="volunteer-hero__card-photo">
                    <img src={volunteer.header.image} alt="Volunteer with us" />
                  </div>
                </div>
              </figure>

              {/* Floating dark badge at bottom-left */}
              <div className="volunteer-hero__badge">
                <div className="volunteer-hero__badge-num">{volunteer.header.badgeNumber || 'Join our team'}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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

      <section className="section" id="volunteer-form">
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
            <Reveal className="form-card form-card--green">
              <h3>Sign up to volunteer</h3>
              <VolunteerForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
