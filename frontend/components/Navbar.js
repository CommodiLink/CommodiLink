// frontend/components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Brand */}
        <Link href="/" className="shrink-0" aria-label="CommodiLink home">
          {/* DO NOT add Tailwind h-6/h-8 here; we force height via style */}
          <img
            id="brand-logo"
            src="/logo.png"
            alt="CommodiLink"
            className="block select-none"
            style={{
              height: "64px",    // <- make this bigger/smaller (e.g., "80px")
              width: "auto",
              maxHeight: "none",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>

        {/* Right-side links (keep as-is or trim) */}
        <nav className="hidden gap-8 text-slate-600 md:flex">
          <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link
            href="/register"
            className="rounded-lg bg-[#0033A0] px-4 py-2 font-medium text-white hover:bg-blue-800"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}


