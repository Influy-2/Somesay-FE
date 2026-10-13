import { fetchUserMyPage, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 마이페이지 첫 화면의 프로필과 활동 통계를 조회합니다.
// ProtectedRoute가 authenticated일 때만 이 화면을 렌더하므로 useFetchUserInfo와 달리 토큰 가드가 필요 없습니다.
export const useFetchUserMyPage = () =>
  useQuery({
    queryKey: QUERY_KEYS.USER.MYPAGE(),
    queryFn: fetchUserMyPage,
    // 조회 실패를 화면 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
    throwOnError: false,
  });
