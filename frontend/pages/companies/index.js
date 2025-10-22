import { useEffect, useMemo, useState } from "react";
import http from "@/lib/http";

export default function Companies() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [kyc, setKyc] = useState("All");
  const [country, setCountry] = useState("All");
  const [sector, setSector] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    http.get("/api/companies")
      .then(r => setRows(r.data || []))
      .catch(() => setError("Unable to load companies."));
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(c => {
      const okQ = !q || c.name?.toLowerCase().includes(q.toLowerCase());
      const okK = kyc === "All" || c.kycStatus === kyc;
      const okC = country === "All" || c.country === country;
      const okS = sector === "All" || c.sector === sector;
      return okQ && okK && okC && okS;
    });
  }, [rows, q, kyc, country, sector]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900">Companies</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search companies…" className="rounded-lg border px-3 py-2" />
        <select value={kyc} onChange={e => setKyc(e.target.value)} className="rounded-lg border px-3 py-2">
          <option>All</option><option>VERIFIED</option><option>PENDING</option><option>REJECTED</option>
        </select>
        <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country (e.g. UK)" className="rounded-lg border px-3 py-2" />
        <input value={sector} onChange={e => setSector(e.target.value)} placeholder="Sector (Trading/Refining/Shipping)" className="rounded-lg border px-3 py-2" />
      </div>

      {error && <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</div>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c => (
          <a key={c.id} href={`/companies/${c.id}`} className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="text-lg font-semibold text-slate-900">{c.name}</div>
            <div className="mt-1 text-sm text-slate-600">{c.sector || "—"} • {c.country || "—"}</div>
            <div className="mt-2 inline-flex rounded-full border px-2 py-1 text-xs">{c.kycStatus}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
