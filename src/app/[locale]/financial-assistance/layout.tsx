import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gmed.agency';

export const metadata: Metadata = {
  title: "Financial Assistance",
  description: "Learn about financial assistance programs and payment options for medical treatment through GMED Agency.",
  alternates: getAlternateLanguages("/financial-assistance"),
};

export default function FinancialAssistanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${baseUrl}/de` },
        { name: "Financial Assistance", url: `${baseUrl}/de/financial-assistance` },
      ]} />
      {children}
    </>
  );
}
