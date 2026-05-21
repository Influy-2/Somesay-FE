import { fetchProductsByCategory, QUERY_KEYS } from '@somesay/shared';
import type { SortOptionsType } from '@somesay/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchProductsOptions {
  mainCategoryId: number;
  subCategoryId?: number;
  sortType?: SortOptionsType['sortType'];
  size?: number;
}

export const useFetchProductsByCategory = ({
  size = 10,
  mainCategoryId,
  subCategoryId,
  sortType,
}: UseFetchProductsOptions) => {
  const productParams = {
    mainCategoryId,
    ...(typeof subCategoryId === 'number' ? { subCategoryId } : {}),
    ...(sortType ? { sortType } : {}),
  };

  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.PRODUCT.BY_CATEGORY(productParams),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProductsByCategory({ page: pageParam, size, ...productParams }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNext ? pages.length : null,
  });

  return query;
};
