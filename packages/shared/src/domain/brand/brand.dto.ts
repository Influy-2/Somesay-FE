import type {
  ProductCardDto,
  ProductListResponseDto,
} from '../product/product.dto';

// 브랜드 상세 조회 API 응답 DTO입니다.
export interface BrandDetailDto {
  brandId: number;
  brandName: string;
  brandLogoUrl: string;
  brandImgUrl: string;
  avgRating: number;
  totalReviewCount: number;
  ranking: number;
}

// 브랜드 상품 API는 기존 상품 카드 DTO와 동일한 응답 구조를 사용합니다.
export type BrandProductDto = ProductCardDto;
export type BrandProductListDto = ProductListResponseDto;
