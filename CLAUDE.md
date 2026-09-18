# Personal Website — "A Portfolio, Plated Like A Menu"

Static React + TypeScript site (Vite) deployed on Vercel. The whole site is a
restaurant menu: the name is the restaurant, each section is a course, each
item opens its own page. Menu language first, portfolio second, everywhere.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build to `dist/`
- `npm run typecheck` — types only

## Where things live

- `src/lib/content.ts` — every word of copy and all data. Bracketed text is
  placeholder to be replaced. Fill this file in; do not scatter copy in JSX.
- `src/lib/router.tsx` — tiny in-house router (path params, `<Link>`, view
  transitions, per-entry scroll restoration). No react-router on purpose;
  keeps the JS bundle around 75 KB gzipped, nearly all of it React.
- `src/styles/` — `tokens.css` (palette, type, spacing), `base.css` (fonts,
  reset, motion), `components.css`, `pages.css`. Plain CSS, BEM-ish names.
- `src/components/` — `Sheet` (the menu card + footer), `Course`, `Row`,
  `Status`, `Ingredients`, `Detail` (Section/Prose/Bullets/Stats/Pills/PageNav).
- Fonts load from Google Fonts via the two exact `<link>` tags in
  `index.html` (Baloo 2 500/800; PT Serif 400/400i/700). Nothing self-hosted.
- `vercel.json` — SPA rewrite to `index.html`, immutable cache for assets.

## Design system — locked

Palette (nothing outside it, hover states included):
paper `#FDFBF6`, ink `#1A1A1A`, secondary `#4A4A4A`, accent `#A47C42`,
muted `#A89A80`, border `#EAE3D3`, rule `#DCD2B8`, live `#2F8F4E`, soon `#B8AF9C`.

Type: exactly two families. **Baloo 2** only for the wordmark (800, accent)
and the landing tagline (500, `.logo-copy`). **PT Serif** for every other word on every page, including
labels, buttons, and all dish pages. No third font, no sans, no mono, no
system-ui in any reset. Title Case throughout; course names and section
labels are uppercase + tracked (`.label`). Italic only for tech-stack notes.

One button style: accent fill, paper text, PT Serif 12px bold 0.08em, 4px
radius (`.btn`). One card treatment: 1px `#EAE3D3` border, 4px radius,
`0 1px 3px rgba(0,0,0,.06)` shadow (sheet and stats block). Accent is used
sparingly: wordmark, labels, buttons, the Resume icon. Motion is ease-out
only (`--ease-out`), no bounce; respect reduced motion.

## Menu vocabulary — keep it airtight

- Courses, in order: Starters (About Me), Mains (Work Experience), Sides
  (Leadership & Involvement), Specials (Projects), Chef’s Table (Personal
  Interests), Ingredients (Skills & Tools).
- Course header: name left (accent caps), plain-English sub-label right
  (muted). No rules under headers or between rows; whitespace does the work.
- Row shape: `[Bold Title] · Regular Subtitle | meta`, a plain muted `|` as
  the separator, action flush right in 12px bold. On phones the bar hides
  and meta drops to its own line.
- Exact scale: sheet 640px / 48×52px padding / 4px radius; wordmark 40px;
  À La Carte 11px bold 0.2em; course name 12px bold 0.1em; sub-label 11px;
  item 15px; description 13px; View/Live/Soon/See All 12px bold; stack note
  12px italic muted; rows 5px padding; header→rows 10px; course gap 24px.
- Row action is always **View**; project status is **Live** (green) or
  **Soon** (gray) with a dot. Tech-stack notes are comma-separated, italic.
- Footer is icons only (Email, LinkedIn, GitHub, Resume in accent) above a
  thin rule; labels live in `aria-label`/`title`.
- Dish pages: `← Back To The Menu` top and bottom, `Next On The Menu` at the
  bottom. Mains use What I Owned / What I Actually Did / What Came Of It.
  Specials use The Situation / The Ask / How It Came Together / The Result,
  then Ingredients Used, then `Visit The Site →` / `View The Code →`.
- Skills course: `See All →` expands inline to `See Fewer`.
- 404 is “Not On The Menu”. Footer note: “Menu Subject To Change”.
- Arrows and bullets are SVG/CSS, not glyphs (PT Serif latin subset lacks →, ●).

## Routes

`/` landing (eyebrow, wordmark, tagline, one CTA, inside the sheet card;
no micro-copy) · `/menu` · `/starters` · `/mains/:slug` · `/sides/:slug` ·
`/specials/:slug` · `/chefs-table` · anything else → 404.
