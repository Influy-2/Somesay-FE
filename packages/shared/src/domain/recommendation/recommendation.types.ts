import type { ProductCard, SubCategoryItemResponse } from '../../api/schema';
import type { BasicCreatorProfileType } from '../creator/creator.types';

// 홈 추천 API(/home/recommend, 추천 일괄 찜)는 스펙에서 삭제됐습니다.
// 추천 화면 UI 만 남겨 두었고, 아래 타입은 그 UI 가 쓰는 프론트 타입입니다.
// TODO: 추천 API 재정의 후 서버 타입으로 교체

// 화면에서 고른 추천 조건입니다. 라벨(사람이 읽는 값)로 다룹니다.
export interface SelectedFiltersType {
  skinConcern: string[];
  skinType: string[];
  category: SubCategoryItemResponse[];
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

// 추천 화면의 상품 카드 + 대표 리뷰를 한 항목으로 담습니다.
export interface RecommendedProductType extends ProductCard {
  topReview: RecommendedTopReviewType | null;
}
