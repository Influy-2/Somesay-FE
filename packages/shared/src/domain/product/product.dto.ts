import type {
  ProductSkinExpectationType,
  ProductSkinType,
} from './product.types';
import type { CommentPreviewDto } from '../comment/comment.types';

import type { CreatorType } from '../creator/creator.types';

// 여러 상품 응답 DTO에서 공통으로 사용하는 최소 상품 정보입니다.
export interface ProductBasicDto {
  productId: number;
  brandName: string;
  productName: string;
  productImageUrl: string;
  price: number;
  userWish: boolean;
}

// 카테고리별 상품 목록 조회 응답의 products 아이템에 사용합니다.
export interface ProductCardDto extends ProductBasicDto {
  mainCategoryId: number;
  subCategoryId: number;
  aveRating: number;
  reviewCount: number;
  creatorImageUrls: string[];
  shortSummary: string;
  productSkinType: ProductSkinType[];
  productSkinExpectations: ProductSkinExpectationType[];
}
// 상품 랭킹/비슷한 기대효과 상품의 미리보기 카드 응답에 사용합니다.
export interface PreviewInfoDto extends ProductBasicDto {
  aveRating: number;
  reviewCount: number;
  creatorImageUrls: string[];
}

// 상품 상세 페이지의 기본 정보 영역 조회 응답에 사용합니다.
export interface ProductDetailDto extends ProductBasicDto {
  volume: number;
  brandImageUrl: string;
}

export interface ProductListResponseDto {
  products: ProductCardDto[];
  totalCount: number;
  hasNext: boolean;
}

interface ProductReviewCreatorDto extends Pick<
  CreatorType,
  'nickname' | 'ranking' | 'subscriberNum' | 'profileImageUrl' | 'trustScore'
> {
  skinTypes: string[];
}

export interface ProductReviewsDto extends ProductReviewCreatorDto {
  reviewId: number;
  content: string;
  rating: number;
  agreeCount: number;
  disagreeCount: number;
  agreeRate: number;
  youtubeUrl: string;
  timeLinkCount: number;
  totalCommentCount: number;
  previewComments: CommentPreviewDto[];
}
