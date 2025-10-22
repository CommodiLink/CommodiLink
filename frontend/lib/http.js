// frontend/lib/http.js
import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

const http = axios.create({
  baseURL: base || "",
  withCredentials: true, // <- SEND COOKIES!
  headers: { "Content-Type": "application/json" },
});

export default http;
