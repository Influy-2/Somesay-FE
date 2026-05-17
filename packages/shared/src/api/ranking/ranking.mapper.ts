import type { ProductCardType } from '../../types/product.types';
import type { ApiPage } from '../types';
import type { ProductItemDto } from '../products/product.dto';
import { mapProductItemDtoToCard } from '../products/products.mapper';

export const mapProductRankingPageDtoToCards = (
  page: ApiPage<ProductItemDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductItemDtoToCard),
});
