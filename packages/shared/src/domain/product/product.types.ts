interface CreatorProfile {
  name: string;
  profileImageUrl: string;
}

export interface ProductCardType {
  productId: number;
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
