export type UserProductStatusType = 'MATCHED' | 'MISMATCHED';

// 사용자에게 잘 맞거나 맞지 않는 상품을 저장할 때 사용하는 데이터입니다.
export interface UserProductRequestType {
  status: UserProductStatusType;
  productIds: number[];
}

export interface UserProductDetailType {
  productId: number;
  brandName: string;
  productName: string;
  productImgUrl: string;
}

export interface UserProductResponseType {
  status: UserProductStatusType;
  details: UserProductDetailType[];
}
