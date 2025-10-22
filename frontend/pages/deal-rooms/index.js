import { useEffect, useState } from "react";
import Link from "next/link";
import http from "@/lib/http";

function RoomCard({ room }) {
  const p = room.participants?.map((x) => x.name).join(", ") || "—";
  return (
    <Link
      href={`/deal-rooms/${room.id}`}
      className="block rounded-xl border border-blue-100 bg-white p-5 hover:shadow-sm transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{room.title}</h3>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-800">{room.status}</span>
      </div>
      <p className="mt-2 text-sm text-slate-600 line-clamp-1">
        Participants: <span className="text-slate-800">{p}</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Updated {new Date(room.lastMessageAt ?? room.createdAt).toLocaleString()}
      </p>
    </Link>
  );
}

export default function DealRoomsIndex() {
  const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");
      const { data } = await http.get("/api/deal-rooms");
      setRooms(data.rooms ?? []);
    } catch (e) {
      setError("Unable to load rooms");
    }
  }

  async function create() {
    if (!title.trim()) return;
    setBusy(true);
    setError("");
    try {
      const { data } = await http.post("/api/deal-rooms", { title: title.trim() });
      setRooms((r) => [data.room, ...r]);
      setTitle("");
    } catch (e) {
      setError("create_failed");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-black text-slate-900">Deal Rooms</h1>
        <p className="mt-2 text-slate-600">
          Secure rooms for negotiations, files, audit trails and e-signatures.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Room title (e.g., 'Jet A1 — Nov Lift, 100k bbl')"
            className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-slate-800 outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={create}
            disabled={busy}
            className="rounded-lg bg-[#0A2A8F] px-5 py-3 font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            + New Room
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {rooms.length === 0 && (
            <div className="col-span-full rounded-xl border border-blue-100 bg-white p-8 text-center text-slate-500">
              No rooms yet. Create your first deal room above.
            </div>
          )}
          {rooms.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </section>
    </main>
  );
}

