import { fetchProductDetail, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchProductDetail = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  const query = useQuery({
    queryKey: isValidProductId
      ? QUERY_KEYS.PRODUCT.DETAIL(productId)
      : [...QUERY_KEYS.PRODUCT.ALL, productId],
    queryFn: () => fetchProductDetail(productId ?? 0),
    enabled: isValidProductId,
  });

  return query;
};
