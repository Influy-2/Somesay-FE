import type { ApiPage } from '../../api/types';
import type { ProductCardType } from '../product/product.types';
import type { ProductDto } from '../product/product.dto';
import { mapProductDtoToCard } from '../product/product.mapper';

export const mapProductRankingPageDtoToCards = (
  page: ApiPage<ProductDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductDtoToCard),
});

export const mapProductPreviewRankingPageDtoToCards = (
  page: ApiPage<ProductDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductDtoToCard),
});

export const rankingMapper = <T>(data: T): T => data;
