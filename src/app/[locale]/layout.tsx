import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileLoginFab } from '@/components/layout/MobileLoginFab';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { AuthProvider } from '@/providers/AuthProvider';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function HeaderSkeleton() {
  return <div style={{ height: '120px', background: 'white' }} />;
}

function FooterSkeleton() {
  return <div style={{ height: '200px', background: '#f5f5f5' }} />;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        {children}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
        <MobileLoginFab />
        <CookieConsent />
      </NextIntlClientProvider>
    </AuthProvider>
  );
}
