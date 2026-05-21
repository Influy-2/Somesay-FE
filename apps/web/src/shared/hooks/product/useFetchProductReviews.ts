import { fetchProductProductIdReviews, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchProductReviewsOptions {
  filterByMySkin?: boolean;
  size?: number;
}

export const useFetchProductReviews = (
  productId: number,
  { size = 10, filterByMySkin }: UseFetchProductReviewsOptions = {}
) => {
  const reviewParams =
    typeof filterByMySkin === 'boolean' ? { filterByMySkin } : {};

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.PRODUCT.REVIEWS(productId, reviewParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProductProductIdReviews({
        pathParams: { productId },
        params: { page: pageParam, size, ...reviewParams },
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : null,
  });

  return query;
};
