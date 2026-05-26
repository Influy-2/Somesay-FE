import { fetchProductSimilar, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 비슷한 기대효과 상품 리스트를 조회하는 React Query hook입니다.
export const useFetchProductSimilar = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  const query = useQuery({
    queryKey: isValidProductId
      ? QUERY_KEYS.PRODUCT.SIMILAR(productId)
      : [...QUERY_KEYS.PRODUCT.ALL, productId, 'similar'],
    queryFn: () => fetchProductSimilar(productId ?? 0),
    enabled: isValidProductId,
    staleTime: 1000 * 60 * 5, // 5분
  });

  return query;
};
