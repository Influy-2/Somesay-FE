import { fetchProductDetail, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchProductDetail = (productId: number) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.DETAIL(productId),
    queryFn: () => fetchProductDetail({ productId }),
  });

  return query;
};
