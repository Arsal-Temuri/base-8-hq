# BASE8 Command Center

This is the Next.js 16 version of the BASE8 Command Center. It has been successfully migrated from Vite to Next.js App Router for optimal SEO and performance.

## Prerequisites
- Node.js >= 18
- Formspree Project IDs 

## Environment Variables

Create a `.env.local` file in the **root of the project** with the following variables:

```bash
NEXT_PUBLIC_CONTACT_FORM_URL="https://formspree.io/f/YOUR_CONTACT_ID"
NEXT_PUBLIC_DEPLOY_FORM_URL="https://formspree.io/f/YOUR_DEPLOY_ID"
```

**Note:** The `NEXT_PUBLIC_` prefix is required so these variables are accessible in the browser. Replace `YOUR_CONTACT_ID` and `YOUR_DEPLOY_ID` with your actual Formspree project IDs.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Analytics & Production
This project has `@vercel/analytics` and `@vercel/speed-insights` injected directly into the global layout. 

When deploying to Vercel:
1. Connect this repository to your Vercel Dashboard.
2. Under Settings > Environment Variables, place your Formspree hash IDs.
3. Click "Enable Analytics" and "Enable Speed Insights" in the Vercel dashboard.

These features will automatically track Real User Metrics (RUM) and Core Web Vitals on your production domain.
