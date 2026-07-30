import type { VolunteerPage } from './types'

export const volunteer: VolunteerPage = {
  header: {
    eyebrow: 'Volunteer with us',
    h1Marked: 'Your <mark>time</mark> is a gift that transforms lives.',
    lede: 'Volunteering with us is more than an act of giving — it’s an experience of connection, purpose, and shared humanity.',
    image: '/images/volunteer-hero.png',
  },
  section: {
    eyebrow: 'How you can help',
    headingMarked: 'Every helping <mark>hand</mark> strengthens our work',
    body: 'No matter your background or availability, there’s a meaningful way for you to contribute.',
  },
  ways: [
    { title: 'On-ground support',       body: 'Join our food distribution initiatives and community outreach efforts, helping bring essential support directly to those who need it.' },
    { title: 'Resource coordination',   body: 'Assist in organizing and managing the supplies and resources that keep our initiatives running smoothly.' },
    { title: 'Awareness & outreach',    body: 'Help us amplify our message, engage new supporters, and grow our community of changemakers.' },
    { title: 'Skill-based volunteering',body: 'Offer your professional talents — in communications, logistics, coordination, or beyond — to strengthen our work.' },
  ],
  form: {
    eyebrow: 'The volunteer experience',
    headingMarked: 'We welcome volunteers from <mark>all walks</mark> of life.',
    body: 'Together, we’ll turn compassion into action — one initiative at a time. Fill out the form and we’ll be in touch.',
    checks: [
      { title: 'No experience needed',   body: 'Bring your willingness to help — we’ll guide you the rest of the way.' },
      { title: 'Flexible commitment',    body: 'Contribute in a way that fits your schedule and availability.' },
    ],
  },
}
