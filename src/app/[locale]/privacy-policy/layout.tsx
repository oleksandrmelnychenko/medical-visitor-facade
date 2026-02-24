import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how GMED Agency collects, uses, and protects your personal data. GDPR compliant privacy policy.",
  alternates: getAlternateLanguages("/privacy-policy"),
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/de` },
        { name: "Privacy Policy", url: `${baseUrl}/de/privacy-policy` },
      ]} />
      {children}
    </>
  );
}
