import { home } from '../content/home'
import { SEO } from '../components/SEO'
import { OrganizationJsonLd } from '../components/OrganizationJsonLd'
import { HeroCarousel } from '../components/HeroCarousel'
import { HeroPillstrip } from '../components/HeroPillstrip'
import { MissionStatement } from '../components/MissionStatement'
import { HCards } from '../components/HCards'
import { FoundersMessage } from '../components/FoundersMessage'
import { FourPillars } from '../components/FourPillars'
import { IdeasGrid } from '../components/IdeasGrid'
import { StatementQuote } from '../components/StatementQuote'
import { GateFeature } from '../components/GateFeature'
import { CTATogether } from '../components/CTATogether'

export default function Home() {
  return (
    <>
      <SEO
        title="Compassion in action, service at heart"
        description="Vagh Foundation nurtures lives and nourishes communities through everyday acts of compassion: food, wellbeing, learning, and care for the planet."
        path="/"
      />
      <OrganizationJsonLd />
      <HeroCarousel slides={home.hero.slides} />
      <HeroPillstrip pills={home.pills} />
      <MissionStatement
        eyebrow={home.mission.eyebrow}
        statementMarked={home.mission.statementMarked}
        body={home.mission.body}
        btnText={home.mission.btnText}
        btnUrl={home.mission.btnUrl}
      />
      <HCards cards={home.hCards} />
      <FoundersMessage data={home.founder} />
      <FourPillars data={home.pillars} />
      <IdeasGrid data={home.ideas} />
      <StatementQuote text={home.statement} />
      <GateFeature data={home.gateFeature} />
      <CTATogether data={home.cta} />
    </>
  )
}
