import { useApiQuery } from '@/shared/api';

interface UseFetchHomeProductListOptions {
  mainCategoryId?: number;
}

// 홈 카테고리별 상품 목록을 조회하는 React Query hook입니다. (mainCategoryId 가 없으면 전체)
export const useFetchHomeProductList = ({
  mainCategoryId,
}: UseFetchHomeProductListOptions = {}) =>
  useApiQuery(
    '/api/v1/home/products',
    {
      params: {
        query: typeof mainCategoryId === 'number' ? { mainCategoryId } : {},
      },
    },
    {
      throwOnError: false,
      retry: false,
    }
  );
