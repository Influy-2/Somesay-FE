import type { ProductEffectResponseDto } from '../product/product.dto';

export interface CreatorReviewType {
  reviewId: number;
  content: string;
  rating: number;
  agreeCount: number;
  disagreeCount: number;
  createdAt: string;
  youtubeUrl?: string;
  timelinkCount?: number;
  creatorId: number;
  productId: number;
}

export interface CreatorReviewSummaryType {
  productId: number;
  aveRating: number;
  reviewCount: number;
  aiSummary: string;
  productSkinType: string[];
  productSkinExpectations: ProductEffectResponseDto[];
}
