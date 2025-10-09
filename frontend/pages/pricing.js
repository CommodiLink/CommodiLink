export default function Pricing() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Pricing</h1>
      <ul>
        <li>Free — basic access</li>
        <li>Pro — contact us</li>
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
