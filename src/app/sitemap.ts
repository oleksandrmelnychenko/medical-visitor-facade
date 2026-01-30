import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';
  const lastModified = new Date();
  const languages = ['de', 'en', 'ru', 'es'] as const;

  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/apply', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/legal-notice', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/financial-assistance', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach(({ path, priority, changeFrequency }) => {
    // Add default URL (x-default)
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          de: `${baseUrl}${path}?lang=de`,
          en: `${baseUrl}${path}?lang=en`,
          ru: `${baseUrl}${path}?lang=ru`,
          es: `${baseUrl}${path}?lang=es`,
        },
      },
    });

    // Add language-specific URLs
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}${path}?lang=${lang}`,
        lastModified,
        changeFrequency,
        priority: priority - 0.1, // Slightly lower priority for language variants
      });
    });
  });

  return sitemapEntries;
}
