import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal Notice (Impressum)",
  description: "Legal information and company details for GMED Agency - Patient Care Agency Georgiy Gudiev, Munich, Germany.",
  alternates: getAlternateLanguages("/legal-notice"),
};

export default function LegalNoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
