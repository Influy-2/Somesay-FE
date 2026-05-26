import { fetchProductReviewOverview, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 상품 리뷰 개요 정보를 조회하는 React Query hook입니다.
export const useFetchProductReviewOverview = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  const query = useQuery({
    queryKey: isValidProductId
      ? QUERY_KEYS.PRODUCT.REVIEW_OVERVIEW(productId)
      : [...QUERY_KEYS.PRODUCT.ALL, productId, 'review-overview'],
    queryFn: () => fetchProductReviewOverview({ productId: productId ?? 0 }),
    enabled: isValidProductId,
    staleTime: 1000 * 60 * 3,
  });

  return query;
};
