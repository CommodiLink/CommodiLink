import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example fetch — you can adjust the endpoint
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`)
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {companies.map((c, i) => (
            <li key={i}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
