import type { ApiPage } from '../../api/types';
import type { ProductSearchResultType } from '../search/search.types';
import type { WishCreatorDto, WishCreatorReviewDto } from './wish.dto';

export type WishProductSortType = 'WISHED_AT' | 'RATING' | 'REVIEW' | 'PRICE';

export interface FetchUserWishProductsParams {
  subCategoryId?: number;
  sortType: WishProductSortType;
  page: number;
  size: number;
}

export interface FetchUserWishCreatorsParams {
  page: number;
  size: number;
}

// 찜 목록 상품 카드는 검색 결과 카드(SearchResultProductCard)를 그대로 씁니다.
export type WishProductType = ProductSearchResultType;

export interface WishProductPageType extends ApiPage<WishProductType> {
  totalCount: number;
}

// 리뷰 미리보기는 서버 이름 그대로 받습니다(가격은 서버가 주지 않습니다).
export type WishCreatorReviewType = WishCreatorReviewDto;

export interface WishCreatorType extends WishCreatorDto {
  isHearted: boolean;
}

export interface WishCreatorPageType extends ApiPage<WishCreatorType> {
  creatorCount: number;
}

export interface CreatorWishResultType {
  creatorId: number;
  isHearted: boolean;
}
