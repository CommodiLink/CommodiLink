export default function Support() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-2 text-slate-600">Need help? Email <a className="text-[#0033A0]" href="mailto:support@commodilink.com">support@commodilink.com</a>.</p>
      <form className="mt-6 space-y-4">
        <input placeholder="Subject" className="w-full rounded-lg border px-3 py-2" />
        <textarea placeholder="How can we help?" rows={6} className="w-full rounded-lg border px-3 py-2" />
        <button type="button" className="rounded-lg bg-[#0033A0] px-4 py-2 text-white">Send</button>
      </form>
    </main>
  );
}
