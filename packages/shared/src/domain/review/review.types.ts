import type {
  ProductSkinExpectationType,
  ProductSkinType,
} from '../product/product.types';

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
  avgRating: number;
  reviewCount: number;
  aiSummary: string;
  productSkinTypes: ProductSkinType[];
  productSkinExpectations: ProductSkinExpectationType[];
}
