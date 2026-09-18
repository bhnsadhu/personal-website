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
- `public/fonts/` — self-hosted latin woff2 subsets (PT Serif 400/400i/700,
  Baloo 2 800). Preloaded from `index.html`. Do not add Google Fonts links.
- `vercel.json` — SPA rewrite to `index.html`, immutable cache for fonts/assets.

## Design system — locked

Palette (nothing outside it, hover states included):
paper `#FDFBF6`, ink `#1A1A1A`, secondary `#4A4A4A`, accent `#A47C42`,
muted `#A89A80`, border `#EAE3D3`, rule `#DCD2B8`, live `#2F8F4E`, soon `#B8AF9C`.

Type: exactly two families. **Baloo 2 800** is the wordmark only, always in
accent. **PT Serif** for everything else. No third font, no sans, no mono.
Title Case throughout; course names and section labels are uppercase +
tracked (`.label`). Italic is reserved for the tagline and tech-stack notes.

Accent is used sparingly: wordmark, labels, one filled button per page, the
Resume icon. Flat surfaces; 1px border + very light shadow is the ceiling.
Motion is ease-out only (`--ease-out`), no bounce; respect reduced motion.

## Menu vocabulary — keep it airtight

- Courses, in order: Starters (About Me), Mains (Work Experience), Sides
  (Leadership & Involvement), Specials (Projects), Chef’s Table (Personal
  Interests), Ingredients (Skills & Tools).
- Row action is always **View**; project status is **Live** (green) or
  **Soon** (gray) with a dot.
- Dish pages: `← Back To The Menu` top and bottom, `Next On The Menu` at the
  bottom. Mains use What I Owned / What I Actually Did / What Came Of It.
  Specials use The Situation / The Ask / How It Came Together / The Result,
  then Ingredients Used, then `Visit The Site →` / `View The Code →`.
- Skills course: `See All →` expands inline to `See Fewer`.
- 404 is “Not On The Menu”. Footer note: “Menu Subject To Change”.
- Arrows and bullets are SVG/CSS, not glyphs (PT Serif latin subset lacks →, ●).

## Routes

`/` landing · `/menu` · `/starters` · `/mains/:slug` · `/sides/:slug` ·
`/specials/:slug` · `/chefs-table` · anything else → 404.
