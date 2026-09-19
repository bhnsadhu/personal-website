import type { SkillStack } from './types'

/**
 * The chips: one stack per category, product and strategy first.
 * Stack height is a count, not a rating. No tool here is claimed for
 * any one project.
 */
export const skills: SkillStack[] = [
  {
    id: 'product',
    label: 'Product, Strategy & Delivery',
    skills: [
      'Product strategy',
      'Requirements gathering',
      'PRDs',
      'User stories & acceptance criteria',
      'User interviews',
      'Usability testing',
      'Feature prioritization',
      'Roadmapping',
      'Product analytics',
      'Success metrics',
      'A/B testing',
      'Market & competitive research',
      'Market sizing',
      'Go-to-market strategy',
      'Stakeholder management',
    ],
  },
  {
    id: 'languages',
    label: 'Programming Languages',
    skills: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Java', 'C++', 'R', 'HTML', 'CSS'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Platforms',
    skills: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'Vercel',
      'Vitest',
      'Capacitor',
      'React Router',
      'Framer Motion',
    ],
  },
  {
    id: 'devtools',
    label: 'Development Tools',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Postman', 'Visual Studio Code', 'Android Studio', 'Xcode'],
  },
  {
    id: 'business-tools',
    label: 'Analytics, Design & Business Tools',
    skills: [
      'Excel',
      'Google Sheets',
      'Tableau',
      'Power BI',
      'Looker Studio',
      'Amplitude',
      'Mixpanel',
      'PostHog',
      'Google Analytics',
      'Figma',
      'Notion',
      'Confluence',
      'Microsoft Office',
      'PowerPoint',
    ],
  },
  {
    id: 'ai',
    label: 'AI & APIs',
    skills: [
      'Claude API',
      'Mistral AI API',
      'REST APIs',
      'Claude Code',
      'Cursor',
      'ChatGPT',
      'Replit',
      'Prompt engineering',
      'Prompt evaluation',
      'Tool calling',
    ],
  },
]
