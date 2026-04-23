import { baseUrl } from "@/shared/lib/seo";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${baseUrl}/#organization`,
    name: "GMED Medical Concierge",
    alternateName: "Medical Concierge Agency",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/opengraph-image`,
    email: "contact@gmed-health.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Albert-Schweitzer-Straße 56",
      addressLocality: "München",
      addressRegion: "Bayern",
      postalCode: "81735",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.1351,
      longitude: 11.5820,
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      {
        "@type": "City",
        name: "München",
        alternateName: "Munich",
        containedInPlace: { "@type": "Country", name: "Germany" },
      },
      {
        "@type": "City",
        name: "Berlin",
        containedInPlace: { "@type": "Country", name: "Germany" },
      },
      {
        "@type": "City",
        name: "Hamburg",
        containedInPlace: { "@type": "Country", name: "Germany" },
      },
      {
        "@type": "City",
        name: "Köln",
        alternateName: "Cologne",
        containedInPlace: { "@type": "Country", name: "Germany" },
      },
    ],
    serviceType: [
      "Medical Concierge Service",
      "Clinic Selection and Coordination",
      "Second Opinion Coordination",
      "Medical Translation",
      "Patient Support and Logistics",
      "Treatment Coordination",
      "Medical Case Management",
    ],
    knowsAbout: [
      "Medical Tourism in Germany",
      "German Healthcare System",
      "Clinical Case Management",
      "Second Opinion",
      "Oncology Treatment Coordination",
      "Cardiology Treatment Coordination",
      "Medical Translation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Medical Concierge Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GMED Standard",
            description:
              "Portal access with structured coordination for independent patients navigating treatment in Germany.",
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: { "@type": "Country", name: "Germany" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GMED Care",
            description:
              "Proactive medical coordination with case oversight, clinic selection, translation, and ongoing patient support.",
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: { "@type": "Country", name: "Germany" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GMED Reserve",
            description:
              "Personal concierge-level support with full-cycle coordination, senior case manager, and on-site assistance.",
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: { "@type": "Country", name: "Germany" },
          },
        },
      ],
    },
    priceRange: "$$$",
    knowsLanguage: ["de", "en", "ru", "es"],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "GMED Medical Concierge",
    description: "Premium medical concierge service in Germany",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: ["de", "en", "ru", "es"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
