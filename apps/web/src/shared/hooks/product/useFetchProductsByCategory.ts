import type { ProductSortType } from '@somesay/shared';

import { useApiInfiniteQuery } from '@/shared/api';

interface UseFetchProductsOptions {
  mainCategoryId?: number;
  subCategoryId?: number;
  sortType?: ProductSortType;
  size?: number;
  enabled?: boolean;
}

// 카테고리별 상품 목록을 무한 스크롤 페이지 단위로 조회합니다.
export const useFetchProductsByCategory = ({
  size = 10,
  mainCategoryId,
  subCategoryId,
  sortType,
  enabled = true,
}: UseFetchProductsOptions) => {
  const isValidMainCategoryId =
    typeof mainCategoryId === 'number' &&
    Number.isInteger(mainCategoryId) &&
    mainCategoryId > 0;

  return useApiInfiniteQuery(
    '/api/v1/products',
    {
      params: {
        query: {
          mainCategoryId: mainCategoryId ?? 0,
          size,
          ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
          ...(sortType ? { sortType } : {}),
        },
      },
    },
    {
      enabled: enabled && isValidMainCategoryId,
      // 조회 실패를 목록 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
      throwOnError: false,
    }
  );
};
