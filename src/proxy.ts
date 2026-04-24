import createMiddleware from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
const isDevelopment = process.env.NODE_ENV === "development";

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

function createNonce() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCodePoint(...bytes));
}

function buildContentSecurityPolicy(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' https://flagcdn.com data: blob:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

function applyRequestHeaderOverrides(response: NextResponse, requestHeaders: Headers) {
  const existingOverrides = response.headers.get("x-middleware-override-headers");
  const overrideKeys = new Set(
    existingOverrides
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? [],
  );

  for (const [key, value] of requestHeaders) {
    response.headers.set(`x-middleware-request-${key}`, value);
    overrideKeys.add(key);
  }

  if (overrideKeys.size > 0) {
    response.headers.set("x-middleware-override-headers", [...overrideKeys].join(","));
  }
}

function applySecurityHeaders(response: NextResponse, nonce: string) {
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers();
  requestHeaders.set("content-security-policy", contentSecurityPolicy);
  requestHeaders.set("x-nonce", nonce);

  applyRequestHeaderOverrides(response, requestHeaders);
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

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
  const nonce = createNonce();

  if (getLocaleFromPathname(request.nextUrl.pathname)) {
    return applySecurityHeaders(handleI18nRouting(request), nonce);
  }

  if (getLocaleFromCookie(request)) {
    return applySecurityHeaders(handleI18nRouting(request), nonce);
  }

  return applySecurityHeaders(
    redirectToLocale(request, getGeoDefaultLocale(getCountryCode(request))),
    nonce,
  );
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
