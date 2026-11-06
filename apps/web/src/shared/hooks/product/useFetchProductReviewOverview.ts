import { useApiQuery } from '@/shared/api';

// 상품 리뷰 개요 정보를 조회하는 React Query hook입니다.
export const useFetchProductReviewOverview = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  return useApiQuery(
    '/api/v1/products/{productId}/review-overview',
    { params: { path: { productId: productId ?? 0 } } },
    {
      enabled: isValidProductId,
      staleTime: 1000 * 60 * 30,
    }
  );
};
