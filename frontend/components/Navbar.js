// frontend/components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  const { pathname } = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b bg-[#0033A0] shadow-sm">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"          // <- your uploaded logo
            alt="CommodiLink"
            width={160}
            height={40}
            priority
          />
          {/* Optional wordmark (hide if your PNG already includes text) */}
          {/* <span className="text-white text-xl font-semibold">CommodiLink</span> */}
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-6 md:flex">
          {nav.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  active
                    ? "text-white"
                    : "text-blue-100 hover:text-white/90"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0033A0] hover:bg-blue-50"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
