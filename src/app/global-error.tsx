"use client";

/**
 * Last-resort boundary when the root layout itself fails. Must render its own
 * <html> and <body>; inline styles because globals.css may not have loaded.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#070F1F", color: "#FFFFFF", fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#8A94A6", margin: 0 }}>Something went wrong</p>
          <h1 style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.1, margin: "20px 0 0" }}>The site could not be loaded.</h1>
          <p style={{ color: "#C4CBD6", fontSize: 18, lineHeight: 1.5, margin: "24px 0 0" }}>Please try again in a moment.</p>
          {error.digest ? <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "#8A94A6", margin: "16px 0 0" }}>Reference {error.digest}</p> : null}
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 32, height: 52, padding: "0 28px", borderRadius: 4, border: "1px solid #fff", background: "#fff", color: "#070F1F", fontSize: 15, fontWeight: 500, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
