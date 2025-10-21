import React, { useState } from "react";
import { Shield, FileText, BarChart2, Ship, Search, Database, Lock, BadgeCheck, Building2, Briefcase } from "lucide-react";

const tokens = {
  brand: {
    primary: "#0A2A8F", // darker corporate blue
    onPrimary: "#FFFFFF",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full text-slate-800">
      {/* Background shading */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-300 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-100 opacity-50 blur-3xl" />
      </div>

      {/* About Section */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand-primary,#0A2A8F)]">
              About CommodiLink
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[color:var(--brand-primary,#0A2A8F)] leading-tight">
              Building the trusted rails for physical commodities.
            </h1>
            <p className="mt-6 text-lg text-slate-700 max-w-2xl">
              CommodiLink connects verified participants across global commodities with compliance-first transparency, verified documentation, and streamlined trade execution.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Verified companies", value: "6,000+" },
              { label: "Jurisdictions screened", value: "200+" },
              { label: "Avg. KYC turnaround", value: "<48 hours" },
              { label: "Annual monitoring", value: "Ongoing compliance" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-blue-100 p-6 shadow-md">
                <div className="text-sm uppercase tracking-wide text-[color:var(--brand-primary,#0A2A8F)]/70">{s.label}</div>
                <div className="mt-1 text-2xl font-bold text-[color:var(--brand-primary,#0A2A8F)]">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Social proof microcopy */}
          <div className="mt-6 text-sm text-slate-600">No credit card required • Free tier available • Cancel anytime</div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-[color:var(--brand-primary,#0A2A8F)]">Who It's For</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <WhoCard icon={<Building2 className="h-6 w-6" />} title="Refineries & Producers" desc="Publish grades/specs, manage offtake, and verify counterparties fast." />
            <WhoCard icon={<Briefcase className="h-6 w-6" />} title="Brokers & Traders" desc="Run compliant deal rooms with escrow, signatures, and audit trails." />
            <WhoCard icon={<Ship className="h-6 w-6" />} title="Shippers & Logistics" desc="Expose certified capacity with AIS visibility and document vaults." />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[color:var(--brand-primary,#0A2A8F)] mb-12">Our Platform Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Shield className="h-8 w-8 text-[color:var(--brand-primary,#0A2A8F)]" />, title: "Verified Directory", desc: "KYC/KYB-validated refineries, mines, shipping companies and brokers with visible certification badges." },
              { icon: <FileText className="h-8 w-8 text-[color:var(--brand-primary,#0A2A8F)]" />, title: "Deal Rooms", desc: "Secure deal environments for document sharing, negotiation, and escrow-backed execution." },
              { icon: <BarChart2 className="h-8 w-8 text-[color:var(--brand-primary,#0A2A8F)]" />, title: "Analytics & Insights", desc: "Performance analytics, compliance metrics, and trading activity dashboards for verified members." },
              { icon: <Ship className="h-8 w-8 text-[color:var(--brand-primary,#0A2A8F)]" />, title: "Integrated Logistics", desc: "Certified fleet visibility, AIS vessel tracking and shipment monitoring integrated in-platform." },
              { icon: <Search className="h-8 w-8 text-[color:var(--brand-primary,#0A2A8F)]" />, title: "Sanctions Screening", desc: "Automated sanctions, PEP, and watchlist screening for counterparties and shipments." },
              { icon: <Database className="h-8 w-8 text-[color:var(--brand-primary,#0A2A8F)]" />, title: "Market Data", desc: "Live refinery capacity, pricing, and grades/specifications for transparent trading decisions." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
                <div className="mb-4 flex items-center justify-center">{f.icon}</div>
                <h3 className="font-semibold text-lg text-[color:var(--brand-primary,#0A2A8F)]">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance Assurances */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <Assure icon={<Lock className="h-6 w-6" />} title="Enterprise Security" desc="Encryption in transit & at rest, role-based access, and document vaults." />
              <Assure icon={<BadgeCheck className="h-6 w-6" />} title="KYC/KYB Verified" desc="Sanctions, PEP & adverse media screening with annual re-certification." />
              <Assure icon={<Shield className="h-6 w-6" />} title="Audit Trails" desc="Full activity logs on files, users, and signatures for every deal room." />
            </div>
            <p className="mt-4 text-sm text-slate-600">*Formal attestations (e.g., ISO/SOC) coming soon — sign up to be notified.</p>
          </div>
        </div>
      </section>

      {/* Compliance Steps */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[color:var(--brand-primary,#0A2A8F)] mb-10">Verification & Compliance Journey</h2>
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

      {/* Mission */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[color:var(--brand-primary,#0A2A8F)] mb-8">Our Mission & Values</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-12">
            At CommodiLink, we believe that global commodities should trade on trust, transparency, and traceability. Our mission is to digitize compliance and make verified trading seamless for all participants.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {[
              { title: "Integrity", desc: "We uphold the highest standards of compliance and ethics across all transactions." },
              { title: "Transparency", desc: "Clear visibility into each actor, contract, and certification builds confidence." },
              { title: "Innovation", desc: "We bring modern technology to an industry still dominated by spreadsheets and emails." },
              { title: "Security", desc: "Data encryption, KYC verification, and document vaults keep trade information protected." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 border border-blue-100 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-[color:var(--brand-primary,#0A2A8F)]">{v.title}</h3>
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
            <p className="text-xl font-medium text-slate-900">“CommodiLink gives us a single place to verify counterparties, manage documents, and execute — we cut days off our deal cycle.”</p>
            <footer className="mt-4 text-sm text-slate-600">— Head of Trading, mid-size refinery</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="py-20 text-center text-white" style={{ background: `linear-gradient(135deg, ${tokens.brand.primary} 0%, #061A69 100%)` }}>
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold">Join the Verified Commodities Network</h2>
          <p className="mt-4 text-blue-100 max-w-xl mx-auto">Start connecting with trusted counterparties and managing your deals with full transparency.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/signup" className="bg-white text-[color:var(--brand-primary,#0A2A8F)] font-semibold px-6 py-3 rounded-xl shadow-sm hover:translate-y-[-1px] transition">Get Started</a>
            <a href="/demo" className="border border-white/80 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[color:var(--brand-primary,#0A2A8F)] transition">Book a Demo</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 px-6 py-10 text-center text-sm text-[color:var(--brand-primary,#0A2A8F)]/70">
        © {new Date().getFullYear()} CommodiLink. All rights reserved.
      </footer>

      {/* Brand color var for easy theming */}
      <style>{`:root { --brand-primary: ${tokens.brand.primary}; }`}</style>
    </main>
  );
}

function WhoCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--brand-primary,#0A2A8F)] ring-1 ring-blue-100">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Assure({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--brand-primary,#0A2A8F)] ring-1 ring-blue-100">{icon}</div>
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-600">{desc}</div>
      </div>
    </div>
  );
}

function FAQ() {
  const items = [
    { q: "Is there a free plan?", a: "Yes. You can create an account and explore the directory with a free tier. Upgrade when you need advanced features like deal rooms and analytics." },
    { q: "How long does verification take?", a: "Most companies complete KYC/KYB within 24–48 hours once documents are submitted." },
    { q: "Do you support escrow?", a: "Yes. We integrate with escrow partners so transactions can be settled securely with full auditability." },
    { q: "What data do you provide?", a: "Refinery capacity/utilization, grades/specs, market signals, and logistics visibility where available." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-[color:var(--brand-primary,#0A2A8F)] text-center">Frequently Asked Questions</h2>
        <div className="mt-8 divide-y divide-blue-100 rounded-2xl border border-blue-100 bg-white">
          {items.map((item, i) => (
            <button
              key={item.q}
              className="w-full text-left px-6 py-5 focus:outline-none hover:bg-blue-50/40"
              onClick={() => setOpen(open === i ? null : i)}
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
