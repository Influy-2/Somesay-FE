import type {
  ProductSkinExpectationType,
  ProductSkinType,
} from '../product/product.types';

// 상품 리뷰 개요 API의 백엔드 응답 DTO입니다.
export interface ReviewOverviewDto {
  productId: number;
  aveRating: number;
  reviewCount: number;
  aiSummary: string;
  productSkinType: ProductSkinType[];
  productSkinExpectations: ProductSkinExpectationType[];
}
