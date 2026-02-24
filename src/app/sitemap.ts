import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';
  const lastModified = new Date();
  const locales = ['de', 'en', 'ru', 'es'] as const;

  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/apply', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/legal-notice', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/financial-assistance', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach(({ path, priority, changeFrequency }) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority: locale === 'de' ? priority : priority - 0.1,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${path}`])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
