import type { Metadata } from 'next';
import { getWebPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shadow Operative Application',
  description: 'Join the BASE8HQ Shadow Network as an independent specialist. Submit your profile for classified mission deployments.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://base8hq.com";
  const pageUrl = `${baseUrl}/shadow-operative`;
  
  const schemaJson = getWebPageJsonLd({ 
    title: String(metadata.title),
    description: String(metadata.description),
    url: pageUrl 
  });

  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
    </>
  );
}
