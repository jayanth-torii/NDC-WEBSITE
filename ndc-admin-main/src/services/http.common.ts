import axios from "axios";

// Single global Axios instance for the admin panel — same pattern as NCET's
// admin (src/services/http.common.js): base URL from env, auth interceptor
// injecting the stored token, response interceptor unwraps to response.data
// so every caller downstream gets the parsed body, not the axios envelope.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api").replace(/\/+$/, "");

const httpCommon = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

httpCommon.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ndc_admin_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpCommon.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ndc_admin_token");
      localStorage.removeItem("ndc_admin_user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default httpCommon;
