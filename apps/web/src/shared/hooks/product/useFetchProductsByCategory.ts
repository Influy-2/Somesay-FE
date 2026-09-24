import { fetchProductsByCategory, QUERY_KEYS } from '@somesay/shared';
import type { ProductSortType } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

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
  const productParams = {
    mainCategoryId: mainCategoryId ?? 0,
    ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
    ...(sortType ? { sortType } : {}),
  };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.PRODUCT.BY_CATEGORY(productParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProductsByCategory({ page: pageParam, size, ...productParams }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
    enabled: enabled && isValidMainCategoryId,
    // 조회 실패를 목록 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
    throwOnError: false,
  });

  return query;
};
