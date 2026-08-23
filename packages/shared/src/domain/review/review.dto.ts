import type {
  ProductSkinExpectationType,
  ProductSkinType,
} from '../product/product.types';

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
