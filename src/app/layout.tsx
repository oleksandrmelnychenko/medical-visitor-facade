import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.scss";
import { NavigationHoverGuard } from "@/shared/layout/NavigationHoverGuard";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/shared/seo/json-ld";
import { baseUrl } from "@/shared/lib/seo";

// Both UI fonts are now served via next/font:
// - JetBrains Mono for mono/meta UI
// - Onest as the primary variable sans with fallback metrics adjustment
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

const onest = localFont({
  src: "../assets/Onest-VariableFont_wght.woff2",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  title: {
    default: "GMED Medical Concierge - Medical Concierge Service",
    template: "%s | GMED Medical Concierge",
  },
  description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support in DE, EN, RU, ES.",
  authors: [{ name: "GMED Medical Concierge" }],
  creator: "GMED Medical Concierge",
  publisher: "GMED Medical Concierge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    languages: {
      "de-DE": `${baseUrl}/de`,
      "en-US": `${baseUrl}/en`,
      "ru-RU": `${baseUrl}/ru`,
      "es-ES": `${baseUrl}/es`,
      "x-default": `${baseUrl}/de`,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US", "ru_RU", "es_ES"],
    url: baseUrl,
    siteName: "GMED Medical Concierge",
    title: "GMED Medical Concierge - Medical Concierge Service",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GMED Medical Concierge - Medical Concierge Service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMED Medical Concierge - Medical Concierge Service",
    description: "Premium medical concierge service in Germany. Treatment organization and patient support.",
    images: ["/opengraph-image"],
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
  verification: {
    // TODO: replace with real verification codes from Search Console / Bing / Yandex
    // google: "",
    // yandex: "",
    // other: { "msvalidate.01": "" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${jetbrainsMono.variable} ${onest.variable}`} suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body>
        <NavigationHoverGuard />
        {children}
      </body>
    </html>
  );
}
