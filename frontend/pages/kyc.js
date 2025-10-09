import { useState } from 'react';
import axios from 'axios';

export default function KYC() {
  const [companyId, setCompanyId] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return;
    try {
      await axios.post(`${base}/api/kyc/submit`, { companyId });
      setStatus('Submitted');
    } catch (e) {
      setStatus('Failed');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>KYC</h1>
      <form onSubmit={submit}>
        <input
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Company ID"
        />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
