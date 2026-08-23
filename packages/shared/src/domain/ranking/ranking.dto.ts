import type { ApiPage } from '../../api/types';
import type { CreatorRankingDto } from '../creator/creator.dto';
import type { PreviewInfoDto } from '../product/product.dto';

export type CreatorRankingPageDto = ApiPage<CreatorRankingDto>;

export type ProductRankingPreviewPageDto = ApiPage<PreviewInfoDto>;

// 홈 크리에이터 신뢰도 랭킹 API의 응답 아이템입니다.
export type HomeCreatorRankingDto = CreatorRankingDto;

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
