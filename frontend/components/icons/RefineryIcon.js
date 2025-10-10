export default function RefineryIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="10" width="4" height="10" rx="1" fill="currentColor" />
      <rect x="9" y="6" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="15" y="12" width="6" height="8" rx="1" fill="currentColor" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 4c0-1.1.9-2 2-2h1v2c0 1.1-.9 2-2 2h-1V4Z"
        fill="currentColor"
        opacity=".8"
      />
    </svg>
  );
}
