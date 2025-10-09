// frontend/components/Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <a href="/" className="font-semibold">CommodiLink</a>
          <nav className="flex gap-4 text-sm">
            <a href="/deal-rooms/1" className="hover:underline">Sample Deal Room</a>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="border-t mt-12">
        <div className="container mx-auto p-4 text-sm text-gray-500">
          © {new Date().getFullYear()} CommodiLink
        </div>
      </footer>
    </div>
  );
}
