// frontend/pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("checking…");

  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
    if (!base) {
      setStatus("missing NEXT_PUBLIC_API_BASE_URL");
      return;
    }

    const probe = async () => {
      try {
        // Try the lightweight root route first (no DB).
        let r = await fetch(`${base}/`, { cache: "no-store" });
        if (r.ok) return setStatus("ok");

        // Fallback to /healthz (JSON), if present.
        r = await fetch(`${base}/healthz`, { cache: "no-store" });
        if (r.ok) {
          const data = await r.json().catch(() => ({}));
          return setStatus(data.ok === false ? "error" : "ok");
        }

        setStatus(`http ${r.status}`);
      } catch (e) {
        setStatus(`unreachable: ${e?.message || e}`);
      }
    };

    probe();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>CommodiLink</h1>
      <p>Backend status: {status}</p>
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        API: {process.env.NEXT_PUBLIC_API_BASE_URL || "(not set)"}
      </p>
    </main>
  );
}

}

export async function getServerSideProps() {
  return { props: {} };
}
