import { useEffect, useState } from "react";
import http from "@/lib/http";

export default function Kyc() {
  const [data, setData] = useState(null);
  useEffect(() => { http.get("/api/kyc").then(r => setData(r.data)); }, []);
  if (!data) return <div className="p-8">Loading…</div>;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">KYC / KYB</h1>
      <p className="mt-2">Status: <span className="inline-block rounded-full border px-2 py-1">{data.status}</span></p>
      {data.requirements?.length > 0 && (
        <div className="mt-4 rounded-xl border bg-white p-4">
          <div className="font-semibold">Outstanding requirements</div>
          <ul className="mt-2 list-disc pl-6 text-sm text-slate-700">
            {data.requirements.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </main>
  );
}
