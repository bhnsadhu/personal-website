import type { Experience } from './types'

/** The spread: work experience, ranked high to low. Add entries at the end; ranks are assigned in order. */
export const experience: Experience[] = [
  {
    slug: 'role-one',
    company: '[Company One]',
    role: '[Role One]',
    dates: '[Mon YYYY] — Present',
    location: '[City, ST]',
    title: '[Role One]',
    subtitle: '[Company One]',
    meta: '[Mon YYYY] — Present',
    summary: '[One line on the scope of the role and the team it sat on.]',
    body: [
      '[A measured outcome, with the number: latency, revenue, adoption, cost.]',
      '[A concrete thing you built or changed, with the technology named.]',
      '[A decision you made and what it traded off.]',
      '[A cross-functional effort you led or unblocked.]',
    ],
    tags: ['[Language]', '[Framework]', '[Cloud]'],
  },
  {
    slug: 'role-two',
    company: '[Company Two]',
    role: '[Role Two]',
    dates: '[Mon YYYY] — [Mon YYYY]',
    location: '[City, ST]',
    title: '[Role Two]',
    subtitle: '[Company Two]',
    meta: '[Mon YYYY] — [Mon YYYY]',
    summary: '[One line on the scope of the role and the team it sat on.]',
    body: [
      '[A measured outcome, with the number.]',
      '[A performance or reliability improvement and how you found it.]',
      '[A piece of tooling or documentation that outlived you.]',
    ],
    tags: ['[Language]', '[Framework]', '[Tool]'],
  },
  {
    slug: 'role-three',
    company: '[Company Three]',
    role: '[Role Three]',
    dates: '[Mon YYYY] — [Mon YYYY]',
    location: '[City, ST]',
    title: '[Role Three]',
    subtitle: '[Company Three]',
    meta: '[Mon YYYY] — [Mon YYYY]',
    summary: '[One line on the scope of the role and the team it sat on.]',
    body: [
      '[A concrete thing you built, with the technology named.]',
      '[Something you learned the hard way and fixed for everyone.]',
    ],
    tags: ['[Language]', '[Tool]'],
  },
]
