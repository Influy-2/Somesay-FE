import { useApiQuery } from '@/shared/api';

// 기대효과가 비슷한 상품(작은 카드) 목록을 조회합니다.
export const useFetchSimilarProducts = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  return useApiQuery(
    '/api/v1/products/{productId}/similar',
    { params: { path: { productId: productId ?? 0 } } },
    {
      enabled: isValidProductId,
      // TODO: 에러 처리
      throwOnError: false,
      retry: 2,
    }
  );
};
