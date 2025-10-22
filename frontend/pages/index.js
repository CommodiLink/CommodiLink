// pages/index.js
import Link from "next/link";
import Image from "next/image";


/* Inline brand icons (no external deps) */
const BRAND_BLUE = "#0A2A8F";


const ShieldIcon = (p) => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
<path d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);
const FileIcon = (p) => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2"/>
<path d="M14 3v6h6M9 14h6M9 18h8" stroke="currentColor" strokeWidth="2"/>
</svg>
);
const ChartIcon = (p) => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
<path d="M4 20V6m6 14V10m6 10V4m6 16H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>
);
const ShipIcon = (p) => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
<path d="M3 15l9 4 9-4-1.5-5H4.5L3 15z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
<path d="M7 10h10l-1-4H8l-1 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
</svg>
);
const SearchIcon = (p) => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
<circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
<path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>
);
const DatabaseIcon = (p) => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
<ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="2"/>
<path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="currentColor" strokeWidth="2"/>
</svg>
);


export default function Home() {
return (
<main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 text-slate-800">
{/* HERO */}
<section className="relative">
{/* background accents */}
<div className="pointer-events-none absolute inset-0 -z-10">
<div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />
<div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-300 opacity-30 blur-3xl" />
</div>


<div className="mx-auto max-w-7xl px-6 pt-16 pb-8 grid gap-12 md:grid-cols-2 items-center">
