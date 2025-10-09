import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-black" />
            <span className="text-lg font-semibold">CommodiLink</span>
          </div>

          <nav className="hidden gap-6 md:flex">
            <Link href="/dashboard" className="hover:text-black/70">Dashboard</Link>
            <Link href="/pricing" className="hover:text-black/70">Pricing</Link>
            <Link href="/login" className="hover:text-black/70">Login</Link>
          </nav>

          <Link
            href="/register"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <main className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Trade oil & commodities with clarity.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Manage deal rooms, counterparties, and KYC in one place.
              Built for speed and transparency.
            </p>

            <div className="mt-8 flex gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-black px-5 py-3 text-white hover:bg-black/90"
              >
                Create account
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border px-5 py-3 hover:bg-slate-50"
              >
                View dashboard
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              No credit card required. Free tier available.
            </p>
          </div>

          {/* Right-hand side illustration placeholder */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="aspect-[4/3] w-full rounded-xl bg-[linear-gradient(120deg,#f3f4f6,#e5e7eb)]" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="h-20 rounded-lg bg-slate-100" />
              <div className="h-20 rounded-lg bg-slate-100" />
              <div className="h-20 rounded-lg bg-slate-100" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} CommodiLink</p>
          <div className="flex gap-6 text-sm text-slate-600">
            <Link href="/privacy" className="hover:text-black/70">Privacy</Link>
            <Link href="/terms" className="hover:text-black/70">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

