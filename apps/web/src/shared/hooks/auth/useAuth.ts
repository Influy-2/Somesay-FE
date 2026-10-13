import { useContext } from 'react';
import { AuthContext } from '@/shared/context';

// 서비스 전역의 인증 상태와 로그인 사용자 정보를 사용합니다.
//AuthProvider가 만든 인증 정보를 읽는 공통 hook입니다.
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
