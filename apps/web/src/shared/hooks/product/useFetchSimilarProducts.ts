import { fetchProductProductIdSimilar, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

export const useFetchSimilarProducts = (productId: number) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.SIMILAR(productId),
    queryFn: () => fetchProductProductIdSimilar({ productId }),
  });

  return query;
};
