import type { Metadata } from 'next';
import { getWebPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Headquarters',
  description: 'Learn about the command center.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://base8hq.com";
  const pageUrl = `${baseUrl}/headquarters`;
  
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
