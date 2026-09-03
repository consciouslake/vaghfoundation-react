import type { VolunteerPage } from './types'

export const volunteer: VolunteerPage = {
  header: {
    tag: 'VOLUNTEER',
    eyebrow: 'VOLUNTEER WITH US',
    h1Marked: 'Your time is a gift that <em>transforms</em> lives.',
    lede: 'Volunteering with us is more than an act of giving. It’s an experience of connection, purpose, and shared humanity.',
    image: '/images/volunteer-hero.webp',
    btnText: 'Volunteer today',
    btnUrl: '#volunteer-form',
    badgeNumber: 'Join our team',
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
    { title: 'Skill-based volunteering',body: 'Offer your professional talents (in communications, logistics, coordination, or beyond) to strengthen our work.' },
  ],
  form: {
    eyebrow: 'The volunteer experience',
    headingMarked: 'We welcome volunteers from <mark>all walks</mark> of life.',
    body: 'Together, we’ll turn compassion into action, one initiative at a time. Fill out the form and we’ll be in touch.',
    checks: [
      { title: 'No experience needed',   body: 'Bring your willingness to help. We’ll guide you the rest of the way.' },
      { title: 'Flexible commitment',    body: 'Contribute in a way that fits your schedule and availability.' },
    ],
  },
}
