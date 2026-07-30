import type { WhatWeDoPage } from './types'

export const whatWeDo: WhatWeDoPage = {
  header: {
    eyebrow: 'Our initiatives',
    h1Marked: 'Turning compassion into <mark>meaningful action</mark>.',
    lede: 'Our work spans several interconnected causes, each rooted in the belief that wellbeing is holistic. We nourish, we support, we empower, and we protect.',
    image: '/images/wwd-hero.png',
  },
  initiatives: [
    {
      label: 'Nourishment for all',
      h3: 'Food distribution initiatives',
      para1: 'Hunger knows no boundaries, and neither does our commitment to addressing it. Vagh Foundation organizes food distribution initiatives at various locations, bringing wholesome meals and essential provisions to those in need.',
      para2: 'Whether responding to everyday needs or coming together during special occasions, we believe sharing a meal is one of the purest expressions of humanity.',
      image: '/images/wwd-nourishment.png',
    },
    {
      label: 'Peace of mind & inner wellbeing',
      h3: 'Supporting spaces for reflection and calm',
      para1: 'In a fast-paced world, the need for stillness and mental clarity has never been greater. Vagh Foundation supports centres and spaces dedicated to inner wellbeing, self-reflection, and mental peace.',
      para2: 'By helping sustain these environments of tranquility, we enable more people to experience the profound benefits of calm, mindfulness, and personal renewal.',
      image: '/images/wwd-peace.png',
    },
    {
      label: 'Empowering through learning',
      h3: 'Nurturing knowledge and growth',
      para1: 'We believe knowledge is one of the greatest gifts one can offer. Vagh Foundation supports learning and skill-development initiatives that open doors of opportunity for curious and eager minds.',
      para2: 'By encouraging access to knowledge and fostering environments where people can learn and grow, we help individuals build confidence, capability, and a brighter path forward.',
      image: '/images/wwd-learning.png',
    },
    {
      label: 'Caring for our planet',
      h3: 'Environmental sustainability',
      para1: 'Our responsibility extends beyond people to the planet we all share. Vagh Foundation embraces environmental initiatives that promote sustainability, conservation, and a deeper respect for nature.',
      para2: 'From encouraging greener practices to supporting a cleaner environment, we are committed to nurturing a world that remains healthy, vibrant, and abundant.',
      image: '/images/wwd-planet.png',
    },
    {
      label: 'Health & wellness support',
      h3: 'Caring for wellbeing',
      para1: 'Good health is the foundation of a fulfilling life. Vagh Foundation supports health and wellness initiatives that promote holistic wellbeing across communities.',
      image: '/images/wwd-health.png',
    },
  ],
  emailSignup: {
    titleWithEm: 'Be part of the <em>work</em>',
    body: 'Your time and generosity help these initiatives reach further.',
  },
}
