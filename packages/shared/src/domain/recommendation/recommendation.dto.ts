import type { BasicCreatorDto } from '../creator/creator.dto';
import type { ProductCardDto } from '../product/product.dto';

// 홈 추천 API에 전달하는 조회 조건입니다.
// effects는 기대 효과명(보습, 진정 등) 목록이고 나머지는 단일 선택입니다.
export interface FetchHomeRecommendationsParamsDto {
  effects?: string[];
  skinTypeId?: number;
  subCategoryId?: number;
}

// 추천 상품에 함께 내려오는 대표 리뷰의 크리에이터 정보입니다.
interface RecommendationCreatorDto extends BasicCreatorDto {
  youtubeLink: string;
  ranking: number;
  personalColor: string;
}

// 추천 상품에 함께 내려오는 대표 리뷰 본문입니다.
interface RecommendationReviewDto {
  reviewId: number;
  creatorId: number;
  productId: number;
  productImgUrl: string;
  productName: string;
  price: number;
  mainCategoryName: string;
  subCategoryName: string;
  brandName: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface RecommendationTopReviewDto {
  creator: RecommendationCreatorDto;
  review: RecommendationReviewDto;
}

export interface RecommendedProductDto {
  productCard: ProductCardDto;
  // 조건에 맞는 리뷰가 없으면 내려오지 않습니다.
  topReview: RecommendationTopReviewDto | null;
  recommendationScore: number;
}

export interface HomeRecommendationResponseDto {
  productResponses: RecommendedProductDto[];
}

// 추천 상품 일괄 찜 API에 전달하는 요청 데이터입니다.
export interface RecommendProductsWishRequestDto {
  productIds: number[];
}

// 추천 상품 일괄 찜 API가 반환하는 응답 데이터입니다.
export interface RecommendProductsWishResponseDto {
  wishedProductIds: number[];
  // 이번 요청으로 새로 찜한 개수입니다. (이미 찜한 상품은 세지 않습니다)
  newAddedCount: number;
}
