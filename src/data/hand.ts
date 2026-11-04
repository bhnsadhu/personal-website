import { education } from './education'
import { experience } from './experience'
import { projects } from './projects'
import { SEP } from '../lib/sep'
import { moreLabel } from './site'
import type { Highlight } from './types'

/**
 * The hero hand: four top highlights, dealt as the four aces. Each card
 * stays short and links to its fuller entry elsewhere on the site.
 */
/** A project's Live Demo and Repository links, side by side, from its entry in projects.ts. */
function projectLinks(slug: string) {
  const p = projects.find((x) => x.slug === slug)
  return [
    ...(p?.siteUrl ? [{ label: 'Live Demo', href: p.siteUrl }] : []),
    ...(p?.codeUrl ? [{ label: 'Repository', href: p.codeUrl }] : []),
  ]
}

/** A role's links, from its entry in experience.ts, so the ace and the spread card cannot drift. */
function experienceLinks(slug: string) {
  return experience.find((x) => x.slug === slug)?.links ?? []
}

export const hand: Highlight[] = [
  {
    kind: 'role',
    slug: 'catchback-cards',
    corner: 'Current',
    title: 'CatchBack Cards',
    subtitle: 'Product Management Lead',
    meta: 'Oct 2026 — Present',
    summary: 'Leading a product team on conversion and retention for a YC-backed collectibles startup that raised a $7.8M seed.',
    body: ['Lead a six-person Product Space team finding where new users stall before a first deposit, and what brings collectors back.'],
    tags: ['Product Management', 'Conversion', 'Retention'],
    links: experienceLinks('catchback-cards'),
    more: { label: moreLabel.experience, to: '/experience/catchback-cards' },
  },
  {
    kind: 'project',
    slug: 'scentlens',
    corner: 'Live',
    title: 'ScentLens',
    subtitle: 'Solo Creator & Developer',
    meta: 'Powers Accord',
    summary: 'A model I trained to name a fragrance from a photo of its bottle, and say "not sure" when it cannot tell.',
    body: ['Fine-tuning plus a bottle crop took top-1 accuracy on real phone photos from 30.3% to 66.7% across 24,642 fragrances. It runs the scanner inside Accord.'],
    tags: ['Computer Vision', 'PyTorch', 'Python'],
    links: projectLinks('scentlens'),
    more: { label: moreLabel.project, to: '/projects/scentlens' },
  },
  {
    kind: 'credential',
    slug: 'education',
    corner: 'Education',
    title: 'Computer Science + Economics',
    subtitle: education.school,
    meta: education.dates,
    summary: `${education.degree}. Minors in ${education.minors.join(' and ')}.`,
    body: [education.courseworkNote, ...education.coursework.map((c) => `${c.code} ${c.name}${SEP}${c.status}`)],
    tags: ['Computer Science', 'Economics', 'Statistics minor', 'Advertising minor'],
  },
  {
    kind: 'other',
    slug: 'community',
    corner: 'Community',
    title: 'Bringing people together',
    subtitle: `Indian Student Association${SEP}Director of Cultural Events`,
    meta: 'Aug 2025 — Present',
    summary:
      'Creating opportunities to connect through South Asian cultural events, from Unity Week to Diwali Night and India Night.',
    body: [
      'Led five South Asian Unity Week events reaching 1,000+ attendees, and produced the Diwali Night and India Night showcases drawing 3,000+ combined.',
    ],
    tags: ['Community', 'Event Production', 'Leadership'],
    more: { label: 'See the face cards', to: '/#face' },
  },
]
