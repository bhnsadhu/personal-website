import type { Project } from './types'

/**
 * The fan: independent projects. Face up when live or shipped. A
 * `status: 'idea'` entry would render face down and never expand.
 * Card fronts stay concise; the detail page carries the full build.
 */
export const projects: Project[] = [
  {
    slug: 'cambio',
    status: 'live',
    year: '2026',
    title: 'Cambio',
    subtitle: 'Next.js · TypeScript · Supabase',
    meta: 'Sept 2026 · Live',
    summary: 'A multiplayer card game built for the moments when you want to play but nobody has a deck.',
    body: [
      'Up to 4 players. Join by room code, no account needed. Bots fill the empty seats.',
      'A four-step onboarding teaches the game while you play, with animated cards and private, player-specific views.',
      'Early testing with approximately 18 players, primarily friends.',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Vercel'],
    stack: [
      'Next.js App Router',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Vercel',
      'Vitest',
      'Web Animations API',
    ],
    siteUrl: 'https://cambio.bhanusadhu.com',
    codeUrl: 'https://github.com/bhnsadhu/cambio',
    origin:
      "Cambio is a game I play with my friends a lot. Sometimes we'd have a few minutes between classes or during a library break and want to play, but nobody had cards. I built a version we could open anywhere, and a way for new players to learn a game I love.",
    ownership:
      'I built Cambio independently, from the game rules and interface to multiplayer synchronization and deployment.',
    usage: 'Early testing with approximately 18 players, primarily friends.',
    features: [
      'Multiplayer for up to 4 players.',
      'Account-free joining via room codes.',
      'Bots fill empty seats.',
      'Four-step onboarding with contextual guidance.',
      'Animated card interactions.',
      'Private, player-specific views.',
      'Real-time updates.',
      'Automated game-engine and bot testing, including 40 seeded rounds.',
    ],
    decisions: [
      'Room codes reduce the friction to start a game.',
      'Bots make it possible to play without a full group.',
      'Guided onboarding teaches the game while you play it.',
      'Browser-based, so there is no app to download.',
    ],
    technical: [
      'A pure TypeScript reducer holds the game rules and scoring.',
      'The full game state stays server-side. Clients receive player-specific views that redact hidden information.',
      'State updates use compare-and-swap commits.',
      'Supabase Realtime broadcasts updates, with a polling fallback.',
      'Bot strategy is kept separate from scheduling and execution.',
    ],
  },
]
