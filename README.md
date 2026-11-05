# Bhanu Sadhu

**Computer Science + Economics at the University of Illinois Urbana-Champaign, with minors in Statistics and Advertising. I work on product and build the software behind it.**

**[bhanusadhu.com](https://bhanusadhu.com)** · [Resume (PDF)](https://bhanusadhu.com/Bhanu_Sadhu_Resume.pdf) · [LinkedIn](https://www.linkedin.com/in/bhanusadhu) · [Email](mailto:sadhubhanu07@gmail.com)

![Demo of bhanusadhu.com in its default dark theme: a deck shuffles and deals four aces, the CatchBack Cards and ScentLens aces flip open to show the role and the project, the experience spread slides past, and the ⌘K search jumps to the Replay project page](docs/screenshots/demo.gif)

## About

I like the whole path from "what do people actually need?" to a product that works: talking to users, deciding what matters most, and then building it. That has taken me through digital health, AI adoption, strategy consulting, and a handful of products of my own, all live.

Outside work: card games with friends, new restaurants, a growing fragrance collection, Indian cinema and badminton.

## Looking for

**Summer 2027 internships in Product & Software.** Both tracks, equally, and happiest where they meet.

## Experience

| Role | Where | When |
| --- | --- | --- |
| **Product Management Lead** | CatchBack Cards (YC W26) | Oct 2026 to present |
| **Product Strategy & Development Consultant** | Replit | Aug 2026 to present |
| **Senior Strategy Consultant** | A media production firm (confidential) | Aug 2026 to present |
| **Product Builder Intern** | Ingenio Care, a pre-seed digital health startup | May to Aug 2026 |
| **Strategy Consultant** | A Berkshire Hathaway-affiliated manufacturer (confidential) | Jan to May 2026 |
| **Strategy Consultant** | AviLux, a drone technology startup | Jan to May 2026 |

At CatchBack I lead a six-person product team working on where new users stall before a first deposit, and what brings collectors back. At Ingenio Care I redesigned 8 feature areas for the App Store launch. At Replit I work on product research and campus adoption, including the learnathon below.

Leadership: Product Space, Disruption Lab at Gies, Illinois Business Consulting, HackIllinois (marketing), the Indian Student Association and Ghungroo Dance Company.

## Featured projects

| Project | What it is | Links |
| --- | --- | --- |
| **Cambio** | The memory card game, live with friends or fair house bots, with real-time sync and hidden cards kept server-side | [Play](https://cambio.bhanusadhu.com) · [Repo](https://github.com/bhnsadhu/cambio) |
| **Accord** | Fragrance discovery: search 24,651 fragrances, scan a bottle, and get picks that explain themselves | [Try](https://accord.bhanusadhu.com) · [Repo](https://github.com/bhnsadhu/accord) |
| **ScentLens** | The model behind Accord's scanner: names a fragrance from a bottle photo, or says it isn't sure (real-photo top-1 from 30.3% to 66.7%) | [Try](https://scentlens.bhanusadhu.com) · [Repo](https://github.com/bhnsadhu/scent-lens) |
| **Dishwise** | Snap a menu, get every dish ranked for your taste with the points behind each score | [Try](https://dishwise.bhanusadhu.com) · [Repo](https://github.com/bhnsadhu/dishwise) |
| **Replay** | An arcade-style guess-the-song party game: a TV plays the clip, phones are the buttons | [Play](https://replay.bhanusadhu.com) · [Repo](https://github.com/bhnsadhu/replay) |
| **Replit Learnathon** | Event site and project wall for a beginner AI build day at the University of Illinois Urbana-Champaign | [Visit](https://learnathon.bhanusadhu.com) · [Repo](https://github.com/bhnsadhu/replit-learnathon) |

Each repo's README covers the problem, product decisions, architecture and measured results.

## Contact

The fastest way to reach me is [email](mailto:sadhubhanu07@gmail.com) or the contact form on [bhanusadhu.com](https://bhanusadhu.com). I'm also on [LinkedIn](https://www.linkedin.com/in/bhanusadhu).

## About the site

**The idea: a resume you play like a hand of cards.** Each section is a deck. Four aces hold the top highlights, experience is a spread, projects are a fan, skills are chips and personal favourites are the flop. Open a card and it fills its row while the others slide back. For a fast read there's a list view and ⌘K search.

| Decision | Why |
| --- | --- |
| **Two runtime dependencies (React and React DOM)** | The card motion, router and search are written by hand, so the bundle stays small and nothing fights the design. |
| **One content source** | Every role and project is written once in `src/data` and feeds the card, list and detail views, so they can't disagree. |
| **A list view next to the cards** | The card table is the fun part; a recruiter with two minutes gets the same content as a plain list. |
| **Live numbers where they exist** | The Cambio stat comes from a small serverless function that asks Cambio for its player count, caches it for a minute, and falls back to the built-in number if Cambio is down. |
| **Motion that can be skipped** | Hold Space to skip the opening deal. With reduced motion on, flips become fades and the deal doesn't play. |

**Stack:** React 19, TypeScript and Vite, with hand-written CSS. Two Vercel Functions handle the contact form (sent through Resend) and the live Cambio count. Hosted on Vercel.

```bash
npm install
npm run dev     # Vite dev server (the contact form needs the deployed /api)
npm run build   # typecheck, then the production build in dist/
```

Content lives in `src/data/*.ts`, the sections in `src/sections`, and the serverless functions in `api/`.
