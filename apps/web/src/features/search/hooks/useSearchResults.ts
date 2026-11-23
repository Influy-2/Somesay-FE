// useSearchResults — 데이터 패칭
// - query, filters, sortBy를 받아서 실제
// 결과(products, reviews) 반환
// - API 연결 시 useApiInfiniteQuery 로 교체될 레이어
import type { ProductCard, ReviewSearchItemResponse } from '@somesay/shared';

import { MOCK_SEARCH_PRODUCTS, MOCK_SEARCH_REVIEWS } from '../mock';
import type {
  SelectedFiltersType,
  ProductSearchSortOptionType,
  ReviewSearchSortOptionType,
} from '../types/search.types';

interface UseSearchResultsReturn {
  products: ProductCard[];
  reviews: ReviewSearchItemResponse[];
  isLoading: boolean;
  isError: boolean;
}

export const useSearchResults = (
  query: string,
  filters: SelectedFiltersType,
  productSortBy: ProductSearchSortOptionType,
  reviewSortBy: ReviewSearchSortOptionType
): UseSearchResultsReturn => {
  // TODO: 검색 API 연동 시 이 블록을 교체합니다.
  // 상품은 GET /api/v1/search/products, 리뷰는 GET /api/v1/search/reviews 를
  // useApiInfiniteQuery(@/shared/api)로 부르고 응답(ProductCard·ReviewSearchItemResponse)을 그대로 넘깁니다.

  //unused var 에러 해제를 위한 임시
  const isError = !!query || !!filters || !!productSortBy || !!reviewSortBy;
  let products: ProductCard[] = [];
  let reviews: ReviewSearchItemResponse[] = [];

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
