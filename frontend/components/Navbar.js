import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3" aria-label="CommodiLink home">
       <img
  src="/logo.png"
  alt="CommodiLink Logo"
  style={{
    height: "90px",      // <-- change this value to whatever size you want
    width: "auto",
    display: "block",
    objectFit: "contain",
  }}
/>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-8 text-base font-medium">
          <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-slate-700 hover:text-slate-900">
            Pricing
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-[#0033A0] px-4 py-2 text-white hover:bg-blue-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}

