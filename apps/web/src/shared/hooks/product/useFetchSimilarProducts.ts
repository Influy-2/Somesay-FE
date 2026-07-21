import { fetchSimilarProducts, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchSimilarProducts = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  return useQuery({
    queryKey: isValidProductId
      ? QUERY_KEYS.PRODUCT.SIMILAR(productId)
      : [...QUERY_KEYS.PRODUCT.ALL, productId, 'similar'],
    queryFn: () => fetchSimilarProducts(productId ?? 0),
    enabled: isValidProductId,
  });
};
