import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { JetBrains_Mono } from "next/font/google";
import "../styles/globals.scss";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { baseUrl } from "@/lib/seo";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
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
    default: "GMED Agency - Medical Concierge Service",
    template: "%s | GMED Agency",
  },
  description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support in DE, EN, RU, ES.",
  authors: [{ name: "GMED Agency" }],
  creator: "GMED Agency",
  publisher: "GMED Agency",
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
    siteName: "GMED Agency",
    title: "GMED Agency - Medical Concierge Service",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GMED Agency - Medical Concierge Service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMED Agency - Medical Concierge Service",
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
  verification: {},
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="preload"
          as="image"
          href="/video/hero-poster.jpg"
          type="image/jpeg"
          fetchPriority="high"
        />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
