import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [ping, setPing] = useState('…');

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return;
    axios
      .get(`${base}/api/health`)
      .then((res) => setPing(res.data?.status ?? 'ok'))
      .catch(() => setPing('backend unreachable'));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>CommodiLink</h1>
      <p>Backend status: {ping}</p>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
