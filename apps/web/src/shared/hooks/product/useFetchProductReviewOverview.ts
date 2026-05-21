import {
  fetchProductProductIdReviewOverview,
  QUERY_KEYS,
} from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchProductReviewOverview = (productId: number) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.REVIEW_OVERVIEW(productId),
    queryFn: () => fetchProductProductIdReviewOverview({ productId }),
  });

  return query;
};
