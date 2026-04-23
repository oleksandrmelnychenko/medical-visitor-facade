import type { MetadataRoute } from "next";
import { defaultLanguage, getLocalizedPath, languages } from "@/shared/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const publicRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/pro-bono", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/legal-notice", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return publicRoutes.flatMap(({ path, priority, changeFrequency }) =>
    languages.map((locale) => ({
      url: getLocalizedPath(locale, path),
      lastModified,
      changeFrequency,
      priority: locale === defaultLanguage ? priority : Math.max(0.1, priority - 0.1),
      alternates: {
        languages: Object.fromEntries([
          ...languages.map((language) => [language, getLocalizedPath(language, path)]),
          ["x-default", getLocalizedPath(defaultLanguage, path)],
        ]),
      },
    }))
  );
}
