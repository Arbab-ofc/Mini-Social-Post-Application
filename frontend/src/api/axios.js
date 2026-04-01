import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const API_ORIGIN = API_BASE_URL.replace(/\/$/, '');

const api = axios.create({
  baseURL: `${API_ORIGIN}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  return `${API_ORIGIN}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

export default api;
