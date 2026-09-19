export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs'
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'
export type Face = 'K' | 'Q' | 'J'

export interface Link {
  label: string
  href: string
}

/** An in-app link to another card or section. */
export interface InternalLink {
  label: string
  to: string
}

/** Everything a card can show: the face (title/subtitle/meta) and the back (body). */
export interface CardContent {
  slug: string
  title: string
  subtitle: string
  meta: string
  summary: string
  body: string[]
  tags: string[]
  links?: Link[]
}

export interface Highlight extends CardContent {
  kind: 'role' | 'project' | 'credential' | 'other'
  /** Small label in the top-right corner of the face, e.g. "Current". */
  corner?: string
  /** Where the fuller entry lives on the site. The card front stays short. */
  more?: InternalLink
}

export interface Experience extends CardContent {
  company: string
  role: string
  dates: string
  location: string
  /** The consulting org the engagement ran through. Kept separate from the client. */
  via?: string
  /** One line of context on the client or the engagement. */
  context?: string
}

export interface RoleStep {
  role: string
  dates: string
}

export interface Leadership extends CardContent {
  face: Face
  organization: string
  role: string
  dates: string
  location: string
  /** Titles held in the same org, newest first. */
  progression?: RoleStep[]
  /** Engagements in the spread that ran through this org. */
  related?: InternalLink[]
}

export interface Project extends CardContent {
  status: 'live' | 'shipped' | 'idea'
  year: string
  stack: string[]
  siteUrl?: string
  codeUrl?: string
  origin?: string
  ownership?: string
  usage?: string
  features?: string[]
  decisions?: string[]
  technical?: string[]
}

export interface Course {
  code: string
  name: string
  status: 'In progress' | 'Completed' | 'Transfer credit'
}

export interface Education {
  school: string
  degree: string
  dates: string
  expected: string
  location: string
  minors: string[]
  courseworkNote: string
  coursework: Course[]
}

export interface Certification {
  name: string
  issuer: string
  issued: string
  url: string
}

export interface SkillStack {
  id: string
  label: string
  /** Number of chips in the stack is the number of skills, capped in the UI. */
  skills: string[]
}

export interface PersonalEntry {
  name: string
  /** Brand, city, or country shown beside the name. */
  detail?: string
  address?: string
  /** What to order. Restaurants only. */
  pick?: string
  note: string
}

export interface PersonalCard extends CardContent {
  /** A first-person line that opens the category. */
  intro?: string
  entries: PersonalEntry[]
}

export interface Metric {
  value: string
  label: string
}
