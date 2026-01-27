import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Assistance",
  description: "Learn about financial assistance programs and payment options for medical treatment through GMED Agency.",
  alternates: {
    canonical: "/financial-assistance",
  },
};

export default function FinancialAssistanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
