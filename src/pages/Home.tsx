import { Link } from 'react-router-dom'
import { home } from '../content/home'
import { SEO } from '../components/SEO'
import { OrganizationJsonLd } from '../components/OrganizationJsonLd'
import { Hero } from '../components/Hero'
import { StatementQuote } from '../components/StatementQuote'
import { SectionHead } from '../components/SectionHead'
import { CausesMosaic } from '../components/CausesMosaic'
import { Gallery } from '../components/Gallery'
import { EmailSignup } from '../components/EmailSignup'

export default function Home() {
  return (
    <div className="home">
      <SEO
        title="Home"
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

      {/* Same closing-band component every other page ends on, so the
          last thing a visitor sees is consistent site to site. */}
      <EmailSignup titleWithEm={home.cta.headingMarked} body={home.cta.body}>
        <div className="btn-row">
          <Link to={home.cta.btn1Href} className="btn btn--primary">
            {home.cta.btn1Text}
          </Link>
          <Link to={home.cta.btn2Href} className="btn btn--ghost">
            {home.cta.btn2Text}
          </Link>
        </div>
      </EmailSignup>
    </div>
  )
}
