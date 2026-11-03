import type { ApiPage } from '../../api/types';
import type {
  ProductBasicType,
  ProductSkinFitType,
} from '../product/product.types';
import type { AgeType } from '../user/user.types';

// 찜 목록 응답에는 userWish가 없습니다. 목록에 있다는 것 자체가 찜 상태입니다.
export interface WishProductDto extends ProductBasicType, ProductSkinFitType {
  avgRating: number;
  reviewCount: number;
  creatorImageUrls: string[];
  shortSummary: string;
}

export interface WishProductListResponseDto {
  subCategoryId: number | null;
  totalCount: number;
  productList: ApiPage<WishProductDto>;
}

export interface WishCreatorReviewDto {
  reviewId: number;
  content: string;
  rating: number;
  productId: number;
  brandName: string;
  productName: string;
  productImgUrl: string;
  volume: string | null;
}

export interface WishCreatorDto {
  creatorId: number;
  profileImgUrl: string;
  creatorName: string;
  subscriberNum: number;
  age: AgeType | null;
  skinTypeIds: number[];
  wishCount: number;
  reviewList: WishCreatorReviewDto[];
}

export interface WishCreatorListResponseDto {
  creatorCount: number;
  creatorList: ApiPage<WishCreatorDto>;
}

export type CreatorWishStatusDto = 'LIKE' | 'NONE';

export interface PatchCreatorWishResponseDto {
  userId: number;
  creatorId: number;
  status: CreatorWishStatusDto;
}
