interface CreatorProfile {
  name: string;
  profileImageUrl: string;
}

export interface ProductCardType {
  productId: string;
  imageUrl: string;
  brand: string;
  productName: string;
  price: number;
  rating: number;
  reviewCount: number;
  isHearted: boolean;
  creators: CreatorProfile[];
}
export interface ProductRankingCardType extends ProductCardType {
  rank: number;
}
