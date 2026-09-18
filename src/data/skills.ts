import type { SkillStack } from './types'

/** The chips: one stack per category. Stack height = number of skills. */
export const skills: SkillStack[] = [
  { id: 'frontend', label: 'Frontend', skills: ['[React]', '[TypeScript]', '[CSS]', '[Accessibility]', '[Testing]'] },
  { id: 'backend', label: 'Backend & Data', skills: ['[Node]', '[Postgres]', '[APIs]', '[Queues]'] },
  { id: 'languages', label: 'Languages', skills: ['[TypeScript]', '[Python]', '[SQL]', '[Go]', '[Java]', '[Bash]'] },
  { id: 'tools', label: 'Tools & Platforms', skills: ['[Git]', '[Vercel]', '[AWS]', '[Figma]'] },
  { id: 'product', label: 'Product & Business', skills: ['[Roadmapping]', '[Analytics]', '[Writing]'] },
]
