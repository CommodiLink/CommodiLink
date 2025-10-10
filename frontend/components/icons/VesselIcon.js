// frontend/components/icons/VesselIcon.js
export default function VesselIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 14h12l3-4h3v2.5c0 .9-.6 1.7-1.5 1.9l-3.7.9a10.9 10.9 0 0 1-9.6-.9L5 14H3Z"
        fill="currentColor"
        opacity=".85"
      />
      <path
        d="M2 17c2 2 5 3 10 3s8-1 10-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="6" y="10" width="3" height="2" rx=".4" fill="currentColor" />
      <rect x="10" y="10" width="3" height="2" rx=".4" fill="currentColor" />
    </svg>
  );
}
