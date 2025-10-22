import { useEffect, useState } from "react";
import http from "@/lib/http";

export default function Analytics() {
  const [data, setData] = useState(null);
  useEffect(() => { http.get("/api/analytics").then(r => setData(r.data)); }, []);
  if (!data) return <div className="p-8">Loading…</div>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Deals</div><div className="text-2xl font-bold">{data.totals.deals}</div></div>
        <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Active</div><div className="text-2xl font-bold">{data.totals.active}</div></div>
        <div className="rounded-xl border bg-white p-4"><div className="text-sm text-slate-500">Closed</div><div className="text-2xl font-bold">{data.totals.closed}</div></div>
      </div>
      <div className="mt-6 rounded-xl border bg-white p-4">
        <div className="font-semibold">Recent activity</div>
        <ul className="mt-2 list-disc pl-6 text-sm text-slate-700">
          {data.recent.map((a, i) => <li key={i}>{new Date(a.ts).toLocaleString()} — {a.text}</li>)}
        </ul>
      </div>
    </main>
  );
}
