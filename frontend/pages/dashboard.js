import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
      setLoading(false);
      return;
    }
    axios
      .get(`${base}/api/companies`)
      .then((res) => setCompanies(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {companies.map((c) => (
            <li key={c.id ?? c.name}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}


export async function getServerSideProps() {
  return { props: {} };
}
