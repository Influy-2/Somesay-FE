import type { ApiPage } from '../types';

export interface ProductRankingItemDto {
  productId: number;
  brandName: string;
  productName: string;
  productImageUrl: string;
  price: number;
  aveRating: number;
  reviewCount: number | null;
  userWish: boolean;
  creatorImageUrls: string[];
}

export type ProductRankingPageDto = ApiPage<ProductRankingItemDto>;

export interface FetchProductsRankingParamsDto {
  page?: number;
  size?: number;
  mainCategoryId?: number;
}
