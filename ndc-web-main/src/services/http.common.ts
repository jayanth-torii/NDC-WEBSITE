import axios from "axios";

// Single Axios instance for the public site — same pattern as the admin
// panel's src/services/http.common.ts and NCET's own frontend/admin
// (http.common -> httpServices -> route -> data.service). Runs in both
// Server Components (Node) and Client Components (browser), so the base URL
// resolves differently per side: server can use an internal-only URL,
// client must use the NEXT_PUBLIC_ one (inlined at build time).
export const PUBLIC_API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
const SERVER_API_BASE_URL = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

export function resolveBaseUrl(): string {
  return typeof window === "undefined" ? SERVER_API_BASE_URL : PUBLIC_API_BASE_URL;
}

const httpCommon = axios.create({
  headers: { "Content-Type": "application/json" },
});

httpCommon.interceptors.request.use((config) => {
  config.baseURL = resolveBaseUrl();
  return config;
});

// Response interceptor unwraps to response.data (same as the admin panel),
// so every data.service.ts caller gets the parsed `{ success, data }` body
// directly, not the axios envelope.
httpCommon.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default httpCommon;
