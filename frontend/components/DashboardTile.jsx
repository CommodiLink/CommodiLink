export default function DashboardTile({ title, desc, href }) {
  return (
    <a href={href} className="block rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
      <div className="mt-4 text-sm text-[#0033A0]">Open →</div>
    </a>
  );
}
