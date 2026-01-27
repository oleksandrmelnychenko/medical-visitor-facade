export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://gmed.agency/#organization",
    name: "GMED Agency",
    alternateName: "Patient Care Agency Georgiy Gudiev",
    description: "Premium medical concierge service in Germany. Treatment organization, clinic selection, and end-to-end patient support.",
    url: "https://gmed.agency",
    logo: "https://gmed.agency/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png",
    image: "https://gmed.agency/og-image.jpg",
    telephone: "+49 123 456789",
    email: "info@gmed.agency",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "München",
      addressRegion: "Bayern",
      postalCode: "",
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
    serviceType: [
      "Medical Tourism",
      "Healthcare Coordination",
      "Medical Concierge",
      "Patient Support",
      "Clinic Selection",
    ],
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
