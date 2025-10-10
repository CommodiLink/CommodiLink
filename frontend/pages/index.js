import Link from "next/link";
import Image from "next/image";
import VesselIcon from "../components/icons/VesselIcon";
import RefineryIcon from "../components/icons/RefineryIcon";
import DocIcon from "../components/icons/DocIcon";
import ChatIcon from "../components/icons/ChatIcon";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="grid gap-8 pt-10 md:grid-cols-2">
        <div className="py-6">
          <h1 className="text-5xl font-black leading-tight text-slate-900">
            Trade oil & commodities
            <br />
            with clarity.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Manage deal rooms, counterparties, and KYC in one place. Built for
            speed, security and transparency.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-[#0033A0] px-5 py-3 font-medium text-white hover:bg-blue-800"
            >
              Create account
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:border-slate-400"
            >
              View dashboard
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            No credit card required. Free tier available.
          </p>
        </div>

        {/* RIGHT PANEL – hero image from /public/hero-oil.jpg */}
        <div className="rounded-2xl border bg-white p-3 shadow-sm">
          <div className="relative h-[320px] w-full overflow-hidden rounded-xl">
            {/* This file must exist at /frontend/public/hero-oil.jpg */}
            <Image
              src="/hero-oil.jpg"
              alt="Oil terminal"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Quick feature cards */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <FeatureCard
              title="Deal rooms"
              desc="Negotiate & share docs securely"
              icon={<VesselIcon />}
            />
            <FeatureCard
              title="KYC"
              desc="Screen sanctions & PEPs"
              icon={<RefineryIcon />}
            />
            <FeatureCard title="Docs" desc="SPAs, Q88s, inspections" icon={<DocIcon />} />
            <FeatureCard
              title="Chat"
              desc="Keep broker chatter in one place"
              icon={<ChatIcon />}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
      <span className="text-[#0033A0]">{icon}</span>
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}
