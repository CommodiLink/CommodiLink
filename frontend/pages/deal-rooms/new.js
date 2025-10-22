import { useState } from "react";
import http from "@/lib/http";
import { useRouter } from "next/router";

export default function NewDeal() {
  const [title, setTitle] = useState("");
  const [commodity, setCommodity] = useState("");
  const [volume, setVolume] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  function submit(e) {
    e.preventDefault();
    http.post("/api/deal-rooms", { title, commodity, volume })
      .then(r => router.push(`/deal-rooms/${r.data.id}`))
      .catch(e => setErr(e?.response?.data?.error || "Create failed"));
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Create Deal Room</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full rounded-lg border px-3 py-2" />
        <input value={commodity} onChange={e => setCommodity(e.target.value)} placeholder="Commodity (e.g. D2)" className="w-full rounded-lg border px-3 py-2" />
        <input value={volume} onChange={e => setVolume(e.target.value)} placeholder="Volume (e.g. 50k MT)" className="w-full rounded-lg border px-3 py-2" />
        {err && <div className="rounded-lg bg-red-50 px-3 py-2 text-red-700">{err}</div>}
        <button className="rounded-lg bg-[#0033A0] px-4 py-2 text-white">Create</button>
      </form>
    </main>
  );
}
