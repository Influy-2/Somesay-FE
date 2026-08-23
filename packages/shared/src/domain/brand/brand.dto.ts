import type { BrandAvailableSubCategoryType } from './brand.types';

// 브랜드 상세 조회 API 응답 DTO입니다.
export interface BrandDetailDto {
  brandId: number;
  brandName: string;
  brandLogoUrl: string;
  brandImgUrl: string;
  avgRating: number;
  totalReviewCount: number;
  ranking: number;
  // 서버가 주는 소분류 정보는 프론트 타입과 필드가 동일해 그대로 쓴다.
  availableSubCategories: BrandAvailableSubCategoryType[];
}
