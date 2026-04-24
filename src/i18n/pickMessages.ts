import { getMessages } from "next-intl/server";

type Messages = Record<string, unknown>;

/**
 * Namespaces required by client components in the base layout shell
 * (Header, Footer, CookieConsent, error boundary). Every nested
 * NextIntlClientProvider must re-include these because next-intl v4
 * nested providers replace the outer messages instead of merging.
 */
export const SHELL_NAMESPACES = [
  "common",
  "footer",
  "cookies",
  "home",
  "error",
  "notFound",
] as const;

/**
 * Fetch only a subset of top-level namespaces for a given locale.
 * Use at page/layout boundaries to avoid shipping the full messages
 * payload to the client when only a handful of namespaces are needed.
 */
export async function pickMessages<T extends string>(
  locale: string,
  namespaces: readonly T[],
): Promise<Messages> {
  const all = (await getMessages({ locale })) as Messages;
  const result: Messages = {};
  for (const ns of namespaces) {
    if (ns in all) {
      result[ns] = all[ns];
    }
  }
  return result;
}
