import { useApiQuery } from '@/shared/api';

// 홈 평점 상위 상품 랭킹을 조회하는 React Query hook입니다.
export const useFetchHomeProductRanking = () =>
  useApiQuery('/api/v1/home/products/best', undefined, {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
