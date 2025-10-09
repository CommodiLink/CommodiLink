import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
    axios
      .get(`${base}/api/companies`)
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
            <li key={c.id ?? i}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
