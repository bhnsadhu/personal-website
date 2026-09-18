import type { Highlight } from './types'

/** The hero hand: four top highlights, dealt as the four aces. */
export const hand: Highlight[] = [
  {
    kind: 'role',
    slug: 'current-role',
    title: '[Role] at [Company]',
    subtitle: 'Current role',
    meta: '[Mon YYYY] — Present',
    summary: '[One line on what you own there.]',
    body: [
      '[What you are accountable for and the size of it: users, revenue, systems, people.]',
      '[The one thing you shipped there that you would lead with in an interview.]',
    ],
    tags: ['[Domain]', '[Skill One]', '[Skill Two]'],
  },
  {
    kind: 'project',
    slug: 'flagship-project',
    title: '[Flagship Project]',
    subtitle: 'Flagship project',
    meta: '[YYYY] · Live',
    summary: '[One line on what it does and who uses it.]',
    body: [
      '[Why it exists, what you built, and the number that proves it worked.]',
    ],
    tags: ['[Framework]', '[Language]', '[Platform]'],
    links: [{ label: 'Visit the site', href: 'https://[flagship].example' }],
  },
  {
    kind: 'credential',
    slug: 'credential',
    title: '[Degree], [University]',
    subtitle: 'Credential',
    meta: 'Class of [YYYY] · [GPA] GPA',
    summary: '[Major, minor, or the thing you actually studied.]',
    body: [
      '[Honors, thesis, or the coursework that shaped how you work.]',
    ],
    tags: ['[Major]', '[Minor]'],
  },
  {
    kind: 'other',
    slug: 'one-more',
    title: '[One More Highlight]',
    subtitle: 'Wild card',
    meta: '[YYYY]',
    summary: '[An award, a talk, a launch, a number worth bragging about.]',
    body: [
      '[Two sentences on why this one matters to the kind of team you want to join.]',
    ],
    tags: ['[Tag]'],
  },
]
