import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your GMED Agency dashboard - manage your applications and medical services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: "-80px" }}>
      <style>{`
        header:first-of-type, footer { display: none !important; }
      `}</style>
      {children}
    </div>
  );
}
