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

export const configureApiClient = ({
  baseURL,
  getAccessToken,
  onUnauthorized,
}: ConfigureApiClientOptions) => {
  apiClient.defaults.baseURL = baseURL;

  // 앱 초기화가 반복되어도 인터셉터가 중복 등록되지 않도록 초기화합니다.
  apiClient.interceptors.request.clear();
  apiClient.interceptors.response.clear();

  apiClient.interceptors.request.use((config) => {
    const token = getAccessToken?.();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized?.(error);
      }

      return Promise.reject(error);
    }
  );
};
