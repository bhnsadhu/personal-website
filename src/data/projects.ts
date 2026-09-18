import type { Project } from './types'

/**
 * The fan: projects. `status: 'idea'` renders face-down ("not dealt yet")
 * and never expands, so leave body empty for those.
 */
export const projects: Project[] = [
  {
    slug: 'project-one',
    status: 'live',
    year: '[YYYY]',
    title: '[Project One]',
    subtitle: '[One-line description of what it does.]',
    meta: '[YYYY] · Live',
    summary: '[One line on what it does and who it is for.]',
    body: [
      '[The situation: who had the problem and why it mattered.]',
      '[The build: the architecture you chose and the hardest part.]',
      '[The result: what shipped and the number that proves it.]',
    ],
    tags: ['[Framework]', '[Language]', '[Database]'],
    stack: ['[Framework]', '[Language]', '[Database]', '[Hosting]'],
    siteUrl: 'https://[project-one].example',
    codeUrl: 'https://github.com/[your-handle]/[project-one]',
  },
  {
    slug: 'project-two',
    status: 'shipped',
    year: '[YYYY]',
    title: '[Project Two]',
    subtitle: '[One-line description of what it does.]',
    meta: '[YYYY] · Shipped',
    summary: '[One line on what it does and who it is for.]',
    body: [
      '[The situation: who had the problem and why it mattered.]',
      '[The build: the architecture you chose and the hardest part.]',
      '[The result: what shipped and what happened after.]',
    ],
    tags: ['[Framework]', '[Language]'],
    stack: ['[Framework]', '[Language]', '[Platform]'],
    codeUrl: 'https://github.com/[your-handle]/[project-two]',
  },
  {
    slug: 'project-three',
    status: 'idea',
    year: '[YYYY]',
    title: '[Project Three]',
    subtitle: '',
    meta: 'Not dealt yet',
    summary: '',
    body: [],
    tags: [],
    stack: [],
  },
  {
    slug: 'project-four',
    status: 'idea',
    year: '[YYYY]',
    title: '[Project Four]',
    subtitle: '',
    meta: 'Not dealt yet',
    summary: '',
    body: [],
    tags: [],
    stack: [],
  },
]
