// frontend/lib/http.js
import axios from "axios";

// Create a preconfigured Axios instance
const http = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, ""),
  withCredentials: true, // allows cookie-based auth if backend sets them
});

// Intercept requests to add bearer token if it exists
http.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
