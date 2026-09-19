# Personal Website — "Your Hand"

Bhanu Prakash Sadhu's poker-themed resume site. Every section is a deck of
cards; the open card fills its row while the others slide back. React +
TypeScript on Vite, static front end plus one Vercel Function for the
contact form, deployed on Vercel. Desktop first; phones get a stacked layout.

## Commands

- `npm run dev` — Vite dev server (no `/api`; the contact form shows its
  error state locally)
- `npm run build` — typecheck (`tsc -b`, includes `api/`) then production
  build to `dist/`

## Where things live

- `src/data/*.ts` — all content, one source for card, list, and detail
  views. `site.ts` holds identity, recruiting order (`roles`, never
  re-sort), links, and the static "as of" / "last updated" dates.
  `hand.ts` (four aces, each links to its fuller entry), `experience.ts`
  (the spread; `via` names the consulting org, kept separate from the
  client), `leadership.ts` (face cards, fixed order, `progression` and
  `related` optional), `projects.ts` (the fan), `education.ts`,
  `certifications.ts`, `skills.ts`, `personal.ts` (four cards, five
  `entries` each), `metrics.ts`.
- `src/components/Card.tsx` — one playing card: front is a `<button>`, back
  is a `role="region"` with the full content, always in the DOM, `inert`
  until open. Focus moves into the back on open and returns on close.
- `src/components/CardRow.tsx` — owns which card is open in a row; sets
  `grid-template-columns` (7fr for the open card, 1fr slivers) and handles
  Escape. Layouts: `row` (spread, fan), `fan` (hero overlap), `flop` (short
  centered sets). Rows center with auto margins, so wrap them in a block,
  never a grid or flex parent.
- `src/sections/` — Hand (hero: intro, actions, recruiting order, four
  aces), Spread (experience), FaceCards (leadership, dealt three to a suit
  in one row per suit: K/Q/J spades, then clubs), Fan (projects;
  `status: 'idea'` renders face down and shows a toast), ChipsSection
  (skills plus certifications), Flop (personal: flop and turn, four cards),
  CallOrFold (contact form posting to `/api/contact`).
- `src/pages/` — Home, ListView (`/list`, same data flat, adds Education),
  ExperienceDetail (`/experience/:slug`), ProjectDetail
  (`/projects/:slug`), NotFound.
- `src/lib/router.tsx` — in-house router: params, `/#anchor` links, view
  transitions, scroll restoration, and `goBack()` which uses history when
  the visit started in-app and falls back to `/` on a shared link.
- `api/contact.ts` — Vercel Function. Validates, drops honeypot hits, sends
  through Resend. Env: `RESEND_API_KEY` (required), `CONTACT_TO`,
  `CONTACT_FROM` (optional). Without a key it answers 503 and the form
  shows an honest error with a direct email fallback.
- `public/Bhanu_Sadhu_Resume.pdf` — the resume every "Resume" link opens in
  a new tab. Not in the repo until the real file is dropped in.
  `og.png` is the social preview; `VITE_SITE_URL` (Vercel env) makes its
  URL absolute.

## Content rules

- Recruiting order everywhere: Product Management, Software Engineering,
  Business Analyst, Project Management, Business Development.
- Confidential clients stay unnamed in text, slugs, metadata, and labels.
  The consulting org (Illinois Business Consulting, Disruption Lab at Gies)
  is named separately as `via`.
- Team results belong to the team. Ongoing work is present tense; proposed
  or idea-stage things (AviLux pilot, the innovation challenge, the
  apartment-chores product) are never described as launched.
- No GPA, grades, honors, photos, ratings, or invented metrics and dates.
  "As of" and "last updated" dates are static strings, never the clock.
- Spell "resume" plain, no accent, everywhere.

## Design system

Palette: bg `#100E0C`, cream `#F3EDE2`, wine `#A6413E` (fills, text on
cream), wine-text `#D1706C` (small text on dark), brass `#B08D57` /
`#CFAE78` (accents on dark only; brass fails contrast on cream), gray
`#8B8479` (secondary on dark), ink-2 `#5C554C` (secondary on cream).
Dark is the only mode.

Type: Fraunces for headlines and card titles (optical sizing on), IBM Plex
Mono for metadata, dates, tags, stat numbers, nav, buttons. Red suits use
wine, black suits use ink, on cream.

Motion: flips 0.55s, row slide 0.5s, hover 0.18s, one ease. Reduced motion
swaps the flip for a fade and drops the deal-in animation (`cards.css`).

## Vocabulary — keep it airtight

Your hand (hero) · The spread (experience) · The face cards (leadership) ·
The fan (projects) · The chips (skills) · The flop (personal) · Call or fold
(contact). Buttons and links: "Explore My Work", "View Resume", "Contact
Me" (hero), "Resume" (nav, footer), "Send Message" (submit), "Back to the
hand", "See the full hand", "List view" / "Card view", "Live Demo",
"GitHub", "View Credential". Face-down cards say "Not dealt yet". 404 is
"Not in the deck". Footer sign-off: "Shuffled, not stirred."

## Routes

`/` · `/list` · `/experience/:slug` · `/projects/:slug` · `/#spread`,
`/#face`, `/#fan`, `/#chips`, `/#flop`, `/#contact` anchors ·
`POST /api/contact` · anything else → 404.
