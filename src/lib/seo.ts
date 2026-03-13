// SEO helper functions for consistent metadata across pages
import type { Metadata } from "next";
import { cache } from "react";
import { routing } from "@/i18n/routing";

const fallbackBaseUrl = "https://www.gmed-health.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const baseUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_BASE_URL || fallbackBaseUrl);

export const languages = routing.locales;
export type Language = (typeof languages)[number];
export const defaultLanguage = "de" as Language;
export const runtimeDefaultLanguage = routing.defaultLocale as Language;

const hreflangMap: Record<Language, string> = {
  de: "de-DE",
  en: "en-US",
  ru: "ru-RU",
  es: "es-ES",
};

const openGraphLocaleMap: Record<Language, string> = {
  de: "de_DE",
  en: "en_US",
  ru: "ru_RU",
  es: "es_ES",
};

function normalizePath(path: string = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? "" : normalizedPath;
}

export function normalizeLanguage(locale: string): Language {
  return languages.includes(locale as Language) ? (locale as Language) : runtimeDefaultLanguage;
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
      "x-default": getLocalizedPath(defaultLanguage, path),
    },
  };
}

type LocalizedMetadataOptions = {
  locale: Language;
  path?: string;
  title: string;
  description: string;
  noIndex?: boolean;
};

export function getLocalizedMetadata({
  locale,
  path = "",
  title,
  description,
  noIndex = false,
}: LocalizedMetadataOptions): Metadata {
  const robots = noIndex ? getNoIndexMetadata().robots : undefined;

  return {
    title,
    description,
    alternates: getAlternateLanguages(path, locale),
    openGraph: {
      type: "website",
      locale: openGraphLocaleMap[locale],
      alternateLocale: languages
        .filter((language) => language !== locale)
        .map((language) => openGraphLocaleMap[language]),
      url: getLocalizedPath(locale, path),
      siteName: "GMED Agency",
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "GMED Agency - Medical Concierge Service",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots,
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
