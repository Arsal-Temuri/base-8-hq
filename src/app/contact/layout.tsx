import type { Metadata } from 'next';
import { getWebPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Point',
  description: 'Establish a secure communication channel with BASE8HQ.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const baseUrl = "https://base8hq.com";
  const pageUrl = `${baseUrl}/contact`;
  
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
