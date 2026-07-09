import {
  fetchBrandProductSearch,
  QUERY_KEYS,
  type BrandProductSortType,
} from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

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
  const searchParams = {
    keyword: normalizedKeyword,
    size,
    ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
    ...(sortType ? { sortType } : {}),
  };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.BRAND.SEARCH(brandId ?? 0, searchParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchBrandProductSearch(brandId ?? 0, {
        page: pageParam,
        ...searchParams,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
    enabled: enabled && isValidBrandId && normalizedKeyword.length > 0,
  });

  return query;
};
