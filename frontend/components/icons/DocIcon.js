export default function DocIcon({ size = 24, className = "" }) {
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
        d="M6 3h8l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.5" y="10" width="9" height="1.6" rx=".8" fill="currentColor" />
      <rect x="7.5" y="13" width="9" height="1.6" rx=".8" fill="currentColor" />
      <rect x="7.5" y="16" width="6" height="1.6" rx=".8" fill="currentColor" />
    </svg>
  );
}
