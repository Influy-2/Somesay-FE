import { fetchProductRanking, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchProductsRankingOptions {
  size?: number;
  mainCategoryId?: number;
}

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
  });

  return query;
};
