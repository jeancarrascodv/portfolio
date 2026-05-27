import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}`]),
      ),
    },
  }));
}
