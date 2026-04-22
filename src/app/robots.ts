import type { MetadataRoute } from "next";
import { baseUrl, languages } from "@/shared/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const disallowRoutes = [
    "/api/",
    ...languages.flatMap((locale) => [
      `/${locale}/apply`,
      `/${locale}/login`,
      `/${locale}/account/`,
      `/${locale}/admin/`,
      `/${locale}/dashboard/`,
    ]),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowRoutes,
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
