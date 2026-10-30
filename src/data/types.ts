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
  shots?: Shot[]
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

/** A screenshot on a project's or role's page, taken from the live product. */
export interface Shot {
  src: string
  alt: string
  caption: string
}

export interface Project extends CardContent {
  status: 'live' | 'shipped' | 'idea'
  stack: string[]
  siteUrl?: string
  codeUrl?: string
  origin?: string
  ownership?: string
  usage?: string
  shots?: Shot[]
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
  /** His Beli score out of 10, for a ranked card. */
  score?: number
  note: string
  /** Latitude and longitude, for a card laid out as a map. */
  at?: [number, number]
  /** The country's flag, shown in the place's bubble on the map. */
  flag?: string
  /** A film's poster, 2:3, in public/posters/. */
  poster?: string
  /** A fragrance's bottle, photographed and cut out, in public/fragrances/. */
  photo?: string
  /** Frame an uncropped source photograph without changing its pixels. */
  photoFrame?: { width: number; height: number; viewBox: string }
  /** Approximate bottle height, used only for the shelf's visual proportions. */
  cm?: number
}

export interface PersonalCard extends CardContent {
  /** A first-person line that opens the category. */
  intro?: string
  /** A closing line on the back naming what the layout borrows from. */
  inspiredBy?: string
  /** How the back lays out the entries: a numbered list (default), a ranked list with scores, a row of posters, a shelf of bottles, or a map. */
  view?: 'list' | 'ranked' | 'posters' | 'shelf' | 'map'
  entries: PersonalEntry[]
}

export interface Metric {
  value: string
  label: string
  /** Shown live: the figure is replaced by Cambio's current player count, and `value` is the fallback. */
  live?: 'cambioPlayers'
}
