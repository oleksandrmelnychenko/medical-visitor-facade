import { Metadata } from "next";
import { getNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your GMED Agency account, treatment history, and messages.",
  ...getNoIndexMetadata(),
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
