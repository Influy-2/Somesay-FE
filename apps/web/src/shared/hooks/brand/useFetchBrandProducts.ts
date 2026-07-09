import {
  fetchBrandProducts,
  QUERY_KEYS,
  type BrandProductSortType,
} from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchBrandProductsOptions {
  brandId?: number;
  mainCategoryId?: number;
  sortType?: BrandProductSortType;
  size?: number;
  enabled?: boolean;
}

// 브랜드 상품 목록을 무한 스크롤 페이지 단위로 조회합니다.
export const useFetchBrandProducts = ({
  brandId,
  mainCategoryId,
  sortType,
  size = 10,
  enabled = true,
}: UseFetchBrandProductsOptions) => {
  const isValidBrandId =
    typeof brandId === 'number' && Number.isInteger(brandId) && brandId > 0;
  const productParams = {
    size,
    ...(typeof mainCategoryId === 'number' ? { mainCategoryId } : {}),
    ...(sortType ? { sortType } : {}),
  };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.BRAND.PRODUCTS(brandId ?? 0, productParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchBrandProducts(brandId ?? 0, {
        page: pageParam,
        ...productParams,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : undefined,
    enabled: enabled && isValidBrandId,
  });

  return query;
};
