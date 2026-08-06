import type {
  ProductSkinExpectationType,
  ProductSkinType,
} from './product.types';
import type { CommentPreviewDto } from '../comment/comment.dto';

// 여러 상품 응답 DTO에서 공통으로 사용하는 최소 상품 정보입니다.
export interface ProductBasicDto {
  productId: number;
  brandName: string;
  productName: string;
  productImgUrl: string;
  price: number;
}

export interface ProductWishDto extends ProductBasicDto {
  userWish: boolean;
}

export type ProductWishStatusDto = 'LIKE' | 'NONE';

// 상품 찜 상태 변경 API에 전달하는 요청 데이터입니다.
export interface PatchProductWishRequestDto {
  status: ProductWishStatusDto;
}

// 상품 찜 상태 변경 API가 반환하는 응답 데이터입니다.
export interface PatchProductWishResponseDto {
  userId: number;
  productId: number;
  status: ProductWishStatusDto;
}

// 카테고리별 상품 목록 조회 응답의 products 아이템에 사용합니다.
export interface ProductCardDto extends ProductWishDto {
  mainCategoryId: number;
  subCategoryId: number;
  avgRating: number;
  reviewCount: number;
  creatorImageUrls: string[];
  shortSummary: string;
  productSkinTypes: ProductSkinType[];
  productSkinExpectations: ProductSkinExpectationType[];
}
// 상품 랭킹/비슷한 기대효과 상품의 미리보기 카드 응답에 사용합니다.
export interface PreviewInfoDto extends ProductWishDto {
  avgRating: number;
  reviewCount: number;
  creatorImageUrls: string[];
}

// 상품 상세 페이지의 기본 정보 영역 조회 응답에 사용합니다.
export interface ProductDetailDto extends ProductWishDto {
  brandId: number;
  brandLogoUrl: string | null;
  volume: string | null;
  collabChannelUrl: string | null;
  collabChannelName: string | null;
  collabProfileImgUrl: string | null;
  productNotes: string | null;
}

export interface ProductListResponseDto {
  products: ProductCardDto[];
  totalCount: number;
  hasNext: boolean;
}

interface ProductReviewCreatorDto {
  creatorName: string;
  ranking: number;
  subscriberNum: number;
  profileImgUrl: string;
  trustScore: number;
  skinTypes: string[];
}

export interface ProductReviewsDto extends ProductReviewCreatorDto {
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
  previewComments: CommentPreviewDto[];
}

// 상품 리뷰 목록 API의 페이지 응답 DTO입니다.
export interface ProductReviewsPageDto {
  content: ProductReviewsDto[];
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
