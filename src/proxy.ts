import createMiddleware from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

const CIS_COUNTRY_CODES = new Set([
  "AM",
  "AZ",
  "BY",
  "GE",
  "KZ",
  "KG",
  "MD",
  "RU",
  "TJ",
  "TM",
  "UA",
  "UZ",
]);

type AppLocale = (typeof routing.locales)[number];

function getLocaleFromPathname(pathname: string): AppLocale | undefined {
  const [, maybeLocale] = pathname.split("/");

  return hasLocale(routing.locales, maybeLocale) ? maybeLocale : undefined;
}

function getLocaleFromCookie(request: NextRequest): AppLocale | undefined {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

  return hasLocale(routing.locales, cookieLocale) ? cookieLocale : undefined;
}

function getCountryCode(request: NextRequest): string | undefined {
  const headerCountry =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");

  if (headerCountry) {
    return headerCountry.toUpperCase();
  }

  const geoCountry = (request as NextRequest & { geo?: { country?: string } }).geo?.country;
  return geoCountry?.toUpperCase();
}

function getGeoDefaultLocale(countryCode?: string): AppLocale {
  if (countryCode === "DE") {
    return "de";
  }

  if (countryCode === "ES") {
    return "es";
  }

  if (countryCode && CIS_COUNTRY_CODES.has(countryCode)) {
    return "ru";
  }

  return routing.defaultLocale;
}

function redirectToLocale(request: NextRequest, locale: AppLocale) {
  const url = request.nextUrl.clone();
  url.pathname =
    request.nextUrl.pathname === "/" ? `/${locale}` : `/${locale}${request.nextUrl.pathname}`;

  return NextResponse.redirect(url);
}

export default function proxy(request: NextRequest) {
  if (getLocaleFromPathname(request.nextUrl.pathname)) {
    return handleI18nRouting(request);
  }

  if (getLocaleFromCookie(request)) {
    return handleI18nRouting(request);
  }

  return redirectToLocale(request, getGeoDefaultLocale(getCountryCode(request)));
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
