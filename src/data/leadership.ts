import type { Leadership } from './types'

/**
 * Face cards: leadership and officer roles only. Capped at three (K, Q, J)
 * to keep the metaphor honest. A fourth belongs in `experience.ts`.
 */
export const leadership: Leadership[] = [
  {
    face: 'K',
    slug: 'leadership-one',
    organization: '[Organization One]',
    role: '[President / Lead]',
    dates: '[Mon YYYY] — Present',
    title: '[President / Lead]',
    subtitle: '[Organization One]',
    meta: '[Mon YYYY] — Present',
    summary: '[One line on what you led and how big it was.]',
    body: [
      '[What you ran, grew, or started, with a number if you have one.]',
      '[The hardest people problem you handled and what came of it.]',
    ],
    tags: ['[Leadership]', '[Operations]'],
  },
  {
    face: 'Q',
    slug: 'leadership-two',
    organization: '[Organization Two]',
    role: '[Vice President / Officer]',
    dates: '[Mon YYYY] — [Mon YYYY]',
    title: '[Vice President / Officer]',
    subtitle: '[Organization Two]',
    meta: '[Mon YYYY] — [Mon YYYY]',
    summary: '[One line on what you led and how big it was.]',
    body: ['[What you ran, grew, or started, with a number if you have one.]'],
    tags: ['[Leadership]'],
  },
  {
    face: 'J',
    slug: 'leadership-three',
    organization: '[Organization Three]',
    role: '[Director / Chair]',
    dates: '[Mon YYYY] — [Mon YYYY]',
    title: '[Director / Chair]',
    subtitle: '[Organization Three]',
    meta: '[Mon YYYY] — [Mon YYYY]',
    summary: '[One line on what you led and how big it was.]',
    body: ['[What you ran, grew, or started, with a number if you have one.]'],
    tags: ['[Leadership]'],
  },
]

export const LEADERSHIP_CAP = 3
