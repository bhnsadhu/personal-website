export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs'
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'
export type Face = 'K' | 'Q' | 'J'

export interface Link {
  label: string
  href: string
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
}

export interface Experience extends CardContent {
  company: string
  role: string
  dates: string
  location: string
}

export interface Leadership extends CardContent {
  face: Face
  organization: string
  role: string
  dates: string
}

export interface Project extends CardContent {
  status: 'live' | 'shipped' | 'idea'
  year: string
  stack: string[]
  siteUrl?: string
  codeUrl?: string
}

export interface SkillStack {
  id: string
  label: string
  /** Number of chips in the stack is the number of skills, capped in the UI. */
  skills: string[]
}

export type PersonalCard = CardContent

export interface Metric {
  value: string
  label: string
}
