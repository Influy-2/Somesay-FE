import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogout } from '@somesay/shared';

import { PATH } from '@/routes/path';
import { useAuthTokenStore } from '@/shared/stores';

// 서버에 로그아웃을 알리고, 기기에 남은 토큰과 캐시를 비운 뒤 홈으로 보냅니다.
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearTokens = useAuthTokenStore((state) => state.clearTokens);

  const { mutate, isPending } = useMutation({
    mutationFn: postLogout,
    retry: false,
    // 서버 요청이 실패해도 사용자가 로그인 상태에 갇히지 않도록 기기에서는 항상 로그아웃시킵니다.
    onSettled: () => {
      // 토큰을 먼저 지우면 ProtectedRoute가 로그인 화면으로 보내므로, 홈 이동을 먼저 겁니다.
      navigate(PATH.HOME.BASE, { replace: true });
      clearTokens();
      // 이전 사용자의 찜·마이페이지 캐시가 다음 사용자에게 보이지 않게 전부 비웁니다.
      queryClient.clear();
    },
  });

  const logout = () => mutate();

  return { logout, isPending };
};
