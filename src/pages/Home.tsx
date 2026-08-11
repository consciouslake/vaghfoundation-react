import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { home } from '../content/home'
import { SEO } from '../components/SEO'
import { OrganizationJsonLd } from '../components/OrganizationJsonLd'
import { Hero } from '../components/Hero'
import { CauseBand } from '../components/CauseBand'
import { MissionStatement } from '../components/MissionStatement'
import { SectionHead } from '../components/SectionHead'
import { CausesMosaic } from '../components/CausesMosaic'
import { StatementQuote } from '../components/StatementQuote'
import { Gallery } from '../components/Gallery'
import { FounderSpotlight } from '../components/FounderSpotlight'
import { CTATogether } from '../components/CTATogether'

export default function Home() {
  return (
    <div className="home">
      <SEO
        title="Compassion in action, service at heart"
        description="Vagh Foundation nurtures lives and nourishes communities through everyday acts of compassion: food, wellbeing, learning, and care for the planet."
        path="/"
      />
      <OrganizationJsonLd />

      <Hero data={home} />
      <CauseBand items={home.pills} href={home.pillars.btnHref} />

      <MissionStatement
        id="purpose"
        eyebrow={home.mission.eyebrow}
        statementMarked={home.mission.statementMarked}
        body={home.mission.body}
        btnText={home.mission.btnText}
        btnUrl={home.mission.btnUrl}
      />

      {/* The four causes — the centre of the page */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            split
            eyebrow={home.pillars.eyebrow}
            heading="Four causes, one shared belief"
            headingMarked={home.pillars.headingMarked}
            intro={home.pillars.sub}
          />
          <CausesMosaic data={home.pillars} />
          <div className="causes__cta">
            <Link to={home.pillars.btnHref} className="btn btn--sweep btn--pill">
              {home.pillars.btnText}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <StatementQuote text={home.statement} />

      {/* Real photographs, not placeholder stories */}
      <section className="section gallery-sec">
        <div className="wrap">
          <SectionHead
            split
            eyebrow={home.gallery.eyebrow}
            heading={home.gallery.heading}
            intro={home.gallery.deck}
          />
          <Gallery tiles={home.gallery.tiles} />
        </div>
      </section>

      <FounderSpotlight data={home.founder} chips={home.pills} chipsHref={home.pillars.btnHref} />
      <CTATogether data={home.cta} />
    </div>
  )
}
