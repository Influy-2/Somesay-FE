import { fetchHomeCreatorRanking, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 홈 크리에이터 신뢰도 랭킹을 조회하는 React Query hook입니다.
export const useFetchHomeCreatorRanking = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.HOME.CREATOR_RANKING(),
    queryFn: fetchHomeCreatorRanking,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  return query;
};
