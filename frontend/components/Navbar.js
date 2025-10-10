import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CommodiLink Logo"
            width="160"
            height="40"
            style={{ height: "40px", width: "auto" }}
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-slate-700 hover:text-slate-900">
            Pricing
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-[#0033A0] px-3 py-2 font-medium text-white hover:bg-blue-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}

