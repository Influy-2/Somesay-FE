import type { CommentPreviewType } from '../comment/comment.types';

export interface ProductBasicType {
  productId: number;
  productImageUrl: string;
  brandName: string;
  productName: string;
  price: number;
  isHearted: boolean;
}

export type ProductSkinType = string;

export interface ProductSkinExpectationType {
  productSkinExpectationId: number;
  concern: string;
  isPrimary: boolean;
}
export interface ProductCardType extends ProductBasicType {
  rating: number;
  reviewCount: number;
  creators: CreatorProfile[];
}

interface CreatorProfile {
  name: string;
  profileImageUrl: string;
}

export interface ProductDetailType extends ProductBasicType {
  brandImageUrl?: string | undefined;
  volume: number;
}

export interface ProductReviewType {
  nickname: string;
  ranking: number;
  subscriberNum: number;
  profileImageUrl: string;
  trustScore: number;
  skinTypes: string[];
  reviewId: number;
  content: string;
  rating: number;
  agreeCount: number;
  disagreeCount: number;
  agreeRate: number;
  youtubeUrl: string;
  timeLinkCount: number;
  totalCommentCount: number;
  previewComments: CommentPreviewType[];
}

export interface ProductRankingCardType extends ProductCardType {
  rank: number;
}

export interface ProductsByCategory {
  categoryId: number;
  categoryTitle: string;
  moreLinkPath: string;
  moreLinkLabel: string;
  products: ProductCardType[];
}

export interface SortOptionsType {
  sortType: 'RATING' | 'REVIEW' | 'PRICE' | 'RECOMMEND';
}
