import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DealRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
      setLoading(false);
      return;
    }
    axios
      .get(`${base}/api/dealrooms`)
      .then((res) => setRooms(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Deal Rooms</h1>
      {loading ? (
        <p>Loading…</p>
      ) : rooms.length === 0 ? (
        <p>No rooms yet.</p>
      ) : (
        <ul>
          {rooms.map((r) => (
            <li key={r.id}>{r.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}

