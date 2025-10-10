// frontend/components/Footer.js
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} CommodiLink. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-slate-700">Privacy</a>
          <a href="/terms" className="hover:text-slate-700">Terms</a>
        </div>
      </div>
    </footer>
  );
}
