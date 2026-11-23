import type { BrandProductSortType } from '@somesay/shared';

import { useApiInfiniteQuery } from '@/shared/api';

interface UseFetchBrandProductSearchOptions {
  brandId?: number;
  keyword: string;
  subCategoryId?: number;
  sortType?: BrandProductSortType;
  size?: number;
  enabled?: boolean;
}

// 브랜드 내 상품 검색 결과를 무한 스크롤 페이지 단위로 조회합니다.
export const useFetchBrandProductSearch = ({
  brandId,
  keyword,
  subCategoryId,
  sortType,
  size = 10,
  enabled = true,
}: UseFetchBrandProductSearchOptions) => {
  const isValidBrandId =
    typeof brandId === 'number' && Number.isInteger(brandId) && brandId > 0;
  const normalizedKeyword = keyword.trim();

  return useApiInfiniteQuery(
    '/api/v1/brands/{brandId}/products/search',
    {
      params: {
        path: { brandId: brandId ?? 0 },
        query: {
          keyword: normalizedKeyword,
          size,
          ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
          ...(sortType ? { sortType } : {}),
        },
      },
    },
    {
      enabled: enabled && isValidBrandId && normalizedKeyword.length > 0,
      throwOnError: false,
    }
  );
};
