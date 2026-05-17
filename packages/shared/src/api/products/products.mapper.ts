import type { ProductCardType } from '../../types/product.types';
import type { ApiPage } from '../types';
import type { ProductItemDto } from './product.dto';

export const mapProductItemDtoToCard = (
  item: ProductItemDto
): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount || 0,
  isHearted: item.userWish,
  creators: item.creatorImageUrls.map((url) => ({
    name: '',
    profileImageUrl: url,
  })),
});

export const mapProductPageDtoToCards = (
  page: ApiPage<ProductItemDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductItemDtoToCard),
});
