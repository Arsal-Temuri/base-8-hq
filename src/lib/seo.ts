export function getOrganizationJsonLd({
  name = "BASE8HQ",
  url = "https://base8hq.com",
  logo = "/assets/logo.png",
  sameAs = ["https://www.linkedin.com/"],
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
  };
}

export function getWebPageJsonLd({
  title,
  description,
  url,
} : { title: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
  };
}
