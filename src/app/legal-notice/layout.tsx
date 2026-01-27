import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice (Impressum)",
  description: "Legal information and company details for GMED Agency - Patient Care Agency Georgiy Gudiev, Munich, Germany.",
  alternates: {
    canonical: "/legal-notice",
  },
};

export default function LegalNoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
