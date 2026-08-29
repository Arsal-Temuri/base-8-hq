import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://base8hq.com";
  
  const routes = [
    "",
    "/contact",
    "/deploy-mission",
    "/headquarters",
    "/mission-archive",
    "/operational-units",
    "/strike-team",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}