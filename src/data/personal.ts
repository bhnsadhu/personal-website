import type { PersonalCard } from './types'

/** Opens the flop. First person. */
export const personalIntro =
  'A few things I keep coming back to: a good meal, a new fragrance, a film that stays with me, and somewhere new to explore.'

/** The compact line under the table. */
export const personalExtras = ['Card games', 'Cooking', 'Fitness', 'Badminton', 'Indian music']

/**
 * The flop: four community cards, five favorites each. Favorite Tables is
 * ranked, in order, with his own Beli scores; the rest are favorites, not
 * rankings. No visit counts or photos.
 */
export const personal: PersonalCard[] = [
  {
    slug: 'favorite-tables',
    title: 'Favorite Tables',
    subtitle: 'Five favorites right now.',
    meta: 'Current top five',
    summary: 'Five favorites right now.',
    view: 'ranked',
    intro:
      "I love food and cooking, and I’ll try just about anything once. Wherever I go, I look for local favorites and the dishes a place is known for. Even a bad review makes me curious enough to try something for myself.\n\nI see cooking as an art, and a restaurant’s atmosphere is part of the experience. I love using Beli to keep track of my favorites, which inspired this list. Here are five I’m loving right now.",
    body: [],
    tags: ['Food'],
    inspiredBy: 'Inspired by Beli, one of my favorite products.',
    entries: [
      {
        name: "Nando's PERi-PERi",
        detail: 'Oak Brook, IL',
        address: '523 Oakbrook Center, Oak Brook, IL 60523',
        pick: 'PERi-PERi chicken and PERi-PERi Saka sauce',
        score: 10,
        note: 'My current number one. I love the chicken, and the PERi-PERi Saka sauce is a big part of why I keep thinking about it.',
      },
      {
        name: 'Tacoria',
        detail: 'Princeton, NJ',
        address: '110 Nassau Street, Princeton, NJ 08542',
        pick: 'Chicken bowl with chipotle sauce',
        score: 9.9,
        note: 'One of my favorite chicken bowls, especially with the chipotle sauce. I went with friends over the summer, which made it one of those meals I remember for more than just the food.',
      },
      {
        name: 'Sushi Edo',
        detail: 'Rolling Meadows, IL',
        address: '1673 Algonquin Road, Rolling Meadows, IL 60008',
        pick: 'The sushi, across the board',
        score: 9.7,
        note: "A favorite for the quality of the sushi. I try to go with my brother whenever I'm back home.",
      },
      {
        name: 'Chi Tea',
        detail: 'Lombard, IL',
        address: '413 E Roosevelt Road, Lombard, IL 60148',
        pick: 'Chicken sandwich',
        score: 9.6,
        note: 'This was near where I worked over the summer, and the chicken sandwich became a regular stop. Really satisfying and consistently good.',
      },
      {
        name: 'Indian Bistro',
        detail: 'Palatine, IL',
        address: '732 E Dundee Road, Palatine, IL 60074',
        pick: 'Butter chicken and paneer paratha',
        score: 9.5,
        note: "A favorite close to home. My mom didn't cook meat at home growing up, so eating it outside was a treat. Butter chicken and paneer paratha are my picks here.",
      },
    ],
  },
  {
    slug: 'fragrance-shelf',
    title: 'Fragrance Shelf',
    subtitle: 'A few favorites in rotation.',
    meta: 'In rotation',
    summary: 'A few favorites in rotation.',
    view: 'shelf',
    inspiredBy: 'Inspired by my fragrance shelf at home.',
    intro:
      "I love all things fragrance, from trying something new to appreciating the art behind a scent. What I wear changes with the day, the occasion, and my mood. These are a few favorites in my rotation right now.",
    body: [],
    tags: ['Fragrance'],
    entries: [
      {
        name: 'Stronger With You Intensely',
        detail: 'Emporio Armani',
        photo: '/fragrances/stronger-with-you.webp',
        cm: 12.5,
        note: 'Probably my favorite fragrance ever. I love the warmth of the vanilla and chestnut, with a little peppery spice to balance it out. It has that comforting, familiar smell I keep coming back to.',
      },
      {
        name: 'Santal 33',
        detail: 'Le Labo',
        photo: '/fragrances/santal-33.png',
        photoFrame: { width: 600, height: 600, viewBox: '188 42 242 492' },
        cm: 12,
        note: 'I love the dry sandalwood and cedar, with a little cardamom and that smoky, leathery edge. There’s a lot going on, but it all feels easy together. I reach for it when I’m in the mood for something woody.',
      },
      {
        name: 'Cypress & Grapevine',
        detail: 'Jo Malone London',
        photo: '/fragrances/cypress-grapevine.png',
        cm: 14,
        note: 'The fresh, green cypress is what draws me in, and I love the warmer woods and earthy moss underneath. It feels like a change of pace in my collection: fresh, but with some depth to it.',
      },
      {
        name: 'Ombré Leather',
        detail: 'Tom Ford',
        photo: '/fragrances/ombre-leather.png',
        photoFrame: { width: 600, height: 600, viewBox: '140 56 320 487' },
        cm: 11,
        note: 'I love how the leather stands out, then softens with jasmine and warm amber. It has a bold character without feeling rough. This is the one I reach for when I want something with a little more presence.',
      },
      {
        name: 'Coffee & Whiskey',
        detail: 'Bath & Body Works',
        photo: '/fragrances/coffee-whiskey.webp',
        cm: 15.5,
        note: 'Bath & Body Works is what first got me into fragrances, so this one has a special place on my shelf. I love the mix of whiskey, vanilla, and a hint of coffee. It’s warm, familiar, and a reminder of where this interest started.',
      },
    ],
  },
  {
    slug: 'indian-cinema',
    title: 'Indian Cinema',
    subtitle: 'Films I carry with me.',
    meta: 'Five favorites',
    summary: 'Films I carry with me.',
    view: 'posters',
    inspiredBy: 'Inspired by Letterboxd, one of my favorite products.',
    intro:
      "I grew up loving movies. They connected me to my language and culture, kept me close to my roots, and sparked my love for dance. I love how each director and actor can build a different world, bring out a different emotion, and leave you with something to think about.\n\nVijay is my all-time favorite actor. I grew up watching him and found so much inspiration in his films. He’s since become Tamil Nadu’s chief minister, but I still love returning to the movies that made me a fan.\n\nHere are a few of my favorite Indian films.",
    body: [],
    tags: ['Film'],
    entries: [
      {
        name: 'Velaiilla Pattadhari',
        detail: '2014',
        poster: '/posters/vip.jpg',
        note: "The story of an unemployed graduate finding his direction really stayed with me. It's a reminder that feeling stuck doesn't mean that's where your story ends.",
      },
      {
        name: 'Mersal',
        detail: '2017',
        poster: '/posters/mersal.jpg',
        note: 'One of my favorite Vijay films. I love the range of his performance and the way the story brings in a message about healthcare.',
      },
      {
        name: 'Leo',
        detail: '2023',
        poster: '/posters/leo.jpg',
        note: 'I like the tension between the life someone builds and the past that follows them. It makes the consequences of earlier choices feel very real.',
      },
      {
        name: 'Vishwanath and Sons',
        detail: '2026',
        poster: '/posters/vishwanath-and-sons.jpg',
        note: 'A recent favorite I watched with my family. Warm, funny, and the kind of film that becomes a good memory because of who you watched it with.',
      },
      {
        name: 'Ghajini',
        detail: '2005',
        poster: '/posters/ghajini.jpg',
        note: "I love the direction and the way memory and the character's past shape the story. Watching the pieces come together is a big part of what makes it memorable for me.",
      },
    ],
  },
  {
    slug: 'places',
    title: 'Places I Keep Thinking About',
    subtitle: 'Five places that stayed with me.',
    meta: 'Five favorites',
    summary: 'Five places that stayed with me.',
    view: 'map',
    intro:
      "I love traveling, exploring somewhere new, and finding places I want to return to. Some of these favorites go back to childhood; others are more recent. The food, scenery, and people I’ve shared a trip with all stay with me. Here are five places I’ve loved so far, with plenty more I hope to explore.",
    inspiredBy: 'Inspired by a dotted world map.',
    body: [],
    tags: ['Travel'],
    entries: [
      {
        name: 'Sydney',
        detail: 'Australia',
        at: [-33.87, 151.21],
        flag: '🇦🇺',
        note: "Beautiful views and weather I really enjoyed when I visited. Sydney is one of those places I'd happily spend more time exploring.",
      },
      {
        name: 'Cancún',
        detail: 'Mexico',
        at: [21.16, -86.85],
        flag: '🇲🇽',
        note: 'One of the first trips I remember taking as a kid. I went with my family and cousins, and it was so much fun.',
      },
      {
        name: 'Barcelona',
        detail: 'Spain',
        at: [41.39, 2.17],
        flag: '🇪🇸',
        note: 'The Sagrada Família was incredible, and I had some of the best pastries and food of the trip.',
      },
      {
        name: 'Hyderabad',
        detail: 'India',
        at: [17.39, 78.49],
        flag: '🇮🇳',
        note: 'Where my roots are. Going back means something different from visiting anywhere else.',
      },
      {
        name: 'Banff',
        detail: 'Canada',
        at: [51.18, -115.57],
        flag: '🇨🇦',
        note: 'I went with family friends, and spending time together made it especially fun.',
      },
    ],
  },
]
