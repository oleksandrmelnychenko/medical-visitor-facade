import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "GMED Agency administration panel.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
