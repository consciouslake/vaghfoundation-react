import type { DonatePage } from './types'

export const donate: DonatePage = {
  header: {
    tag: 'DONATE',
    eyebrow: 'SUPPORT OUR WORK',
    h1Marked: 'Every contribution<br />creates a <em>ripple</em> of hope.',
    lede: 'When you give to Vagh Foundation, you become a partner in compassion, and a force for extraordinary change.',
    image: '/images/donate-hero.png',
    btnText: 'Make a donation',
    btnUrl: '#donate-form',
    badgeNumber: 'Every bit counts',
  },
  mechanism: {
    eyebrow: 'The mechanism',
    heading: 'How compassion moves.',
    deck: 'A contribution is not an endpoint. It is a machine with four moving parts, each one turning the next.',
    stages: [
      { label: 'Give', body: 'A meal, a rupee, an hour' },
      { label: 'Prepare', body: 'Volunteers turn it into care' },
      { label: 'Deliver', body: 'Straight to the community' },
      { label: 'Thrive', body: 'A family, steadier than before' },
    ],
  },
  section: {
    eyebrow: 'Where your support goes',
    headingMarked: 'Kindness, directed where it’s <mark>needed most</mark>',
    body: 'No contribution is too small. Every act of kindness, multiplied across many hearts, becomes a force for good.',
  },
  impact: [
    { title: 'Nourishment',     body: 'Helps provide wholesome meals through our food distribution initiatives.' },
    { title: 'Peace of mind',   body: 'Supports spaces dedicated to inner wellbeing with essential resources and supplies.' },
    { title: 'Learning',        body: 'Enables access to knowledge and skill-building opportunities.' },
    { title: 'Sustainability',  body: 'Advances initiatives that care for our environment.' },
  ],
  trust: {
    title: 'A promise of trust',
    body: 'We honour your generosity with integrity and care, directing every contribution thoughtfully toward the causes we serve.',
  },
  amountChips: [500, 1000, 2500, 5000, 10000],
  defaultChip: 2500,
  volunteerCta: {
    titleWithEm: 'Give your <em>time</em> too',
    body: 'Prefer to give your time instead? There’s a place for you too.',
    btnText: 'Volunteer with us',
    btnHref: '/volunteer',
  },
}
