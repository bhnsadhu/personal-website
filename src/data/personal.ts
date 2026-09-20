import type { PersonalCard } from './types'

/** Opens the flop. First person. */
export const personalIntro =
  'A few things I keep coming back to: a good meal, a sweet fragrance, a film that stays with me, and somewhere new to explore.'

/** The line beside the flop's title. */
export const personalNote = 'A few current favorites.'

/** The compact line under the table. */
export const personalExtras = ['Card games', 'Cooking', 'Fitness', 'Badminton', 'Indian music']

/**
 * The flop: four community cards, five favorites each. Favorites, not
 * rankings; no ratings, visit counts, or photos.
 */
export const personal: PersonalCard[] = [
  {
    slug: 'favorite-tables',
    title: 'Favorite Tables',
    subtitle: "Five places I'd happily eat at again.",
    meta: 'Five favorites',
    summary: "Five places I'd happily eat at again.",
    body: [],
    tags: ['Food'],
    entries: [
      {
        name: "Nando's PERi-PERi",
        detail: 'Oak Brook, IL',
        address: '523 Oakbrook Center, Oak Brook, IL 60523',
        pick: 'PERi-PERi chicken and PERi-PERi Saka sauce',
        note: 'My all-time favorite. I love the chicken, and the PERi-PERi Saka sauce is a big part of why I keep thinking about it.',
      },
      {
        name: 'Tacoria',
        detail: 'Princeton, NJ',
        address: '110 Nassau Street, Princeton, NJ 08542',
        pick: 'Chicken bowl with chipotle sauce',
        note: 'One of my favorite chicken bowls, especially with the chipotle sauce. I went with friends over the summer, which made it one of those meals I remember for more than just the food.',
      },
      {
        name: 'Sushi Edo',
        detail: 'Rolling Meadows, IL',
        address: '1673 Algonquin Road, Rolling Meadows, IL 60008',
        pick: 'The sushi, across the board',
        note: "A favorite for the quality of the sushi. I try to go with my brother whenever I'm back home.",
      },
      {
        name: 'Chi Tea',
        detail: 'Lombard, IL',
        address: '413 E Roosevelt Road, Lombard, IL 60148',
        pick: 'Chicken sandwich',
        note: 'This was near where I worked over the summer, and the chicken sandwich became a regular stop. Really satisfying and consistently good.',
      },
      {
        name: 'Indian Bistro',
        detail: 'Palatine, IL',
        address: '732 E Dundee Road, Palatine, IL 60074',
        pick: 'Butter chicken and paneer paratha',
        note: "A favorite close to home. My mom didn't cook meat at home growing up, so eating it outside was a treat. Butter chicken and paneer paratha are my picks here.",
      },
    ],
  },
  {
    slug: 'fragrance-shelf',
    title: 'Fragrance Shelf',
    subtitle: 'A clear preference for sweet.',
    meta: 'Five favorites',
    summary: 'A clear preference for sweet.',
    intro:
      "I tend to gravitate toward sweet, warm fragrances, especially vanilla. Looking at this list, I guess I'm just a sweet guy.",
    body: [],
    tags: ['Fragrance'],
    entries: [
      {
        name: 'Stronger With You Intensely',
        detail: 'Emporio Armani',
        note: 'My favorite. Sweet, warm, and especially meaningful because my uncle gave it to me when I graduated.',
      },
      {
        name: 'Bianco Latte',
        detail: 'Giardini di Toscana',
        note: 'One of the first fragrances I bought with my own money. I love its rich, sweet vanilla character.',
      },
      {
        name: 'The Most Wanted Eau de Parfum Intense',
        detail: 'Azzaro',
        note: 'Warm, sweet, and one I keep coming back to.',
      },
      {
        name: 'Vanille Supermassive',
        detail: 'Les Eaux Primordiales',
        note: 'One of the most distinctive fragrances I own. I picked it up on a trip to Poland, so it carries a travel memory too.',
      },
      {
        name: 'Coffee & Whiskey',
        detail: 'Bath & Body Works',
        note: 'The fragrance that got me interested in collecting. It still has a place on this list because it started the whole thing.',
      },
    ],
  },
  {
    slug: 'indian-cinema',
    title: 'Indian Cinema',
    subtitle: 'Films I carry with me.',
    meta: 'Five favorites',
    summary: 'Films I carry with me.',
    intro:
      "Vijay was a huge part of what I watched growing up, and he's still one of my favorite actors. I love films that leave me thinking about the characters, the choices they make, or a moment I shared watching with family.",
    body: [],
    tags: ['Film'],
    entries: [
      {
        name: 'Velaiilla Pattadhari (VIP)',
        note: "The story of an unemployed graduate finding his direction really stayed with me. It's a reminder that feeling stuck doesn't mean that's where your story ends.",
      },
      {
        name: 'Mersal',
        note: 'One of my favorite Vijay films. I love the range of his performance and the way the story brings in a message about healthcare.',
      },
      {
        name: 'Leo',
        note: 'I like the tension between the life someone builds and the past that follows them. It makes the consequences of earlier choices feel very real.',
      },
      {
        name: 'Vishwanath and Sons',
        note: 'A recent favorite I watched with my family. Warm, funny, and the kind of film that becomes a good memory because of who you watched it with.',
      },
      {
        name: 'Ghajini',
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
    body: [],
    tags: ['Travel'],
    entries: [
      {
        name: 'Sydney',
        detail: 'Australia',
        note: "Beautiful views and weather I really enjoyed when I visited. Sydney is one of those places I'd happily spend more time exploring.",
      },
      {
        name: 'Paris',
        detail: 'France',
        note: 'Seeing the Eiffel Tower, enjoying the food, and taking in the city made this a favorite.',
      },
      {
        name: 'Barcelona',
        detail: 'Spain',
        note: 'The Sagrada Família was incredible, and I had some of the best pastries and food of the trip.',
      },
      {
        name: 'Hyderabad',
        detail: 'India',
        note: 'Where my roots are. Going back means something different from visiting anywhere else.',
      },
      {
        name: 'Banff',
        detail: 'Canada',
        note: 'I went with family friends, and spending time together made it especially fun.',
      },
    ],
  },
]
