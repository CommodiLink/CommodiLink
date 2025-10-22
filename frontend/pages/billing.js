import { useEffect, useState } from "react";
import http from "@/lib/http";

export default function Billing() {
  const [plans, setPlans] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    http.get("/api/plans").then(r => setPlans(r.data || []));
    http.get("/api/billing").then(r => setCurrent(r.data)).catch(() => {});
  }, []);

  function checkout() {
    http.post("/api/checkout").then(r => window.location.href = r.data.url);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Billing</h1>
      {current && <p className="mt-2 text-slate-600">Current plan: {current.plan} ({current.status})</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {plans.map(p => (
          <div key={p.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="mt-1 text-2xl font-bold">${p.price}<span className="text-sm font-normal">/mo</span></div>
            <ul className="mt-3 text-sm text-slate-600 list-disc pl-5">
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button onClick={checkout} className="mt-4 w-full rounded-lg bg-[#0033A0] px-4 py-2 text-white">Choose</button>
          </div>
        ))}
      </div>
    </main>
  );
}
