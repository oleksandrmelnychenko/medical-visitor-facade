// SEO helper functions for consistent metadata across pages

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const languages = ['de', 'en', 'ru', 'es'] as const;
export type Language = (typeof languages)[number];

/**
 * Generate alternate language URLs for a given path
 * Uses path-based locale segments (/de/, /en/, etc.)
 */
export function getAlternateLanguages(path: string = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = normalizedPath === '/' ? '' : normalizedPath;

  return {
    canonical: `${baseUrl}/de${cleanPath}`,
    languages: {
      'de-DE': `${baseUrl}/de${cleanPath}`,
      'en-US': `${baseUrl}/en${cleanPath}`,
      'ru-RU': `${baseUrl}/ru${cleanPath}`,
      'es-ES': `${baseUrl}/es${cleanPath}`,
      'x-default': `${baseUrl}/de${cleanPath}`,
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
