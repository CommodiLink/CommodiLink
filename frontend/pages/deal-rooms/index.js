// frontend/pages/deal-rooms/index.js
import { useEffect, useState } from "react";
import Link from "next/link";
import http from "@/lib/http";

export default function DealRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await http.get("/api/deal-rooms");
      setRooms(res.data.rooms || []);
    } catch (e) {
      console.error(e);
      setErr("Unable to load rooms");
    } finally {
      setLoading(false);
    }
  }

  async function onCreate() {
    if (!title.trim()) return;
    setCreating(true);
    setErr("");
    try {
      const res = await http.post("/api/deal-rooms", { title: title.trim() });
      setRooms((r) => [res.data.room, ...r]);
      setTitle("");
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.error || "create_failed");
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-slate-900">Deal Rooms</h1>
      <p className="mt-2 text-slate-600">
        Secure rooms for negotiations, files, audit trails and e-signatures.
      </p>

      {/* Create */}
      <div className="mt-6 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Room title (e.g., Jet A1 — Nov Lift)"
          className="w-full rounded-lg border px-4 py-2"
        />
        <button
          onClick={onCreate}
          disabled={creating || !title.trim()}
          className="rounded-lg bg-[#0A2A8F] px-5 py-2 font-medium text-white disabled:opacity-60"
        >
          {creating ? "Creating…" : "+ New Room"}
        </button>
      </div>

      {/* Error */}
      {err ? (
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
          {err}
        </div>
      ) : null}

      {/* List */}
      <div className="mt-8">
        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : rooms.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-slate-600">
            No rooms yet. Create your first deal room above.
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {rooms.map((r) => (
              <li key={r.id} className="rounded-xl border bg-white p-5 hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
                  <span className="rounded-full border px-2 py-0.5 text-xs text-slate-700">
                    {r.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {r.participants?.map((p) => p.name).join(", ") || "—"}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/deal-rooms/${encodeURIComponent(r.id)}`}
                    className="text-[#0A2A8F] hover:underline"
                  >
                    Open →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

