import { Metadata } from "next";
import { getNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your GMED Agency account password.",
  ...getNoIndexMetadata(),
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
