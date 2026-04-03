# BASE8 Command Center

Marketing and operations command-center style website built with Vite, React, TypeScript, Tailwind, and shadcn/Radix UI components.

## Current Status

- SPA architecture on Vite + React Router
- Supabase fully removed
- Form submissions routed through Formspree endpoints
- Lint, test, and production build scripts available
- Ready for Vercel deployment

## Tech Stack

- Vite 5
- React 18
- TypeScript 5
- React Router 6
- Tailwind CSS + tailwindcss-animate
- shadcn/Radix UI primitives
- react-hook-form + zod validation
- framer-motion animations
- Vitest + Testing Library
- Playwright (E2E support)

## App Routes

- `/` home
- `/operational-units`
- `/mission-archive`
- `/headquarters`
- `/strike-team`
- `/deploy-mission`
- `/contact`

## Form Integration

The app currently uses Formspree for both public forms:

- Contact form -> `VITE_CONTACT_FORM_URL`
- Deploy Mission form -> `VITE_DEPLOY_FORM_URL`

Both forms submit JSON via `fetch` and preserve existing validation, loading, and success-state UX.

## Environment Variables

Create a local `.env` file in the project root:

```env
VITE_CONTACT_FORM_URL=https://formspree.io/f/your_contact_form_id
VITE_DEPLOY_FORM_URL=https://formspree.io/f/your_deploy_form_id
```

Important:

- `.env` is gitignored
- Use real Formspree endpoints in local, preview, and production environments
- In Vercel, add these variables to Project Settings -> Environment Variables

## Local Development

Requirements:

- Node.js 18+ (recommended)
- npm 9+

Install and run:

```bash
npm install
npm run dev
```

Default dev URL:

- `http://localhost:5173`

## Available Scripts

- `npm run dev` start Vite dev server
- `npm run build` build production bundle
- `npm run build:dev` build in development mode
- `npm run preview` preview production build locally
- `npm run lint` run ESLint
- `npm run test` run Vitest once
- `npm run test:watch` run Vitest in watch mode

## Deployment (Vercel)

1. Import this repository into Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add environment variables:
	 - `VITE_CONTACT_FORM_URL`
	 - `VITE_DEPLOY_FORM_URL`
6. Deploy and run a smoke test on both forms.

## Project Structure

```text
src/
	components/      reusable UI and section components
	hooks/           shared hooks
	lib/             utilities and helpers
	pages/           route-level pages
	test/            test setup and test files
```

## Notes

- This project is no longer using Supabase.
- If a form returns non-2xx, the UI remains on the form and logs an error in the console.
- Keep Formspree spam protection and allowed-origin settings configured in Formspree dashboard.
