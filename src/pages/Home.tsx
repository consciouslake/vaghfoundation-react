import { Link } from 'react-router-dom'
import { home } from '../content/home'
import { SEO } from '../components/SEO'
import { OrganizationJsonLd } from '../components/OrganizationJsonLd'
import { Hero } from '../components/Hero'
import { Marquee } from '../components/Marquee'
import { MissionStatement } from '../components/MissionStatement'
import { SectionHead } from '../components/SectionHead'
import { CausesMosaic } from '../components/CausesMosaic'
import { StatementQuote } from '../components/StatementQuote'
import { Gallery } from '../components/Gallery'
import { FoundersMessage } from '../components/FoundersMessage'
import { CTATogether } from '../components/CTATogether'
import { ArrowRight } from '../components/ArrowRight'

export default function Home() {
  return (
    <>
      <SEO
        title="Compassion in action, service at heart"
        description="Vagh Foundation nurtures lives and nourishes communities through everyday acts of compassion: food, wellbeing, learning, and care for the planet."
        path="/"
      />
      <OrganizationJsonLd />

      <Hero data={home} />
      <Marquee items={home.pills} />

      <MissionStatement
        eyebrow={home.mission.eyebrow}
        statementMarked={home.mission.statementMarked}
        body={home.mission.body}
        btnText={home.mission.btnText}
        btnUrl={home.mission.btnUrl}
      />

      {/* 01 — the four causes, the centre of the page */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            index="01"
            eyebrow={home.pillars.eyebrow}
            heading="Four pillars, one shared belief"
            headingMarked={home.pillars.headingMarked}
            intro={home.pillars.sub}
          />
          <CausesMosaic data={home.pillars} />
          <div className="causes__cta">
            <Link to={home.pillars.btnHref} className="btn btn--ghost">
              {home.pillars.btnText}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <StatementQuote text={home.statement} />

      {/* 02 — real photographs instead of placeholder stories */}
      <section className="section gallery-sec">
        <div className="wrap">
          <SectionHead
            index="02"
            eyebrow={home.gallery.eyebrow}
            heading={home.gallery.heading}
            intro={home.gallery.deck}
          />
          <Gallery tiles={home.gallery.tiles} />
        </div>
      </section>

      <FoundersMessage data={home.founder} />
      <CTATogether data={home.cta} />
    </>
  )
}
