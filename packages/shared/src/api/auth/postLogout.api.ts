import { API_ENDPOINTS } from '../../constants/endpoints';
import { apiClient } from '../client';

// 현재 로그인한 사용자를 서버에서 로그아웃시킵니다.
export const postLogout = async () => {
  // 응답 본문이 없어 반환값 없이 성공 여부만 전달합니다.
  await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
};
