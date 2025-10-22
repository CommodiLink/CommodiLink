// pages/pricing.js
import Link from "next/link";
import { useState } from "react";

const BRAND_BLUE = "#0A2A8F";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly"); // monthly | annually (UI only)

  return (
    <main className="min-h-screen w-full text-slate-800">
      {/* soft background shading */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-300 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-100 opacity-50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-10">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0A2A8F]">Transparent Pricing</p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Pricing that scales with you</h1>
          <p className="mt-3 text-slate-600">Start free. Upgrade to Pro when you need deal rooms, analytics and deeper compliance tooling.</p>

          {/* Billing toggle (visual only since Pro is contact sales) */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white p-1 text-sm shadow-sm">
            <button onClick={() => setBilling("monthly")} className={`rounded-full px-3 py-1 ${billing === "monthly" ? "bg-blue-50 text-[#0A2A8F]" : "text-slate-600"}`}>Monthly</button>
            <button onClick={() => setBilling("annually")} className={`rounded-full px-3 py-1 ${billing === "annually" ? "bg-blue-50 text-[#0A2A8F]" : "text-slate-600"}`}>Annually <span className="ml-1 text-xs text-slate-500">(save with annual)</span></button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Free */}
          <PlanCard
            name="Free"
            priceLabel="£0"
            blurb="Basic access to the CommodiLink network."
            ctaText="Create free account"
            ctaHref="/register"
            features={[
              "Browse verified company directory",
              "Basic profile & saved companies",
              "Light search & filters",
              "Email support",
            ]}
            highlighted={false}
          />

          {/* Pro */}
          <PlanCard
            name="Pro"
            priceLabel="Contact sales"
            blurb="For teams who need compliance-first execution."
            ctaText="Contact sales"
            ctaHref="/contact" // change to your contact route or mailto
            features={[
              "Deal Rooms (secure negotiation & doc sharing)",
              "KYC/KYB workflows & sanctions screening",
              "Document vaults & e-signatures",
              "Integrated logistics (AIS visibility)",
              "Analytics & activity dashboards",
              "Audit trails & role-based access",
              "Priority support & onboarding",
            ]}
            highlighted
          />
        </div>

        {/* Small note */}
        <p className="mt-4 text-center text-sm text-slate-500">No credit card required for Free. Switch or cancel anytime.</p>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-blue-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b px-4 py-3" style={{ background: `linear-gradient(180deg, ${BRAND_BLUE}, #061A69)` }}>
            <p className="text-sm font-semibold text-white">Compare plans</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-blue-50/50 text-slate-600">
                  <th className="px-4 py-3">Features</th>
                  <th className="px-4 py-3">Free</th>
                  <th className="px-4 py-3">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { label: "Verified directory access", free: true, pro: true },
                  { label: "Advanced search & filters", free: false, pro: true },
                  { label: "Deal Rooms", free: false, pro: true },
                  { label: "Document vault & e-signatures", free: false, pro: true },
                  { label: "KYC/KYB & sanctions screening", free: false, pro: true },
                  { label: "Logistics (AIS visibility)", free: false, pro: true },
                  { label: "Analytics & dashboards", free: false, pro: true },
                  { label: "Audit logs & RBAC", free: false, pro: true },
                  { label: "Support", free: "Email", pro: "Priority" },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.label}</td>
                    <td className="px-4 py-3">{typeof row.free === "boolean" ? <Check x={!row.free} /> : row.free}</td>
                    <td className="px-4 py-3">{typeof row.pro === "boolean" ? <Check x={!row.pro} /> : row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-[#0A2A8F] text-center">Pricing FAQs</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Faq q="Can I start on Free and upgrade later?" a="Yes. Create a free account and upgrade to Pro when you need deal rooms, compliance workflows, and analytics." />
            <Faq q="Is there a contract for Pro?" a="Pro includes flexible terms. Annual options are available—contact sales to discuss what fits your team." />
            <Faq q="Do you offer discounts?" a="Annual plans are discounted. We also support startup and volume pricing—speak to sales." />
            <Faq q="What payment methods do you accept?" a="We support standard card payments and invoicing for Pro accounts." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center text-white" style={{ background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, #061A69 100%)` }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-3 text-blue-100">Join the CommodiLink network free today. Upgrade to Pro when you need more.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/register" className="rounded-lg bg-white px-5 py-3 font-medium text-[#0A2A8F] hover:translate-y-[-1px] transition">Create free account</Link>
            <Link href="/contact" className="rounded-lg border border-white/70 px-5 py-3 font-medium text-white hover:bg-white hover:text-[#0A2A8F]">Contact sales</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 px-6 py-10 text-center text-sm text-[#0A2A8F]/70">
        © {new Date().getFullYear()} CommodiLink. All rights reserved.
      </footer>
    </main>
  );
}

/* ---------------- components ---------------- */
function PlanCard({ name, priceLabel, blurb, features, ctaText, ctaHref, highlighted }) {
  return (
    <div className={`relative rounded-2xl border p-6 shadow-sm ${highlighted ? "border-blue-300 bg-white ring-1 ring-blue-200" : "border-blue-100 bg-white"}`}>
      {highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white shadow">Recommended</span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900">{priceLabel}</div>
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-600">{blurb}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-50 text-[#0A2A8F] ring-1 ring-blue-100">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href={ctaHref} className={`block w-full rounded-lg px-5 py-3 text-center font-medium transition ${highlighted ? "bg-[#0A2A8F] text-white hover:brightness-110" : "border border-blue-200 bg-white text-slate-800 hover:bg-blue-50"}`}>
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

function Check({ x = false }) {
  if (x) return <span className="text-slate-400">—</span>;
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700 ring-1 ring-green-200">✓</span>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
      <button onClick={() => setOpen((s) => !s)} className="flex w-full items-start justify-between text-left">
        <div>
          <p className="font-medium text-slate-900">{q}</p>
          {open && <p className="mt-2 text-sm text-slate-600">{a}</p>}
        </div>
        <span className="text-slate-400">{open ? "–" : "+"}</span>
      </button>
    </div>
  );
}
