import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("checking…");

  // Normalize the base URL (remove trailing slash if any)
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

  useEffect(() => {
    if (!apiBase) {
      setStatus("missing NEXT_PUBLIC_API_BASE_URL");
      return;
    }

    (async () => {
      try {
        // Try root route first (no DB hit)
        let r = await fetch(`${apiBase}/`, { cache: "no-store" });
        if (r.ok) {
          setStatus("ok");
          return;
        }

        // Fallback to /healthz (JSON)
        r = await fetch(`${apiBase}/healthz`, { cache: "no-store" });
        if (r.ok) {
          const data = await r.json().catch(() => ({}));
          setStatus(data.ok === false ? "error" : "ok");
          return;
        }

        setStatus(`http ${r.status}`);
      } catch (e) {
        setStatus(`unreachable: ${e?.message || e}`);
      }
    })();
  }, [apiBase]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>CommodiLink</h1>
      <p>Backend status: {status}</p>
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        API: {apiBase || "(not set)"}
      </p>
    </main>
  );
}

// Keep SSR so Next treats this page as server-rendered (helps on Render Free)
export async function getServerSideProps() {
  return { props: {} };
}
