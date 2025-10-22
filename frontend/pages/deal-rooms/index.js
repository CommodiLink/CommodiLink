import { useEffect, useState } from "react";
import http from "@/lib/http";

export default function DealRooms() {
  const [rooms, setRooms] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    http.get("/api/deal-rooms")
      .then(r => setRooms(r.data || []))
      .catch(e => setErr(e?.response?.data?.error || "Unable to load rooms"));
  }, []);

  if (err) return <div className="p-8 text-red-600">{err}</div>;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Deal Rooms</h1>
        <a href="/deal-rooms/new" className="rounded-lg bg-[#0033A0] px-4 py-2 text-white">New Deal</a>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map(r => (
          <a key={r.id} href={`/deal-rooms/${r.id}`} className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="text-lg font-semibold text-slate-900">{r.title}</div>
            <div className="mt-1 text-sm text-slate-600">{r.commodity || "—"} • {r.volume || "—"}</div>
            <div className="mt-2 inline-flex rounded-full border px-2 py-1 text-xs">{r.status}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
