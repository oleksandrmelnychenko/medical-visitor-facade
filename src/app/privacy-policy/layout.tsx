import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/seo";

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
  return children;
}
