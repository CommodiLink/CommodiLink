// frontend/pages/about.js
import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";

import VesselIcon from "../components/icons/VesselIcon";
import RefineryIcon from "../components/icons/RefineryIcon";
import DocIcon from "../components/icons/DocIcon";
import ChatIcon from "../components/icons/ChatIcon";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us – CommodiLink</title>
        <meta
          name="description"
          content="CommodiLink is the secure operating system for oil & commodities transactions: deal rooms, KYC, documentation and broker chat in one place."
        />
      </Head>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Optional background image: /about-hero.jpg */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-[#001a5a] to-slate-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/about-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "soft-light",
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-20 text-white md:py-28">
          <p className="text-sm tracking-widest text-blue-200/80">ABOUT US</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
            Building the operating system for oil & commodities.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-blue-100/90">
            CommodiLink unifies negotiation, counterparties, compliance and
            documentation into a single, secure workflow—designed for brokers,
            traders and principals who need speed with full auditability.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-[#0033A0] px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Get started
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-white/20 px-5 py-3 font-medium text-white hover:bg-white/10"
            >
              View dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              What CommodiLink does
            </h2>
            <p className="mt-4 text-slate-600">
              We replace email chains, scattered spreadsheets and siloed chat
              with a single secure platform. Create a deal room in seconds, add
              approved counterparties, control document access, collaborate with
              audit trails, and run automated KYC/AML checks with sanctions and
              PEP screening. All activity is logged; nothing is lost.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <Stat label="Time to open a deal room" value="&lt; 60 sec" />
              <Stat label="KYC coverage" value="Sanctions + PEPs" />
              <Stat label="Document control" value="Granular & auditable" />
              <Stat label="Deployment" value="Cloud, EU/US regions" />
            </dl>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Product pillars
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Pillar
                title="Deal rooms"
                desc="Secure negotiation spaces with permissions, tasks and activity feed."
                icon={<VesselIcon />}
              />
              <Pillar
                title="KYC & Compliance"
                desc="Built-in screening of sanctions & PEPs with evidence and logs."
                icon={<RefineryIcon />}
              />
              <Pillar
                title="Docs & Data"
                desc="SPAs, Q88s, inspections—versioned, searchable, exportable."
                icon={<DocIcon />}
              />
              <Pillar
                title="Broker chat"
                desc="Keep the chatter on-platform with context and retention."
                icon={<ChatIcon />}
              />
            </div>
            <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="font-semibold text-slate-800">
                Integrations:
              </strong>{" "}
              Sanctions/PEP providers, identity verification, AIS/ETA signals,
              market data, and SSO (SAML/OIDC).
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / COMPLIANCE */}
      <section className="border-y bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Security, privacy & audit as defaults
              </h2>
              <p className="mt-4 text-slate-600">
                Role-based access, customer-managed invites, data encryption
                in-transit and at-rest, immutable activity logs and exportable
                audit trails. We align to ISO-27001 style controls and design
                with regulated firms in mind.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
                <li>Data residency options (EU/US).</li>
                <li>Granular retention & legal hold.</li>
                <li>SSO (SAML / OIDC) & SCIM provisioning.</li>
                <li>API-first for enterprise workflows.</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Why teams switch to CommodiLink
              </h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Faster cycle time from intro to lift-off</li>
                <li>• Clear ownership & accountability per deal</li>
                <li>• Single source of truth for documents</li>
                <li>• Clean compliance evidence out-of-the-box</li>
              </ul>
              <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                <strong className="font-semibold text-slate-800">
                  Outcome:
                </strong>{" "}
                fewer emails, fewer mistakes, and happier counterparties.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <h2 className="text-3xl font-bold text-slate-900">Our journey</h2>
        <ol className="mt-8 relative border-l border-slate-200">
          <Step
            year="2024"
            title="Founded"
            body="Brokers and engineers teamed up to redesign how commodity deals are executed—without email chaos."
          />
          <Step
            year="2025"
            title="Private beta"
            body="Live deal rooms, KYC screening, document control and broker chat proved a 40–60% faster workflow."
          />
          <Step
            year="Next"
            title="Enterprise scale"
            body="SSO, DLP, advanced analytics and deep integrations for global desks and regulated principals."
          />
        </ol>
      </section>

      {/* VALUES */}
      <section className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <h2 className="text-3xl font-bold text-slate-900">Our values</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Value
              title="Clarity"
              body="We remove noise and ambiguity. Everyone knows the next action in a deal."
            />
            <Value
              title="Security"
              body="We build for regulated environments and ship with compliance in mind."
            />
            <Value
              title="Speed"
              body="Fewer clicks to real outcomes. Fast onboarding, even faster execution."
            />
          </div>
        </div>
      </section>

      {/* LEADERSHIP (placeholders, swap with real images later) */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="md:flex md:items-end md:justify-between">
          <h2 className="text-3xl font-bold text-slate-900">Leadership</h2>
          <p className="mt-2 text-slate-600 md:mt-0">
            Brokers + product builders + compliance operators.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Leader name="A. Founder" role="CEO" />
          <Leader name="B. Founder" role="Head of Product" />
          <Leader name="C. Founder" role="Compliance & Ops" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <div className="rounded-2xl bg-white px-6 py-10 shadow-sm md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Ready to run your next deal on CommodiLink?
              </h3>
              <p className="mt-2 text-slate-600">
                Spin up a secure deal room in under a minute and invite your counterparties.
              </p>
            </div>
            <div className="mt-6 flex gap-4 md:mt-0">
              <Link
                href="/register"
                className="rounded-lg bg-[#0033A0] px-5 py-3 font-medium text-white hover:bg-blue-800"
              >
                Create account
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:border-slate-400"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}

function Pillar({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
      <span className="mt-0.5 text-[#0033A0]">{icon}</span>
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function Step({ year, title, body }) {
  return (
    <li className="ml-6 mb-8">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-white" />
      <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
        {year}
      </span>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-600">{body}</p>
    </li>
  );
}

function Value({ title, body }) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-xl font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-slate-600">{body}</p>
    </div>
  );
}

function Leader({ name, role }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 shrink-0 rounded-full bg-slate-200"
          // Replace with real headshots -> /team-a.jpg etc.
          style={{
            backgroundImage: "url('/team-placeholder.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
