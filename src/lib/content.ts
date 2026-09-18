/**
 * All site copy lives here. Everything in [brackets] is placeholder
 * structure to be replaced with real content. Menu vocabulary
 * (course names, "View", "Live" / "Soon", "Ingredients") is fixed.
 */

export type Status = 'live' | 'soon'

export interface Site {
  name: string
  tagline: string
  email: string
  linkedin: string
  github: string
  resume: string
}

export interface CourseMeta {
  name: string
  sub: string
}

export interface Fact {
  label: string
  value: string
}

export interface Starter {
  title: string
  description: string
  heading: string
  subtitle: string
  paragraphs: string[]
  facts: Fact[]
}

export interface Main {
  slug: string
  role: string
  company: string
  location: string
  dates: string
  summary: string
  owned: string[]
  did: string[]
  cameOf: string[]
  ingredients: string[]
}

export interface Side {
  slug: string
  position: string
  organization: string
  dates: string
  paragraphs: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Special {
  slug: string
  name: string
  description: string
  status: Status
  stack: string[]
  situation: string[]
  ask: string[]
  how: string[]
  result: string[]
  stats: Stat[]
  ingredients: string[]
  siteUrl?: string
  codeUrl?: string
}

export interface Interest {
  title: string
  text: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const site: Site = {
  name: '[Your Name]',
  tagline: 'A portfolio, plated like a menu.',
  email: 'mailto:[you]@[domain].com',
  linkedin: 'https://www.linkedin.com/in/[your-handle]',
  github: 'https://github.com/[your-handle]',
  resume: '/[your-name]-resume.pdf',
}

export const courses = {
  starters: { name: 'Starters', sub: 'About Me' },
  mains: { name: 'Mains', sub: 'Work Experience' },
  sides: { name: 'Sides', sub: 'Leadership & Involvement' },
  specials: { name: 'Specials', sub: 'Projects' },
  chefsTable: { name: 'Chef’s Table', sub: 'Personal Interests' },
  ingredients: { name: 'Ingredients', sub: 'Skills & Tools' },
} satisfies Record<string, CourseMeta>

export const starter: Starter = {
  title: '[Bio / About]',
  description: '[One-Line Description]',
  heading: '[Your Name]',
  subtitle: '[Your Title] · [City, ST]',
  paragraphs: [
    '[Two sentences on what you do and the kind of problems you like solving. Keep it plain and specific.]',
    '[One sentence on how you work: what you value, what you optimize for, what you refuse to ship.]',
    '[One sentence on what you are looking for next.]',
  ],
  facts: [
    { label: 'Currently', value: '[Role] at [Company]' },
    { label: 'Previously', value: '[Company], [Company]' },
    { label: 'Educated At', value: '[University], [Degree]' },
    { label: 'Based In', value: '[City, ST]' },
  ],
}

export const mains: Main[] = [
  {
    slug: 'role-one',
    role: '[Role One]',
    company: '[Company One]',
    location: '[City, ST]',
    dates: '[Mon YYYY] – Present',
    summary: '[One line on the scope of the role and the team it sat on.]',
    owned: [
      '[The system, product surface, or metric you were accountable for.]',
      '[The second thing you owned end to end.]',
      '[The team, process, or relationship you were responsible for.]',
    ],
    did: [
      '[A concrete thing you built or changed, with the technology named.]',
      '[A decision you made and what it traded off.]',
      '[A cross-functional effort you led or unblocked.]',
      '[A hard problem you debugged, migrated, or retired.]',
    ],
    cameOf: [
      '[A measured outcome, with the number: latency, revenue, adoption, cost.]',
      '[A second outcome the team or business noticed.]',
      '[What changed for the people who used it.]',
    ],
    ingredients: ['[Language]', '[Framework]', '[Database]', '[Cloud]', '[Tool]'],
  },
  {
    slug: 'role-two',
    role: '[Role Two]',
    company: '[Company Two]',
    location: '[City, ST]',
    dates: '[Mon YYYY] – [Mon YYYY]',
    summary: '[One line on the scope of the role and the team it sat on.]',
    owned: [
      '[The feature area or service you were accountable for.]',
      '[The second thing you owned.]',
      '[The on-call, quality, or delivery responsibility you held.]',
    ],
    did: [
      '[A concrete thing you shipped, with the technology named.]',
      '[A performance or reliability improvement and how you found it.]',
      '[A piece of tooling or documentation that outlived you.]',
    ],
    cameOf: [
      '[A measured outcome, with the number.]',
      '[A second outcome the team or business noticed.]',
      '[What changed for the people who used it.]',
    ],
    ingredients: ['[Language]', '[Framework]', '[Database]', '[Tool]'],
  },
]

export const sides: Side[] = [
  {
    slug: 'position-one',
    position: '[Position One]',
    organization: '[Organization One]',
    dates: '[Mon YYYY] – Present',
    paragraphs: [
      '[Two sentences on what the organization does and what you are responsible for in it.]',
      '[One sentence on a specific thing you led, ran, or grew, with a number if you have one.]',
    ],
  },
  {
    slug: 'position-two',
    position: '[Position Two]',
    organization: '[Organization Two]',
    dates: '[Mon YYYY] – [Mon YYYY]',
    paragraphs: [
      '[Two sentences on what the organization does and what you were responsible for in it.]',
      '[One sentence on a specific thing you led, ran, or grew, with a number if you have one.]',
    ],
  },
  {
    slug: 'position-three',
    position: '[Position Three]',
    organization: '[Organization Three]',
    dates: '[Mon YYYY] – [Mon YYYY]',
    paragraphs: [
      '[Two sentences on what the organization does and what you were responsible for in it.]',
      '[One sentence on a specific thing you led, ran, or grew, with a number if you have one.]',
    ],
  },
]

export const specials: Special[] = [
  {
    slug: 'project-one',
    name: '[Project One]',
    description: '[One-Line Description]',
    status: 'live',
    stack: ['[Framework]', '[Language]', '[Database]'],
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
    name: '[Project Two]',
    description: '[One-Line Description]',
    status: 'soon',
    stack: ['[Framework]', '[Language]', '[Platform]'],
    situation: [
      '[Two or three sentences on the context: who has the problem, why it matters, and what exists today.]',
    ],
    ask: ['[What you are building, stated in one plain sentence.]'],
    how: [
      '[The architecture or approach you are taking and why.]',
      '[The part you are working through now.]',
      '[A tradeoff you have already made.]',
    ],
    result: ['[Where it stands today and what ships next.]'],
    stats: [
      { value: '[Q4]', label: '[Target Launch]' },
      { value: '[12]', label: '[Metric Two]' },
    ],
    ingredients: ['[Language]', '[Framework]', '[Platform]', '[Tool]'],
    codeUrl: 'https://github.com/[your-handle]/[project-two]',
  },
]

export const chefsTable = {
  title: 'Interests',
  description: 'A Little About Me, Ask Your Server',
  heading: 'Off The Clock',
}

export const interests: Interest[] = [
  { title: '[Interest One]', text: '[One sentence on it and why it stuck.]' },
  { title: '[Interest Two]', text: '[One sentence on it and why it stuck.]' },
  { title: '[Interest Three]', text: '[One sentence on it and why it stuck.]' },
  { title: '[Interest Four]', text: '[One sentence on it and why it stuck.]' },
]

/* Skill tags render inside typographic brackets, so the data itself is unbracketed. */
export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Language One', 'Language Two', 'Language Three', 'Language Four'],
  },
  {
    label: 'Frameworks',
    items: ['Framework One', 'Framework Two', 'Framework Three', 'Library One'],
  },
  {
    label: 'Data & Infrastructure',
    items: ['Database One', 'Database Two', 'Cloud One', 'Cloud Two', 'Queue'],
  },
  {
    label: 'Tools & Practices',
    items: ['Tool One', 'Tool Two', 'Tool Three', 'Practice One', 'Practice Two'],
  },
]

/** The tags shown on the single collapsed line of the Ingredients course. */
export const skillHighlights: string[] = [
  'Language One',
  'Framework One',
  'Language Two',
  'Database One',
  'Cloud One',
  'Framework Two',
  'Tool One',
  'Language Three',
  'Practice One',
]

export function findBySlug<T extends { slug: string }>(list: T[], slug: string | undefined) {
  return list.find((item) => item.slug === slug)
}

export function nextOf<T extends { slug: string }>(list: T[], slug: string) {
  const i = list.findIndex((item) => item.slug === slug)
  return list[(i + 1) % list.length]
}
