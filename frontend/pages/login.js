// pages/login.js
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
      // Expecting { accessToken, refreshToken? } OR a Set-Cookie on the backend
      const res = await axios.post(`${base}/api/login`, { email, password });

      // OPTION A (best): backend sets HttpOnly cookie -> nothing to store; just go to dashboard:
      // window.location.href = "/dashboard";

      // OPTION B (token in body): store in memory/localStorage then redirect:
      if (res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }
      window.location.href = "/dashboard";
    } catch (e) {
      setErr("Invalid credentials or server error.");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-1 text-slate-600">Use your work email to access CommodiLink.</p>

        {err && <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{err}</div>}

        <form onSubmit={handleLogin} className="mt-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Email</span>
            <input
              type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
              placeholder="name@company.com" required
            />
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-semibold text-slate-600">Password</span>
            <input
              type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
              placeholder="••••••••" required
            />
          </label>

          <button
            type="submit" disabled={loading}
            className="mt-6 w-full rounded-lg px-5 py-2 font-semibold text-white"
            style={{ background: "linear-gradient(180deg,#0A2A8F,#061A69)" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link className="text-[#0A2A8F] underline" href="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
}

