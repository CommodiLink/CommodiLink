// frontend/pages/index.js
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Trade oil & commodities
            <span className="block">with clarity.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Manage deal rooms, counterparties and KYC in one place.
            Built for speed, security and transparency.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-[#0033A0] px-5 py-3 text-white hover:bg-blue-800"
            >
              Create account
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-slate-700 hover:bg-slate-50"
            >
              View dashboard
            </Link>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            No credit card required. Free tier available.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="relative h-64">
            <Image
              src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop"
              alt="Oil terminal"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4 p-5">
            <Card title="Deal rooms" meta="Negotiate & share docs securely" />
            <Card title="KYC" meta="Screen sanctions & PEPs" />
            <Card title="Docs" meta="SPAs, Q88s, inspections" />
            <Card title="Chat" meta="Keep broker chatter in one place" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ title, meta }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-600">{meta}</p>
    </div>
  );
}

