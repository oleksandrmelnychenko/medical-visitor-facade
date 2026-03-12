// SEO helper functions for consistent metadata across pages
import { cache } from "react";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gmed.agency";

export const languages = ["de", "en", "ru", "es"] as const;
export type Language = (typeof languages)[number];

const hreflangMap: Record<Language, string> = {
  de: "de-DE",
  en: "en-US",
  ru: "ru-RU",
  es: "es-ES",
};

function normalizePath(path: string = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? "" : normalizedPath;
}

export function normalizeLanguage(locale: string): Language {
  return languages.includes(locale as Language) ? (locale as Language) : "en";
}

export function getLocalizedPath(locale: Language, path: string = "") {
  return `${baseUrl}/${locale}${normalizePath(path)}`;
}

/**
 * Generate alternate language URLs for a given path
 * Uses path-based locale segments (/de/, /en/, etc.)
 */
export function getAlternateLanguages(path: string = "", currentLocale: Language = "en") {
  const localizedEntries = Object.fromEntries(
    languages.map((locale) => [hreflangMap[locale], getLocalizedPath(locale, path)])
  );

  return {
    canonical: getLocalizedPath(currentLocale, path),
    languages: {
      ...localizedEntries,
      "x-default": getLocalizedPath("en", path),
    },
  };
}

type MessageRecord = Record<string, unknown>;

export const getLocaleMessages = cache(async (locale: Language): Promise<MessageRecord> => {
  return (await import(`../messages/${locale}.json`)).default as MessageRecord;
});

function getNestedMessage(messages: MessageRecord, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object") {
      return undefined;
    }

    return (value as MessageRecord)[segment];
  }, messages);
}

export async function getLocalizedMessage(locale: Language, path: string) {
  const messages = await getLocaleMessages(locale);
  const value = getNestedMessage(messages, path);

  if (typeof value !== "string") {
    throw new Error(`Missing localized string for "${locale}:${path}"`);
  }

  return value;
}

export function getBreadcrumbItems(
  locale: Language,
  items: Array<{ name: string; path: string }>
) {
  return items.map((item) => ({
    name: item.name,
    url: getLocalizedPath(locale, item.path),
  }));
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
