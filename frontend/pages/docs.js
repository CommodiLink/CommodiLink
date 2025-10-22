import { useEffect, useState } from "react";
import http from "@/lib/http";

export default function Docs() {
  const [list, setList] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => { http.get("/api/docs").then(r => setList(r.data || [])); }, []);
  function upload() {
    if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    http.post("/api/docs", fd, { headers: { "Content-Type": "multipart/form-data" } })
      .then(r => setList([r.data, ...list]));
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Document Vault</h1>
      <div className="mt-4 flex gap-2">
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button onClick={upload} className="rounded bg-slate-900 px-4 py-2 text-white">Upload</button>
      </div>
      <div className="mt-6 grid gap-3">
        {list.map(d => <div key={d.id} className="rounded-lg border bg-white p-4">{d.name}</div>)}
      </div>
    </main>
  );
}

