import type { Metadata } from 'next';
import { getWebPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Operational Units',
  description: 'Discover our specialized divisions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://base8hq.com";
  const pageUrl = `${baseUrl}/operational-units`;
  
  const schemaJson = getWebPageJsonLd({ 
    title: String(metadata.title),
    description: String(metadata.description),
    url: pageUrl 
  });

  return <>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
  </>;
}
