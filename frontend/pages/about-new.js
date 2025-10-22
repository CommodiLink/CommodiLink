// pages/about-new.js
import React, { useState } from "react";
import Link from "next/link";

/* ---------- Brand ---------- */
const BRAND_BLUE = "#0A2A8F"; // dark corporate blue

/* ---------- Inline Icons (no external deps) ---------- */
const ShieldIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...p}>
    <path d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const FileIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...p}>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 3v6h6M9 14h6M9 18h8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const ChartIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...p}>
    <path d="M4 20V6m6 14V10m6 10V4m6 16H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const ShipIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...p}>
    <path d="M3 15l9 4 9-4-1.5-5H4.5L3 15z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M7 10h10l-1-4H8l-1 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);
const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...p}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const DatabaseIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const LockIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const BadgeCheckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path d="M12 3l2.4 1.6L17 5l.6 2.6L20 10l-1.4 2.4L18 15l-2.6.6L12 17l-2.4-1.4L7 15l-.6-2.6L5 10l1.4-2.4L7 5l2.6-.4L12 3z" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 11.5l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const BuildingIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path d="M3 21h18M5 21V5h8v16M13 9h6v12" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const BriefcaseIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 12h18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

/* ---------- Page ---------- */
export default function AboutNew() {
  return (
    <main className="min-h-screen w-full text-slate-800">
      {/* soft blue blobs for depth */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-300 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-100 opacity-50 blur-3xl" />
      </div>

      {/* Top: About intro */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0A2A8F]">
              About CommodiLink
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A2A8F] leading-tight">
              Building the trusted rails for physical commodities.
            </h1>
            <p className="mt-6 text-lg text-slate-700 max-w-2xl">
              CommodiLink connects verified participants across global commodities with
              compliance-first transparency, verified documentation, and streamlined trade execution.
            </p>
          </div>

          {/* trust stats */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Verified companies", value: "6,000+" },
              { label: "Jurisdictions screened", value: "200+" },
              { label: "Avg. KYC turnaround", value: "<48 hours" },
              { label: "Annual monitoring", value: "Ongoing compliance" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-blue-100 p-6 shadow-md">
                <div className="text-sm uppercase tracking-wide text-[#0A2A8F]/70">{s.label}</div>
                <div className="mt-1 text-2xl font-bold text-[#0A2A8F]">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-slate-600">
            No credit card required • Free tier available • Cancel anytime
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-[#0A2A8F]">Who It’s For</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <WhoCard icon={<BuildingIcon className="text-[#0A2A8F]" />} title="Refineries & Producers" desc="Publish grades/specs, manage offtake, and verify counterparties fast." />
            <WhoCard icon={<BriefcaseIcon className="text-[#0A2A8F]" />} title="Brokers & Traders" desc="Run compliant deal rooms with escrow, signatures, and audit trails." />
            <WhoCard icon={<ShipIcon className="text-[#0A2A8F]" />} title="Shippers & Logistics" desc="Expose certified capacity with AIS visibility and document vaults." />
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0A2A8F] mb-12">Our Platform Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<ShieldIcon className="text-[#0A2A8F]" />} title="Verified Directory" desc="KYC/KYB-validated refineries, mines, shipping companies and brokers with visible certification badges." />
            <Feature icon={<FileIcon className="text-[#0A2A8F]" />} title="Deal Rooms" desc="Secure deal environments for document sharing, negotiation, and escrow-backed execution." />
            <Feature icon={<ChartIcon className="text-[#0A2A8F]" />} title="Analytics & Insights" desc="Performance analytics, compliance metrics, and trading activity dashboards for verified members." />
            <Feature icon={<ShipIcon className="text-[#0A2A8F]" />} title="Integrated Logistics" desc="Certified fleet visibility, AIS vessel tracking and shipment monitoring." />
            <Feature icon={<SearchIcon className="text-[#0A2A8F]" />} title="Sanctions Screening" desc="Automated sanctions, PEP, and watchlist screening for counterparties and shipments." />
            <Feature icon={<DatabaseIcon className="text-[#0A2A8F]" />} title="Market Data" desc="Live refinery capacity, pricing, and grades/specifications for transparent decisions." />
          </div>
        </div>
      </section>

      {/* Security & compliance assurances */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <Assure icon={<LockIcon className="text-[#0A2A8F]" />} title="Enterprise Security" desc="Encryption in transit & at rest, role-based access, and document vaults." />
              <Assure icon={<BadgeCheckIcon className="text-[#0A2A8F]" />} title="KYC/KYB Verified" desc="Sanctions, PEP & adverse media screening with annual re-certification." />
              <Assure icon={<ShieldIcon className="text-[#0A2A8F]" />} title="Audit Trails" desc="Full activity logs on files, users, and signatures for every deal room." />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              *Formal attestations (e.g., ISO/SOC) coming soon — sign up to be notified.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance journey */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0A2A8F] mb-10">Verification & Compliance Journey</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { id: 1, title: "Identity Verification", detail: "ID, Passport, Proof of Address", color: "bg-blue-100" },
              { id: 2, title: "Business Verification", detail: "KYB: Registration, UBO, Licenses", color: "bg-blue-200" },
              { id: 3, title: "Sanctions & Watchlists", detail: "OFAC, UN, PEP, Adverse Media", color: "bg-blue-300" },
              { id: 4, title: "Banking Verification", detail: "Bank Letter, Proof of Funds", color: "bg-blue-400 text-white" },
              { id: 5, title: "Proof of Performance (POP)", detail: "Contracts, BL, LC, References", color: "bg-blue-500 text-white" },
              { id: 6, title: "Compliance Officer Review", detail: "Manual oversight & final review", color: "bg-green-500 text-white" },
              { id: 7, title: "Certified Badge Issued", detail: "Verified Trader", color: "bg-purple-500 text-white" },
              { id: 8, title: "Ongoing Monitoring", detail: "Annual Review, Sanctions Updates", color: "bg-blue-200" },
            ].map((step) => (
              <div key={step.id} className={`rounded-xl ${step.color} p-5 text-center shadow-sm transition hover:scale-[1.02]`}>
                <h3 className="font-semibold text-lg mb-1">{step.id}. {step.title}</h3>
                <p className="text-sm opacity-90">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0A2A8F] mb-8">Our Mission & Values</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-12">
            We believe global commodities should trade on trust, transparency, and traceability.
            Our mission is to digitize compliance and make verified trading seamless for all participants.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {[
              { title: "Integrity", desc: "We uphold the highest standards of compliance and ethics across all transactions." },
              { title: "Transparency", desc: "Clear visibility into each actor, contract, and certification builds confidence." },
              { title: "Innovation", desc: "We bring modern technology to an industry still dominated by spreadsheets and emails." },
              { title: "Security", desc: "Data encryption, KYC verification, and document vaults keep trade information protected." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 border border-blue-100 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-[#0A2A8F]">{v.title}</h3>
                <p className="text-slate-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <blockquote className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
            <p className="text-xl font-medium text-slate-900">
              “CommodiLink gives us a single place to verify counterparties, manage documents, and execute —
              we cut days off our deal cycle.”
            </p>
            <footer className="mt-4 text-sm text-slate-600">— Head of Trading, mid-size refinery</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section
        className="py-20 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, #061A69 100%)` }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold">Join the Verified Commodities Network</h2>
          <p className="mt-4 text-blue-100 max-w-xl mx-auto">
            Start connecting with trusted counterparties and managing your deals with full transparency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-white text-[#0A2A8F] font-semibold px-6 py-3 rounded-xl shadow-sm hover:translate-y-[-1px] transition">
              Get Started
            </Link>
            <Link href="/demo" className="border border-white/80 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#0A2A8F] transition">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 px-6 py-10 text-center text-sm text-[#0A2A8F]/70">
        © {new Date().getFullYear()} CommodiLink. All rights reserved.
      </footer>
    </main>
  );
}

/* ---------- Small components ---------- */
function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div className="mb-4 flex items-center justify-center text-[#0A2A8F]">{icon}</div>
      <h3 className="font-semibold text-lg text-[#0A2A8F]">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function WhoCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0A2A8F] ring-1 ring-blue-100">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Assure({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0A2A8F] ring-1 ring-blue-100">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-600">{desc}</div>
      </div>
    </div>
  );
}

function FAQ() {
  const items = [
    { q: "Is there a free plan?",
      a: "Yes. You can create an account and explore the directory with a free tier. Upgrade when you need advanced features like deal rooms and analytics." },
    { q: "How long does verification take?",
      a: "Most companies complete KYC/KYB within 24–48 hours once documents are submitted." },
    { q: "Do you support escrow?",
      a: "Yes. We integrate with escrow partners so transactions can be settled securely with full auditability." },
    { q: "What data do you provide?",
      a: "Refinery capacity/utilization, grades/specs, market signals, and logistics visibility where available." },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-[#0A2A8F] text-center">Frequently Asked Questions</h2>
        <div className="mt-8 divide-y divide-blue-100 rounded-2xl border border-blue-100 bg-white">
          {items.map((item, i) => (
            <button
              key={item.q}
              className="w-full text-left px-6 py-5 focus:outline-none hover:bg-blue-50/40"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-medium text-slate-900">{item.q}</div>
                  {open === i && <p className="mt-2 text-sm text-slate-600">{item.a}</p>}
                </div>
                <span className="text-slate-400">{open === i ? "–" : "+"}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
