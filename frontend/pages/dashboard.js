// frontend/pages/dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = t ? { Authorization: `Bearer ${t}` } : {};

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`, { headers })
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {companies.map((c, i) => (
            <li key={i}>{c.name || c.companyName || JSON.stringify(c)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
