import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pickMessages, SHELL_NAMESPACES } from "@/i18n/pickMessages";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
import { CookieConsent } from "@/shared/ui/cookie-consent";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, tCommon] = await Promise.all([
    pickMessages(locale, SHELL_NAMESPACES),
    getTranslations({ locale, namespace: "common" }),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <a href="#main-content" className="skipLink">
        {tCommon("skipToContent")}
      </a>
      <Header />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer locale={locale} />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
