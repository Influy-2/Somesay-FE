import type { CommentPreviewType } from '../comment/comment.types';
import type { BasicCreatorProfileType } from '../creator/creator.types';

// 상품 카드·상세·찜 타입은 서버 타입(api/schema.ts 의 ProductCard·ProductPreviewCard·ProductDetailResponse)을 씁니다.
// 아래는 아직 이관하지 않은 리뷰·큐레이션 구역이 쓰는 타입입니다. (해당 구역 이관 시 정리)

// 상품이라면 반드시 있는 것만 담는 코어 타입입니다. 화면용 필드는 여기에 더하지 않습니다.
export interface ProductBasicType {
  productId: number;
  productImgUrl: string;
  brandName: string;
  productName: string;
  price: number;
}

export interface ProductSkinExpectationType {
  skinExpectationId: number;
  concern: string;
  isPrimary: boolean;
}

// 상품의 피부 적합도 조각입니다. 두 필드가 항상 짝으로 다닙니다.
export interface ProductSkinFitType {
  productSkinTypeIds: number[];
  productSkinExpectations: ProductSkinExpectationType[];
}

// 서버가 크리에이터 필드를 평탄하게 주므로 구조는 유지하되 상속으로 중복만 없앱니다.
export interface ProductReviewType extends BasicCreatorProfileType {
  ranking: number;
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
