# [Your Name] — The Menu

A personal portfolio framed as a restaurant menu. Courses are sections,
dishes are pages. Built with React + TypeScript on Vite, deployed as a static
site on Vercel.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
```

## Fill it in

Every word of copy lives in `src/lib/content.ts`. Anything in `[brackets]`
is placeholder. Replace it there; the pages render from it. Drop your résumé
at the path set in `site.resume` inside `public/`.

## Deploy

Import the repo in Vercel. Framework preset: Vite. `vercel.json` already
rewrites every path to `index.html` for client-side routing and marks fonts
and hashed assets immutable.

See `CLAUDE.md` for the locked design system and menu vocabulary.
