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
  `interests`), links, and the static "as of" / "last updated" dates.
  `hand.ts` (four aces, each links to its fuller entry), `experience.ts`
  (the spread; `via` names the consulting org, kept separate from the
  client), `leadership.ts` (face cards, fixed order, `progression` and
  `related` optional), `projects.ts` (the fan), `education.ts`,
  `certifications.ts`, `skills.ts`, `personal.ts` (four cards, five
  `entries` each), `metrics.ts`, `sections.ts` (`sectionHeads`: each
  section's eyebrow and title, and `sectionNotes`: the note beside it,
  rendered by both the card view and the list view).
- `src/components/Backs.tsx` — what each entry says when it opens, one
  component per kind (hand, experience, leadership, project, personal).
  The card renders it on its back and the list view inside its row, so the
  two views cannot drift. `ContactBody`, `ContactLinks`,
  `Certifications`, and `PersonalExtras` (the "Also in rotation" line under
  the flop) are shared the same way.
- `src/components/Card.tsx` — one playing card: front is a `<button>`, back
  is a `role="region"` with the full content, always in the DOM, `inert`
  until open. Focus moves into the back on open and returns on close. The
  front's title, italic subtitle, and dates sit in one column with equal
  spacing, so the subtitle is midway between the title and the dates.
  Cards keep a fixed shape: 5:7 on desktop, and on phones one size for
  every card (full width, 272px tall). Face cards carry a large framed
  portrait letter above the title.
- `src/components/CardRow.tsx` — owns which card is open in a row; sets
  `grid-template-columns` (7fr for the open card, 1fr slivers) and handles
  Escape. Layouts: `row` (spread, fan), `fan` (hero overlap), `flop` (short
  centered sets). Rows center with auto margins, so wrap them in a block,
  never a grid or flex parent. At 720px and below every row stacks; from
  721 to 1149 a closed row of four or more wraps (three per line, two for
  exactly four), and from 721 to 1023 the hero fan tightens, so nothing
  crushes or scrolls sideways on a tablet or small laptop.
- `src/sections/` — Hand (hero: intro, actions, seeking line, and
  beside them `HeroPhoto`, then four aces), Spread (experience), FaceCards (leadership, dealt three to a suit
  in one row per suit: K/Q/J spades, then clubs), Fan (projects;
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
- The nav's "Currently @" pill names the role whose slug is `site.currently`
  and links to its page. Hidden at 1149px and below.
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
  `#section` link or reduced motion. It cannot be skipped (about 4.5s; the
  page is locked until it hands over). While it plays, motion.css hides the real hand and pauses the name's
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
  (`site.schoolShort`, `site.major`, `site.focus`), no location; the list view's header says the same. Every list of the three is "Product, Software, &
  Strategy" (`site.title`, split as `site.interests`): tab title, social
  meta, the hero's seeking line with Product highlighted, and the
  `site.availability` sentence in the contact section and the list
  view. No long form, no other role list.
- The card view and the list view say the same things in the same words.
  Shared text lives in `src/data`, never inline in one view.
- Confidential clients stay unnamed in text, slugs, metadata, and labels.
  The consulting org (Illinois Business Consulting, Disruption Lab at Gies)
  is named separately as `via`.
- Team results belong to the team. Ongoing work is present tense; proposed
  or idea-stage things (AviLux pilot, the AI learnathon, the
  apartment-chores product) are never described as launched.
- No GPA, grades, honors, ratings, or invented metrics and dates. One
  photo only: `site.photo` (`public/grainger-bob.jpg`, metadata
  stripped), rendered by `src/components/HeroPhoto.tsx` beside the name
  in both heroes as a cream print with its caption in the bottom margin;
  under the intro on phones.
- No class year and no graduation date, expected or otherwise. Education
  shows the start date only (`Aug 2025 — Present`).
  "As of" and "last updated" dates are static strings, never the clock.
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
`index.html` applies it before first paint, so nothing flashes. Dark
unless the visitor chose light; no system-preference switch. Every color
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
Stats are parted by small brass dots; list rows by space, with a soft
`--bg-2` panel on hover and while open; panels (certs, the form) by a lift and shadow;
"Also in rotation" by nothing at all: one line 20px under the flop's cards
(centred; in the list view left on the rows' pip edge), set like the hero's
seeking line, label in brass and interests in cream; the list rail by a track that fades at both ends; the nav keeps
its plain hairline, with the brass scroll-progress line riding on it. Rules
printed on the cream card stock stay. `--live` (green) is reserved for the
pulsing dot (`LiveDot`) beside "Live", every "Live Demo", and the nav's
"Currently @" pill, and a "Live Demo" link always has "Repository" beside it.

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
scroll, count-up stats, chips dropping onto stacks, the nav's progress
line and active suit. Anything hidden before it reveals needs both
`html.js` and `prefers-reduced-motion: no-preference`, so it can never
stay invisible.

## Vocabulary — keep it airtight

Your hand (hero) · The spread (experience) · The face cards (leadership) ·
The fan (projects) · The chips (skills) · The flop (personal) · Let's talk
(contact). Buttons and links: "Explore My Work", "View Resume", "Contact
Me" (hero), "Resume" (nav, footer), "Send Message" (submit), "Back to the
hand", "View experience", "Explore the project", "List view" / "Card view", "Live Demo",
"Repository" (a project's code), "GitHub" (his own profile: footer, contact, search), "View Credential", "Search", "Back to top" (aria), "Switch to light theme" / "Switch to dark theme"
(aria and title on the sun/moon), "Currently @ …". The
search placeholder is "Search the deck…" and an empty search reads "Not in
the deck: “…”". Face-down cards say "Not dealt yet". 404 is
"Not in the deck". Footer sign-off: "Shuffled, not stirred."

## Routes

`/` · `/list` · `/experience/:slug` · `/projects/:slug` · `/sitemap.xml` ·
the `#spread`, `#face`, `#fan`, `#chips`, `#flop`, `#contact` anchors, which
the card view and the list view both carry, so a nav suit scrolls within
whichever view you are in ·
`POST /api/contact` · anything else → 404.
