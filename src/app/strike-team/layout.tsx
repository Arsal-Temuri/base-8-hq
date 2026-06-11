import type { Metadata } from 'next';
import { getWebPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Strike Team',
  description: 'Rapid response and tactical deployment.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://base8hq.com";
  const pageUrl = `${baseUrl}/strike-team`;
  return <>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd({ title: metadata.title as string, description: metadata.description as string, url: pageUrl })) }} />
  </>;
}
