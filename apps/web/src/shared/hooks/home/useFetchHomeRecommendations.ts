import {
  fetchHomeRecommendations,
  QUERY_KEYS,
  type HomeRecommendationParamsType,
} from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 홈에서 조건을 확정한 뒤 추천 결과 화면이 다시 그릴 때까지 같은 응답을 씁니다.
export const RECOMMENDATION_STALE_TIME = 5 * 60 * 1000;

interface UseFetchHomeRecommendationsOptions {
  enabled?: boolean;
}

// 홈에서 고른 피부 조건에 맞는 추천 상품 목록을 조회하는 React Query hook입니다.
export const useFetchHomeRecommendations = (
  params: HomeRecommendationParamsType,
  { enabled = true }: UseFetchHomeRecommendationsOptions = {}
) =>
  useQuery({
    queryKey: QUERY_KEYS.HOME.RECOMMEND(params),
    queryFn: () => fetchHomeRecommendations(params),
    staleTime: RECOMMENDATION_STALE_TIME,
    enabled,
    // 조건을 다시 고르면 되는 화면이라 에러 바운더리로 던지지 않고 화면 안에서 안내합니다.
    throwOnError: false,
  });
