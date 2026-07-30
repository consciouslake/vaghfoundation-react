import type { Nav } from './types'

export const nav: Nav = {
  primary: [
    { label: 'Home',         href: '/' },
    { label: 'About',        href: '/about' },
    { label: 'What we do',   href: '/what-we-do' },
    { label: 'Get involved', href: '/get-involved' },
    { label: 'Contact',      href: '/contact' },
    { label: 'Donate',       href: '/donate', cta: true },
  ],
  mega: [
    { label: 'Home',         href: '/',             desc: 'Vagh Foundation: compassion in action' },
    { label: 'About us',     href: '/about',        desc: 'Our story, values, and the people behind the work' },
    { label: 'What we do',   href: '/what-we-do',   desc: 'Nourishment, learning, wellbeing, sustainability' },
    { label: 'Get involved', href: '/get-involved', desc: 'Volunteer, donate, partner with us' },
    { label: 'Contact',      href: '/contact',      desc: 'Reach us, locations, enquiries' },
    { label: 'Donate',       href: '/donate',       desc: 'Support our work with a contribution' },
  ],
  megaFooterLinks: [
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Email us',  href: 'mailto:info@vaghfoundation.org' },
  ],
}
