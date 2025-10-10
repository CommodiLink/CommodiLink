import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* This looks for /public/logo.png */}
          <Image
            src="/logo.png"
            alt="CommodiLink"
            width={28}
            height={28}
            priority
            className="rounded-xl"
          />
          <span className="text-lg font-semibold text-slate-900">CommodiLink</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="text-slate-800 hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/deal-rooms" className="text-slate-800 hover:text-slate-900">
            Deal Rooms
          </Link>
          <Link href="/kyc" className="text-slate-800 hover:text-slate-900">
            KYC
          </Link>
          <Link href="/login" className="text-slate-800 hover:text-slate-900">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-[#0033A0] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
