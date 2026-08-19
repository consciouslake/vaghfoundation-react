import { Link } from 'react-router-dom'
import { home } from '../content/home'
import { SEO } from '../components/SEO'
import { OrganizationJsonLd } from '../components/OrganizationJsonLd'
import { Hero } from '../components/Hero'
import { StatementQuote } from '../components/StatementQuote'
import { SectionHead } from '../components/SectionHead'
import { CausesMosaic } from '../components/CausesMosaic'
import { Gallery } from '../components/Gallery'
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
      {/* <CauseBand items={home.pills} href={home.pillars.btnHref} /> */}
      <StatementQuote text={home.statement} />

      {/* The four causes, drawn as plates */}
      <section className="section--tight">
        <div className="wrap">
          <SectionHead
            center
            heading="Four causes, one shared belief"
            headingMarked={home.pillars.headingMarked}
            intro={home.pillars.sub}
          />
          <CausesMosaic data={home.pillars} />

          <div className="causes__cta">
            <Link to={home.pillars.btnHref} className="btn btn--primary">
              {home.pillars.btnText}
            </Link>
          </div>
        </div>
      </section>

      {/* Real photographs, not placeholder stories */}
      <section className="section--tight">
        <div className="wrap">
          <SectionHead
            center
            eyebrow={home.gallery.eyebrow}
            heading={home.gallery.heading}
            intro={home.gallery.deck}
          />
          <Gallery tiles={home.gallery.tiles} />
        </div>
      </section>

      <CTATogether data={home.cta} />
    </div>
  )
}
