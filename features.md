# BASE8 Command Center: Features and Architecture

This document describes the implementation currently present in the repository. It replaces the former Vite-era feature inventory, which referenced files and environment variables that no longer exist.

## Product

BASE8HQ is a creative agency marketing site with a mission-control visual language. It communicates agency positioning, eight service divisions, selected project work, team capabilities, and two conversion paths for prospective clients.

## Technology

- **Framework:** Next.js 16 App Router
- **Runtime:** React 19
- **Language:** TypeScript with strict mode
- **Styling:** Tailwind CSS 3 and custom CSS variables
- **Animation:** Framer Motion
- **UI:** Radix UI primitives with shadcn-style wrappers
- **Forms:** React Hook Form and Zod
- **Lead delivery:** Formspree via browser-side `fetch`
- **Observability:** Vercel Analytics and Speed Insights

## Route Inventory

| Route | Implementation | Behavior |
| --- | --- | --- |
| `/` | [`src/app/page.tsx`](src/app/page.tsx) | Hero, agency brief, eight service summaries, four projects, team preview, and CTAs |
| `/operational-units` | [`src/app/operational-units/page.tsx`](src/app/operational-units/page.tsx) | Eight typed service divisions with capability lists |
| `/mission-archive` | [`src/app/mission-archive/page.tsx`](src/app/mission-archive/page.tsx) | Four-project portfolio with client-side category filtering |
| `/headquarters` | [`src/app/headquarters/page.tsx`](src/app/headquarters/page.tsx) | Agency history, mission, vision, and operating philosophy |
| `/strike-team` | [`src/app/strike-team/page.tsx`](src/app/strike-team/page.tsx) | Four team profiles and four supporting “Shadow Operatives” roles |
| `/deploy-mission` | [`src/app/deploy-mission/page.tsx`](src/app/deploy-mission/page.tsx) | Detailed project-intake workflow |
| `/contact` | [`src/app/contact/page.tsx`](src/app/contact/page.tsx) | General inquiry workflow and communication links |
| `*` | [`src/app/not-found.tsx`](src/app/not-found.tsx) | Global 404 fallback |

The route tree also includes route-level `layout.tsx`, `loading.tsx`, and `error.tsx` files where applicable, plus generated [`robots.txt`](src/app/robots.ts) and [`sitemap.xml`](src/app/sitemap.ts).

## Shared Components

- [`Navbar.tsx`](src/components/Navbar.tsx): responsive desktop/mobile navigation, active-route styling, scroll-aware header, and mission CTA
- [`Footer.tsx`](src/components/Footer.tsx): shared site footer
- [`PageWrapper.tsx`](src/components/PageWrapper.tsx): page transition and background wrapper
- [`SectionHeader.tsx`](src/components/SectionHeader.tsx): consistent section heading treatment
- [`ServiceCard.tsx`](src/components/ServiceCard.tsx): animated service summary
- [`ProjectCard.tsx`](src/components/ProjectCard.tsx): image-based portfolio card
- [`TeamCard.tsx`](src/components/TeamCard.tsx): animated team dossier card
- [`CTASection.tsx`](src/components/CTASection.tsx): shared conversion section
- [`components/ui`](src/components/ui): form controls and Radix/shadcn-style primitives

## Visual System

[`src/app/globals.css`](src/app/globals.css) defines the dark background, orange primary accent, Orbitron heading font, Inter body font, grid/radial backgrounds, glass cards, glow buttons, scan line, separators, noise overlay, and scrollbar styling. Images are served from [`public/assets`](public/assets) and rendered with `next/image`.

## Forms

### Contact

The contact form uses React Hook Form and Zod to validate:

- Name: minimum 2 characters
- Email: valid email format
- Phone: 7-20 characters matching the accepted phone pattern
- Message: minimum 10 characters

It posts JSON to `NEXT_PUBLIC_CONTACT_FORM_URL` and displays local submitting, success, and error states.

### Deploy Mission

The project-intake form validates contact details, company, country, project type, budget, timeline, and a minimum 20-character brief. Pakistan uses PKR with a maximum budget of 1,000,000; the other supported regions use their mapped currency with a maximum of 50,000. A custom timeline field appears when selected.

It posts a normalized JSON payload, including `budget_currency`, to `NEXT_PUBLIC_DEPLOY_FORM_URL`.

## SEO and Analytics

The root layout provides metadata, Open Graph and Twitter cards, Organization JSON-LD, Vercel Analytics, and Speed Insights. [`src/app/robots.ts`](src/app/robots.ts) and [`src/app/sitemap.ts`](src/app/sitemap.ts) generate crawl metadata. Route layouts provide page-specific metadata.

## Current Boundaries

This repository is a static-first frontend. It has no custom API routes, database, authentication, server actions, server-side form validation, rate limiting, spam protection, or automated test suite. Form submissions and their delivery are handled externally by Formspree.

All route pages currently use client components because their presentation depends on Framer Motion or form/browser interaction. This works and builds successfully, but static content could be moved behind smaller client animation islands in a future performance pass.

## Verification

As of 2026-08-28:

- `npm run lint` passes
- `npm run build` passes
- Next.js statically generates the seven public routes, 404, robots.txt, and sitemap.xml

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for known risks and the recommended work order.
