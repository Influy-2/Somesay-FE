import { fetchCreatorRanking, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchCreatorRankingOptions {
  size?: number;
}

// 크리에이터 신뢰도 랭킹을 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchCreatorRanking = ({
  size = 10,
}: UseFetchCreatorRankingOptions = {}) => {
  const rankingParams = { size };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.RANKING.CREATORS(rankingParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchCreatorRanking({ page: pageParam, ...rankingParams }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    // 전역 기본값과 달리 섹션 내부에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
    throwOnError: false,
  });

  return query;
};
