// src/services/api.js
import axios from 'axios';

// 1. Create a "Instance" of axios
// This basically saves the base URL so we don't have to type it every time
const api = axios.create({
  baseURL: 'http://100.26.62.24/api',
});

// 2. The "Interceptor" (The Security Guard)
// Before every request, check if we have a token and attach it
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Look in browser storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;