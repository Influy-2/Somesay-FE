import type { ApiPage } from '../../api/types';
import type {
  PreviewInfoDto,
  ProductCardDto,
  ProductDetailDto,
  ProductListResponseDto,
} from './product.dto';
import type { ProductCardType, ProductDetailType } from './product.types';

export const mapProductDetailDto = (
  item: ProductDetailDto
): ProductDetailType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  isHearted: item.userWish,
  brandImageUrl: item.brandImageUrl,
  volume: item.volume,
});

const mapCreatorUrls = (urls: string[]) =>
  urls.map((url) => ({
    name: '',
    profileImageUrl: url,
  }));

export const mapProductDtoToCard = (item: ProductCardDto): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount ?? 0,
  isHearted: item.userWish,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapProductCardDtoToCard = (
  item: ProductCardDto
): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount,
  isHearted: item.userWish,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapPreviewInfoDtoToCard = (
  item: PreviewInfoDto
): ProductCardType => ({
  productId: item.productId,
  imageUrl: item.productImageUrl,
  brand: item.brandName,
  productName: item.productName,
  price: item.price,
  rating: item.aveRating,
  reviewCount: item.reviewCount,
  isHearted: item.userWish,
  creators: mapCreatorUrls(item.creatorImageUrls),
});

export const mapProductListDtoToCards = (data: ProductListResponseDto) => ({
  ...data,
  products: data.products.map(mapProductCardDtoToCard),
});

export const mapProductPreviewPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapPreviewInfoDtoToCard),
});
