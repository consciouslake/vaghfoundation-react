import type { DonatePage } from './types'

export const donate: DonatePage = {
  header: {
    eyebrow: 'Support our work',
    h1Marked: 'Every contribution creates a <mark>ripple</mark> of hope.',
    lede: 'When you give to Vagh Foundation, you become a partner in compassion — and a force for extraordinary change.',
    image: '/images/donate-hero.png',
  },
  section: {
    eyebrow: 'Where your support goes',
    headingMarked: 'Kindness, directed where it’s <mark>needed most</mark>',
    body: 'No contribution is too small — because every act of kindness, multiplied across many hearts, becomes a force for good.',
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
