// frontend/components/Footer.js
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2">
            {/* Use your uploaded logo */}
            <Image src="/logo.png" alt="CommodiLink" width={28} height={28} className="rounded-xl" />
            <span className="text-lg font-semibold text-slate-900">CommodiLink</span>
          </Link>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            Deal rooms, counterparties, and KYC — unified for the oil & commodities markets.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} CommodiLink Ltd. All rights reserved.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link></li>
            <li><Link href="/deal-rooms" className="hover:text-slate-900">Deal Rooms</Link></li>
            <li><Link href="/kyc" className="hover:text-slate-900">KYC</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/pricing" className="hover:text-slate-900">Pricing</Link></li>
            <li><a href="mailto:hello@commodilink.com" className="hover:text-slate-900">Contact</a></li>
            <li><Link href="/login" className="hover:text-slate-900">Login</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

