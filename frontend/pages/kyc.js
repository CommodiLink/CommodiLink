import { useState } from 'react'; import axios from 'axios';
export default function KYC() {
  const [companyId, setCompanyId] = useState(''); const [vendorRef, setVendorRef] = useState(''); const [status, setStatus] = useState('');
  const submit = async (e)=>{ e.preventDefault(); const token = localStorage.getItem('token');
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kyc/submit`, { companyId, vendorRef }, { headers:{Authorization:`Bearer ${token}`}});
    alert('KYC submitted.'); };
  const check = async ()=>{ const token = localStorage.getItem('token');
    const r = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kyc/status?companyId=${companyId}`, { headers:{Authorization:`Bearer ${token}`}});
    setStatus(r.data?.status || 'none'); };
  return (<div className="min-h-screen p-6">
    <h1 className="text-3xl font-bold mb-4">KYC Verification</h1>
    <form onSubmit={submit} className="max-w-xl space-y-3 border p-4 rounded">
      <input className="border p-2 w-full" placeholder="Company ID" value={companyId} onChange={e=>setCompanyId(e.target.value)} />
      <input className="border p-2 w-full" placeholder="KYC Vendor Ref (optional)" value={vendorRef} onChange={e=>setVendorRef(e.target.value)} />
      <button className="bg-blue-700 text-white px-4 py-2 rounded">Submit KYC</button>
      <button type="button" onClick={check} className="ml-2 px-4 py-2 border rounded">Check Status</button>
      {status && <div className="mt-2 text-sm">Status: <b>{status}</b></div>}
    </form>
  </div>); }