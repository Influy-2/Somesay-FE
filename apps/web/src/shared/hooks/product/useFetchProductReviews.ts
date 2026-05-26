import { fetchProductReviews, QUERY_KEYS } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchProductReviewsOptions {
  filterByMySkin?: boolean;
  size?: number;
}

export const useFetchProductReviews = (
  productId?: number,
  { size = 10, filterByMySkin }: UseFetchProductReviewsOptions = {}
) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);
  const reviewParams =
    typeof filterByMySkin === 'boolean' ? { filterByMySkin } : {};

  const query = useInfiniteQuery({
    queryKey: isValidProductId
      ? QUERY_KEYS.PRODUCT.REVIEWS(productId, reviewParams)
      : [...QUERY_KEYS.PRODUCT.ALL, productId, 'reviews', reviewParams],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProductReviews(productId ?? 0, {
        page: pageParam,
        size,
        ...reviewParams,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : null,
    enabled: isValidProductId,
  });

  return query;
};
