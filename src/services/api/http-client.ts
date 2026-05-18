import axios from 'axios';
import { appConfig } from '@/app/config';
import { getStoredToken, clearAuthStorage } from '@/services/storage/token-storage';
import { normalizeApiError } from './api-error';

export const httpClient = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor — attach Bearer token ─────────────────────────────
httpClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(normalizeApiError(error));
  }
);

// ── Response interceptor — handle 401/403 globally ───────────────────────
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // 401 Unauthorized — token expired or invalid → force logout
      if (status === 401) {
        clearAuthStorage();
        // Redirect to login only if not already there
        if (!window.location.hash.includes('/') || window.location.hash !== '#/') {
          window.location.href = '/';
        }
      }

      // Normalize 409 to a user-friendly message if the API didn't provide one
      if (status === 409) {
        const serverMessage = error.response.data?.message;
        if (!serverMessage) {
          error.response.data = {
            ...error.response.data,
            message: 'El recurso solicitado ya no está disponible o genera un conflicto.',
          };
        }
      }
    }

    return Promise.reject(normalizeApiError(error));
  }
);
