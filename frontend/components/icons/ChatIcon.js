export default function ChatIcon({ size = 24, className = "" }) {
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
        d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4v-4a3 3 0 0 1-3-3V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="9" cy="9" r="1.3" fill="currentColor" />
      <circle cx="12" cy="9" r="1.3" fill="currentColor" />
      <circle cx="15" cy="9" r="1.3" fill="currentColor" />
    </svg>
  );
}
