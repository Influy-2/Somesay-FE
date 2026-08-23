import type { ProductBasicType } from '../product/product.types';
import type { BasicCreatorDto } from '../creator/creator.dto';

export interface TimeLinkDto {
  timeLinkId: number;
  youtubeUrl: string;
  videoTitle: string;
  viewCount: number;
  uploadAt: string;
}

export interface TimeLinksResponseDto {
  reviewId: number;
  timeLinks: TimeLinkDto[];
}

// 홈 큐레이션 API의 리뷰 아이템 응답 DTO입니다.
export interface CurationReviewDto extends BasicCreatorDto, ProductBasicType {
  reviewId: number;
  content: string;
  rating: number;
  agreeRatio: number;
  mostAgreedSkinTypeIds: number[];
}

// 홈 큐레이션 API의 data 응답 DTO입니다.
export interface HomeCurationResponseDto {
  skinTypeId: number;
  skinTypeName: string;
  reviews: CurationReviewDto[];
}
