import type { PersonalCard } from './types'

/** The flop: up to three community cards for life outside work. Ship what exists. */
export const personal: PersonalCard[] = [
  {
    slug: 'ranked-list',
    title: '[Mango Sticky Rice], Ranked',
    subtitle: 'A running list',
    meta: '[14] tasted · [6] cities',
    summary: '[One line on the thing you rank and why.]',
    body: [
      '01 — [Place One], [City] · [9.4]',
      '02 — [Place Two], [City] · [9.1]',
      '03 — [Place Three], [City] · [8.8]',
    ],
    tags: ['[Food]', '[Travel]'],
  },
  {
    slug: 'off-the-clock',
    title: '[Interest Two]',
    subtitle: 'Off the clock',
    meta: 'Since [YYYY]',
    summary: '[One line on it and why it stuck.]',
    body: ['[Two sentences on what it is and what it taught you.]'],
    tags: ['[Tag]'],
  },
]
