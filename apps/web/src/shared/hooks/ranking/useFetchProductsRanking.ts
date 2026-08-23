import { fetchProductRanking, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchProductsRankingOptions {
  size?: number;
  mainCategoryId?: number;
}

// 상품 랭킹을 카테고리별 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchProductsRanking = ({
  size = 10,
  mainCategoryId,
}: UseFetchProductsRankingOptions = {}) => {
  const rankingParams =
    mainCategoryId === undefined ? { size } : { size, mainCategoryId };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.RANKING.PRODUCTS(rankingParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProductRanking({ page: pageParam, ...rankingParams }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    // 전역 기본값과 달리 섹션 내부에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
    throwOnError: false,
  });

  return query;
};
