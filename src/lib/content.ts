/**
 * Every word of copy and all data. Bracketed text is placeholder structure
 * to be replaced with real content. Menu vocabulary is fixed: courses,
 * "View The Menu", "View The Full Plate", "Back To The Menu", Live / Soon,
 * "Ingredients Used", "Book A Table".
 */

export type Status = 'live' | 'soon'

export interface Site {
  name: string
  title: string
  city: string
  established: string
  currentCompany: string
  email: string
  linkedin: string
  github: string
  resume: string
}

export interface Stat {
  value: string
  label: string
}

export interface Course {
  id: 'starters' | 'mains' | 'sides' | 'specials' | 'chefs-table' | 'ingredients' | 'reservations'
  name: string
  sub: string
  heading: string
}

export interface Main {
  slug: string
  dates: string
  duration: string
  organization: string
  role: string
  bullets: string[]
  owned: string[]
  did: string[]
  cameOf: string[]
  ingredients: string[]
}

export interface Side {
  slug: string
  dates: string
  organization: string
  position: string
  bullets: string[]
  details: string[]
}

export interface Special {
  slug: string
  year: string
  status: Status
  name: string
  description: string
  tags: string[]
  situation: string[]
  ask: string[]
  how: string[]
  result: string[]
  stats: Stat[]
  ingredients: string[]
  siteUrl?: string
  codeUrl?: string
}

export interface RankedItem {
  rank: number
  name: string
  category: string
  location: string
  score: string
  url: string
  image: string
  note: string
}

export interface SkillCategory {
  number: string
  title: string
  skills: string[]
}

export interface ContactMethod {
  kind: 'email' | 'linkedin' | 'github' | 'resume'
  label: string
  value: string
  href: string
}

export const site: Site = {
  name: '[Your Name]',
  title: '[Your Title]',
  city: '[City, ST]',
  established: '[YYYY]',
  currentCompany: '[Company]',
  email: 'mailto:[you]@[domain].com',
  linkedin: 'https://www.linkedin.com/in/[your-handle]',
  github: 'https://github.com/[your-handle]',
  resume: '/[your-name]-resume.pdf',
}

export const tagline = 'A portfolio, plated like a menu.'

export const courses: Record<Course['id'], Course> = {
  starters: { id: 'starters', name: 'Starters', sub: 'About Me', heading: '' },
  mains: { id: 'mains', name: 'Mains', sub: 'Work Experience', heading: 'Where I’ve Cooked' },
  sides: { id: 'sides', name: 'Sides', sub: 'Leadership & Involvement', heading: 'Front Of House' },
  specials: { id: 'specials', name: 'Specials', sub: 'Projects', heading: 'Tonight’s Specials' },
  'chefs-table': {
    id: 'chefs-table',
    name: 'Chef’s Table',
    sub: 'Personal Interests',
    heading: 'A Little About Me, Ask Your Server',
  },
  ingredients: { id: 'ingredients', name: 'Ingredients', sub: 'Skills & Tools', heading: 'The Pantry' },
  reservations: { id: 'reservations', name: 'Reservations', sub: 'Get In Touch', heading: 'Book A Table' },
}

export const navCourses: Course['id'][] = [
  'starters',
  'mains',
  'sides',
  'specials',
  'chefs-table',
  'ingredients',
  'reservations',
]

export const headlineStats: Stat[] = [
  { value: '[3.9]', label: 'GPA' },
  { value: '[12]', label: 'Apps Shipped' },
  { value: '[4]', label: 'Years Of Experience' },
  { value: '[3]', label: 'Orgs Led' },
]

export const starters = {
  statement: '[One sentence on what you build and why it matters, stated plainly.]',
  paragraphs: [
    '[Two or three sentences on who you are, what you do now, and the kind of problems you like solving.]',
    '[Two sentences on how you work: what you value, what you optimize for, what you refuse to ship.]',
    '[One sentence on what you are looking for next.]',
  ],
  expertise: ['[Expertise One]', '[Expertise Two]', '[Expertise Three]', '[Expertise Four]', '[Expertise Five]'],
  now: [
    { label: 'Building', value: '[What you are building right now]' },
    { label: 'Reading', value: '[A book or paper]' },
    { label: 'Learning', value: '[A skill or tool]' },
  ],
  interests: ['[Interest One]', '[Interest Two]', '[Interest Three]', '[Interest Four]'],
  availability: 'Taking reservations for [Season YYYY]',
}

export const mains: Main[] = [
  {
    slug: 'role-one',
    dates: '[Mon YYYY] — Present',
    duration: '[N] yrs',
    organization: '[Company One]',
    role: '[Role One]',
    bullets: [
      '[A measured outcome, with the number: latency, revenue, adoption, cost.]',
      '[A concrete thing you built or changed, with the technology named.]',
      '[A cross-functional effort you led or unblocked.]',
    ],
    owned: [
      '[The system, product surface, or metric you were accountable for.]',
      '[The second thing you owned end to end.]',
    ],
    did: [
      '[A decision you made and what it traded off.]',
      '[A hard problem you debugged, migrated, or retired.]',
      '[A piece of tooling or documentation that outlived you.]',
    ],
    cameOf: [
      '[A second outcome the team or business noticed.]',
      '[What changed for the people who used it.]',
    ],
    ingredients: ['[Language]', '[Framework]', '[Database]', '[Cloud]', '[Tool]'],
  },
  {
    slug: 'role-two',
    dates: '[Mon YYYY] — [Mon YYYY]',
    duration: '[N] yrs',
    organization: '[Company Two]',
    role: '[Role Two]',
    bullets: [
      '[A measured outcome, with the number.]',
      '[A performance or reliability improvement and how you found it.]',
    ],
    owned: ['[The feature area or service you were accountable for.]'],
    did: [
      '[A concrete thing you shipped, with the technology named.]',
      '[Something you learned the hard way and fixed for everyone.]',
    ],
    cameOf: ['[What changed for the people who used it.]'],
    ingredients: ['[Language]', '[Framework]', '[Tool]'],
  },
]

export const sides: Side[] = [
  {
    slug: 'position-one',
    dates: '[Mon YYYY] — Present',
    organization: '[Organization One]',
    position: '[Position One]',
    bullets: ['[One line on what you led, ran, or grew, with a number if you have one.]'],
    details: ['[One more sentence on the scope and who it served.]'],
  },
  {
    slug: 'position-two',
    dates: '[Mon YYYY] — [Mon YYYY]',
    organization: '[Organization Two]',
    position: '[Position Two]',
    bullets: ['[One line on what you led, ran, or grew, with a number if you have one.]'],
    details: ['[One more sentence on the scope and who it served.]'],
  },
  {
    slug: 'position-three',
    dates: '[Mon YYYY] — [Mon YYYY]',
    organization: '[Organization Three]',
    position: '[Position Three]',
    bullets: ['[One line on what you led, ran, or grew, with a number if you have one.]'],
    details: ['[One more sentence on the scope and who it served.]'],
  },
]

export const specials: Special[] = [
  {
    slug: 'project-one',
    year: '[YYYY]',
    status: 'live',
    name: '[Project One]',
    description: '[One sentence on what it does and who it is for.]',
    tags: ['[Framework]', '[Language]', '[Database]'],
    situation: [
      '[Two or three sentences on the context: who had the problem, why it mattered, and what was already there.]',
    ],
    ask: ['[What you set out to deliver, stated in one plain sentence.]'],
    how: [
      '[The architecture or approach you chose and why.]',
      '[The hardest part and how you got through it.]',
      '[A tradeoff you made deliberately.]',
    ],
    result: ['[One or two sentences on what shipped and what happened after.]'],
    stats: [
      { value: '[42%]', label: '[Metric One]' },
      { value: '[3×]', label: '[Metric Two]' },
      { value: '[1,200]', label: '[Metric Three]' },
    ],
    ingredients: ['[Language]', '[Framework]', '[Database]', '[Hosting]', '[Tool]'],
    siteUrl: 'https://[project-one].example',
    codeUrl: 'https://github.com/[your-handle]/[project-one]',
  },
  {
    slug: 'project-two',
    year: '[YYYY]',
    status: 'live',
    name: '[Project Two]',
    description: '[One sentence on what it does and who it is for.]',
    tags: ['[Framework]', '[Language]', '[Platform]'],
    situation: [
      '[Two or three sentences on the context: who had the problem, why it mattered, and what was already there.]',
    ],
    ask: ['[What you set out to deliver, stated in one plain sentence.]'],
    how: [
      '[The architecture or approach you chose and why.]',
      '[The hardest part and how you got through it.]',
    ],
    result: ['[One or two sentences on what shipped and what happened after.]'],
    stats: [
      { value: '[850]', label: '[Metric One]' },
      { value: '[99.9%]', label: '[Metric Two]' },
    ],
    ingredients: ['[Language]', '[Framework]', '[Platform]', '[Tool]'],
    siteUrl: 'https://[project-two].example',
    codeUrl: 'https://github.com/[your-handle]/[project-two]',
  },
  {
    slug: 'project-three',
    year: '[YYYY]',
    status: 'soon',
    name: '[Project Three]',
    description: '[One sentence on what it will do and who it is for.]',
    tags: ['[Language]', '[Framework]', '[API]'],
    situation: [
      '[Two or three sentences on the context: who has the problem, why it matters, and what exists today.]',
    ],
    ask: ['[What you are building, stated in one plain sentence.]'],
    how: ['[The architecture or approach you are taking and why.]', '[The part you are working through now.]'],
    result: ['[Where it stands today and what ships next.]'],
    stats: [
      { value: '[Q4]', label: '[Target Launch]' },
      { value: '[12]', label: '[Metric Two]' },
    ],
    ingredients: ['[Language]', '[Framework]', '[API]', '[Tool]'],
    codeUrl: 'https://github.com/[your-handle]/[project-three]',
  },
]

export const chefsTable = {
  listTitle: '[Mango Sticky Rice], Ranked',
  description:
    '[One or two sentences on the thing you rank, why you started, and what a perfect one looks like.]',
  metrics: [
    { value: '[14]', label: 'Plates Tasted' },
    { value: '[6]', label: 'Cities' },
    { value: '[9.4]', label: 'Top Score' },
  ] as Stat[],
  items: [
    { rank: 1, name: '[Place One]', category: '[Cuisine]', location: '[City]', score: '[9.4]', url: 'https://[place-one].example', image: '/placeholder-card.svg', note: '[One line on why it is number one.]' },
    { rank: 2, name: '[Place Two]', category: '[Cuisine]', location: '[City]', score: '[9.1]', url: 'https://[place-two].example', image: '/placeholder-card.svg', note: '[One line on what stood out.]' },
    { rank: 3, name: '[Place Three]', category: '[Cuisine]', location: '[City]', score: '[8.8]', url: 'https://[place-three].example', image: '/placeholder-card.svg', note: '[One line on what stood out.]' },
    { rank: 4, name: '[Place Four]', category: '[Cuisine]', location: '[City]', score: '[8.5]', url: 'https://[place-four].example', image: '/placeholder-card.svg', note: '[One line on what stood out.]' },
    { rank: 5, name: '[Place Five]', category: '[Cuisine]', location: '[City]', score: '[8.2]', url: 'https://[place-five].example', image: '/placeholder-card.svg', note: '[One line on what stood out.]' },
    { rank: 6, name: '[Place Six]', category: '[Cuisine]', location: '[City]', score: '[7.9]', url: 'https://[place-six].example', image: '/placeholder-card.svg', note: '[One line on what stood out.]' },
  ] as RankedItem[],
}

export const skillCategories: SkillCategory[] = [
  {
    number: '01',
    title: 'Languages',
    skills: ['[Language One]', '[Language Two]', '[Language Three]', '[Language Four]'],
  },
  {
    number: '02',
    title: 'Frameworks',
    skills: ['[Framework One]', '[Framework Two]', '[Framework Three]', '[Library One]'],
  },
  {
    number: '03',
    title: 'Data & Infrastructure',
    skills: ['[Database One]', '[Database Two]', '[Cloud One]', '[Cloud Two]', '[Queue]', '[Tool One]', '[Tool Two]', '[Practice One]'],
  },
]

export const reservations = {
  availability:
    'Taking reservations for [Season YYYY]. Full-time, [City, ST] or remote. [One line on the kind of team you want to join.]',
  methods: [
    { kind: 'email', label: 'Email', value: '[you]@[domain].com', href: site.email },
    { kind: 'linkedin', label: 'LinkedIn', value: 'in/[your-handle]', href: site.linkedin },
    { kind: 'github', label: 'GitHub', value: '@[your-handle]', href: site.github },
    { kind: 'resume', label: 'Résumé', value: '[your-name]-resume.pdf', href: site.resume },
  ] as ContactMethod[],
}

export function findBySlug<T extends { slug: string }>(list: T[], slug: string | undefined) {
  return list.find((item) => item.slug === slug)
}

export function nextOf<T extends { slug: string }>(list: T[], slug: string) {
  const i = list.findIndex((item) => item.slug === slug)
  return list[(i + 1) % list.length]
}

export function pad(n: number) {
  return String(n).padStart(2, '0')
}
