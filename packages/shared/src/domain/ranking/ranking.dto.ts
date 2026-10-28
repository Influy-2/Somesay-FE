import type { PreviewInfoDto } from '../product/product.dto';

// 홈 상품 랭킹 API는 이미지와 가격을 null로 반환할 수 있습니다.
export interface HomeProductRankingItemDto extends Omit<
  PreviewInfoDto,
  'productImgUrl' | 'price'
> {
  productImgUrl: string | null;
  price: number | null;
}

export interface HomeProductRankingResponseDto {
  products: HomeProductRankingItemDto[];
}
