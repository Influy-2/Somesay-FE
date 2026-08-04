import type {
  ProductSkinExpectationType,
  ProductSkinType,
} from '../product/product.types';
import type { BasicCreatorDto } from '../creator/creator.dto';
import type { ProductBasicDto } from '../product/product.dto';

// 상품 리뷰 개요 API의 백엔드 응답 DTO입니다.
export interface ReviewOverviewDto {
  productId: number;
  avgRating: number;
  reviewCount: number;
  aiSummary: string;
  productSkinTypes: ProductSkinType[];
  frequentMention: string;
  consideration: string;
  productSkinExpectations: ProductSkinExpectationType[];
}

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
export interface CurationReviewDto extends BasicCreatorDto, ProductBasicDto {
  reviewId: number;
  content: string;
  rating: number;
  agreeRatio: number;
  mostAgreedSkinTypeName: string;
}

// 홈 큐레이션 API의 data 응답 DTO입니다.
export interface HomeCurationResponseDto {
  userSkinTypeId: number;
  skinTypeName: string;
  reviews: CurationReviewDto[];
}
