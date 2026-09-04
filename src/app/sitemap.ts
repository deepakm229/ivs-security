import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const routes = [
    "",
    "/about",
    "/services",
    "/services/residential",
    "/services/commercial",
    "/services/events",
    "/contact",
    "/quote",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
