//임시
// import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: process.env.VITE_API_URL ?? "http://localhost:8080",
//   timeout: 10000,
//   headers: { "Content-Type": "application/json" },
// });

// // 요청 인터셉터 - 토큰 자동 첨부
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // 응답 인터셉터 - 에러 처리
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // 토큰 만료 처리
//       localStorage.removeItem("access_token");
//     }
//     return Promise.reject(error);
//   },
// );
