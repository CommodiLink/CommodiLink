// frontend/pages/dashboard.js
import { useEffect, useMemo, useState } from "react";
import http from "@/lib/http";

const BRAND_BLUE = "#0A2A8F";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [kyc, setKyc] = useState("all");
  const [country, setCountry] = useState("all");
  const [sector, setSector] = useState("all");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const fetchCompanies = async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await http.get("/api/companies");
      setCompanies(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Unable to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const countryOptions = useMemo(() => {
    const set = new Set(companies.map((c) => (c.country || c.location || "").trim()).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [companies]);

  const sectorOptions = useMemo(() => {
    const set = new Set(companies.map((c) => (c.sector || c.category || "").trim()).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [companies]);

  const kycOf = (c) =>
    (c.kycStatus || c.verificationStatus || c.status || "")
      .toString()
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .replace("verifiedtrader", "verified");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = companies.filter((c) => {
      const name = (c.name || c.companyName || "").toLowerCase();
      const matchesQ = !q || name.includes(q);
      const matchesCountry = country === "all" || (c.country || c.location) === country;
      const matchesSector = sector === "all" || (c.sector || c.category) === sector;
      const k = kycOf(c) || "unknown";
      const matchesKyc = kyc === "all" || k === kyc;
      return matchesQ && matchesCountry && matchesSector && matchesKyc;
    });

    rows.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const val = (x) => {
        switch (sortKey) {
          case "country":
            return (x.country || x.location || "").toString().toLowerCase();
          case "sector":
            return (x.sector || x.category || "").toString().toLowerCase();
          case "kycStatus":
            return kycOf(x);
          case "updatedAt":
            return new Date(x.updatedAt || x.updated_at || x.lastUpdated || 0).getTime();
          default:
            return (x.name || x.companyName || "").toString().toLowerCase();
        }
      };
      const av = val(a);
      const bv = val(b);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });

    return rows;
  }, [companies, query, country, sector, kyc, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const paged = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const setSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIndicator = (key) => (sortKey !== key ? "↕" : sortDir === "asc" ? "↑" : "↓");
  const fmtDate = (v) => {
    const t = new Date(v || 0);
    return isNaN(t) ? "—" : t.toLocaleDateString();
  };

  const resetFilters = () => {
    setQuery("");
    setKyc("all");
    setCountry("all");
    setSector("all");
    setSortKey("name");
    setSortDir("asc");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Manage your verified companies, documents, and compliance at a glance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchCompanies}
              className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-blue-50"
            >
              Refresh
            </button>
            <a
              href="/register"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ background: `linear-gradient(180deg, ${BRAND_BLUE}, #061A69)` }}
            >
              Create account
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 pb-4">
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Search</label>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search companies…"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">KYC Status</label>
              <select
                value={kyc}
                onChange={(e) => {
                  setKyc(e.target.value);
                  setPage(1);
                }}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-600">Country</label>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setPage(1);
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {countryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === "all" ? "All" : opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Sector</label>
                <select
                  value={sector}
                  onChange={(e) => {
                    setSector(e.target.value);
                    setPage(1);
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
                >
                  {sectorOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === "all" ? "All" : opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              Showing <span className="font-medium">{filtered.length}</span> result{filtered.length === 1 ? "" : "s"}
            </div>
            <button onClick={resetFilters} className="text-xs font-medium text-[#0A2A8F] underline underline-offset-2 hover:opacity-80">
              Reset filters
            </button>
          </div>
        </div>
      </section>

      {/* Table / states */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        {err ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>
        ) : loading ? (
          <Card>
            <TableHeader />
            <SkeletonRows rows={6} />
          </Card>
        ) : filtered.length === 0 ? (
          <Card>
            <div className="py-14 text-center">
              <p className="text-lg font-medium text-slate-900">No companies found</p>
              <p className="mt-1 text-sm text-slate-600">Try adjusting your filters or search query.</p>
            </div>
          </Card>
        ) : (
          <Card>
            <TableHeader />
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <Th onClick={() => setSort("name")} label="Company" indicator={sortIndicator("name")} />
                  <Th onClick={() => setSort("country")} label="Country" indicator={sortIndicator("country")} />
                  <Th onClick={() => setSort("sector")} label="Sector" indicator={sortIndicator("sector")} />
                  <Th onClick={() => setSort("kycStatus")} label="KYC" indicator={sortIndicator("kycStatus")} />
                  <Th onClick={() => setSort("updatedAt")} label="Updated" indicator={sortIndicator("updatedAt")} />
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paged.map((c, i) => (
                  <tr key={c.id ?? `${c.name}-${i}`}>
                    <td className="px-4 py-3 font-medium text-slate-900">{c.name || c.companyName || "—"}</td>
                    <td className="px-4 py-3">{c.country || c.location || "—"}</td>
                    <td className="px-4 py-3">{c.sector || c.category || "—"}</td>
                    <td className="px-4 py-3">
                      <KycBadge value={kycOf(c)} />
                    </td>
                    <td className="px-4 py-3">{fmtDate(c.updatedAt || c.updated_at || c.lastUpdated)}</td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/companies/${c.id || ""}`}
                        className="rounded-md border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-blue-50"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-600">
                Page <span className="font-medium">{pageSafe}</span> of <span className="font-medium">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pageSafe === 1}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 disabled:opacity-40 hover:bg-blue-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={pageSafe === totalPages}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 disabled:opacity-40 hover:bg-blue-50"
                >
                  Next
                </button>
              </div>
            </div>
          </Card>
        )}
      </section>
    </main>
  );
}

/* ---------- UI bits ---------- */
function Card({ children }) {
  return <div className="rounded-2xl border border-blue-100 bg-white p-0 shadow-sm overflow-hidden">{children}</div>;
}
function TableHeader() {
  return (
    <div className="border-b px-4 py-3" style={{ background: `linear-gradient(180deg, ${BRAND_BLUE}, #061A69)` }}>
      <p className="text-sm font-semibold text-white">Verified Companies</p>
    </div>
  );
}
function Th({ label, indicator, onClick }) {
  return (
    <th className="select-none px-4 py-3">
      <button onClick={onClick} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
        {label} <span className="text-slate-400">{indicator}</span>
      </button>
    </th>
  );
}
function KycBadge({ value }) {
  const v = (value || "unknown").toLowerCase();
  const styles = {
    verified: "bg-green-50 text-green-700 ring-green-200",
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    failed: "bg-red-50 text-red-700 ring-red-200",
    unknown: "bg-slate-50 text-slate-600 ring-slate-200",
  };
  const label = v === "verified" ? "Verified" : v === "pending" ? "Pending" : v === "failed" ? "Failed" : "Unknown";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${styles[v] || styles.unknown}`}>{label}</span>;
}
function SkeletonRows({ rows = 6 }) {
  return (
    <div className="divide-y divide-slate-200">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 px-4 py-3">
          {[...Array(5)].map((__, j) => (
            <div key={j} className="h-4 w-full animate-pulse rounded bg-slate-200/70" />
          ))}
          <div className="ml-auto h-6 w-20 animate-pulse rounded bg-slate-200/70" />
        </div>
      ))}
    </div>
  );
}
