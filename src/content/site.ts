import type { Site } from './types'

export const site: Site = {
  brand: 'Vagh Foundation',
  logoLight: '/images/logo-full-white.png',
  logoDark: '/images/logo-color.png',
  contactEmail: 'info@vaghfoundation.org',
  contactPhone: '+91 84888 96555',
  contactAddress: 'A-609, Siddhivinayak Tower, Makarba, Ahmedabad — 380051',
  socials: [
    { label: 'Twitter',   href: '#', icon: 'twitter'   },
    { label: 'Facebook',  href: '#', icon: 'facebook'  },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn',  href: '#', icon: 'linkedin'  },
  ],
  footerTagline: 'Nurturing lives and nourishing communities through compassion, service, and lasting care.',
  footerCopyright: '© 2026 Vagh Foundation. All rights reserved.',
  footerSlogan: 'Compassion in action, service at heart.',
  footerExploreHeading: 'Explore',
  footerActHeading: 'Act',
  footerContactHeading: 'Contact',
  footerExplore: [
    { label: 'About',        href: '/about' },
    { label: 'What we do',   href: '/what-we-do' },
    { label: 'Get involved', href: '/get-involved' },
    { label: 'Contact',      href: '/contact' },
  ],
  footerAct: [
    { label: 'Volunteer',       href: '/volunteer' },
    { label: 'Donate',          href: '/donate' },
    { label: 'Partner with us', href: '/get-involved' },
  ],
}
