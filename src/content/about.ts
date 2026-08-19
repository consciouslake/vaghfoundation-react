import type { AboutPage } from './types'

export const about: AboutPage = {
  header: {
    eyebrow: 'About Us',
    h1Marked: 'Who we are',
    lede: 'We walk quietly alongside those we serve, offering nourishment, supporting peace of mind, encouraging learning, and caring for the world we all share.',
    image: '/images/about-hero.png',
  },
  gateMission: {
    image: '/images/about-mission.png',
    kicker: 'Our mission',
    titleMarked: 'To serve with <mark>humility</mark> and heart.',
    desc: 'To serve communities through thoughtful initiatives that nurture the body, calm the mind, enrich the spirit, and protect the world around us.',
    btnText: 'See our work',
    btnUrl: '/what-we-do',
  },
  story: {
    eyebrow: 'Our story',
    headingMarked: 'Meaningful change, built <mark>one act</mark> at a time.',
    paragraphs: [
      'Vagh Foundation was born from a simple yet powerful belief: that meaningful change is created not through grand gestures alone, but through consistent, heartfelt acts of service.',
      'Our work is guided not by recognition, but by the genuine difference we can make in everyday lives: quietly, patiently, and with lasting care.',
    ],
  },
  timeline: {
    eyebrow: 'Our journey',
    headingMarked: '<mark>Milestones</mark> along the way',
    intro: 'A brief record of the moments that shaped our work, and the steady steps forward that continue to define us.',
    entries: [
      { year: '2024', title: 'Foundation established',   body: 'Vagh Foundation was formally established with a small circle of committed volunteers.' },
      { year: '2024', title: 'First food distribution',   body: 'Our first community meal reached families in Bengaluru: the seed of what became a recurring initiative.' },
      { year: '2025', title: 'Learning circles begin',    body: 'We began supporting reading and skill circles for children and elderly members of the community.' },
      { year: '2025', title: 'Mindfulness spaces',        body: 'Support extended to spaces of inner wellbeing and quiet reflection.' },
      { year: '2026', title: 'Environmental care',        body: 'Sustainability initiatives added to our work, connecting people and planet.' },
    ],
  },
  values: {
    eyebrow: 'What guides us',
    heading: 'Our values',
    intro: 'The principles behind every initiative we undertake.',
    items: [
      { title: 'Compassion',     body: 'We lead with empathy, meeting people where they are with warmth and respect.' },
      { title: 'Service',        body: 'We believe in giving without expectation, letting our actions speak for themselves.' },
      { title: 'Integrity',      body: 'We uphold honesty and transparency in everything we do.' },
      { title: 'Sustainability', body: 'We honour our responsibility to the planet and to future generations.' },
      { title: 'Dignity',        body: 'We ensure that every person we serve is treated with the respect they deserve.' },
    ],
  },
  team: {
    eyebrow: 'Who we are',
    headingMarked: 'The <mark>people</mark> behind the work',
    intro: 'A small group of trustees, advisors and long-time volunteers who guide the direction of the foundation.',
    tabs: [
      {
        label: 'Volunteers',
        // Placeholder cards — no named volunteer roster yet, so no
        // photos or real names here. Swap in real people as they're
        // ready; the card renders a generic mark when photo is omitted.
        members: Array.from({ length: 10 }, (_, i) => ({
          name: `Volunteer ${String(i + 1).padStart(2, '0')}`,
          role: 'Community volunteer',
        })),
      },
      {
        label: 'Leadership',
        members: [
          { name: 'A. Kumar',  role: 'Founder & Chair', photo: '/images/team-a-kumar.png' },
          { name: 'R. Sharma', role: 'Trustee',         photo: '/images/team-r-sharma.png' },
        ],
      },
    ],
  },
  faq: {
    eyebrow: 'Common questions',
    heading: 'Things people often ask',
    items: [
      { q: 'Is Vagh Foundation a registered non-profit?',           a: 'Yes. Vagh Foundation is a registered non-profit under Indian law and operates with full transparency in every initiative we undertake.' },
      { q: 'Can I direct my contribution to a specific cause?',    a: 'Absolutely. If you’d like your support to go toward a specific initiative, you can note that when you donate or reach out to us directly.' },
      { q: 'How do I know my contribution is used well?',           a: 'We publish periodic notes on our work and are always happy to answer specific questions. Reach out through the contact page.' },
      { q: 'Can our organisation partner with you?',                a: 'Yes. We welcome partnerships with organisations that share our values. Please start a conversation through the contact form.' },
    ],
  },
  emailSignup: {
    titleWithEm: 'Walk with <em>us</em>',
    body: 'Occasional updates on our work, and the people we walk with.',
  },
}
