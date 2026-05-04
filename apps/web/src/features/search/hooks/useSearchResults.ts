// useSearchResults — 데이터 패칭
// - query, filters, sortBy를 받아서 실제
// 결과(products, reviews) 반환
// - API 연결 시 TanStack Query로 교체될 레이어
import type {
  ProductSearchResultType,
  ReviewSearchResultType,
} from '@somesay/shared';

import { MOCK_SEARCH_PRODUCTS, MOCK_SEARCH_REVIEWS } from '../mock';
import type {
  SelectedFiltersType,
  ProductSearchSortOptionType,
  ReviewSearchSortOptionType,
} from '../types/search.types';

interface UseSearchResultsReturn {
  products: ProductSearchResultType[];
  reviews: ReviewSearchResultType[];
  isLoading: boolean;
  isError: boolean;
}

export const useSearchResults = (
  query: string,
  filters: SelectedFiltersType,
  productSortBy: ProductSearchSortOptionType,
  reviewSortBy: ReviewSearchSortOptionType
): UseSearchResultsReturn => {
  // API 연결 시 이 블록만 교체:
  // return useQuery({
  //   queryKey: ['search', _query, _filters, _productSortBy, _reviewSortBy],
  //   queryFn: () => apiClient.get('/search', { params: { q: _query, ..._filters, productSortBy: _productSortBy, reviewSortBy: _reviewSortBy } }),
  //   enabled: _query.length > 0,
  // });

  //unused var 에러 해제를 위한 임시
  const isError = !!query || !!filters || !!productSortBy || !!reviewSortBy;
  let products: ProductSearchResultType[] = [];
  let reviews: ReviewSearchResultType[] = [];

  if (query.length > 0) {
    products = MOCK_SEARCH_PRODUCTS;
    reviews = MOCK_SEARCH_REVIEWS;
  }

  return {
    products: products,
    reviews: reviews,
    isLoading: false,
    isError: isError,
  };
};
