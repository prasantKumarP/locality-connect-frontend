import axios from 'axios';

// Ensure API base URL always ends without trailing slash
const RAW_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
const API_BASE_URL = RAW_BASE_URL.replace(/\/$/, "") + "/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/* =========================
   Auth APIs
========================= */
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

/* =========================
   Locality APIs
========================= */
export const localityAPI = {
  getAll: () => api.get("/localities/all"),
  getById: (id) => api.get(`/localities/${id}`),
  create: (data) => api.post("/localities", data),
  update: (id, data) => api.put(`/localities/${id}`, data),
};

/* =========================
   Suggestion APIs
========================= */
export const suggestionAPI = {
  create: (data) => api.post("/suggestions", data),
  update: (id, data) => api.put(`/suggestions/${id}`, data),
  delete: (id) => api.delete(`/suggestions/${id}`),
  getMy: () => api.get("/suggestions/my"),
  getDashboard: () => api.get("/suggestions/dashboard"),
  getDiscussion: () => api.get("/suggestions/discussion"),
};

/* =========================
   Vote APIs
========================= */
export const voteAPI = {
  cast: (data) => api.post("/votes", data),
};

/* =========================
   Chat APIs
========================= */
export const chatAPI = {
  getOrCreateChat: (suggestionId) =>
    api.get(`/chats/suggestion/${suggestionId}`),

  sendMessage: (suggestionId, message) =>
    api.post(`/chats/suggestion/${suggestionId}/message`, { message }),
};

export default api;