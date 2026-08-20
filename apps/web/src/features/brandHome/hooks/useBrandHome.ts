import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  useFetchBrandDetail,
  useFetchBrandProducts,
  useFetchBrandProductSearch,
  useProductWish,
} from '@/shared/hooks';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useDebouncedSearchKeyword } from './useDebouncedSearchKeyword';
import {
  ALL_SUB_CATEGORY_ID,
  getBrandProductSort,
  getSubCategoryId,
} from '../utils/brandHome.params';
import type { BrandProductSortType } from '@somesay/shared';

/**
 * 브랜드 홈의 조회 조건과 상품 목록을 한곳에서 다룹니다.
 *
 * 필터·정렬·검색어는 URL 쿼리를 원본으로 삼아 새로고침·뒤로가기·링크 공유에서 살아남습니다.
 * 타이핑 중인 값만 지역 상태로 두고, 입력이 멈추면 URL에 커밋합니다.
 */
export const useBrandHome = (brandId?: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWish } = useProductWish();

  const selectedSubCategoryId = getSubCategoryId(searchParams.get('category'));
  const sortType = getBrandProductSort(searchParams.get('sort'));
  const keyword = searchParams.get('q') ?? '';

  // 타이핑 중인 값 — 입력이 멈출 때까지는 URL에 반영하지 않습니다.
  const [searchValue, setSearchValue] = useState(keyword);

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

  const commitKeyword = useCallback(
    (nextKeyword: string) => updateParam('q', nextKeyword),
    [updateParam]
  );
  const updateDebouncedKeyword = useDebouncedSearchKeyword(commitKeyword);

  // 입력이 있으면 커밋 전이라도 검색 모드로 전환해 목록이 어긋나 보이지 않게 합니다.
  const isSearchMode = searchValue.trim().length > 0;

  const brandQuery = useFetchBrandDetail(brandId);
  const productsQuery = useFetchBrandProducts({
    ...(brandId !== undefined ? { brandId } : {}),
    ...(selectedSubCategoryId !== ALL_SUB_CATEGORY_ID
      ? { subCategoryId: selectedSubCategoryId }
      : {}),
    sortType,
    enabled: !isSearchMode,
  });
  const searchQuery = useFetchBrandProductSearch({
    ...(brandId !== undefined ? { brandId } : {}),
    keyword,
    ...(selectedSubCategoryId !== ALL_SUB_CATEGORY_ID
      ? { subCategoryId: selectedSubCategoryId }
      : {}),
    sortType,
    enabled: keyword.length > 0,
  });
  const activeProductQuery = isSearchMode ? searchQuery : productsQuery;

  const categories = useMemo(
    () => [
      { id: ALL_SUB_CATEGORY_ID, label: '전체' },
      ...(brandQuery.data?.availableSubCategories.map(
        ({ subCategoryId, subName }) => ({
          id: subCategoryId,
          label: subName,
        })
      ) ?? []),
    ],
    [brandQuery.data?.availableSubCategories]
  );

  const products = useMemo(
    () => activeProductQuery.data?.pages.flatMap((page) => page.products) ?? [],
    [activeProductQuery.data?.pages]
  );
  const productCount = activeProductQuery.data?.pages[0]?.totalCount ?? 0;

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: activeProductQuery.hasNextPage ?? false,
    isFetchingNextPage: activeProductQuery.isFetchingNextPage,
    fetchNextPage: activeProductQuery.fetchNextPage,
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateDebouncedKeyword(value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    updateDebouncedKeyword('');
  };

  const handleSelectCategory = (subCategoryId: number) => {
    updateParam(
      'category',
      subCategoryId === ALL_SUB_CATEGORY_ID ? '' : String(subCategoryId)
    );
  };

  const handleSelectSort = (nextSortType: BrandProductSortType) => {
    updateParam('sort', nextSortType);
  };

  const handleHeartToggle = (productId: number) => {
    const product = products.find((item) => item.productId === productId);

    if (!product) {
      return;
    }

    toggleWish({ productId, isHearted: product.isHearted });
  };

  return {
    brand: brandQuery.data,
    isBrandPending: brandQuery.isPending,
    isBrandError: brandQuery.isError,
    // 아래 두 묶음은 각각 BrandProductFilters·BrandProductList의 props와 같은 모양입니다.
    filterProps: {
      searchValue,
      onSearchChange: handleSearchChange,
      onSearchClear: handleSearchClear,
      categories,
      selectedCategoryId: selectedSubCategoryId,
      onSelectCategory: handleSelectCategory,
      productCount,
      sortType,
      onSelectSort: handleSelectSort,
    },
    listProps: {
      products,
      onHeartToggle: handleHeartToggle,
      isLoading: activeProductQuery.isPending,
      isError: activeProductQuery.isError,
      emptyMessage: isSearchMode
        ? '검색 결과가 없어요.'
        : '해당 카테고리에 등록된 상품이 없어요.',
      isFetchingNextPage: activeProductQuery.isFetchingNextPage,
      isFetchNextPageError: activeProductQuery.isFetchNextPageError,
      onRetry: () => {
        void activeProductQuery.refetch();
      },
      onRetryNextPage: () => {
        void activeProductQuery.fetchNextPage();
      },
      loadMoreRef,
    },
  };
};
