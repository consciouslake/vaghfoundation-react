/**
 * A string that may contain inline <mark>...</mark> tags for the
 * yellow highlight emphasis. Rendered safely via the <Marked/>
 * component.
 */
export type MarkedText = string

/** Plain URL — absolute or root-relative. */
export type Href = string

/** Absolute path served from /public — e.g. "/images/hero.jpg". */
export type Src = string

export interface NavLink {
  label: string
  href: Href
  /** Marks this link as the "Donate" CTA style in the top nav. */
  cta?: boolean
}

export interface MegaNavLink {
  label: string
  href: Href
  desc: string
}

export interface SocialLink {
  label: string
  href: Href
  /** SVG path — inlined without an <svg> wrapper. */
  icon: 'twitter' | 'facebook' | 'instagram' | 'linkedin'
}

export interface Site {
  brand: string
  logoLight: Src
  logoDark: Src
  /** Just the VAGH mark, no stacked wordmark — used in the header lockup. */
  markLight: Src
  markDark: Src
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socials: SocialLink[]
  footerTagline: string
  footerCopyright: string
  footerSlogan: string
  footerExploreHeading: string
  footerActHeading: string
  footerContactHeading: string
  footerExplore: NavLink[]
  footerAct: NavLink[]
}

export interface Nav {
  primary: NavLink[]
  mega: MegaNavLink[]
  megaFooterLinks: NavLink[]
}

/* ── Building blocks ─────────────────────────────────────────────── */

export interface Slide {
  image: Src
  h1Line1: string
  h1Line2?: string
  lede: MarkedText
  btnText: string
  btnUrl: Href
  btn2Text?: string
  btn2Url?: Href
}

export interface Pillar {
  title: string
  body: MarkedText
  image: Src
}

export interface IdeaCard {
  kicker: string
  topic: 'nourishment' | 'learning' | 'wellbeing'
  title: string
  body: MarkedText
  image: Src
}

export interface FounderMessage {
  eyebrow: string
  photo: Src
  name: string
  role: string
  quote: MarkedText
}

export interface GateFeature {
  image: Src
  kicker: string
  titleMarked: MarkedText
  desc: MarkedText
  btnText: string
  btnUrl: Href
}

/**
 * Preferred name for the shape above, now that it renders as a
 * Mozilla-style feature card (diagonal-clipped photo + colour fill)
 * rather than a Gates gate-frame. Aliased rather than renamed so the
 * existing content keys stay untouched.
 */
export type FeatureBlock = GateFeature

export interface PageHeader {
  eyebrow: string
  h1Marked: MarkedText
  lede: MarkedText
  image: Src
}

export interface TimelineEntry {
  year: string
  title: string
  body: MarkedText
}

export interface ValueItem {
  title: string
  body: MarkedText
}

export interface TeamMember {
  name: string
  role: string
  /** Omit for a placeholder card — renders a generic avatar mark instead. */
  photo?: Src
}

/** One tab's worth of people, for a tabbed team grid like Leadership. */
export interface TeamTab {
  label: string
  members: TeamMember[]
}

export interface FAQItem {
  q: string
  a: MarkedText
}

export interface Initiative {
  label: string
  h3: string
  para1: MarkedText
  para2?: MarkedText
  image: Src
}

export interface FocusItem {
  title: string
  body: MarkedText
  btnText?: string
  btnHref?: Href
}

export interface ImpactItem {
  title: string
  body: MarkedText
}

/**
 * The mechanism — how a contribution travels, drawn as numbered
 * stages rather than described in a paragraph. Lives on the Donate
 * page, just past the form.
 */
export interface MechanismData {
  eyebrow: string
  heading: string
  deck: MarkedText
  stages: { label: string; body: string }[]
}

export interface GallerySlide {
  image: Src
  caption: string
}

export interface GalleryTile {
  image: Src
  /** Chip label above the caption — usually a pillar name. */
  category: string
  caption: string
  /** Footprint in the mosaic. Omit for a plain 1×1 tile. */
  span?: 'big' | 'wide' | 'tall'
  /** Up to 3 slides shown in the lightbox when this tile is clicked. */
  slides?: GallerySlide[]
}

export interface ContactItem {
  label: string
  value: string
  /** e.g. mailto:info@... or tel:+91... — empty for plain text (address). */
  href?: Href
}

/* ── Page shapes ─────────────────────────────────────────────────── */

export interface HomePage {
  hero: {
    eyebrow: string
    /** <mark> is circled in ink, <em> takes the highlighter stroke. */
    title: MarkedText
    /** One per slide image, in order. */
    captions: string[]
    slides: Slide[]
  }
  /** Short uppercase phrases for the scrolling band. */
  marquee: string[]
  /** Short pillar labels — used as the scrolling marquee band. */
  pills: string[]
  gallery: {
    eyebrow: string
    heading: string
    deck: MarkedText
    tiles: GalleryTile[]
  }
  mission: {
    eyebrow: string
    statementMarked: MarkedText
    body: MarkedText
    btnText: string
    btnUrl: Href
  }
  hCards: {
    work: { image: Src; desc: MarkedText; href: Href }
    story: { image: Src; desc: MarkedText; href: Href }
  }
  founder: FounderMessage
  pillars: {
    eyebrow: string
    headingMarked: MarkedText
    sub: MarkedText
    items: Pillar[]
    btnText: string
    btnHref: Href
  }
  ideas: {
    eyebrow: string
    heading: string
    sub: MarkedText
    items: IdeaCard[]
  }
  statement: MarkedText
  gateFeature: GateFeature
  cta: {
    headingMarked: MarkedText
    body: MarkedText
    btn1Text: string
    btn1Href: Href
    btn2Text: string
    btn2Href: Href
  }
}

export interface AboutPage {
  header: PageHeader
  gateMission: GateFeature
  story: {
    eyebrow: string
    headingMarked: MarkedText
    paragraphs: MarkedText[]
    image: Src
  }
  timeline: {
    eyebrow: string
    headingMarked: MarkedText
    intro: MarkedText
    entries: TimelineEntry[]
  }
  values: {
    eyebrow: string
    heading: string
    intro: MarkedText
    items: ValueItem[]
  }
  team: {
    eyebrow: string
    headingMarked: MarkedText
    intro: MarkedText
    tabs: TeamTab[]
  }
  faq: {
    eyebrow: string
    heading: string
    items: FAQItem[]
  }
  emailSignup: {
    titleWithEm: string
    body: MarkedText
  }
}

export interface WhatWeDoPage {
  header: PageHeader
  initiatives: Initiative[]
  emailSignup: {
    titleWithEm: string
    body: MarkedText
  }
}

export interface GetInvolvedPage {
  header: PageHeader
  section: {
    eyebrow: string
    headingMarked: MarkedText
  }
  ways: FocusItem[]
  emailSignup: {
    titleWithEm: string
    body: MarkedText
  }
}

export interface VolunteerPage {
  header: PageHeader
  section: {
    eyebrow: string
    headingMarked: MarkedText
    body: MarkedText
  }
  ways: FocusItem[]
  form: {
    eyebrow: string
    headingMarked: MarkedText
    body: MarkedText
    checks: { title: string; body: MarkedText }[]
  }
}

export interface ContactPage {
  header: PageHeader
  section: {
    eyebrow: string
    headingMarked: MarkedText
  }
  items: ContactItem[]
  faq: {
    eyebrow: string
    heading: string
    items: FAQItem[]
  }
}

export interface DonatePage {
  header: PageHeader
  mechanism: MechanismData
  section: {
    eyebrow: string
    headingMarked: MarkedText
    body: MarkedText
  }
  impact: ImpactItem[]
  trust: { title: string; body: MarkedText }
  amountChips: number[]
  defaultChip: number
  volunteerCta: {
    titleWithEm: string
    body: MarkedText
    btnText: string
    btnHref: Href
  }
}
