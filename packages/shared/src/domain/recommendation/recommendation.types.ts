import type { SubcategoryType } from '../category/category.types';
import type { BasicCreatorProfileType } from '../creator/creator.types';
import type {
  ProductCardType,
  ProductSkinExpectationType,
  ProductSkinType,
} from '../product/product.types';

// 화면에서 고른 추천 조건입니다. 라벨(사람이 읽는 값)로 다루고, id 변환은 요청 직전에만 합니다.
export interface SelectedFiltersType {
  skinConcern: string[];
  skinType: string[];
  category: SubcategoryType[];
}

// 홈 추천 API 조회 조건입니다. 값이 없는 항목은 서버에 보내지 않습니다.
export interface HomeRecommendationParamsType {
  effects?: string[];
  skinTypeId?: number;
  subCategoryId?: number;
}

// 추천 상품마다 함께 보여주는 대표 리뷰입니다.
export interface RecommendedTopReviewType {
  creator: BasicCreatorProfileType;
  reviewId: number;
  productId: number;
  productName: string;
  content: string;
  rating: number;
  createdAt: string;
}

// 추천 화면의 상품 카드 + 상세 속성 + 대표 리뷰를 한 항목으로 담습니다.
export interface RecommendedProductType extends ProductCardType {
  mainCategoryId: number;
  subCategoryId: number;
  shortSummary: string;
  productSkinTypes: ProductSkinType[];
  productSkinExpectations: ProductSkinExpectationType[];
  topReview: RecommendedTopReviewType | null;
  recommendationScore: number;
}

// 추천 상품을 한 번에 찜한 결과입니다.
export interface RecommendedProductsWishResultType {
  wishedProductIds: number[];
  newAddedCount: number;
}
