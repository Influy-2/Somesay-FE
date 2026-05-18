import { configureApiClient } from '@somesay/shared';

export const setupApiClient = () => {
  configureApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
    getAccessToken: () => localStorage.getItem('access_token'),
    onUnauthorized: () => {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    },
  });
};
