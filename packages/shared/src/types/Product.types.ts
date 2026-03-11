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

export type ProductsByCategory = {
  id: string;
  label: string; // 카테고리 텍스트 "클렌징/필링"
  moreLinkPath: string; // 더보기 링크 "/category/cleansing"
  moreLinkLabel: string; // 더보기 버튼 텍스트 "클렌징/필링 상품 더보기"
  products: ProductCardType[];
};
