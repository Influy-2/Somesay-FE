import type { ProductSearchResultType } from '../search/search.types';

// 브랜드 홈 상단에 표시하는 브랜드 요약 정보입니다.
export interface BrandSummaryType {
  brandId: number;
  brandName: string;
  brandLogoUrl: string;
  brandImageUrl: string;
  rating: number;
  reviewCount: number;
  ranking: number;
}

export type BrandProductSortType = 'RATING' | 'REVIEW' | 'PRICE';

// 브랜드 상품 목록과 상품 카드에서 함께 사용하는 프론트엔드 타입입니다.
export interface BrandProductType extends ProductSearchResultType {
  mainCategoryId: number;
  subCategoryId: number;
}

// 추후 무한 쿼리 페이지 응답으로 교체할 브랜드 상품 목록 구조입니다.
export interface BrandProductPageType {
  products: BrandProductType[];
  totalCount: number;
  hasNext: boolean;
}
