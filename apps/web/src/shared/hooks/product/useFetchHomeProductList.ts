import { fetchHomeProductList, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

interface UseFetchHomeProductListOptions {
  mainCategoryId?: number;
  subCategoryId?: number;
}

// 홈 카테고리별 추천 상품 목록을 조회하는 React Query hook입니다.
export const useFetchHomeProductList = ({
  mainCategoryId,
  subCategoryId,
}: UseFetchHomeProductListOptions = {}) => {
  const productParams = {
    ...(typeof mainCategoryId === 'number' ? { mainCategoryId } : {}),
    ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
  };

  const query = useQuery({
    queryKey: QUERY_KEYS.HOME.PRODUCT_LIST(productParams),
    queryFn: () => fetchHomeProductList(productParams),
    throwOnError: false,
    retry: false,
  });

  return query;
};
