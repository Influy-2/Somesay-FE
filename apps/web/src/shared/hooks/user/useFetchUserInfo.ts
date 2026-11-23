import { useApiQuery } from '@/shared/api';
import { useAuthTokenStore } from '@/shared/stores';

const USER_INFO_STALE_TIME = 5 * 60 * 1000;

// 토큰이 있을 때만 서비스 공통 사용자 정보를 조회합니다. data: InfoResponse
export const useFetchUserInfo = () => {
  const accessToken = useAuthTokenStore((state) => state.accessToken);

  return useApiQuery('/api/v1/users/info', undefined, {
    enabled: Boolean(accessToken), //토큰이 없으면 /users/info 자체를 호출하지 않습니다.
    staleTime: USER_INFO_STALE_TIME,
    retry: false,
    throwOnError: false,
  });
};
