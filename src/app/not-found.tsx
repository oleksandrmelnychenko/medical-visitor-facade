export default function RootNotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "70vh",
        padding: "4rem 1.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        404
      </h1>
      <p style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.75rem" }}>
        Page not found
      </p>
      <p style={{ color: "#525264", marginBottom: "2.5rem" }}>
        The page you are looking for does not exist.
      </p>
      <a
        href="/de"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0.85rem 2rem",
          border: "1px solid #171717",
          borderRadius: "999px",
          textDecoration: "none",
          color: "#171717",
          fontWeight: 500,
        }}
      >
        Back to Home
      </a>
    </main>
  );
}
