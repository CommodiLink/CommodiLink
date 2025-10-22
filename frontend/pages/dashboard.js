import DashboardTile from "@/components/DashboardTile";

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">Manage companies, deal rooms, documents, billing and more.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardTile title="Companies" desc="Search verified counterparties" href="/companies" />
        <DashboardTile title="Deal Rooms" desc="Secure conversations & docs" href="/deal-rooms" />
        <DashboardTile title="KYC / KYB" desc="See your verification status" href="/kyc" />
        <DashboardTile title="Billing" desc="Your plan & payments" href="/billing" />
        <DashboardTile title="Documents" desc="Vault & e-signatures" href="/docs" />
        <DashboardTile title="Analytics" desc="Activity & metrics" href="/analytics" />
        <DashboardTile title="Support" desc="Contact CommodiLink" href="/support" />
      </div>
    </main>
  );
}

