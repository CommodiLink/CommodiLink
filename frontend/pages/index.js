// pages/index.js
import Link from "next/link";
import Image from "next/image";

/* Inline brand icons (no external deps) */
const BRAND_BLUE = "#0A2A8F";

const ShieldIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path
      d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const FileIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path
      d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M14 3v6h6M9 14h6M9 18h8" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ChartIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path
      d="M4 20V6m6 14V10m6 10V4m6 16H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const ShipIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <path
      d="M3 15l9 4 9-4-1.5-5H4.5L3 15z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M7 10h10l-1-4H8l-1 4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M20 20l-3-3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const DatabaseIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 text-slate-800">
      {/* HERO */}
      <section className="relative">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-300 opacity-30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0A2A8F]">
              Verified B2B Commodities
            </span>
            <h1 className="mt-4 text-5xl font-black leading-[1.1] text-slate-900">
              Trade oil & commodities
              <br />
              with clarity.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Deal rooms, KYC/KYB, and documents in one place — built for speed,
              security, and transparency.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-lg px-5 py-3 font-medium text-white shadow-lg hover:translate-y-[-1px] transition"
                style={{ background: `linear-gradient(180deg, ${BRAND_BLUE}, #061A69)` }}
              >
                Create account
              </Link>
              <Link
                href="/about-new"
                className="rounded-lg border border-blue-200 bg-white px-5 py-3 font-medium text-slate-800 hover:bg-blue-50"
              >
                Learn about CommodiLink
              </Link>
              <Link
                href="/dashboard"
                className="text-[#0A2A8F] font-medium underline-offset-4 hover:underline"
              >
                View demo dashboard →
              </Link>
            </div>

            {/* KPI strip */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { k: "6,000+", v: "Verified companies" },
                { k: "200+", v: "Jurisdictions screened" },
                { k: "<48h", v: "Avg. KYC turnaround" },
                { k: "Ongoing", v: "Annual monitoring" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-xl border border-blue-100 bg-white p-4 text-center shadow-sm"
                >
                  <div className="text-2xl font-bold text-slate-900">{s.k}</div>
                  <div className="text-xs text-slate-600">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="rounded-2xl border bg-white p-3 shadow-sm">
            <div className="relative h-[360px] w-full overflow-hidden rounded-xl">
              <Image
                src="/hero-oil.jpg"
                alt="Oil terminal"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <FeatureCard title="Deal rooms" desc="Secure negotiation & docs" icon={<FileIcon />} />
              <FeatureCard title="KYC/KYB" desc="Sanctions & PEP screening" icon={<ShieldIcon />} />
              <FeatureCard title="Logistics" desc="AIS visibility & fleet" icon={<ShipIcon />} />
              <FeatureCard title="Analytics" desc="Dashboards & signals" icon={<ChartIcon />} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / AUDIENCES */}
      <section className="py-8 bg-white border-y border-blue-100">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-slate-500 mb-4">
            Built for refineries, traders, and logistics teams.
          </p>
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {["Refineries", "Trading Houses", "Ship Owners", "Bunkering"].map((t) => (
              <div
                key={t}
                className="rounded-lg border border-blue-100 bg-blue-50 py-3 text-sm text-[#0A2A8F]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Compliance-first execution, end-to-end
            </h2>
            <p className="mt-2 text-slate-600">
              Everything you need to move from inquiry to signed SPA with full auditability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Tile icon={<ShieldIcon className="text-[#0A2A8F]" />} title="Verified directory">
              KYC/KYB-validated participants with certification badges and annual monitoring.
            </Tile>
            <Tile icon={<FileIcon className="text-[#0A2A8F]" />} title="Deal rooms">
              Secure spaces to negotiate, exchange SPAs/BL/LC, track versions, and e-sign.
            </Tile>
            <Tile icon={<SearchIcon className="text-[#0A2A8F]" />} title="Sanctions screening">
              Automated OFAC/UN/PEP checks with adverse media and downloadable reports.
            </Tile>
            <Tile icon={<DatabaseIcon className="text-[#0A2A8F]" />} title="Data & specs">
              Grades, refinery capacity, counterparties, and document templates.
            </Tile>
            <Tile icon={<ShipIcon className="text-[#0A2A8F]" />} title="Integrated logistics">
              Certified fleet visibility with AIS, voyage history, and ETA markers.
            </Tile>
            <Tile icon={<ChartIcon className="text-[#0A2A8F]" />} title="Dashboards & audit">
              Deal analytics, user activity logs, and exportable audit trails.
            </Tile>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
            <p className="mt-2 text-slate-600">From verification to execution in four simple steps.</p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 1, t: "Create account", d: "Join free and set up your profile." },
              { n: 2, t: "Verify", d: "Complete KYC/KYB and get your badge." },
              { n: 3, t: "Connect", d: "Find counterparties in the directory." },
              { n: 4, t: "Execute", d: "Open a deal room and close securely." },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0A2A8F] ring-1 ring-blue-200 font-bold">
                    {s.n}
                  </span>
                  <span className="font-semibold text-slate-900">{s.t}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-[#0A2A8F] px-5 py-3 font-medium text-white hover:brightness-110"
            >
              Get started
            </Link>
            <Link
              href="/about-new"
              className="rounded-lg border border-blue-200 bg-white px-5 py-3 font-medium text-slate-800 hover:bg-blue-50"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <blockquote className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm text-center">
            <p className="text-xl font-medium text-slate-900">
              “CommodiLink gives us a single place to verify counterparties, manage documents, and execute —
              it has materially reduced our deal cycle time.”
            </p>
            <footer className="mt-3 text-sm text-slate-600">Head of Trading, mid-size refinery</footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, #061A69 100%)` }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold">Start trading with confidence</h2>
          <p className="mt-3 text-blue-100">
            Join free, verify later. Upgrade when you need deal rooms and analytics.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-white px-5 py-3 font-medium text-[#0A2A8F] hover:translate-y-[-1px] transition"
            >
              Create free account
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/70 px-5 py-3 font-medium text-white hover:bg-white hover:text-[#0A2A8F]"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
      <span className="text-[#0A2A8F]">{icon}</span>
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function Tile({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0A2A8F] ring-1 ring-blue-100">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{children}</p>
    </div>
  );
}

