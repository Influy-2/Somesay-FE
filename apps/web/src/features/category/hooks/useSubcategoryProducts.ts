import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import {
  useFetchCategories,
  useFetchProductsByCategory,
  useProductWish,
} from '@/shared/hooks';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import {
  ALL_SUB_CATEGORY_ID,
  getProductSort,
  getSubCategoryId,
} from '../utils/subcategory.params';

/**
 * 소분류 카테고리 화면의 조회 조건과 상품 목록을 한곳에서 다룹니다.
 *
 * 소분류·정렬은 URL 쿼리를 원본으로 삼아 새로고침·뒤로가기·링크 공유에서 살아남습니다.
 */
export const useSubcategoryProducts = (mainCategoryId?: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWish } = useProductWish();

  const categoriesQuery = useFetchCategories({ throwOnError: false });
  const category = categoriesQuery.data?.find(
    (group) => group.mainCategoryId === mainCategoryId
  );

  // 다른 대분류의 소분류가 URL에 남아 있으면 이 화면에서는 '전체'로 봅니다.
  const requestedSubCategoryId = getSubCategoryId(
    searchParams.get('subcategory')
  );
  const selectedSubCategoryId = category?.subCategories.some(
    (sub) => sub.subCategoryId === requestedSubCategoryId
  )
    ? requestedSubCategoryId
    : ALL_SUB_CATEGORY_ID;
  const sortType = getProductSort(searchParams.get('sort'));

  const productsQuery = useFetchProductsByCategory({
    ...(mainCategoryId !== undefined ? { mainCategoryId } : {}),
    ...(selectedSubCategoryId !== ALL_SUB_CATEGORY_ID
      ? { subCategoryId: selectedSubCategoryId }
      : {}),
    sortType,
    // 소분류 검증이 끝나기 전에 요청하면 '전체'로 한 번 더 조회하게 되므로 카테고리를 먼저 기다립니다.
    enabled: Boolean(category),
  });

  // 조건 변경은 이력에 쌓이면 뒤로가기가 필터 되돌리기가 되므로 replace합니다.
  const updateParam = useCallback(
    (key: string, value: string) => {
      setSearchParams(
        (currentParams) => {
          const nextParams = new URLSearchParams(currentParams);

          if (value) {
            nextParams.set(key, value);
          } else {
            nextParams.delete(key);
          }

          return nextParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const tabs = useMemo(
    () => [
      { id: ALL_SUB_CATEGORY_ID, label: '전체' },
      ...(category?.subCategories.map(({ subCategoryId, subCategoryName }) => ({
        id: subCategoryId,
        label: subCategoryName,
      })) ?? []),
    ],
    [category?.subCategories]
  );

  const products = useMemo(
    () => productsQuery.data?.pages.flatMap((page) => page.products) ?? [],
    [productsQuery.data?.pages]
  );
  const productCount = productsQuery.data?.pages[0]?.totalCount ?? 0;

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: productsQuery.hasNextPage,
    isFetchingNextPage: productsQuery.isFetchingNextPage,
    fetchNextPage: productsQuery.fetchNextPage,
  });

  const handleSelectSubCategory = (subCategoryId: number) => {
    updateParam(
      'subcategory',
      subCategoryId === ALL_SUB_CATEGORY_ID ? '' : String(subCategoryId)
    );
  };

  const handleSelectSort = (value: string) => {
    updateParam('sort', getProductSort(value));
  };

  const handleHeartToggle = (productId: number) => {
    const product = products.find((item) => item.productId === productId);

    if (!product) {
      return;
    }

    toggleWish({ productId, isHearted: product.isHearted });
  };

  return {
    category,
    isCategoryPending: categoriesQuery.isPending,
    isCategoryError: categoriesQuery.isError,
    // 아래 묶음은 각각 HorizontalCategoriesTab·SortBar·SubcategoryProductList·SubcategoryLoadMore의 props와 같은 모양입니다.
    tabProps: {
      categories: tabs,
      selectedId: selectedSubCategoryId,
      onSelect: handleSelectSubCategory,
    },
    sortProps: {
      count: productCount,
      currentSortValue: sortType,
      onSelectSort: handleSelectSort,
    },
    listProps: {
      products,
      onHeartToggle: handleHeartToggle,
      isLoading: productsQuery.isPending,
      isError: productsQuery.isError,
      onRetry: () => {
        void productsQuery.refetch();
      },
    },
    loadMoreProps: {
      loadMoreRef,
      isFetchingNextPage: productsQuery.isFetchingNextPage,
      isFetchNextPageError: productsQuery.isFetchNextPageError,
      onRetryNextPage: () => {
        void productsQuery.fetchNextPage();
      },
    },
  };
};
