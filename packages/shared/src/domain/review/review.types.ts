import type {
  ProductBasicType,
  ProductSkinExpectationType,
  ProductSkinType,
} from '../product/product.types';
import type { BasicCreatorProfileType } from '../creator/creator.types';

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

// 홈 큐레이션 화면에서 사용하는 리뷰 정보입니다.
export interface HomeCurationReviewType extends ProductBasicType {
  creator: BasicCreatorProfileType;
  reviewId: number;
  content: string;
  rating: number;
  agreeRatio: number;
  mostAgreedSkinTypeName: string;
}

// 홈 큐레이션 화면에서 사용하는 피부 타입과 리뷰 목록입니다.
export interface HomeCurationType {
  userSkinTypeId: number;
  skinTypeName: string;
  reviews: HomeCurationReviewType[];
}
