import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import "../styles/globals.scss";
import { Header } from "@/components/layout/header/Header";
import { Footer } from '@/components/layout/footer/Footer';
import { LanguageProvider } from "@/providers/LanguageProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'de') as 'de' | 'en' | 'ru';
  const messages = messagesMap[locale] || deMessages;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable}`}>
        <LanguageProvider initialLocale={locale} initialMessages={messages}>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
