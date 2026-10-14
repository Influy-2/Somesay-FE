import { useMemo, useState } from 'react';

import { useFetchCategories, useFetchProductsByCategory } from '@/shared/hooks';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

/**
 * 상품 추가 목록 화면의 카테고리 선택과 상품 목록(무한 스크롤)을 다룹니다.
 */
export const useAddProductList = () => {
  // 대분류 카테고리 조회: 실패해도 화면 전체를 에러 경계로 보내지 않고 안에서 처리합니다.
  const categoriesQuery = useFetchCategories({ throwOnError: false });
  const [pickedCategoryId, setPickedCategoryId] = useState<number | null>(null);

  // 탭이 받는 { id, label } 모양으로 바꿉니다.
  const categories = useMemo(
    () =>
      (categoriesQuery.data ?? []).map(
        ({ mainCategoryId, mainCategoryName }) => ({
          id: mainCategoryId,
          label: mainCategoryName,
        })
      ),
    [categoriesQuery.data]
  );

  // 카테고리 상품 API가 대분류를 필수로 받아 "전체"가 없으므로, 고르기 전에는 첫 대분류를 기본으로 본다.
  const selectedCategoryId = pickedCategoryId ?? categories[0]?.id;

  // 선택된 대분류의 상품을 평점순으로 조회합니다. 대분류가 없으면 요청하지 않습니다.
  const productsQuery = useFetchProductsByCategory({
    ...(selectedCategoryId !== undefined
      ? { mainCategoryId: selectedCategoryId }
      : {}),
    sortType: 'RATING',
  });

  // 파생값: 페이지를 한 줄로 펼친 목록과 전체 개수입니다.
  const products = useMemo(
    () => productsQuery.data?.pages.flatMap((page) => page.products) ?? [],
    [productsQuery.data?.pages]
  );
  const productCount = productsQuery.data?.pages[0]?.totalCount ?? 0;

  // 목록 끝의 감지 요소가 보이면 다음 페이지를 불러옵니다.
  const loadMoreRef = useInfiniteScroll({
    hasNextPage: productsQuery.hasNextPage,
    isFetchingNextPage: productsQuery.isFetchingNextPage,
    fetchNextPage: productsQuery.fetchNextPage,
  });

  return {
    categories,
    selectedCategoryId,
    selectCategory: setPickedCategoryId,
    products,
    productCount,
    // 카테고리가 성공했는데 비어 있으면 상품 쿼리가 disabled라 isPending이 계속 true이므로 따로 알립니다.
    isEmptyCategory: categoriesQuery.isSuccess && categories.length === 0,
    isLoading: categoriesQuery.isPending || productsQuery.isPending,
    isError: categoriesQuery.isError || productsQuery.isError,
    loadMoreRef,
  };
};
