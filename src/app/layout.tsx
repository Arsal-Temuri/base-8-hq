import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { getOrganizationJsonLd } from "@/lib/seo";

import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedShaderBackground from "@/components/AnimatedShaderBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://base8hq.com"),
  title: {
    template: "%s | BASE8HQ",
    default: "BASE8 Headquarters | Creative & Marketing Agency",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description: "A high-performance creative command center built for brands that refuse to blend in. Branding, strategy, and media production.",
  keywords: ["marketing", "creative agency", "branding", "web development", "video production", "digital marketing"],
  openGraph: {
    title: "BASE8 Headquarters",
    description: "A high-performance creative command center built for brands that refuse to blend in.",
    url: "https://base8hq.com",
    siteName: "BASE8HQ",
    images: [
      {
        url: "/assets/hq-office.jpg",
        width: 1200,
        height: 630,
        alt: "BASE8HQ Command Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BASE8 Headquarters",
    description: "A high-performance creative command center built for brands that refuse to blend in.",
    images: ["/assets/hq-office.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AnimatedShaderBackground />
        <Providers>
          <div className="min-h-full flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          // Organization structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
