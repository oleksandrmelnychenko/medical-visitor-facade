import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { cache, Suspense } from "react";
import "../styles/globals.scss";
import { Header } from "@/components/layout/header/Header";
import { Footer } from '@/components/layout/footer/Footer';
import { MobileLoginFab } from "@/components/layout/MobileLoginFab";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";

import deMessages from "@/messages/de.json";
import enMessages from "@/messages/en.json";
import ruMessages from "@/messages/ru.json";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agency for Patient Care",
  description: "Medical services and patient care",
};

const messagesMap = {
  de: deMessages,
  en: enMessages,
  ru: ruMessages,
};

// Use React.cache() for per-request deduplication
const getLocale = cache(async () => {
  const cookieStore = await cookies();
  return (cookieStore.get('locale')?.value || 'de') as 'de' | 'en' | 'ru';
});

const getMessages = cache(async () => {
  const locale = await getLocale();
  return messagesMap[locale] || deMessages;
});

// Skeleton fallbacks for Suspense boundaries
function HeaderSkeleton() {
  return <div style={{ height: '120px', background: 'white' }} />;
}

function FooterSkeleton() {
  return <div style={{ height: '200px', background: '#f5f5f5' }} />;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable}`}>
        <AuthProvider>
          <LanguageProvider initialLocale={locale} initialMessages={messages}>
            <Suspense fallback={<HeaderSkeleton />}>
              <Header />
            </Suspense>
            {children}
            <Suspense fallback={<FooterSkeleton />}>
              <Footer />
            </Suspense>
            <MobileLoginFab />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
