import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const metadata: Metadata = {
  title: "Legal Notice (Impressum)",
  description: "Legal information and company details for GMED Agency - Medical Concierge Agency, Munich, Germany.",
  alternates: getAlternateLanguages("/legal-notice"),
};

export default function LegalNoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/de` },
        { name: "Legal Notice", url: `${baseUrl}/de/legal-notice` },
      ]} />
      {children}
    </>
  );
}
