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
  views. `site.ts` holds identity, what he's seeking (`seeking`,
  `interests`), links, and the static "last updated" date.
  `hand.ts` (four aces, each links to its fuller entry), `experience.ts`
  (the spread; `via` names the consulting org, kept separate from the
  client), `leadership.ts` (face cards, newest first, `progression` and
  `related` optional), `projects.ts` (the fan; a project or role may
  carry `shots`, screenshots of the live product in `public/<slug>/`,
  rendered by `PlateShots` on its page three across, never anyone else's
  name in frame; a click enlarges one in a native `<dialog>` with the
  caption and a close button above, back/next and "2 / 3" below, both bars
  exactly the image's width; arrows step, Escape closes only the dialog.
  Five cards: Cambio, Accord, ScentLens, Dishwise, Replay. Accord and
  ScentLens are separate projects with a `pairing` each: ScentLens is the
  recognition model behind Accord's bottle scanner. Its card back names
  the relation and links the partner ("Scanner powered by" / "Runs
  inside"), ScentLens's front `meta` says it too ("Powers Accord"; Accord's
  is an action like the others, "Find a fragrance"), and both pages show one shared `flow` (the `scan`
  steps in projects.ts) under "How it connects", drawn by `PlateFlow`:
  consecutive steps by one project form a leg, the page's own legs on
  `--cream-2`, the partner's dashed and linked, arrows between, stacked
  under 720px. Flow text is CSS-balanced and skipped by `widows.ts`),
  `education.ts`,
  `certifications.ts`, `skills.ts`, `personal.ts` (four cards, five
  `entries` each; a restaurant's address opens Google Maps. A card's
  `inspiredBy` closes its back in one italic line naming what its layout
  borrows from ("Inspired by Beli, one of my favorite products."); no link
  to his Beli profile anywhere. All four backs keep one rhythm, measured at
  every width in both views: the three ruled label rows (`ranked__tabs`,
  `posters__head`, `shelf__head`) are 26px tall; every label, ruled or
  not (the map's `pmap__label` is plain, as on hers), sits 14px above its
  first item; 14px either side of a row rule; 14px to the credit line; every
  block on the same left and right edge; a map popup sits exactly 12px above
  its pin. An open personal card fits on screen like every other (536 to
  685px at 1440): `PersonalBack` puts its words in a left column (intro,
  the chosen favorite's name and note, links, credit) and its picture in the
  right, 2:3, once its container is 900px or wider (`.pback`); narrower (the
  list view, phones) it is one column, intro, picture, note, credit.
  `PersonalBack` owns which favorite is chosen (the first, to start).
  Favorite Tables has `view: 'ranked'`: laid out like a Beli list,
  "Ranked on Beli" / "Click a place to read why" over rows of rank, place,
  address, and his Beli `score` in a 40px ring (green `--score`, on cream in
  both views; wine on the chosen row), in his order; no photos; a row is
  chosen like a poster, and its order and note show beside the list. Indian Cinema has `view: 'posters'` (`PosterRow.tsx`):
  Letterboxd's favorite films, a "Favorite films" label over a rule, five
  TMDB posters (`public/posters/`, 342x513, 2:3, cover-cropped so all
  match) with title and year (`detail`) along a poster's foot on hover,
  "Click a poster to read why" beside the label; hover only lifts, the
  chosen film gets the wine ring and a bar under it, and its note fades in
  beside the posters. Fragrance Shelf has `view: 'shelf'` (`FragranceShelf.tsx`): each
  entry's `photo` (`public/fragrances/*.webp`: product photos with the
  background lifted on-device, trimmed, 400px for the tallest) stood on a
  brass ledge at its real height (`cm`) against the others, house names
  beneath in columns that match the bottles; "On my shelf" / "Click a
  bottle to read why" over a rule; hover lifts a bottle, the chosen one
  rises with a glow and the wine bar under its name while its shadow stays
  on the shelf, and its note fades in beside the shelf. Places has `view: 'map'`,
  each entry an `at` [lat, lon] and `flag`),
  `metrics.ts`, `sections.ts` (`sectionHeads`: each
  section's eyebrow and title, and `sectionNotes`: the note beside it,
  rendered by both the card view and the list view).
- `src/components/Backs.tsx` — what each entry says when it opens, one
  component per kind (hand, experience, leadership, project, personal).
  The card renders it on its back and the list view inside its row, so the
  two views cannot drift. `ContactBody`, `ContactLinks`,
  `Certifications`, and `PersonalExtras` (the "Also in rotation" line under
  the flop) are shared the same way.
- `src/components/PlacesMap.tsx` — the Places card's back, as close to
  Gauri Menon's "Where" map as the site allows: the world as dots, Antarctica
  included (`src/lib/worldDots.ts`, Natural Earth land on a 2.7° grid, dots
  a third of their spacing), a dashed wavy route west to east from
  `--map-west` (brass) to `--map-east` (wine) whose dashes flow west and
  whose wave eases out at each pin so it enters dead centre, and a
  solid pin on each place, snapped to its nearest land dot, with a halo that
  breathes. Hover, tap, or tab to a pin (an invisible 28px button over it)
  for a bubble above it: the pin's color, darkened only as far as cream type
  needs for 4.5:1, with flag, place, and note. No chips, no legend. Dots shy
  from the cursor. Draws only while on screen and open; still under reduced
  motion. Dot color from `--pmap-dot`, re-pointed for the list view.
- `src/components/Card.tsx` — one playing card ("Tap to flip" on its face
  shows only on touch screens; the back's title, which takes focus on open,
  shows a wine ring for keyboard focus): front is a `<button>`, back
  is a `role="region"` with the full content, always in the DOM, `inert`
  until open. Focus moves into the back on open and returns on close. The
  front's title, italic subtitle, and dates sit in one column with equal
  spacing, so the subtitle is midway between the title and the dates.
  Cards keep a fixed shape: 5:7 everywhere, 248px wide (230px at 720 and
  below). Face cards carry a large framed
  portrait letter above the title.
- `src/components/CardRow.tsx` — the standard for every row of cards. It
  owns which card is open and renders a `.rail`: a row in which every card
  keeps one size (`--card-w`, 248px; 230px at 720 and below; always 5:7).
  A row whose cards fit sits centred and still, decided by its cards
  closed, so opening one never brings the bar in (no jump mid-flip); it
  centres with `safe center`, so an open card that overflows starts from
  the left edge with no sideways snap. One that doesn't scrolls
  sideways, snapping card by card, fades (56px) on the side with more to
  see, and shows a bar above it: "1–4 of 6" (or "1 of 6") and round ← →
  buttons ("Previous cards" / "More cards", 44px at 720 and below) that page by all but one card;
  arrow keys do the same while a card face has focus, and focus moves
  with the page. Opening a card widens
  it in place to the full row (`--open-w: 100%`, in every section alike) with
  its back never shorter than a closed card, its width and height
  travelling together (`src/lib/cardSize.ts`: left to CSS, an open back laid
  out at closed width is 1,500px tall and a closed face laid out at open
  width is 1,200px, so the card would balloon on every open and close;
  every changed card's target is measured before any is pinned, and
  `is-sizing` clips both faces to the moving box). As it widens, on the same
  curve and from the same frame, the row slides the card to its start edge
  if it would not be wholly in view, and the page scrolls so the card sits
  under the nav or its foot ("Back to the hand") clears the bottom of the
  screen (`planScroll` / `runScroll` in CardRow, `src/lib/ease.ts`; a wheel
  or touch takes over); the other cards stay whole. An open card fills the
  row, so the row drops its edge fade, which would grey the card's own
  edges. Layouts: `row` (every section: spread, face cards, fan, flop, one
  row each, so they fit, scroll, count, page and open the same way) and
  `fan` (the hero),
  which on a wide screen always fits, so it keeps its overlap and, when a
  card opens, its slivers: the same flex row, the open ace seven parts and
  each other one part, on solid `--cream-2` stock, so opening, switching and
  closing all travel (width, overlap, tilt and height together); at
  720 and below it scrolls like every other row. Only hover or keyboard
  focus (`:focus-visible`) lifts an ace: closing hands focus back to the
  face, and a clicked ace must settle back into the hand. A centred row that overflows would hide its first card, so
  rows only centre when they fit.
- `src/sections/` — Hand (hero: intro, actions, seeking line, and
  beside them `HeroPhoto`, then four aces), Spread (experience), FaceCards (leadership, dealt three to a suit,
  K/Q/J spades then clubs, in one row like the others), Fan (projects;
  `status: 'idea'` renders face down and shows a toast), ChipsSection
  (skills plus certifications), Flop (personal: flop and turn, four cards),
  CallOrFold (contact form posting to `/api/contact`).
- `src/components/CommandPalette.tsx` — search. A "Search ⌘K" pill in the
  bottom-left corner, Cmd/Ctrl+K, or "/" opens a native `<dialog>` that finds
  any section, role, project, skill, credential, personal card, or link,
  built from `src/data`. Experience and projects open their pages;
  leadership, personal, and Education flip their card open in the card view
  through `src/lib/deal.ts` (CardRow claims the request, then scrolls the card
  under the nav) and just scroll to the section in the list view.
  `BackToTop.tsx` is the bottom-right arrow, shown after one screen of scroll.
- `src/components/Felt.tsx` — the felt: a canvas strip closing the footer
  on every page, a slow swell of IBM Plex Mono characters in noise patches
  with suits riding the crest (wine for red, `--fg` for black), brass
  highlights, and a ripple that follows the cursor. Colors are read from
  the tokens and re-read when `data-theme` changes. Decorative only:
  `aria-hidden`, 30fps, paused off screen and in a hidden tab, one still
  frame under reduced motion.
- The nav's suits: each box hugs its word (or, below 901px, its glyph)
  with the same padding, so the gaps between labels are equal, and the
  suit and label sit exactly midway in the box (measured from pixels).
  The section in view is lit with a faint brass edge; no dot.
- The nav's current-role pill (green dot, then the company, e.g.
  "CatchBack Cards (YC W26)"; "Currently at …" is its aria-label and
  title) names the role whose slug is `site.currently` and links to its
  page. Hidden at 1199px and below, where it would run into the suits.
- CatchBack Cards is always "CatchBack Cards (YC W26)", with a no-break
  space inside the brackets, in every mention.
- The stat band runs lowest to highest, left to right.
- `src/components/Chips.tsx` — a chip stack is a rough indicator, not a
  count: `chipsFor()` scales the longest category to `MAX_CHIPS` and the
  rest down to `MIN_CHIPS`, so no stack towers. ChipsSection passes the
  shortest and longest lengths in. Every stack reserves the tallest box
  (`--max` in CSS) and chips sit from the bottom up, so all six rest on one
  baseline with their labels aligned. The `×N` beside it is the real
  number.
- `src/components/Opening.tsx` — the opening deal: a deck riffle-shuffles,
  rises clear of where the hand lands, then the four aces are dealt to the
  exact spots the hero's hand occupies and turn face up while the rest of
  the deck and its caption fade, so no ace rests on the deck; they are clones of the real cards, so the overlay fades
  onto a hand already in place. An inline script in `index.html` decides
  before first paint (`data-intro="play"`): once per visit
  (`sessionStorage` `dealt`), only when landing on `/` itself, never for a
  `#section` link or reduced motion. It runs about 4.5s with the page locked
  and `inert`, so nothing under the overlay takes focus.
  Watching is the default: stray clicks and keys do nothing. After a second
  a quiet line fades in, centred at the top on the nav's own centre line
  (`(--nav-h - 1px) / 2`, where the nav's contents measure), set like the
  caption, smaller and dimmer: "Hold space to skip" ("Hold to skip" on
  touch). One thing skips: a hold of space, or of a press anywhere, for
  0.8s (`HOLD_MS`), while the line fills with brass from its first letter
  to its last; let go early and it drains back. Then the overlay fades in
  0.3s onto the hand already in place. Clicks, taps, and other keys do
  nothing. The caption never rises closer to that line than it sits above
  the deck. While it plays, motion.css hides the real hand and pauses the name's
  rise; afterwards (`data-intro="done"`) the hand is not dealt in twice.
- `src/components/IndexList.tsx` — the list view's rows. A row is a card
  laid flat: the same rank and suit (a small cream pip), title, italic
  subtitle, corner label, and dates, and the same back sliding open
  beneath it. `IndexGroup` owns which rows are open, offers "Open all",
  and claims cards dealt from search.
- `src/pages/` — Home, ListView (`/list`: the card view laid flat, same
  sections in the same order with the same heads, the hero mirrored at the
  top with the four aces as rows, then the band, then a sticky section rail
  beside the rows on wide screens),
  ExperienceDetail (`/experience/:slug`), ProjectDetail
  (`/projects/:slug`), NotFound.
- `src/lib/router.tsx` — in-house router: params, `/#anchor` links, view
  transitions, scroll restoration, and `goBack()` which uses history when
  the visit started in-app and falls back to `/` on a shared link.
- `src/lib/sep.ts` — `SEP`, the " · " between joined items, with a
  no-break space before the dot so a wrapped line never starts with one.
  Use it for every rendered separator, in data and views alike.
- `api/contact.ts` — Vercel Function. Validates, drops honeypot hits, sends
  through Resend. Env: `RESEND_API_KEY` (required), `CONTACT_TO`,
  `CONTACT_FROM` (optional). The key is read from `process.env` in the
  function, never `VITE_`-prefixed, so it stays off the client. Without a
  key it answers 503 and the form shows an honest error with a direct email
  fallback. Mail is sent from `hello@bhanusadhu.com`, on the verified
  bhanusadhu.com domain, to sadhubhanu07@gmail.com, with the visitor's
  address as `reply_to`. Any sender must sit on a domain verified in
  Resend. Secrets live in `.env`, which is gitignored; `.env.example`
  documents the keys.
- `api/cambio-players.ts` — Vercel Function. Asks Cambio's public
  `/api/stats` route for its player count and passes on only that integer
  (anything else is a 502), cached at the CDN for 60 seconds. The stats band's
  Cambio figure and the Cambio project's "Who uses it" line read it through
  `src/lib/cambioPlayers.ts` (one request per page load). Before it answers,
  or if it never does (local `npm run dev` has no `/api`), they show
  `CAMBIO_PLAYERS_FALLBACK` in `src/data/metrics.ts`. That number is only a
  fallback: keep it near the real count, never rely on it. The project's
  `usage` text holds a `{cambioPlayers}` placeholder, not a number.
- `public/Bhanu_Sadhu_Resume.pdf` — the resume every "Resume" link opens in
  a new tab. Not in the repo until the real file is dropped in.
  `og.png` is the social preview, 1200x630; index.html points `og:image`
  and `twitter:image` at `https://bhanusadhu.com/og.png`, absolute because
  crawlers do not resolve relative ones. `og:title` and `twitter:title`
  put no-break spaces (`&#160;`) around the bar; with plain spaces iMessage
  strips "Bhanu Sadhu" as a duplicate of the domain.
- `sitemap.xml` is emitted at build time by the `sitemap` plugin in
  `vite.config.ts`, from `experience` and `projects`, so it cannot drift
  from the router. No `lastmod`: the dates would be invented. Vercel serves
  it and `robots.txt` from the filesystem, ahead of the SPA rewrite.

## Content rules

- Always the full school name, "University of Illinois Urbana-Champaign",
  never "UIUC" or "Illinois" alone, in text, metadata, and docs. The one
  exception is the hero eyebrow, in both views, which says
  "UIUC" (`site.schoolShort`) to stay short.
- Fixed wording in fixed places. The hero eyebrow reads "Your hand ·
  UIUC · Computer Science + Economics · Builder & breaker of products"
  (`site.schoolShort`, `site.major`, `site.focus`), no location; the list view's header says the same. He is recruiting for two
  tracks with equal weight, and every mention is "Product & Software"
  (`site.title`, from `site.interests`): tab title, social meta, the
  social preview image (`public/og.png`), the hero's seeking line with
  both words highlighted alike, and the `site.availability` sentence in
  the contact section and the list view. Never "Strategy" as a track (his
  real titles, such as Strategy Consultant, stay as they are), never one
  track ranked above the other, no long form, no other role list.
- The card view and the list view say the same things in the same words.
  Shared text lives in `src/data`, never inline in one view.
- Confidential clients stay unnamed in text, slugs, metadata, and labels.
  The org an engagement runs through (Product Space, Illinois Business
  Consulting, Disruption Lab at Gies) is kept as `via` in the data but never
  shown or searched on the experience side: it appears only on that org's
  face card, whose "Engagements" links lead to the roles. The spread and the
  face cards run reverse chronological, newest start date first (a tie
  keeps its order; within a card, `progression` is newest first too). The
  face letters follow position, K/Q/J spades then clubs. Projects carry no
  dates and keep their order.
- Team results belong to the team. Ongoing work is present tense; proposed
  or idea-stage things (AviLux pilot, the AI learnathon, the
  apartment-chores product) are never described as launched.
- No GPA, grades, honors, ratings (his own Beli scores on Favorite Tables
  aside), or invented metrics and dates. One
  photo of him only (film posters on Indian Cinema and bottle photos on
  Fragrance Shelf are the only other images): `site.photo` (`public/bhanu.jpg`, metadata
  stripped), rendered by `src/components/HeroPhoto.tsx` beside the name
  in both heroes as a straight Polaroid on cream stock, no caption, an even
  border all round. The file is cropped so his face sits on the print's
  vertical centre line. It stretches to the intro, top on the eyebrow's cap
  top and bottom on the seeking line's baseline, right edge on the content
  edge; 256px wide (224 at 1149 and below) so the name keeps one line.
  From 1023 down it drops under the intro, square and centred.
- No class year and no graduation date, expected or otherwise. Education
  shows the start date only (`Aug 2025 — Present`).
  The "last updated" date (footer only) is a static string, never the clock.
- Spell "resume" plain, no accent, everywhere.

## Design system

Palette: bg `#100E0C`, cream `#F3EDE2`, wine `#A6413E` (fills, text on
cream), wine-text `#D1706C` (small text on dark), brass `#B08D57` /
`#CFAE78` (accents on dark only; brass fails contrast on cream), gray
`#9A9287` (secondary on dark, 6.3:1 on bg), ink-2 `#5C554C` (secondary on
cream).
Dark by default, with a light theme ("the same table in daylight") behind
the nav's round sun/moon button, the last thing in the nav, top right.
`src/lib/theme.ts` sets `data-theme` on `<html>`, saves it to
`localStorage` `theme`, and updates `theme-color`; the inline script in
`index.html` applies it before first paint, so nothing flashes. Until
the visitor picks one, the page follows the system's appearance, live
(dark when the system says neither); a pick is saved and wins from then
on. Increase Contrast (`prefers-contrast: more`) steps up gray, rules,
and brass in both themes, and Reduce Transparency makes the nav and the
dialog scrims solid with no blur, both in tokens beside each blur. A focus
ring on cream card stock is wine, not brass (2.7:1 there). Type never
goes below 11px on a phone. Every color
comes from `tokens.css`: page text is `--fg`/`--fg-2`/`--fg-3`, card stock
is `--cream`/`--cream-2`/`--cream-3` (they match in dark and part in
light, where the cards turn brighter than the paper). `--brass-fill` is
brass behind ink (buttons, chips), the same in both themes; `--brass` and
`--brass-2` darken in light so brass text holds 4.5:1. Shadows, the nav
glass, and the scrim are tokens too. Face-down cards and the opening deal's
deck keep their dark backs in light. Never hardcode a page color outside
`tokens.css`.
No full-width divider rules on the page.
Sections, in both views, are parted by an ornament: the next section's
suit centered, with a brass rule running out to both edges of the content
and fading at the ends (`data-suit`, `.section + .section::before` in
base.css). The footer opens with the same ornament around all four suits;
Certifications opens with its label and a rule out to the right edge.
Stats are parted by short vertical brass rules fading at both ends, each
at the exact middle of its gap (`MetricBand` fits each stat to its words,
first and last on the content edges); list rows by space, with a soft
`--bg-2` panel on hover and while open; panels (certs, the form) by a lift and shadow;
"Also in rotation" by nothing at all: one line 20px under the flop's cards
(centred, and the same under the rows in the list view), set like the hero's
seeking line, label in brass and interests in cream; the list rail by a track that fades at both ends; the nav keeps
its plain hairline, with the brass scroll-progress line riding on it and
his chip rolling at its head, centred on the line; `--nav-h` is tall
enough that it never touches the nav's suits
(`ChipMark` in Nav.tsx: the favicon's brass B
on an ink chip with brass edge inlays, turning as far as it travels; drag it left or right and the page scrolls
to match).
`favicon.svg` is the same chip. Rules
printed on the cream card stock stay. `--live` (green) is reserved for the
pulsing dot (`LiveDot`) beside "Live", every "Live Demo", and the nav's
current-role pill, and a "Live Demo" link always has "Repository" beside it.

Type: Fraunces for headlines and card titles (optical sizing on), IBM Plex
Mono for metadata, dates, tags, stat numbers, nav, buttons. No line of
text is left holding a stray word or two: headings, titles, notes, labels,
bullets, and short paragraphs use `text-wrap: balance` (the list in
base.css), long paragraphs keep an ordinary wrap (`pretty`), and
`src/lib/widows.ts` glues the last three words of each paragraph with
no-break spaces, only when that tail fits in half the line, so a narrow
column never overflows. Add a new short-text class to the balance list. Red suits use
wine, black suits use ink, on cream.

Motion: flips 0.55s, row slide 0.5s, hover 0.18s, one ease. Reduced motion
swaps the flip for a fade and drops the deal-in animation (`cards.css`).
`src/styles/motion.css` and `src/lib/motion.ts` hold the rest: the name
rising letter by letter (`SplitText`), the hero hand fanning wider on
hover, card tilt with glare, scroll reveals (`.reveal` for one element,
`.reveal-group` for staggered children, marked with `data-in` rather than
a class so React's className updates cannot undo them), rows of cards dealt in on
scroll, count-up stats, chips dropping onto stacks, a detail page's
sections rising as they arrive and its screenshots laid down one by one
(the enlarged one fades in, cross-fades between shots, and fades out),
each new contact-form status line easing in like the opening's caption, the nav's progress
line and rolling chip and active suit, its labels riffling on hover, and again as their section is reached, through ranks, suits, and glitch marks for about 0.8s (`Riffle.tsx`, the nav never shifts), and the felt's swell (`Felt.tsx`). Anything hidden before it reveals needs both
`html.js` and `prefers-reduced-motion: no-preference`, so it can never
stay invisible.

## Vocabulary — keep it airtight

Your hand (hero) · The spread (experience) · The face cards (leadership) ·
The fan (projects) · The chips (skills) · The flop (personal) · Let's talk
(contact). Buttons and links: "Explore My Work", "View Resume", "Contact
Me" (hero), "Resume" (nav, footer), "Send Message" (submit), "Back to the
hand", "View experience", "Explore the project", "List view" / "Card view", "Live Demo",
"Repository" (a project's code), "App Store" (Ingenio Care's listing), "GitHub" (his own profile: footer, contact, search), "View Credential", "Search", "Back to top" (aria), "Close" / "Previous screenshot" / "Next screenshot" (aria, the enlarged screenshot), "Hold space to skip" / "Hold to skip" (the opening deal), "Click a place to read why" (Favorite Tables), "Switch to light theme" / "Switch to dark theme"
(aria and title on the sun/moon). The
search placeholder is "Search the deck…" and an empty search reads "Not in
the deck: “…”". Face-down cards say "Not dealt yet"; a card face on a touch screen says
"Tap to flip". 404 is
"Not in the deck". Footer sign-off: "Shuffled, not stirred."

## Routes

`/` · `/list` · `/experience/:slug` · `/projects/:slug` · `/sitemap.xml` ·
the `#spread`, `#face`, `#fan`, `#chips`, `#flop`, `#contact` anchors, which
the card view and the list view both carry, so a nav suit scrolls within
whichever view you are in ·
`POST /api/contact` · anything else → 404.
