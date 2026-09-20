# Your Hand

[![Your Hand: Bhanu Sadhu, dealt in.](public/og.png)](https://bhanusadhu.com)

A poker-themed resume site. Every section is a deck of cards, and the one you open fills the row while the rest slide back.

**Live: [bhanusadhu.com](https://bhanusadhu.com)**

## Who this is for

This is the portfolio of **Bhanu Sadhu**, a Computer Science + Economics student at the University of Illinois Urbana-Champaign (minors in Statistics and Advertising).

Bhanu is recruiting for **Summer 2027 internships**, in this order:

1. Product Management
2. Software Engineering
3. Business Analyst
4. Project Management
5. Business Development

If you're a recruiter or hiring manager, the [live site](https://bhanusadhu.com) is the fastest way in. The resume is one click from the top of the page. If you're a developer poking around the source, the rest of this README is for you.

Reach Bhanu at [sadhubhanu07@gmail.com](mailto:sadhubhanu07@gmail.com), on [LinkedIn](https://www.linkedin.com/in/bhanusadhu), or through the contact form on the site.

## The concept

A resume is a hand you're dealt and how you play it. So the whole site is a deck:

| Section | On the site | What's in it |
| --- | --- | --- |
| Hero | **Your hand** | Intro, recruiting order, four aces that each link to a fuller entry |
| Experience | **The spread** | Roles laid out as a row of cards |
| Leadership | **The face cards** | Kings, queens, and jacks, dealt three to a suit |
| Projects | **The fan** | Fanned cards. Ideas not built yet sit face down: "Not dealt yet" |
| Skills + certifications | **The chips** | Chip stacks, with the real count beside each |
| Personal | **The flop** | Interests, four cards |
| Contact | **Let's talk** | The contact form |

Broken links get "Not in the deck". The footer says "Shuffled, not stirred."

## What it does

- **Cards flip open.** Click a card and it flips, fills its row, and slides the others back into slivers. Escape closes it. The front is a real button, the back is a labelled region, and focus moves in on open and back out on close, so it works from a keyboard.
- **Card view or list view.** Every section has a flat `/list` version of the same data, plus Education. The nav suits scroll within whichever view you're in.
- **Detail pages.** Each experience and project has its own shareable URL (`/experience/:slug`, `/projects/:slug`).
- **Resume in one click.** "View Resume" opens the PDF in a new tab.
- **A contact form that works.** It posts to a serverless function that validates the message, drops bot submissions, and emails Bhanu through Resend, with your address as the reply-to. If delivery ever fails, the form says so plainly and hands you a direct email address instead of pretending.
- **Built to be shared.** Social preview image, a `sitemap.xml` generated from the same data the router uses, and `robots.txt`.
- **Careful with motion.** With reduced motion on, the flip becomes a fade and the deal-in animation is dropped.
- **Desktop first, phone friendly.** Phones get a stacked layout.

## Tech stack

Small on purpose. The only runtime dependencies are React and React DOM.

| Layer | Choice |
| --- | --- |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org) |
| Build | [Vite 7](https://vite.dev) with `@vitejs/plugin-react` |
| Hosting + backend | [Vercel](https://vercel.com): static front end plus one Vercel Function (`api/contact.ts`) |
| Email | [Resend](https://resend.com), called over its REST API (no SDK) |
| Styling | Plain CSS with design tokens. No framework, no animation library |
| Routing | A small in-house router (`src/lib/router.tsx`) with `/#anchor` links, view transitions, and scroll restoration |
| Type | [Fraunces](https://fonts.google.com/specimen/Fraunces) for headlines, [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) for metadata, both from Google Fonts |

All content lives in typed files under `src/data/`. One source feeds the card view, the list view, and the detail pages, so they can't disagree.

## Run it locally

You'll need Node 20.19+ (a Vite 7 requirement).

```bash
git clone https://github.com/bhnsadhu/personal-website.git
cd personal-website
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck (`tsc -b`, includes `api/`), then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Typecheck only |

The dev server doesn't run `/api`, so locally the contact form shows its error state. To try the form end to end, use a Vercel deployment with the key below set.

## Environment variables

Copy `.env.example` to `.env`. It's gitignored, so never commit real values.

| Variable | Required | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Lets the function send mail through Resend. Read from `process.env` inside the function only, never `VITE_`-prefixed, so it stays out of the client bundle. Without it the route answers 503 and the form shows an honest error. |
| `CONTACT_TO` | No | Where messages go. Defaults to `sadhubhanu07@gmail.com`. |
| `CONTACT_FROM` | No | The sender. Defaults to `Portfolio <hello@bhanusadhu.com>`. It must sit on a domain verified in Resend. |

Set them in the Vercel project settings for deployed builds.

## Where things live

```
api/contact.ts        Vercel Function behind the contact form
public/               Resume PDF, social preview, favicon, robots.txt
src/data/             All content, typed
src/components/       Card, CardRow, Chips, Nav, Footer
src/sections/         One file per suit: Hand, Spread, FaceCards, Fan, ChipsSection, Flop, CallOrFold
src/pages/            Home, ListView, ExperienceDetail, ProjectDetail, NotFound
src/lib/router.tsx    The router
src/styles/           Tokens, base, cards, sections, pages
```

## Deploying

Hosted on Vercel. `vercel.json` rewrites everything except `/api/*` to the SPA and caches hashed assets for a year. `sitemap.xml` and `robots.txt` are served from the filesystem, ahead of that rewrite.

---

Shuffled, not stirred.
