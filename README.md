# BASE8 Command Center

BASE8HQ is a mission-themed marketing website for a creative and marketing agency. The site presents BASE8 as a creative command center and guides visitors from agency positioning through services, portfolio work, team information, and lead capture.

## Current Status

The application builds successfully and all public routes are statically generated. See [PROJECT_STATUS.md](PROJECT_STATUS.md) for the verified implementation summary, known risks, and recommended follow-up work.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 3
- Framer Motion animations
- Radix UI and shadcn-style components
- React Hook Form with Zod validation
- Formspree for external form delivery
- Vercel Analytics and Speed Insights

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with agency brief, services, projects, team preview, and CTAs |
| `/operational-units` | Detailed list of eight service divisions |
| `/mission-archive` | Portfolio archive with local category filtering |
| `/headquarters` | About, mission, vision, and operating philosophy |
| `/strike-team` | Team profiles and classified supporting roles |
| `/deploy-mission` | Detailed project intake form |
| `/contact` | General inquiry form and contact channels |
| `*` | Custom not-found page |

Route pages live under [`src/app`](src/app). The global shell is defined in [`src/app/layout.tsx`](src/app/layout.tsx).

## Local Development

### Prerequisites

- Node.js 20.9 or newer
- npm
- Formspree endpoint URLs for the two lead forms

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

### Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_CONTACT_FORM_URL="https://formspree.io/f/YOUR_CONTACT_ID"
NEXT_PUBLIC_DEPLOY_FORM_URL="https://formspree.io/f/YOUR_DEPLOY_ID"
```

These are browser-facing Formspree endpoints, not secrets. The forms will not submit correctly until both values are configured.

## Available Scripts

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm start         # Start the production server
```

Verified on 2026-08-28:

- `npm run lint` passes
- `npm run build` passes
- 7 public pages, a 404 page, robots.txt, and sitemap.xml are generated successfully

## Architecture

- [`src/app`](src/app): App Router pages, route layouts, metadata, error states, loading states, robots, and sitemap
- [`src/components`](src/components): shared navigation, footer, animated sections, cards, and form UI
- [`src/lib`](src/lib): Tailwind utility helpers and Schema.org SEO helpers
- [`src/hooks`](src/hooks): client interaction hooks such as click sounds
- [`public/assets`](public/assets): project, team, headquarters, and hero imagery

The root layout supplies the navbar, footer, global fonts and styles, analytics, speed insights, and organization JSON-LD. Interactive pages and components use client-side React because they depend on form state, browser events, or Framer Motion.

## Forms

The contact form validates name, email, phone, and message before posting JSON to Formspree. The Deploy Mission form additionally collects company, country, project type, budget, timeline, and a project brief. Budget currency and limits change based on country, and a custom timeline can be entered.

There is currently no in-repository API, database, authentication, server-side validation, rate limiting, or spam protection. Form delivery is delegated to Formspree.

## Deployment

Vercel is the recommended deployment target:

1. Import the repository into Vercel.
2. Configure both Formspree environment variables for the target environment.
3. Deploy and enable Vercel Analytics and Speed Insights.

## Documentation

- [features.md](features.md): current feature and architecture reference
- [PROJECT_STATUS.md](PROJECT_STATUS.md): verified status, risks, and prioritized follow-up work
- [AGENTS.md](AGENTS.md): repository-specific Next.js guidance for coding agents
