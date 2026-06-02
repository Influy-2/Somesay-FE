import { fetchProductReviewOverview, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 상품 리뷰 개요 정보를 조회하는 React Query hook입니다.
export const useFetchProductReviewOverview = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  const query = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.REVIEW_OVERVIEW(productId || 0),
    queryFn: () => fetchProductReviewOverview(productId ?? 0),
    enabled: isValidProductId,
    staleTime: 1000 * 60 * 30,
  });

  return query;
};
