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

## The contact form

`POST /api/contact` sends through Resend. The key is read from `process.env`
inside the function, carries no `VITE_` prefix, and never reaches the client
bundle. The form shows success only after the API confirms the send, and
keeps what was typed when a send fails.

Mail currently goes to **bhnsadhu@gmail.com**, not sadhubhanu07@gmail.com.
Resend's shared `onboarding@resend.dev` sender only delivers to the address
that owns the API key, and refuses anything else with a 403. To switch,
verify a domain at [resend.com/domains](https://resend.com/domains), then set
`CONTACT_FROM` to an address on it and `CONTACT_TO` to sadhubhanu07@gmail.com.
No code change needed. Either way the visitor's address is set as `reply_to`,
so replying from the inbox answers them.

`npm run dev` serves no `/api`, so the form shows its error state locally.
Test on a Vercel preview deployment.

## Before going live

- Drop the resume at `public/Bhanu_Sadhu_Resume.pdf`.
- Set `RESEND_API_KEY` in the Vercel project so the deployed contact form
  can send. Locally it lives in `.env`, which is gitignored; copy
  `.env.example` to `.env` and fill it in.
- Set `VITE_SITE_URL` to the site origin so the social preview resolves.
