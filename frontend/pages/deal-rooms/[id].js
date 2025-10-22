import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import http from "@/lib/http";

function hashColor(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 70% 45%)`;
}

function Avatar({ email }) {
  const initials = email?.slice(0, 2).toUpperCase() || "U";
  const color = useMemo(() => hashColor(email || "u"), [email]);
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{ backgroundColor: color }}
      title={email}
    >
      {initials}
    </div>
  );
}

function Message({ m, meId, downloadHref }) {
  const mine = m.authorId === meId;
  return (
    <div className={`flex items-start gap-3 ${mine ? "flex-row-reverse" : ""}`}>
      <Avatar email={m.authorEmail} />
      <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${mine ? "bg-blue-600 text-white" : "bg-white border border-blue-100 text-slate-800"}`}>
        {m.kind === "text" ? (
          <p className="whitespace-pre-wrap break-words">{m.body}</p>
        ) : (
          <a
            href={downloadHref(m)}
            className={`block rounded-lg border px-3 py-2 text-sm ${mine ? "border-white/60" : "border-blue-200"} hover:underline`}
          >
            📎 {m.fileName} · {(m.size / 1024).toFixed(1)} KB
          </a>
        )}
        <div className={`mt-1 text-xs ${mine ? "text-white/80" : "text-slate-500"}`}>
          {new Date(m.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default function DealRoomChat() {
  const router = useRouter();
  const { id } = router.query;

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState(null);
  const [busySend, setBusySend] = useState(false);
  const [busyUpload, setBusyUpload] = useState(false);
  const [text, setText] = useState("");
  const scrollerRef = useRef(null);

  function scrollToBottom() {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }

  async function loadRoom() {
    const [{ data: meRes }, { data: rRes }] = await Promise.all([
      http.get("/api/me"),
      http.get(`/api/deal-rooms/${id}`),
    ]);
    setMe(meRes?.user);
    setRoom(rRes?.room);
  }

  async function loadMessages() {
    const { data } = await http.get(`/api/deal-rooms/${id}/messages`);
    setMessages(data.messages ?? []);
    setTimeout(scrollToBottom, 0);
  }

  async function sendText() {
    if (!text.trim()) return;
    setBusySend(true);
    const payload = { body: text.trim() };
    try {
      const { data } = await http.post(`/api/deal-rooms/${id}/messages`, payload);
      setMessages((arr) => [...arr, data.message]);
      setText("");
      setTimeout(scrollToBottom, 0);
    } finally {
      setBusySend(false);
    }
  }

  async function uploadFile(file) {
    setBusyUpload(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const { data } = await http.post(`/api/deal-rooms/${id}/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessages((arr) => [...arr, data.message]);
      setTimeout(scrollToBottom, 0);
    } finally {
      setBusyUpload(false);
    }
  }

  function downloadHref(m) {
    return `/api/deal-rooms/${id}/files/${m.fileId}`;
  }

  useEffect(() => {
    if (!id) return;
    loadRoom().catch(() => {});
    loadMessages().catch(() => {});
    const t = setInterval(loadMessages, 3500); // lightweight polling
    return () => clearInterval(t);
  }, [id]);

  if (!id || !room) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-5xl px-4 py-10 text-slate-600">Loading…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{room.title}</h1>
            <p className="text-sm text-slate-600">
              Participants:{" "}
              <span className="text-slate-800">
                {room.participants?.map((p) => p.name).join(", ") || "—"}
              </span>
            </p>
          </div>
          <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white">
            {room.status}
          </span>
        </div>

        <div
          ref={scrollerRef}
          className="h-[56vh] w-full overflow-y-auto rounded-2xl border border-blue-100 bg-white p-4"
        >
          <div className="space-y-4">
            {messages.map((m) => (
              <Message key={m.id} m={m} meId={me?.id} downloadHref={downloadHref} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label className="group relative inline-flex cursor-pointer items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50">
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
              disabled={busyUpload}
            />
            📎 Attach
          </label>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message…"
            onKeyDown={(e) => (e.key === "Enter" ? sendText() : null)}
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-slate-800 outline-none focus:ring focus:ring-blue-200"
          />

          <button
            onClick={sendText}
            disabled={busySend}
            className="rounded-xl bg-[#0A2A8F] px-5 py-3 font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            Send
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Files are available only to room members. Max size 20 MB. Supported: PDF, PNG/JPG, DOC/DOCX, XLS/XLSX, TXT.
        </p>
      </section>
    </main>
  );
}


