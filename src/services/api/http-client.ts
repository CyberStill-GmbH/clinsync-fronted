import axios from 'axios';
import { appConfig } from '@/app/config';
import { getStoredToken } from '@/services/storage/token-storage';
import { normalizeApiError } from './api-error';

export const httpClient = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(normalizeApiError(error));
  }
);
