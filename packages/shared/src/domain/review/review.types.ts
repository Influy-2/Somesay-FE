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
  frequentMention: string;
  consideration: string;
  productSkinTypes: ProductSkinType[];
  productSkinExpectations: ProductSkinExpectationType[];
}

export interface TimeLinkType {
  timeLinkId: number;
  youtubeUrl: string;
  videoTitle: string;
  viewCount: number;
  uploadAt: string;
}

export interface TimeLinksType {
  reviewId: number;
  timeLinks: TimeLinkType[];
}
