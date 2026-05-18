import type { ApiPage } from '../../api/types';
import type {
  PreviewInfoDto,
  ProductCardDto,
} from '../../api/product/product.dto';
import type { ProductCardType } from './product.types';
import type { ProductDto } from './product.dto';

const mapCreatorUrls = (urls: string[] = []) =>
  urls.map((url) => ({
    name: '',
    profileImageUrl: url,
  }));

export const mapProductDtoToCard = (item: ProductDto): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount || 0,
  isHearted: item.userWish,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapProductCardDtoToCard = (
  item: ProductCardDto
): ProductCardType => ({
  productId: item.productId ?? 0,
  imageUrl: item.productImageUrl ?? '',
  brand: item.brandName ?? '',
  productName: item.productName ?? '',
  price: item.price ?? 0,
  rating: item.aveRating ?? 0,
  reviewCount: item.reviewCount ?? 0,
  isHearted: item.userWish ?? false,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapPreviewInfoDtoToCard = (
  item: PreviewInfoDto
): ProductCardType => ({
  productId: item.productId ?? 0,
  imageUrl: item.productImageUrl ?? '',
  brand: item.brandName ?? '',
  productName: item.productName ?? '',
  price: item.price ?? 0,
  rating: item.aveRating ?? 0,
  reviewCount: item.reviewCount ?? 0,
  isHearted: item.userWish ?? false,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapProductListDtoToCards = (data: {
  products?: ProductCardDto[];
}) => ({
  ...data,
  products: data.products?.map(mapProductCardDtoToCard) ?? [],
});

export const mapProductPageDtoToCards = (
  page: ApiPage<ProductDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductDtoToCard),
});

export const mapProductPreviewPageDtoToCards = (
  page: ApiPage<ProductDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductDtoToCard),
});
