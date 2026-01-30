// SEO helper functions for consistent metadata across pages

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const languages = ['de', 'en', 'ru', 'es'] as const;
export type Language = (typeof languages)[number];

/**
 * Generate alternate language URLs for a given path
 * Includes x-default for proper hreflang implementation
 */
export function getAlternateLanguages(path: string = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = normalizedPath === '/' ? '' : normalizedPath;

  return {
    canonical: `${baseUrl}${cleanPath}`,
    languages: {
      'de-DE': `${baseUrl}${cleanPath}?lang=de`,
      'en-US': `${baseUrl}${cleanPath}?lang=en`,
      'ru-RU': `${baseUrl}${cleanPath}?lang=ru`,
      'es-ES': `${baseUrl}${cleanPath}?lang=es`,
      'x-default': `${baseUrl}${cleanPath}`,
    },
  };
}

/**
 * Generate metadata for pages that should not be indexed
 * (login, register, account, admin, etc.)
 */
export function getNoIndexMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
