import { fetchCreatorRanking, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchCreatorRankingOptions {
  size?: number;
}

// 크리에이터 신뢰도 랭킹을 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchCreatorRanking = ({
  size = 5,
}: UseFetchCreatorRankingOptions = {}) => {
  const rankingParams = { size };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.RANKING.CREATORS(rankingParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchCreatorRanking({ page: pageParam, ...rankingParams }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  return query;
};
