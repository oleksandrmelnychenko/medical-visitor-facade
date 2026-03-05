import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileLoginFab } from '@/components/layout/MobileLoginFab';
import { ScrollProgressRail } from '@/components/layout/ScrollProgressRail';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { AuthProvider } from '@/providers/AuthProvider';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        {children}
        <Footer />
        <MobileLoginFab />
        <ScrollProgressRail />
        <CookieConsent />
      </NextIntlClientProvider>
    </AuthProvider>
  );
}
