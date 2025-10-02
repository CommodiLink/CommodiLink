import { useEffect, useState } from 'react'; import axios from 'axios';
export default function DealRooms() {
  const [rooms,setRooms]=useState([]); const [title,setTitle]=useState(''); const [buyerId,setBuyerId]=useState(''); const [sellerId,setSellerId]=useState('');
  const token = typeof window!=='undefined' ? localStorage.getItem('token'):'';
  useEffect(()=>{ if(!token) return (window.location.href='/login'); axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dealrooms`, { headers:{Authorization:`Bearer ${token}`}}).then(r=>setRooms(r.data)); },[]);
  const create = async(e)=>{ e.preventDefault(); const r = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dealrooms`, { title, buyerCompanyId: buyerId, sellerCompanyId: sellerId }, { headers:{Authorization:`Bearer ${token}`}}); setRooms([r.data,...rooms]); setTitle(''); setBuyerId(''); setSellerId(''); };
  return (<div className="min-h-screen p-6">
    <h1 className="text-3xl font-bold mb-4">Deal Rooms</h1>
    <form onSubmit={create} className="flex gap-2 mb-4">
      <input className="border p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input className="border p-2 w-36" placeholder="Buyer Company ID" value={buyerId} onChange={e=>setBuyerId(e.target.value)} />
      <input className="border p-2 w-36" placeholder="Seller Company ID" value={sellerId} onChange={e=>setSellerId(e.target.value)} />
      <button className="bg-blue-700 text-white px-4 py-2 rounded">Create</button>
    </form>
    <ul className="space-y-2">{rooms.map(r=> (<li key={r.id} className="border p-3 rounded-md flex justify-between items-center"><div><div className="font-semibold">{r.title}</div><div className="text-sm text-gray-600">Room #{r.id} — status: {r.status}</div></div><a className="text-blue-700" href={`/deal-rooms/${r.id}`}>Open</a></li>))}</ul>
  </div>); }