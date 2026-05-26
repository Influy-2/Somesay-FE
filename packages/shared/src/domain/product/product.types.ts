export interface ProductBasicType {
  productId: number;
  imageUrl: string;
  brand: string;
  productName: string;
  price: number;
  isHearted: boolean;
}
export interface ProductCardType extends ProductBasicType {
  rating: number;
  reviewCount: number;
  creators: CreatorProfile[];
}

interface CreatorProfile {
  name: string;
  profileImageUrl: string;
}

export interface ProductDetailType extends ProductBasicType {
  brandImageUrl?: string | undefined;
  volume: number;
}

export interface ProductRankingCardType extends ProductCardType {
  rank: number;
}

export interface ProductsByCategory {
  categoryId: number;
  categoryTitle: string;
  moreLinkPath: string;
  moreLinkLabel: string;
  products: ProductCardType[];
}

export interface SortOptionsType {
  sortType: 'RATING' | 'REVIEW' | 'PRICE' | 'RECOMMEND';
}
