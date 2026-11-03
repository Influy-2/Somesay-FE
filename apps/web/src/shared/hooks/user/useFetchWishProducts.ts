import type { WishProductSortType } from '@somesay/shared';

import { useApiInfiniteQuery } from '@/shared/api';

interface UseFetchWishProductsParams {
  subCategoryId?: number;
  sortType: WishProductSortType;
  size?: number;
}

// 찜한 상품을 무한 스크롤 페이지 단위로 조회합니다. pages: CountedSliceResponseProductCard[]
export const useFetchWishProducts = ({
  subCategoryId,
  sortType,
  size = 10,
}: UseFetchWishProductsParams) =>
  useApiInfiniteQuery(
    '/api/v1/users/wishes/products',
    {
      params: {
        query: {
          sortType,
          size,
          ...(subCategoryId !== undefined ? { subCategoryId } : {}),
        },
      },
    },
    // 전역 기본값과 달리 목록 안에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
    { throwOnError: false }
  );
