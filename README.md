# Bhanu Sadhu — Your Hand

A resume dealt as a hand of cards. React + TypeScript on Vite, deployed on
Vercel with one serverless function for the contact form.

```sh
npm install
npm run dev      # http://localhost:5173 (no /api locally)
npm run build    # typecheck + production build to dist/
```

Content lives in `src/data/*.ts`; card, list, and detail views all read the
same entries. See `CLAUDE.md` for the system, vocabulary, and content rules.

## Before going live

- Drop the resume at `public/Bhanu_Sadhu_Resume.pdf`.
- Set `RESEND_API_KEY` in the Vercel project (Resend, via the Vercel
  Marketplace or resend.com). Optional: `CONTACT_TO`, `CONTACT_FROM`.
- Set `VITE_SITE_URL` to the site origin so the social preview resolves.
