# Personal Website — "Your Hand"

A poker-themed résumé site. Every section is a deck of cards; the open card
fills its row while the others slide back. React + TypeScript on Vite,
static, deployed on Vercel. Desktop first; phones get a stacked layout.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build to `dist/`

## Where things live

- `src/data/*.ts` — all content. Edit these to add a role or project; no
  section code changes needed. Everything in `[brackets]` is placeholder.
  `leadership.ts` is capped at 3 (K/Q/J): a 4th belongs in `experience.ts`.
- `src/components/Card.tsx` — one playing card: front is a `<button>`, back
  is a `role="region"` with the full content, always in the DOM, `inert`
  until open. Focus moves into the back on open and returns on close.
- `src/components/CardRow.tsx` — owns which card is open in a row; sets
  `grid-template-columns` (7fr for the open card, 1fr slivers) and handles
  Escape. Layouts: `row` (spread, fan), `fan` (hero overlap), `flop` (short
  centered sets).
- `src/sections/` — Hand (hero, four aces), Spread (experience), FaceCards
  (leadership), Fan (projects; `status: 'idea'` renders face down and shows
  a toast instead of expanding), ChipsSection (skills), Flop (personal),
  CallOrFold (contact; composes a `mailto:`).
- `src/pages/` — Home, ListView (`/list`, same data flat), ExperienceDetail
  (`/experience/:slug`), ProjectDetail (`/projects/:slug`), NotFound.
- `src/lib/router.tsx` — in-house router: params, `/#anchor` links, view
  transitions, scroll restoration, and `goBack()` which uses history when
  the visit started in-app and falls back to `/` on a shared link.
- `public/resume.pdf` — placeholder; replace with the real file. `og.png` is
  the social preview; `VITE_SITE_URL` (Vercel env) makes its URL absolute.

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
(contact). Buttons: "Draw a card" (résumé), "Deal me in" (submit), "Back to
the hand", "See the full hand", "List view" / "Card view". Face-down cards
say "Not dealt yet". 404 is "Not in the deck".

## Routes

`/` · `/list` · `/experience/:slug` · `/projects/:slug` · `/#spread`,
`/#fan`, `/#chips`, `/#flop`, `/#contact` anchors · anything else → 404.
