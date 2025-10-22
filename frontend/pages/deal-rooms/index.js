import { useEffect, useState } from "react";
import Link from "next/link";
import http from "@/lib/http";

const BRAND = "#0A2A8F";

export default function DealRooms() {
  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await http.get("/api/deal-rooms");
        if (mounted) setRooms(data || []);
      } catch (e) {
        console.error(e);
        if (mounted) setError("Unable to load rooms");
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Deal Rooms</h1>
          <p className="mt-2 text-slate-600">
            Secure rooms for negotiations, files, audit trails and e-signatures.
          </p>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-flex items-center rounded-xl px-4 py-2 font-medium text-white shadow"
              style={{ background: `linear-gradient(180deg, ${BRAND}, #061A69)` }}
            >
              + New Room
            </Link>
          </div>
        </header>

        {/* States */}
        {!rooms && !error && (
          <div className="rounded-xl border bg-white p-6 text-slate-600">Loading…</div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {rooms && rooms.length === 0 && (
          <div className="rounded-xl border bg-white p-6">
            <p className="text-slate-600">
              No rooms yet. Click <strong>New Room</strong> to start a deal.
            </p>
          </div>
        )}

        {rooms && rooms.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .room-pill {
          border-color: rgba(10, 42, 143, 0.15);
          background: rgba(10, 42, 143, 0.06);
          color: ${BRAND};
        }
      `}</style>
    </main>
  );
}

function RoomCard({ room }) {
  return (
    <Link
      href={`/deal-rooms/${room.id}`}
      className="group block rounded-2xl border bg-white/80 p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">{room.title}</h3>
        {room.unread > 0 && (
          <span className="ml-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold text-white">
            {room.unread}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-600">{room.counterpart}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="room-pill inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
          {room.status}
        </span>
        <span className="text-xs text-slate-500">
          {new Date(room.lastMessageAt).toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
