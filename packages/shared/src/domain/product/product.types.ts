import type { CommentPreviewType } from '../comment/comment.types';
import type { BasicCreatorProfileType } from '../creator/creator.types';

// 상품이라면 반드시 있는 것만 담는 코어 타입입니다. 화면용 필드는 여기에 더하지 않습니다.
export interface ProductBasicType {
  productId: number;
  productImgUrl: string;
  brandName: string;
  productName: string;
  price: number;
}

// 찜 상태 조각입니다.
// query/productWishCache.ts의 patchWishNode가 `{ productId, isHearted }` 모양으로
// 캐시 노드를 찾으므로, 이 조각을 쓰는 타입은 자동으로 낙관적 갱신 대상이 됩니다.
export interface ProductWishStateType {
  isHearted: boolean;
}

// 상품이 속한 카테고리 조각입니다.
export interface ProductCategoryRefType {
  mainCategoryId: number;
  subCategoryId: number;
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

export interface ProductWishResultType extends ProductWishStateType {
  userId: number;
  productId: number;
}

export interface ProductCardType
  extends ProductBasicType, ProductWishStateType {
  avgRating: number;
  reviewCount: number;
  creatorImageUrls: string[];
}

export interface ProductDetailType
  extends ProductBasicType, ProductWishStateType {
  brandId: number;
  brandLogoUrl: string | null;
  volume: string | null;
  collabChannelUrl: string | null;
  collabChannelName: string | null;
  collabProfileImgUrl: string | null;
  productNotes: string | null;
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

export interface ProductsByCategoryType {
  categoryId: number;
  categoryTitle: string;
  moreLinkPath: string;
  moreLinkLabel: string;
  products: ProductCardType[];
}

export type ProductSortType = 'RATING' | 'REVIEW' | 'PRICE' | 'RECOMMEND';
