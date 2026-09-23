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
    title: 'Cambio',
    subtitle: 'Next.js · TypeScript · Supabase',
    meta: 'Live',
    summary: 'A multiplayer card game built for the moments when you want to play but nobody has a deck.',
    body: [
      'A four-player browser card game with guest access, guided onboarding, and three bot difficulty levels.',
      'Accounts, friend invites, and leaderboards so players can track progress and compete with friends.',
      'Real-time sync and private player views, tested with Vitest and Playwright.',
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
      'Playwright',
      'Web Animations API',
    ],
    siteUrl: 'https://cambio.bhanusadhu.com',
    codeUrl: 'https://github.com/bhnsadhu/cambio',
    origin:
      "Cambio is a game I play with my friends a lot. Sometimes we'd have a few minutes between classes or during a library break and want to play, but nobody had cards. I built a version we could open anywhere, and a way for new players to learn a game I love.",
    ownership:
      "I built Cambio independently, from implementing the game's rules and interface to accounts, real-time sync, and deployment.",
    usage: 'Early testing with approximately 18 players, primarily friends.',
    features: [
      'Multiplayer for up to 4 players, with bots filling any empty seats.',
      'Guest access, or create an account to keep a record.',
      'Three bot difficulty levels.',
      'Guided onboarding that teaches the game while you play.',
      'Accounts with friend invites and requests.',
      'Global and friend leaderboards with ranks and streaks.',
      'Animated card interactions.',
      'Private, player-specific views.',
      'Real-time updates.',
      'Automated game-engine and bot testing, plus Playwright coverage of the account lifecycle.',
    ],
    decisions: [
      'Room codes reduce the friction to start a game.',
      'Bots make it possible to play without a full group, at three difficulty levels.',
      'Guided onboarding teaches the game while you play it.',
      'Accounts and leaderboards give players a reason to come back.',
      'Browser-based, so there is no app to download.',
    ],
    technical: [
      'A pure TypeScript reducer holds the game rules and scoring.',
      'The full game state stays server-side. Clients receive player-specific views that redact hidden information.',
      'State updates use compare-and-swap commits.',
      'Supabase Realtime broadcasts updates, with a polling fallback.',
      'Bot strategy is kept separate from scheduling and execution.',
      'Row Level Security and SECURITY DEFINER RPCs gate access to game and account data.',
      'Vitest covers the game engine and bots; Playwright covers the account lifecycle against an isolated database.',
    ],
  },
]
