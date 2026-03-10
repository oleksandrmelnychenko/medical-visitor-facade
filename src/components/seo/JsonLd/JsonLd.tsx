const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gmed.agency";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${baseUrl}/#organization`,
    name: "GMED Agency",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.png`,
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
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "GMED Agency",
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
