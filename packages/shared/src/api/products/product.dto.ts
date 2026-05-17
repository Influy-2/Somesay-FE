export interface ProductItemDto {
  productId: number;
  brandName: string;
  productName: string;
  productImageUrl: string;
  price: number;
  aveRating: number;
  reviewCount: number | null;
  userWish: boolean;
  creatorImageUrls: string[];
}
