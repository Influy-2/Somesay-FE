import type { CommentPreviewType } from '../comment/comment.types';

export interface ProductBasicType {
  productId: number;
  productImgUrl: string;
  brandName: string;
  productName: string;
  price: number;
}

export interface ProductWishType extends ProductBasicType {
  isHearted: boolean;
}

export type ProductWishStatusType = 'LIKE' | 'NONE';

export interface ProductWishResultType {
  userId: number;
  productId: number;
  isHearted: boolean;
}

export type ProductSkinType = string;

export interface ProductSkinExpectationType {
  productSkinExpectationId: number;
  concern: string;
  isPrimary: boolean;
}
export interface ProductCardType extends ProductWishType {
  rating: number;
  reviewCount: number;
  creatorImageUrls: string[];
}

export interface ProductDetailType extends ProductWishType {
  brandId: number;
  brandLogoUrl: string | null;
  volume: string | null;
  collabChannelUrl: string | null;
  collabChannelName: string | null;
  collabProfileImgUrl: string | null;
  productNotes: string | null;
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
  agreeRatio: number;
  youtubeUrl: string;
  videoTitle: string;
  viewCount: number;
  timeLinkCount: number;
  totalCommentCount: number;
  previewComments: CommentPreviewType[];
}

export interface ProductReviewPageType {
  content: ProductReviewType[];
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
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
