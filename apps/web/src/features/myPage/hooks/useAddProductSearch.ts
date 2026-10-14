import { useMemo, useState, type ChangeEventHandler } from 'react';

import { useFetchCategories, useFetchUserProductSearch } from '@/shared/hooks';
import { useRecentProductSearchStore } from '@/features/productSelection';
import type { UserProductSearchSortType } from '@somesay/shared';

import { PRODUCT_FIT_SEARCH_SORT_OPTIONS } from '../constants/myPage.constants';

// 서버의 mainCategoryId로 쓰이지 않는 "전체" 탭입니다.
const ALL_CATEGORY = { id: 0, label: '전체' };

/**
 * 상품 추가 검색 화면의 입력·카테고리·정렬 상태와 검색 결과를 다룹니다.
 */
export const useAddProductSearch = () => {
  // 검색 상태: 입력 중인 값과 제출된 값을 분리해 결과 모드를 구분합니다.
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY.id);
  const [sortType, setSortType] =
    useState<UserProductSearchSortType>('RATING_DESC');

  // 최근 검색어 스토어 구독: 목록과 추가·삭제·전체 삭제 액션을 각각 꺼냅니다.
  const recentSearches = useRecentProductSearchStore((state) => state.items);
  const addRecentSearch = useRecentProductSearchStore((state) => state.addItem);
  const removeRecentSearch = useRecentProductSearchStore(
    (state) => state.removeItem
  );
  const clearRecentSearches = useRecentProductSearchStore(
    (state) => state.clearAll
  );

  // 카테고리 탭: "전체" 뒤에 대분류를 붙입니다.
  const categoriesQuery = useFetchCategories({ throwOnError: false });
  const categories = useMemo(
    () => [
      ALL_CATEGORY,
      ...(categoriesQuery.data ?? []).map(
        ({ mainCategoryId, mainCategoryName }) => ({
          id: mainCategoryId,
          label: mainCategoryName,
        })
      ),
    ],
    [categoriesQuery.data]
  );

  // 제출된 검색어로 조회합니다. "전체"면 카테고리 조건을 뺍니다.
  const searchQuery = useFetchUserProductSearch({
    keyword: submittedQuery,
    sortType,
    ...(selectedCategoryId === ALL_CATEGORY.id
      ? {}
      : { mainCategoryId: selectedCategoryId }),
  });

  // 파생값: 제출된 검색어가 있으면 결과 모드입니다.
  const isResultMode = submittedQuery.length > 0;
  const products = useMemo(
    () => searchQuery.data?.details ?? [],
    [searchQuery.data]
  );

  // 검색창 제출과 최근 검색어 선택이 같은 절차를 타도록 한곳에 모읍니다.
  const runSearch = (keyword: string) => {
    // 공백뿐인 검색어는 무시합니다.
    const trimmedQuery = keyword.trim();
    if (!trimmedQuery) return;

    // 입력창·제출값을 맞추고 카테고리를 "전체"로 되돌린 뒤 기록에 남깁니다.
    setQuery(trimmedQuery);
    setSubmittedQuery(trimmedQuery);
    setSelectedCategoryId(ALL_CATEGORY.id);
    addRecentSearch(trimmedQuery);
  };

  // 입력이 바뀌면 결과 모드를 풀어 다시 입력 모드(최근 검색어)로 돌아갑니다.
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
    setSubmittedQuery('');
  };

  // 검색창 제출은 현재 입력값으로 검색합니다.
  const handleSubmit = () => runSearch(query);

  // 입력과 결과를 모두 초기화해 최근 검색어 화면으로 돌아갑니다.
  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setSelectedCategoryId(ALL_CATEGORY.id);
  };

  // SortBar가 string을 주므로, 허용된 정렬 값일 때만 타입을 좁혀 반영합니다.
  const handleSelectSort = (value: string) => {
    const option = PRODUCT_FIT_SEARCH_SORT_OPTIONS.find(
      (sortOption) => sortOption.value === value
    );
    if (option) setSortType(option.value);
  };

  return {
    query,
    isResultMode,
    categories,
    selectedCategoryId,
    selectCategory: setSelectedCategoryId,
    sortType,
    handleSelectSort,
    products,
    productCount: searchQuery.data?.totalCount ?? 0,
    isLoading: searchQuery.isPending,
    isError: searchQuery.isError,
    recentSearches,
    runSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleChange,
    handleSubmit,
    handleClear,
  };
};
