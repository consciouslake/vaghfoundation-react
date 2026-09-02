import type { WhatWeDoPage } from './types'

export const whatWeDo: WhatWeDoPage = {
  header: {
    tag: 'WHAT WE DO',
    eyebrow: 'OUR PROGRAMS',
    h1Marked: 'Four causes.<br /><em>One</em> shared belief.',
    lede: 'Our work spans several interconnected causes, each rooted in the belief that wellbeing is holistic. We nourish, we support, we empower, and we protect.',
    image: '/images/wwd-hero.webp',
    btnText: 'Explore programs',
    btnUrl: '#initiatives',
    cards: [
      {
        title: 'Nourishment',
        action: 'We nourish',
        subtitle: 'Nourishment for all',
        image: '/images/pillar-1-nourishment.webp',
        color: 'coral',
      },
      {
        title: 'Peace of mind',
        action: 'We support',
        subtitle: 'Peace of mind & calm',
        image: '/images/pillar-2-peace.webp',
        color: 'teal',
      },
      {
        title: 'Learning & growth',
        action: 'We empower',
        subtitle: 'Learning & growth',
        image: '/images/pillar-3-learning.webp',
        color: 'amber',
      },
      {
        title: 'Our planet',
        action: 'We protect',
        subtitle: 'Caring for our planet',
        image: '/images/pillar-4-planet.webp',
        color: 'green',
      },
    ],
  },
  initiatives: [
    {
      label: 'Nourishment for all',
      h3: 'Food distribution initiatives',
      para1: 'Hunger knows no boundaries, and neither does our commitment to addressing it. Vagh Foundation organizes food distribution initiatives at various locations, bringing wholesome meals and essential provisions to those in need.',
      para2: 'Whether responding to everyday needs or coming together during special occasions, we believe sharing a meal is one of the purest expressions of humanity.',
      image: '/images/wwd-section-1.webp',
    },
    {
      label: 'Peace of mind & inner wellbeing',
      h3: 'Supporting spaces for reflection and calm',
      para1: 'In a fast-paced world, the need for stillness and mental clarity has never been greater. Vagh Foundation supports centres and spaces dedicated to inner wellbeing, self-reflection, and mental peace.',
      para2: 'By helping sustain these environments of tranquility, we enable more people to experience the profound benefits of calm, mindfulness, and personal renewal.',
      image: '/images/wwd-section-2.webp',
    },
    {
      label: 'Empowering through learning',
      h3: 'Nurturing knowledge and growth',
      para1: 'We believe knowledge is one of the greatest gifts one can offer. Vagh Foundation supports learning and skill-development initiatives that open doors of opportunity for curious and eager minds.',
      para2: 'By encouraging access to knowledge and fostering environments where people can learn and grow, we help individuals build confidence, capability, and a brighter path forward.',
      image: '/images/wwd-section-3.webp',
    },
    {
      label: 'Caring for our planet',
      h3: 'Environmental sustainability',
      para1: 'Our responsibility extends beyond people to the planet we all share. Vagh Foundation embraces environmental initiatives that promote sustainability, conservation, and a deeper respect for nature.',
      para2: 'From encouraging greener practices to supporting a cleaner environment, we are committed to nurturing a world that remains healthy, vibrant, and abundant.',
      image: '/images/wwd-section-4.webp',
    },
    {
      label: 'Health & wellness support',
      h3: 'Caring for wellbeing',
      para1: 'Good health is the foundation of a fulfilling life. Vagh Foundation supports health and wellness initiatives that promote holistic wellbeing across communities.',
      image: '/images/wwd-section-5.webp',
    },
  ],
  emailSignup: {
    titleWithEm: 'Be part of the <em>work</em>',
    body: 'Your time and generosity help these initiatives reach further.',
  },
}
