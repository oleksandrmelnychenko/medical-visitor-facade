import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

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
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer locale={locale} />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
