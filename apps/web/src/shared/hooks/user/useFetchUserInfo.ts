import { fetchUserInfo, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';
import { useAuthTokenStore } from '@/shared/stores';

const USER_INFO_STALE_TIME = 5 * 60 * 1000;

// 토큰이 있을 때만 서비스 공통 사용자 정보를 조회합니다.
export const useFetchUserInfo = () => {
  const accessToken = useAuthTokenStore((state) => state.accessToken);

  return useQuery({
    queryKey: QUERY_KEYS.USER.INFO(),
    queryFn: fetchUserInfo,
    enabled: Boolean(accessToken), //토큰이 없으면 fetchUserInfo 자체를 호출하지 않습니다.
    staleTime: USER_INFO_STALE_TIME,
    retry: false,
    throwOnError: false,
  });
};
