import type { ContactPage } from './types'
import { site } from './site'

const phoneTelHref = 'tel:' + site.contactPhone.replace(/[^0-9+]/g, '')

export const contact: ContactPage = {
  header: {
    tag: 'CONTACT',
    eyebrow: 'GET IN TOUCH',
    h1Marked: 'We’d love to<br /><em>hear</em> from you.',
    lede: 'Whether you’d like to volunteer, contribute, collaborate, or simply learn more, every conversation is a step toward greater good.',
    image: '/images/contact-hero.png',
    btnText: 'Send a message',
    btnUrl: '#contact-form',
    badgeNumber: 'Let’s talk',
  },
  section: {
    eyebrow: 'Reach us',
    headingMarked: 'Let’s <mark>connect</mark>',
  },
  items: [
    { label: 'Email',   value: site.contactEmail,   href: 'mailto:' + site.contactEmail },
    { label: 'Phone',   value: site.contactPhone,   href: phoneTelHref },
    { label: 'Address', value: site.contactAddress },
  ],
  faq: {
    eyebrow: 'Good to know',
    heading: 'Frequently asked',
    items: [
      { q: 'How can I start volunteering?',                     a: 'Simply fill out the form on our volunteer page and we’ll be in touch to welcome you. No prior experience is needed, just a willingness to help.' },
      { q: 'Where do your initiatives take place?',             a: 'We organize initiatives across various locations from time to time, bringing support directly to the communities that need it most.' },
      { q: 'Can organizations partner with the foundation?',    a: 'Absolutely. If your organization shares our values, we’d love to explore how we can create greater collective impact together. Reach out through the contact form to begin.' },
      { q: 'How is my contribution used?',                      a: 'Every contribution is directed thoughtfully toward the causes we serve (nourishment, wellbeing, learning, and environmental care) with integrity and care.' },
    ],
  },
}
