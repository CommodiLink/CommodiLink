export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold">CommodiLink</h1>
      <p className="mt-4 text-lg text-blue-100 text-center max-w-2xl">
        Verified marketplace for oil & commodities — refineries, mines, brokers, and certified shippers in one trusted hub.
      </p>
      <div className="mt-8 flex space-x-4">
        <a href="/register" className="px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg shadow-lg">Get Started</a>
        <a href="/login" className="px-6 py-3 border border-white rounded-lg">Login</a>
      </div>
    </div>
  )
}