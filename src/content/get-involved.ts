import type { GetInvolvedPage } from './types'

export const getInvolved: GetInvolvedPage = {
  header: {
    tag: 'GET INVOLVED',
    eyebrow: 'JOIN THE MOVEMENT',
    h1Marked: 'Be the <em>change</em><br />you wish to see.',
    lede: 'Whether you have time, resources, or simply a willingness to help, your contribution creates ripples that reach further than you might imagine.',
    image: '/images/gi-hero.png',
    btnText: 'Ways to contribute',
    btnUrl: '#ways-to-give',
    badgeNumber: 'Join us',
    badgeLabel: 'in making a difference',
  },
  section: {
    eyebrow: 'Ways to contribute',
    headingMarked: 'Find your <mark>way</mark> to give',
  },
  // Ordered so the warm accent (amber, card 2) sits between the three
  // cool ones — with 3 cards visible at a time in the carousel, that
  // keeps every scroll position from showing an all-cool trio.
  ways: [
    {
      title: 'Support our cause',
      body: 'Your generosity fuels our work. Every contribution, big or small, helps us extend nourishment, peace, learning, and care to more lives.',
      btnText: 'Donate now',
      btnHref: '/donate#donate-form',
    },
    {
      title: 'Volunteer your time',
      body: 'Lend your hands and heart to our initiatives. From food distribution drives to community support efforts, your presence makes a tangible difference.',
      btnText: 'Volunteer today',
      btnHref: '/volunteer',
    },
    {
      title: 'Spread the word',
      body: 'Awareness is powerful. Share our mission with your circle and help us grow a community of compassion.',
    },
    {
      title: 'Partner with us',
      body: 'Are you an organization that shares our values? Let’s collaborate to create a greater collective impact.',
      btnText: 'Start a conversation',
      btnHref: '/contact#contact-form',
    },
  ],
  emailSignup: {
    titleWithEm: 'Ready <em>when</em> you are',
    body: 'Two simple steps to begin. Pick the one that fits you today.',
  },
}
