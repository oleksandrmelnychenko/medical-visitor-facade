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
