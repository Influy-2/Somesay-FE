import { fetchHomeProductRanking, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 홈 평점 상위 상품 랭킹을 조회하는 React Query hook입니다.
export const useFetchHomeProductRanking = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.HOME.PRODUCT_RANKING(),
    queryFn: fetchHomeProductRanking,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  return query;
};
