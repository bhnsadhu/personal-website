import type { Project } from './types'
import { SEP } from '../lib/sep'

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
    subtitle: ['Next.js', 'TypeScript', 'Supabase'].join(SEP),
    meta: 'Play now',
    summary: 'A multiplayer card game built for the moments when you want to play but nobody has a deck.',
    body: [
      'A four-player browser card game with guest access, guided onboarding, and three bot difficulty levels.',
      'Accounts, friend invites, and leaderboards so players can track progress and compete with friends.',
      'Real-time sync and private player views, tested with Vitest and Playwright and checked by GitHub Actions on every push.',
      'Bot skill levels measured with seeded bot-versus-bot rounds rather than assumed, with the hypotheses written before the code.',
      'Models trained on simulated games improved some measures, but stay off for real players because existing safety tests fail with them on.',
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
      'GitHub Actions',
      'Docker',
      'Python',
      'scikit-learn',
      'Web Animations API',
    ],
    siteUrl: 'https://cambio.bhanusadhu.com',
    codeUrl: 'https://github.com/bhnsadhu/cambio',
    origin:
      "Cambio is a game I play with my friends a lot. Sometimes we'd have a few minutes between classes or during a library break and want to play, but nobody had cards. I built a version we could open anywhere, and a way for new players to learn a game I love.",
    ownership:
      "I built Cambio independently, from implementing the game's rules and interface to accounts, real-time sync, and deployment.",
    usage: 'Live and deployed, with {cambioPlayers} players so far.',
    shots: [
      {
        src: '/cambio/home.jpg',
        alt: 'Cambio home page: the logo, a C made of playing cards, above the headline "The memory card game, live with friends."',
        caption: 'Home',
      },
      {
        src: '/cambio/table.jpg',
        alt: 'A new Cambio table with its join code and four seats, three left open for house bots set to easy, medium, or hard.',
        caption: 'A new table',
      },
      {
        src: '/cambio/round.jpg',
        alt: 'A Cambio round in play: four hands face down, the deck and pile, a table log, and a drawn queen of clubs waiting for a move.',
        caption: 'A round in play',
      },
    ],
    features: [
      'Multiplayer for up to 4 players, with bots filling any empty seats.',
      'Guest access, or create an account to keep a record.',
      'Three bot difficulty levels.',
      'Guided onboarding that teaches the game while you play.',
      'Accounts with friend invites and requests.',
      'Global and friend leaderboards with ranks and streaks.',
      'Live presence, so friends can see who is playing right now.',
      'Six avatar styles with a separate skin tone selector.',
      'Animated card interactions.',
      'Light and dark themes.',
      'Private, player-specific views.',
      'Real-time updates.',
      'Automated game-engine and bot testing, plus Playwright coverage of the account lifecycle, run in GitHub Actions on every push.',
      'A reproducible bot evaluation, regenerated from scratch with one command, with charts and a log of rules decisions.',
      'An audit of the bots against their own documentation, and tests of learned bot models that are not live.',
    ],
    decisions: [
      'Room codes reduce the friction to start a game.',
      'Bots make it possible to play without a full group, at three difficulty levels.',
      'Guided onboarding teaches the game while you play it.',
      'Accounts and leaderboards give players a reason to come back.',
      'Bots see only what a human could see, so their difficulty reflects decisions and not secret information.',
      'Browser-based, so there is no app to download.',
      'The rule for putting learned bots live was fixed before the test, so when a safety check failed, nothing went live and the check was not worked around.',
    ],
    technical: [
      'A pure TypeScript reducer holds the game rules and scoring.',
      'The full game state stays server-side. Clients receive player-specific views that redact hidden information.',
      'State updates use compare-and-swap commits.',
      'Supabase Realtime broadcasts updates, with a polling fallback.',
      'Bot strategy is kept separate from scheduling and execution.',
      'Row Level Security and SECURITY DEFINER RPCs gate access to game and account data.',
      'Vitest covers the game engine and bots; Playwright covers the account lifecycle against an isolated database. GitHub Actions runs typecheck, lint, both suites, and no real secrets.',
      'Bot unit tests permute every unseen card and fail on any attempted read of hidden state.',
      'A seeded harness plays 6,800 bot-versus-bot rounds with 95% intervals. Hard bots won 63.3% of the win share against medium, and medium won 78.3% against easy.',
      'The evaluation also refuted a hypothesis: bot Cambio calls won 54.0% of the time against a 64% belief threshold, so the belief estimates are decision aids and not calibrated probabilities. Each ability removed from the hard bot made it weaker.',
      'An audit of 300 instrumented bot rounds found every documented bot behavior it could measure held. Reaction speed was not measured validly because of a reporting bug, so it is not claimed.',
      'Per level models trained on simulated games, using only what each level may know, were tested once on untouched seeds. The learned call model was far better calibrated (calibration error 0.086 against 0.310), and learned actions made medium and hard stronger against their frozen selves (54.7% and 58.8% of the win share), but not clearly easy.',
      'Neither learned part is live. With the tuned setting on, learned actions fail an existing behavior test, and learned calls fail existing tests that forbid calling on a known losing hand. A learned action decision took 3.50 ms at the 99th percentile.',
    ],
  },
]
