import { useEffect, useState } from 'react'; import axios from 'axios';
export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState(''); const [type, setType] = useState('broker'); const [country, setCountry] = useState('');
  useEffect(()=>{ const token = localStorage.getItem('token'); if(!token) return (window.location.href='/login');
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`, { headers:{Authorization:`Bearer ${token}`}}).then(r=>setCompanies(r.data)); },[]);
  const create = async(e)=>{ e.preventDefault(); const token = localStorage.getItem('token');
    const r = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`, { name, type, country }, { headers:{Authorization:`Bearer ${token}`}});
    setCompanies([r.data,...companies]); setName(''); setType('broker'); setCountry(''); };
  return (<div className="min-h-screen p-6">
    <h1 className="text-3xl font-bold mb-4">Directory</h1>
    <div className="mb-4 flex gap-2">
      <a href="/kyc" className="px-3 py-2 bg-blue-700 text-white rounded">KYC</a>
      <a href="/deal-rooms" className="px-3 py-2 border rounded">Deal Rooms</a>
    </div>
    <form onSubmit={create} className="flex gap-2 mb-4">
      <input className="border p-2" placeholder="Company Name" value={name} onChange={e=>setName(e.target.value)} />
      <select className="border p-2" value={type} onChange={e=>setType(e.target.value)}>
        <option value="refinery">Refinery</option><option value="mine">Mine</option><option value="broker">Broker</option>
        <option value="shipper">Shipper</option><option value="buyer">Buyer</option><option value="seller">Seller</option>
      </select>
      <input className="border p-2" placeholder="Country" value={country} onChange={e=>setCountry(e.target.value)} />
      <button className="bg-blue-700 text-white px-4 py-2 rounded">Add</button>
    </form>
    <ul className="space-y-2">{companies.map(c=> (<li key={c.id} className="border p-3 rounded-md"><div className="font-semibold">{c.name}</div><div className="text-sm text-gray-600">{c.type} — {c.country || 'N/A'}</div></li>))}</ul>
  </div>); }