import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import http from "@/lib/http";

export default function DealRoom() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id) return;
    http.get(`/api/deal-rooms/${id}`)
      .then(r => setRoom(r.data))
      .catch(e => setErr(e?.response?.data?.error || "Unable to load room"));
  }, [id]);

  if (err) return <div className="p-8 text-red-600">{err}</div>;
  if (!room) return <div className="p-8">Loading…</div>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900">{room.title}</h1>
      <p className="mt-1 text-slate-600">{room.commodity || "—"} • {room.volume || "—"} • {room.status}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm md:col-span-2">
          <div className="font-semibold text-slate-900">Messages</div>
          <div className="mt-3 h-64 overflow-auto rounded border p-3 text-sm text-slate-700">No messages yet.</div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="font-semibold text-slate-900">Documents</div>
          <form className="mt-3 flex items-center gap-2">
            <input type="file" className="block w-full text-sm" />
            <button type="button" className="rounded bg-slate-900 px-3 py-1 text-white">Upload</button>
          </form>
          <div className="mt-3 text-sm text-slate-600">No files yet.</div>
        </div>
      </div>
    </main>
  );
}


