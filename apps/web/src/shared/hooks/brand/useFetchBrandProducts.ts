import type { BrandProductSortType } from '@somesay/shared';

import { useApiInfiniteQuery } from '@/shared/api';

interface UseFetchBrandProductsOptions {
  brandId?: number;
  subCategoryId?: number;
  sortType?: BrandProductSortType;
  size?: number;
  enabled?: boolean;
}

// 브랜드 상품 목록을 무한 스크롤 페이지 단위로 조회합니다.
export const useFetchBrandProducts = ({
  brandId,
  subCategoryId,
  sortType,
  size = 10,
  enabled = true,
}: UseFetchBrandProductsOptions) => {
  const isValidBrandId =
    typeof brandId === 'number' && Number.isInteger(brandId) && brandId > 0;

  return useApiInfiniteQuery(
    '/api/v1/brands/{brandId}/products',
    {
      params: {
        path: { brandId: brandId ?? 0 },
        query: {
          size,
          ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
          ...(sortType ? { sortType } : {}),
        },
      },
    },
    {
      enabled: enabled && isValidBrandId,
      throwOnError: false,
    }
  );
};
