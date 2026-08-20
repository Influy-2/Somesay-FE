import { useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { QUERY_KEYS } from '@somesay/shared';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchUserInfo } from '@/shared/hooks';
import { useAuthTokenStore } from '@/shared/stores/auth.store';
import {
  AuthContext,
  type AuthContextValue,
  type AuthStatus,
} from '@/shared/context';

interface AuthProviderProps {
  children: ReactNode;
}

// 토큰과 사용자 정보 조회 결과를 조합해 서비스 전역 인증 상태를 제공합니다.
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const accessToken = useAuthTokenStore((state) => state.accessToken);
  const {
    data: user,
    isError: isUserInfoError,
    refetch: refetchUserInfo,
  } = useFetchUserInfo();

  useEffect(() => {
    if (!accessToken) {
      void queryClient.resetQueries({ queryKey: QUERY_KEYS.USER.ALL });
    }
  }, [accessToken, queryClient]);

  let status: AuthStatus;

  //인증 상태 판정
  if (!accessToken) {
    status = 'unauthenticated'; //access token이 없는 상태입니다.
  } else if (user) {
    status = 'authenticated'; //토큰이 있고 /users/info가 성공해 실제 사용자 정보가 존재하는 상태입니다.
  } else if (isUserInfoError) {
    status = 'error'; //토큰은 남아 있지만 사용자 정보 조회가 네트워크 오류나 500 등으로 실패한 상태입니다.
  } else {
    status = 'checking'; //토큰은 있지만 /users/info 응답이 아직 오지 않은 상태입니다.
  }

  const refreshUser = useCallback(() => {
    void refetchUserInfo();
  }, [refetchUserInfo]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isAuthenticated: status === 'authenticated',
      user: user ?? null,
      refreshUser,
    }),
    [refreshUser, status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
