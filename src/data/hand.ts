import { education } from './education'
import { moreLabel } from './site'
import type { Highlight } from './types'

/**
 * The hero hand: four top highlights, dealt as the four aces. Each card
 * stays short and links to its fuller entry elsewhere on the site.
 */
export const hand: Highlight[] = [
  {
    kind: 'role',
    slug: 'replit',
    corner: 'Current',
    title: 'Replit',
    subtitle: 'Product Strategy Consultant',
    meta: 'Aug 2026 — Present',
    summary: 'Exploring AI literacy and campus adoption of Replit Agent across 4+ UIUC colleges.',
    body: ['Developing assessments to measure adoption before and after each workshop.'],
    tags: ['Product Strategy', 'User Research', 'AI Adoption'],
    more: { label: moreLabel.experience, to: '/experience/replit' },
  },
  {
    kind: 'project',
    slug: 'cambio',
    corner: 'Live',
    title: 'Cambio',
    subtitle: 'Solo Creator & Developer',
    meta: 'Sept 2026 · Live',
    summary: 'A multiplayer card game I built so friends can play anywhere, even when nobody has a deck.',
    body: ['Early testing with approximately 18 players, primarily friends.'],
    tags: ['Product Development', 'Multiplayer', 'TypeScript'],
    links: [{ label: 'Live Demo', href: 'https://cambio.bhanusadhu.com' }],
    more: { label: moreLabel.project, to: '/projects/cambio' },
  },
  {
    kind: 'credential',
    slug: 'education',
    corner: 'Education',
    title: 'Computer Science + Economics',
    subtitle: education.school,
    meta: education.dates,
    summary: `${education.degree}. ${education.expected}. Declared minors in ${education.minors.join(' and ')}.`,
    body: [education.courseworkNote, ...education.coursework.map((c) => `${c.code} ${c.name} · ${c.status}`)],
    tags: ['Computer Science', 'Economics', 'Statistics minor', 'Advertising minor'],
  },
  {
    kind: 'other',
    slug: 'community',
    corner: 'Community',
    title: 'Bringing people together',
    subtitle: 'Indian Student Association · Director of Cultural Events',
    meta: 'Aug 2025 — Present',
    summary:
      'Creating opportunities to connect through South Asian cultural events, from Unity Week to Diwali Night and India Night.',
    body: [],
    tags: ['Community', 'Event Production', 'Leadership'],
    more: { label: 'See the face cards', to: '/#face' },
  },
]
