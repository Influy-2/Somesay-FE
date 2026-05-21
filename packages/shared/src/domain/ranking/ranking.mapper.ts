import type { ApiPage } from '../../api/types';
import type { ProductCardType } from '../product/product.types';
import type { PreviewInfoDto } from '../product/product.dto';
import { mapPreviewInfoDtoToCard } from '../product/product.mapper';

export const mapProductRankingPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapPreviewInfoDtoToCard),
});

export const mapProductPreviewRankingPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapPreviewInfoDtoToCard),
});

export const rankingMapper = <T>(data: T): T => data;
