import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return;
    try {
      await axios.post(`${base}/api/auth/register`, { email, password });
      setMsg('Account created');
    } catch {
      setMsg('Registration failed');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Register</h1>
      <form onSubmit={submit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Create account</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
