import type { HomePage } from './types'

export const home: HomePage = {
  hero: {
    slides: [
      {
        image: '/images/hero.jpg',
        h1Line1: 'Nurturing lives.',
        h1Line2: 'Nourishing communities.',
        lede: 'We believe lasting change begins with compassion in action. Through everyday acts of giving and support, we work toward a world where wellbeing, dignity, and opportunity reach everyone.',
        btnText: 'Get involved',
        btnUrl: '/get-involved',
        btn2Text: 'Support our work',
        btn2Url: '/donate',
      },
    ],
  },
  pills: [
    'Food distribution',
    'Inner wellbeing',
    'Learning & growth',
    'Environmental care',
  ],
  mission: {
    eyebrow: 'Our purpose',
    statementMarked: 'A quiet <mark>commitment</mark> to doing good, every <mark>day</mark>.',
    body: 'Vagh Foundation is dedicated to uplifting communities through initiatives that touch lives where it matters most — nourishment for the body, peace for the mind, knowledge for the future, and care for the world we share. Guided by service and humility, we strive to make kindness a way of life.',
    btnText: 'Our story',
    btnUrl: '/about',
  },
  hCards: {
    work: {
      image: '/images/cta-home.jpg',
      desc: 'The four causes we champion — nourishment, peace of mind, learning and care for our planet — and the initiatives that bring them to life.',
      href: '/what-we-do',
    },
    story: {
      image: '/images/header-about.jpg',
      desc: 'Vagh Foundation was born from a simple belief — that meaningful change is built through consistent, heartfelt acts of service.',
      href: '/about',
    },
  },
  founder: {
    eyebrow: 'A message from our founder',
    photo: '/images/story-2.jpg',
    name: 'A. Kumar',
    role: 'Founder, Vagh Foundation',
    quote: 'Compassion, when practiced with consistency, becomes a quiet force. It doesn’t demand attention — it simply shows up, day after day, wherever it is needed most. Vagh Foundation was born from this belief, and grows with every act of service.',
  },
  pillars: {
    eyebrow: 'The causes we champion',
    headingMarked: 'Four <mark>pillars</mark>, one shared belief',
    sub: 'That wellbeing is holistic — and that everyone deserves the chance to thrive.',
    items: [
      {
        title: 'Nourishment for all',
        body: 'Food distribution initiatives that ensure no one is left behind when it comes to a basic human need.',
        image: '/images/hero.jpg',
      },
      {
        title: 'Peace of mind',
        body: 'Support for spaces of inner wellbeing and self-reflection, helping people find calm and renewal.',
        image: '/images/cta-about.jpg',
      },
      {
        title: 'Empowering through learning',
        body: 'Access to knowledge and skill-building that opens doors of opportunity for curious minds.',
        image: '/images/header-wwd.jpg',
      },
      {
        title: 'Caring for our planet',
        body: 'Sustainability initiatives that protect the environment for generations to come.',
        image: '/images/header-con.jpg',
      },
    ],
    btnText: 'Explore what we do',
    btnHref: '/what-we-do',
  },
  ideas: {
    eyebrow: 'Ideas & stories',
    heading: 'Voices from our work',
    sub: 'Reflections, moments and voices from the communities we walk alongside.',
    items: [
      {
        kicker: 'Nourishment',
        topic: 'nourishment',
        title: 'What does a warm meal really give?',
        body: 'Beyond hunger — dignity, and evenings a family can share.',
        image: '/images/story-1.jpg',
      },
      {
        kicker: 'Learning',
        topic: 'learning',
        title: 'Can a community teach itself?',
        body: 'Neighbours becoming teachers in the learning circles.',
        image: '/images/story-2.jpg',
      },
      {
        kicker: 'Wellbeing',
        topic: 'wellbeing',
        title: 'How much quiet does a life need?',
        body: 'On the spaces we support for reflection and peace.',
        image: '/images/story-3.jpg',
      },
    ],
  },
  statement: 'Every meal shared, every mind at peace, every life empowered — <mark>it all begins with people who care.</mark>',
  gateFeature: {
    image: '/images/header-gi.jpg',
    kicker: 'Compassion in action',
    titleMarked: 'Small acts, gathered together, become a <mark>force</mark> for extraordinary change.',
    desc: 'We walk quietly alongside those we serve — offering nourishment, supporting peace of mind, encouraging learning, and caring for the world we all share.',
    btnText: 'Explore what we do',
    btnUrl: '/what-we-do',
  },
  cta: {
    headingMarked: 'Together, we can do more',
    body: 'Change is a collective effort — and there’s a place for everyone in ours.',
    btn1Text: 'Volunteer with us',
    btn1Href: '/volunteer',
    btn2Text: 'Make a donation',
    btn2Href: '/donate',
  },
}
