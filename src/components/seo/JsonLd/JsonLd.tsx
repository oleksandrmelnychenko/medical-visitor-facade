export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://gmed.agency/#organization",
    name: "GMED Agency",
    alternateName: "Agentur für Patientenbetreuung Heorhii Hudiiev",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    url: "https://gmed.agency",
    logo: "https://gmed.agency/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png",
    image: "https://gmed.agency/og-image.png",
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
    ],
    medicalSpecialty: [
      "Medical Tourism",
      "Medical Concierge",
      "Healthcare Coordination",
    ],
    serviceType: [
      "Medical Tourism",
      "Healthcare Coordination",
      "Medical Concierge",
      "Patient Support",
      "Clinic Selection",
    ],
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
    "@id": "https://gmed.agency/#website",
    url: "https://gmed.agency",
    name: "GMED Agency",
    description: "Premium medical concierge service in Germany",
    publisher: {
      "@id": "https://gmed.agency/#organization",
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
