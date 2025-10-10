import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="CommodiLink logo"
            width={140}       // adjust if needed
            height={40}
            priority
          />
        </Link>

        {/* Navigation links */}
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
