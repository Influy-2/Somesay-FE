import axios, { AxiosError } from 'axios';

interface ConfigureApiClientOptions {
  baseURL: string;
  getAccessToken?: () => string | null;
  onUnauthorized?: (error: AxiosError) => void;
}

export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

export const configureApiClient = ({
  baseURL,
  getAccessToken,
  onUnauthorized,
}: ConfigureApiClientOptions) => {
  apiClient.defaults.baseURL = baseURL;

  if (requestInterceptorId !== null) {
    apiClient.interceptors.request.eject(requestInterceptorId);
  }

  if (responseInterceptorId !== null) {
    apiClient.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = apiClient.interceptors.request.use((config) => {
    const token = getAccessToken?.();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  responseInterceptorId = apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized?.(error);
      }

      return Promise.reject(error);
    }
  );
};
