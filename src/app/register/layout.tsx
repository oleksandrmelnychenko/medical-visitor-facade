import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your GMED Agency account to apply for medical concierge services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
