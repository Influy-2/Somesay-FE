import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import {
  useFetchCategories,
  useFetchWishProducts,
  useProductWish,
} from '@/shared/hooks';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import {
  ALL_SUB_CATEGORY_ID,
  getSubCategoryId,
  getWishProductSort,
} from '../utils/wishList.params';

/**
 * 찜한 상품 탭의 조회 조건과 목록을 한곳에서 다룹니다.
 *
 * 소분류·정렬은 URL 쿼리를 원본으로 삼아 새로고침·뒤로가기·링크 공유에서 살아남습니다.
 */
export const useWishProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWish } = useProductWish();

  // 찜 목록은 대분류 구분 없이 소분류만 걸러 대분류 검증이 필요 없으므로, 카테고리를 기다리지 않고 조회합니다.
  const categoriesQuery = useFetchCategories({ throwOnError: false });
  const tabs = [
    { id: ALL_SUB_CATEGORY_ID, label: '전체' },
    ...(categoriesQuery.data ?? []).flatMap((group) =>
      group.subCategories.map(({ subCategoryId, subCategoryName }) => ({
        id: subCategoryId,
        label: subCategoryName,
      }))
    ),
  ];

  // 카테고리를 받기 전에는 URL 값을 믿어야 '전체'로 한 번 더 조회하지 않습니다.
  const requestedSubCategoryId = getSubCategoryId(
    searchParams.get('subcategory')
  );
  const selectedSubCategoryId =
    categoriesQuery.isPending ||
    tabs.some((tab) => tab.id === requestedSubCategoryId)
      ? requestedSubCategoryId
      : ALL_SUB_CATEGORY_ID;
  const sortType = getWishProductSort(searchParams.get('sort'));

  const productsQuery = useFetchWishProducts({
    sortType,
    ...(selectedSubCategoryId !== ALL_SUB_CATEGORY_ID
      ? { subCategoryId: selectedSubCategoryId }
      : {}),
  });

  const products = useMemo(
    () => productsQuery.data?.pages.flatMap((page) => page.content) ?? [],
    [productsQuery.data?.pages]
  );
  const productCount = productsQuery.data?.pages[0]?.totalCount ?? 0;

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: productsQuery.hasNextPage,
    isFetchingNextPage: productsQuery.isFetchingNextPage,
    fetchNextPage: productsQuery.fetchNextPage,
  });

  // 조건 변경은 이력에 쌓이면 뒤로가기가 필터 되돌리기가 되므로 replace합니다.
  const updateParam = (key: string, value: string) => {
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
  };

  const handleHeartToggle = (productId: number) => {
    const product = products.find((item) => item.productId === productId);

    if (!product) {
      return;
    }

    toggleWish({ productId, isHearted: product.isHearted });
  };

  return {
    // 아래 묶음은 각각 HorizontalCategoriesTab·SortBar·WishProductList·WishLoadMore의 props와 같은 모양입니다.
    tabProps: {
      categories: tabs,
      selectedId: selectedSubCategoryId,
      onSelect: (subCategoryId: number) =>
        updateParam(
          'subcategory',
          subCategoryId === ALL_SUB_CATEGORY_ID ? '' : String(subCategoryId)
        ),
    },
    sortProps: {
      count: productCount,
      currentSortValue: sortType,
      onSelectSort: (value: string) =>
        updateParam('sort', getWishProductSort(value)),
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
