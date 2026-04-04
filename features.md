# BASE8 Command Center - Features

## Project Overview
BASE8 Command Center is a Vite + React + TypeScript single-page application for a creative and marketing agency brand. The product is a marketing site with mission-themed storytelling, service showcasing, project portfolio browsing, team profiling, and two validated lead-capture forms submitted to Formspree.

Current architecture is frontend-only. There is no in-repo backend API service, no database schema, and no authentication subsystem. Data is static in code for content sections, while form submissions are sent to external Formspree endpoints configured through Vite environment variables.

The project is currently vendor-neutral with no active Lovable-branded dependencies or metadata in runtime source/config files.

## Feature Roadmap/Status
- [x] SPA shell with typed routing and global layout providers
- [x] Route set for Home, Operational Units, Mission Archive, Headquarters, Strike Team, Deploy Mission, Contact, and 404 fallback
- [x] Responsive navigation with desktop and mobile variants
- [x] Scroll-to-top behavior on route change
- [x] Page-level motion transitions and section entrance animations
- [x] Service cards, project cards, CTA section, and reusable section headers
- [x] Operational Units command-board layout with per-unit capability lists and OPS/unit metadata
- [x] Mission Archive category filtering on the client
- [x] Strike Team interactive 3D hover-to-flip cards with dossier stats
- [x] Contact form with schema validation and async submission
- [x] Deploy Mission form with schema validation, select controls, and async submission
- [x] Form submission integration through Formspree using environment variables
- [x] Global click sound feature for interactive controls
- [x] Tailwind theme variables and custom visual system (glow, glass, scan line, noise)
- [x] ESLint and TypeScript strict-mode pipeline
- [x] Vitest and Playwright scaffolding
- [ ] In-repo backend API endpoints
- [ ] Internal persistence layer and database schema
- [ ] Authentication/authorization layer
- [ ] Webhooks, queues, cron jobs, or server-side background jobs
- [ ] Production-grade automated tests covering business behavior

## Categorized Breakdown

### Core Features
1. Multi-page marketing experience
What: Provides a complete branded experience across seven primary pages plus fallback.
How: Client-side routing via React Router in [src/App.tsx](src/App.tsx), with route components under [src/pages](src/pages).
Files: [src/App.tsx](src/App.tsx), [src/pages/Index.tsx](src/pages/Index.tsx), [src/pages/OperationalUnits.tsx](src/pages/OperationalUnits.tsx), [src/pages/MissionArchive.tsx](src/pages/MissionArchive.tsx), [src/pages/Headquarters.tsx](src/pages/Headquarters.tsx), [src/pages/StrikeTeam.tsx](src/pages/StrikeTeam.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx), [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/NotFound.tsx](src/pages/NotFound.tsx)
Status: Implemented

2. Route-level composition and shared shell
What: Every page gets consistent navigation, footer, noise overlay, and provider context.
How: Root tree wraps routes with QueryClientProvider, TooltipProvider, Sonner toaster, BrowserRouter, Navbar, Footer.
Files: [src/App.tsx](src/App.tsx)
Status: Implemented

3. Hero + sectioned homepage storytelling
What: Home page includes hero, approved operational-unit summaries, project highlights, team highlights, and CTA.
How: Static data arrays power section rendering, with the unit-summary copy aligned to the same eight capabilities used in the dedicated Operational Units page.
Files: [src/pages/Index.tsx](src/pages/Index.tsx), [src/components/ServiceCard.tsx](src/components/ServiceCard.tsx), [src/components/ProjectCard.tsx](src/components/ProjectCard.tsx), [src/components/TeamCard.tsx](src/components/TeamCard.tsx), [src/components/CTASection.tsx](src/components/CTASection.tsx)
Status: Implemented

4. Operational Units listing
What: Displays eight operational divisions with explicit sub-category capability lists.
How: A typed `units` array (`title`, `icon`, `services[]`) renders animated command-board cards with unit index labels and capability-count badges (`OPS`).
Files: [src/pages/OperationalUnits.tsx](src/pages/OperationalUnits.tsx)
Status: Implemented

5. Mission Archive filtering
What: Allows category-based filtering of project cards.
How: Local `filter` state and derived `filtered` list with conditional array filter operation.
Files: [src/pages/MissionArchive.tsx](src/pages/MissionArchive.tsx), [src/components/ProjectCard.tsx](src/components/ProjectCard.tsx)
Status: Implemented

6. Headquarters positioning content
What: Communicates BASE8HQ foundation statement, mission, vision, and operational philosophy with animated cards.
How: Structured two-paragraph About copy plus a values grid rendered with framer-motion fade-in patterns.
Files: [src/pages/Headquarters.tsx](src/pages/Headquarters.tsx)
Status: Implemented

7. Strike Team interactive profiles
What: Team cards flip on hover from profile front to dossier back, then reset when the cursor leaves.
How: Local `flipped` state per card driven by `onMouseEnter`/`onMouseLeave`, 3D transform classes, hidden backfaces, smooth rotateY transition easing, and stat bars.
Files: [src/components/TeamCard.tsx](src/components/TeamCard.tsx), [src/pages/StrikeTeam.tsx](src/pages/StrikeTeam.tsx), [src/pages/Index.tsx](src/pages/Index.tsx)
Status: Implemented

8. Shadow Operatives roster
What: Displays secondary classified role cards.
How: Static role array mapped into card-glass placeholders.
Files: [src/pages/StrikeTeam.tsx](src/pages/StrikeTeam.tsx)
Status: Implemented

9. Contact intelligence panel
What: Contact page presents fixed communication channels and social placeholders.
How: Icon + label/value mapping rendered in card blocks and icon links.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx)
Status: Implemented

10. Global CTA conversion surfaces
What: Calls-to-action route users toward project intake and contact.
How: Reusable CTASection plus navbar/home/footer CTA links.
Files: [src/components/CTASection.tsx](src/components/CTASection.tsx), [src/components/Navbar.tsx](src/components/Navbar.tsx), [src/pages/Index.tsx](src/pages/Index.tsx)
Status: Implemented

### Backend Features
1. Backend architecture status
What: No backend service exists in this repository.
How: No server runtime, no API route directory, no database adapter, no ORM, no migration files.
Files: [package.json](package.json), [README.md](README.md)
Status: Not implemented (intentional current architecture)

2. External submission pipeline (Contact)
What: Submits validated contact payload to an external endpoint.
How: `fetch(import.meta.env.VITE_CONTACT_FORM_URL)` with `POST`, JSON body, and response status check.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/vite-env.d.ts](src/vite-env.d.ts)
Status: Implemented

3. External submission pipeline (Deploy Mission)
What: Submits validated mission payload to an external endpoint.
How: `fetch(import.meta.env.VITE_DEPLOY_FORM_URL)` with `POST`, JSON body, and response status check.
Files: [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx), [src/vite-env.d.ts](src/vite-env.d.ts)
Status: Implemented

4. Client-side validation gate before submit (Contact)
What: Enforces payload quality before network submission.
How: Zod schema + react-hook-form resolver.
Validation details:
- `name`: minimum 2 characters
- `email`: valid email format
- `message`: minimum 10 characters
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx)
Status: Implemented

5. Client-side validation gate before submit (Deploy Mission)
What: Enforces mission-brief requirements before network submission.
How: Zod schema + react-hook-form resolver.
Validation details:
- `name`: minimum 2 characters
- `company`: minimum 2 characters
- `email`: valid email format
- `project_type`: required (non-empty)
- `budget`: optional
- `timeline`: optional
- `description`: minimum 20 characters
Files: [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx)
Status: Implemented

6. Submission lifecycle handling
What: Handles async states around submission request lifecycle.
How: Local state flags `isSubmitting`, `submitted`, `submitError`; disables submit buttons while pending.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx)
Status: Implemented

7. Error signaling and fallback behavior
What: Detects non-2xx responses and keeps user on form.
How: Throws on `!response.ok`, catches and logs error, does not set success state.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx)
Status: Implemented

8. Type-safe environment contract for endpoints
What: Prevents untyped environment access.
How: Extends `ImportMetaEnv` with required `VITE_CONTACT_FORM_URL` and `VITE_DEPLOY_FORM_URL`.
Files: [src/vite-env.d.ts](src/vite-env.d.ts)
Status: Implemented

9. Security posture currently present
What: Keeps secrets/config local and avoids hardcoded endpoint values in source.
How: `.env` and `.env.*` gitignored, env variable indirection used at runtime.
Files: [.gitignore](.gitignore), [README.md](README.md)
Status: Implemented

10. Security and backend controls currently absent
What: No in-repo rate limiting, auth, anti-bot verification logic, or server-side data validation layer.
How: Architecture delegates submission to Formspree; no custom backend middleware exists in code.
Files: [package.json](package.json), [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx)
Status: Not implemented (externalized)

### Frontend Features
1. Design system and theme tokens
What: Centralized visual language with dark theme defaults and golden primary accent (#F5A623).
How: CSS custom properties and Tailwind theme extension.
Files: [src/index.css](src/index.css), [tailwind.config.ts](tailwind.config.ts)
Status: Implemented

2. Glassmorphism + glow visual style
What: Reusable card and button aesthetics that define brand look.
How: `.card-glass`, `.btn-glow`, `.btn-glow-filled`, glow separator, scan line, noise overlay, and glow color values tuned to #F5A623-based rgba/HSL tokens.
Files: [src/index.css](src/index.css)
Status: Implemented

3. Responsive navigation system
What: Sticky navbar with desktop links and animated mobile menu.
How: Breakpoint-conditioned layouts (`lg`), `mobileOpen` state toggle, AnimatePresence transitions, route-aware active style.
Files: [src/components/Navbar.tsx](src/components/Navbar.tsx)
Status: Implemented

4. Route-change scroll reset
What: Eliminates stale scroll position when navigating between pages.
How: Watches pathname and calls `window.scrollTo(0, 0)`.
Files: [src/components/ScrollToTop.tsx](src/components/ScrollToTop.tsx)
Status: Implemented

5. Page transition animation wrapper
What: Gives consistent fade transitions for page sections.
How: Framer motion wrapper with initial/animate/exit opacity states.
Files: [src/components/PageWrapper.tsx](src/components/PageWrapper.tsx)
Status: Implemented

6. Section header abstraction
What: Consistent heading structure for page sections.
How: Reusable component with tag, title, and subtitle props.
Files: [src/components/SectionHeader.tsx](src/components/SectionHeader.tsx)
Status: Implemented

7. Service card module
What: Reusable unit card with icon, title, description, and staggered entrance.
How: Motion card component receiving icon and content props; currently used for homepage unit summaries.
Files: [src/components/ServiceCard.tsx](src/components/ServiceCard.tsx)
Status: Implemented

8. Operational capability command-board cards
What: Unit-specific cards on the Operational Units page expose exact sub-category service lists.
How: `motion.article` cards render icon, unit label (UNIT XX), OPS count badge, and row-level capability items from each unit's `services[]` array.
Files: [src/pages/OperationalUnits.tsx](src/pages/OperationalUnits.tsx)
Status: Implemented

8. Project card module
What: Reusable project card with gradient overlay and hover zoom.
How: Motion wrapper and group-hover image scaling.
Files: [src/components/ProjectCard.tsx](src/components/ProjectCard.tsx)
Status: Implemented

9. Team card 3D dossier module
What: Hover-triggered card flipping between profile and intel stats.
How: `useState` hover state, `onMouseEnter`/`onMouseLeave` triggers, 3D perspective, rotateY transforms, smooth easing/duration tuning, hidden backfaces, and stat-width class mapping.
Files: [src/components/TeamCard.tsx](src/components/TeamCard.tsx)
Status: Implemented

10. Form component abstraction
What: Consistent form controls and accessible error messaging.
How: shadcn form wrappers around react-hook-form context (`FormField`, `FormItem`, `FormMessage`, `FormControl`).
Files: [src/components/ui/form.tsx](src/components/ui/form.tsx)
Status: Implemented

11. Form controls used in lead flows
What: Inputs, textarea, select dropdowns, and button variants used in both lead forms.
How: Reusable UI components from shadcn stack with Tailwind class overrides.
Files: [src/components/ui/input.tsx](src/components/ui/input.tsx), [src/components/ui/textarea.tsx](src/components/ui/textarea.tsx), [src/components/ui/select.tsx](src/components/ui/select.tsx), [src/components/ui/button.tsx](src/components/ui/button.tsx)
Status: Implemented

12. Mission Archive client filtering UX
What: User toggles category tabs to narrow visible project cards.
How: `filter` state + inline button controls + conditional style by active category.
Files: [src/pages/MissionArchive.tsx](src/pages/MissionArchive.tsx)
Status: Implemented

13. Success confirmation states for forms
What: Replaces form UI with confirmation card after successful submission.
How: Conditional rendering based on `submitted` boolean.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx)
Status: Implemented

14. Loading-state submit labels
What: Provides immediate action feedback while request is in flight.
How: Conditional button text (`Sending...`, `Deploying...`) plus `disabled` state.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx)
Status: Implemented

15. Social icon link placeholders
What: Visual social channels exist but destination URLs are placeholders.
How: Static `href="#"` links in contact/footer sections.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/components/Footer.tsx](src/components/Footer.tsx)
Status: Implemented (placeholder destinations)

16. Global click sound feature
What: Plays click SFX on interactive targets.
How: Global capture-phase document listener, target selector matching, disabled target skipping, reusable audio instance.
Files: [src/lib/clickSound.ts](src/lib/clickSound.ts), [src/main.tsx](src/main.tsx), [src/assets/sound effects/click sound 1.wav](src/assets/sound%20effects/click%20sound%201.wav)
Status: Implemented

17. Mobile breakpoint utility hook
What: Exposes isMobile boolean tied to width threshold.
How: `matchMedia` listener around 768px breakpoint.
Files: [src/hooks/use-mobile.tsx](src/hooks/use-mobile.tsx)
Status: Implemented

18. Toast state engine
What: Reducer-driven toast queue with update/dismiss/remove actions.
How: In-memory state + listener fan-out + delayed removal queue.
Files: [src/hooks/use-toast.ts](src/hooks/use-toast.ts), [src/components/ui/use-toast.ts](src/components/ui/use-toast.ts)
Status: Implemented (infrastructure; low active usage in pages)

19. NotFound fallback and route debugging
What: Handles unknown routes with user-facing 404 and developer console output.
How: Catch-all route in app + path-specific error log in component effect.
Files: [src/App.tsx](src/App.tsx), [src/pages/NotFound.tsx](src/pages/NotFound.tsx)
Status: Implemented

20. UI primitive inventory (shadcn + Radix)
What: Large reusable primitive set available for future expansion.
How: Component files under ui folder.
Files: [src/components/ui](src/components/ui)
Available primitives:
- accordion
- alert-dialog
- alert
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- carousel
- chart
- checkbox
- collapsible
- command
- context-menu
- dialog
- drawer
- dropdown-menu
- form
- hover-card
- input-otp
- input
- label
- menubar
- navigation-menu
- pagination
- popover
- progress
- radio-group
- resizable
- scroll-area
- select
- separator
- sheet
- sidebar
- skeleton
- slider
- sonner
- switch
- table
- tabs
- textarea
- toast
- toaster
- toggle-group
- toggle
- tooltip
- use-toast
Status: Implemented as component inventory

### Integrations
1. Formspree
What: Third-party form backend used for both lead flows.
How: Direct browser POST to environment-configured endpoints.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx), [src/vite-env.d.ts](src/vite-env.d.ts)
Status: Implemented

2. Framer Motion
What: Animation engine for entrance, transitions, and motion interactions.
How: `motion.*` elements and AnimatePresence patterns.
Files: [src/pages/Index.tsx](src/pages/Index.tsx), [src/components/Navbar.tsx](src/components/Navbar.tsx), [src/components/PageWrapper.tsx](src/components/PageWrapper.tsx), [src/components/TeamCard.tsx](src/components/TeamCard.tsx)
Status: Implemented

3. React Hook Form + Zod
What: Typed form handling and schema validation.
How: `useForm`, `zodResolver`, schemas, and shadcn form wrappers.
Files: [src/pages/Contact.tsx](src/pages/Contact.tsx), [src/pages/DeployMission.tsx](src/pages/DeployMission.tsx), [src/components/ui/form.tsx](src/components/ui/form.tsx)
Status: Implemented

4. shadcn + Radix UI
What: Accessible primitives and composable UI building blocks.
How: Local component wrappers and utility classes.
Files: [components.json](components.json), [src/components/ui](src/components/ui)
Status: Implemented

5. React Query
What: Query caching and async-state foundation.
How: Global QueryClient initialized and provided at app root.
Files: [src/App.tsx](src/App.tsx)
Status: Implemented as infrastructure (not heavily consumed by page logic)

6. Playwright fixture integration
What: E2E test harness integration point.
How: Standard Playwright configuration and fixture re-export from `@playwright/test`.
Files: [playwright.config.ts](playwright.config.ts), [playwright-fixture.ts](playwright-fixture.ts)
Status: Implemented as infrastructure

### Non-Functional Features
1. Build performance and dev velocity
What: Fast local dev and modern build output.
How: Vite + SWC plugin, HMR, optimized static bundle output.
Files: [vite.config.ts](vite.config.ts), [package.json](package.json)
Status: Implemented

2. Type safety and compile-time checks
What: TypeScript strict mode with path aliasing and project references.
How: tsconfig hierarchy with strict flags and noEmit compilation.
Files: [tsconfig.json](tsconfig.json), [tsconfig.app.json](tsconfig.app.json), [tsconfig.node.json](tsconfig.node.json)
Status: Implemented

3. Linting and code consistency
What: Enforces React hooks and general TypeScript lint quality.
How: ESLint flat config with scoped rule customization for UI primitives.
Files: [eslint.config.js](eslint.config.js)
Status: Implemented

4. Browser compatibility support
What: CSS processing supports vendor prefixing and Tailwind transforms.
How: PostCSS pipeline with autoprefixer.
Files: [postcss.config.js](postcss.config.js)
Status: Implemented

5. Responsive layout strategy
What: Mobile-first page composition with breakpoint-specific grids and nav behavior.
How: Tailwind responsive utilities and custom mobile hook.
Files: [src/index.css](src/index.css), [src/hooks/use-mobile.tsx](src/hooks/use-mobile.tsx), [src/components/Navbar.tsx](src/components/Navbar.tsx)
Status: Implemented

6. Accessibility support in forms
What: Inputs expose aria-invalid and descriptive error IDs for assistive tech.
How: shadcn form control wiring through `FormControl`, `FormMessage`, and generated ids.
Files: [src/components/ui/form.tsx](src/components/ui/form.tsx)
Status: Implemented

7. Deployment readiness for static host
What: Build output and env conventions align with Vercel deployment flow.
How: Production build to `dist`, env vars documented, no server runtime dependency.
Files: [README.md](README.md), [package.json](package.json)
Status: Implemented

8. Testing maturity snapshot
What: Test toolchain exists but feature-level coverage is minimal.
How: Vitest config and setup present with placeholder example test; Playwright config present without substantial suites.
Files: [vitest.config.ts](vitest.config.ts), [src/test/setup.ts](src/test/setup.ts), [src/test/example.test.ts](src/test/example.test.ts), [playwright.config.ts](playwright.config.ts)
Status: Partially implemented

9. Vendor-neutral toolchain baseline
What: Build/test/runtime config no longer relies on Lovable-specific plugins or wrappers.
How: Vite uses standard React SWC plugin only, Playwright uses standard `@playwright/test` config + fixture, and Lovable metadata references have been removed from HTML/config docs.
Files: [vite.config.ts](vite.config.ts), [playwright.config.ts](playwright.config.ts), [playwright-fixture.ts](playwright-fixture.ts), [index.html](index.html), [package.json](package.json)
Status: Implemented

## Architecture Snapshot
- Frontend runtime: React SPA with route-driven page composition and reusable animated components.
- Backend/API: None in repository.
- Data source: Static in-code arrays and external Formspree endpoints for form submission.
- Persistence: Externalized through integration provider; no in-repo database schema.
- State management: Local component state + react-hook-form state + prepared React Query provider.
- Error model: Local try/catch around fetch requests, inline message rendering, console logging.

## Maintenance Log
### Update Protocol
When this file is updated in future prompts, append a new entry with:
- Date (YYYY-MM-DD)
- Author/Agent
- Change Type (`Added`, `Updated`, `Deprecated`, `Removed`)
- Feature IDs or section names touched
- Files impacted
- Rationale
- Verification performed (lint/build/tests/manual)

### Log Entries
- 2026-04-04 | GitHub Copilot (GPT-5.3-Codex) | Added | Initial comprehensive feature baseline | [features.md](features.md) | Generated from full codebase audit across pages, components, config, and tests | Verification: File created and content aligned to current source
- 2026-04-04 | GitHub Copilot (GPT-5.3-Codex) | Updated | Operational Units redesign, homepage unit-summary narrative refresh, HQ About copy refresh, #F5A623 palette adoption, and vendor-neutral Lovable cleanup | [features.md](features.md), [src/pages/OperationalUnits.tsx](src/pages/OperationalUnits.tsx), [src/pages/Index.tsx](src/pages/Index.tsx), [src/pages/Headquarters.tsx](src/pages/Headquarters.tsx), [src/index.css](src/index.css), [vite.config.ts](vite.config.ts), [playwright.config.ts](playwright.config.ts), [playwright-fixture.ts](playwright-fixture.ts), [index.html](index.html), [package.json](package.json) | Keep documentation synchronized with current implementation and branding/tooling decisions | Verification: npm run lint, npm run build
- 2026-04-04 | GitHub Copilot (GPT-5.3-Codex) | Updated | Strike Team card interaction model changed from click-toggle to hover-in/hover-out flip with smoother slower transition tuning | [features.md](features.md), [src/components/TeamCard.tsx](src/components/TeamCard.tsx) | Keep feature documentation aligned with current UX interaction behavior | Verification: Manual source verification against TeamCard implementation
