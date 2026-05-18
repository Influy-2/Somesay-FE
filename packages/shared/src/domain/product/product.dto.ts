// 상품 하나
export interface ProductDto {
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
