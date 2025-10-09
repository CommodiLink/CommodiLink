import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DealRoomDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base || !id) return;

    const fetchAll = async () => {
      try {
        const [roomRes, msgRes, docRes] = await Promise.all([
          axios.get(`${base}/api/dealrooms/${id}`),
          axios.get(`${base}/api/dealrooms/${id}/messages`),
          axios.get(`${base}/api/dealrooms/${id}/docs`)
        ]);
        setRoom(roomRes.data || null);
        setMessages(msgRes.data || []);
        setDocs(docRes.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Deal Room #{id}</h1>
      {loading ? (
        <p>Loading…</p>
      ) : !room ? (
        <p>Not found.</p>
      ) : (
        <>
          <h2>{room.title}</h2>
          <h3>Messages</h3>
          <ul>
            {messages.map((m) => (
              <li key={m.id}>
                <b>User {m.authorUserId}:</b> {m.body}
              </li>
            ))}
          </ul>
          <h3>Documents</h3>
          <ul>
            {docs.map((d) => (
              <li key={d.id}>{d.filename}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}

