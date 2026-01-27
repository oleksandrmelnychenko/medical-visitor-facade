import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { cache, Suspense } from "react";
import "../styles/globals.scss";
import { Header } from "@/components/layout/Header";
import { Footer } from '@/components/layout/Footer';
import { MobileLoginFab } from "@/components/layout/MobileLoginFab";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "GMED Agency - Medical Concierge Service",
    template: "%s | GMED Agency",
  },
  description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support in DE, EN, RU.",
  keywords: ["medical tourism", "healthcare Germany", "medical concierge", "patient care", "clinic selection", "medical travel"],
  authors: [{ name: "GMED Agency" }],
  creator: "GMED Agency",
  publisher: "GMED Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'de-DE': `${baseUrl}?lang=de`,
      'en-US': `${baseUrl}?lang=en`,
      'ru-RU': `${baseUrl}?lang=ru`,
      'es-ES': `${baseUrl}?lang=es`,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US", "ru_RU", "es_ES"],
    url: baseUrl,
    siteName: "GMED Agency",
    title: "GMED Agency - Medical Concierge Service",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GMED Agency - Medical Concierge Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMED Agency - Medical Concierge Service",
    description: "Premium medical concierge service in Germany. Treatment organization and patient support.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

const getLocale = cache(async () => {
  const cookieStore = await cookies();
  return (cookieStore.get('locale')?.value || 'de') as 'de' | 'en' | 'ru';
});

const getMessages = cache(async () => {
  const locale = await getLocale();
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.default;
  } catch {
    const fallback = await import('@/messages/de.json');
    return fallback.default;
  }
});

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
      <head>
        <link
          rel="preload"
          href="/_next/static/media/GmedDisplay-Book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/GmedDisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
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
            <CookieConsent />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
