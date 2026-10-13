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

// 상품 검색 API가 받는 정렬 기준입니다.
export type UserProductSearchSortType =
  | 'RATING_DESC'
  | 'PRICE_ASC'
  | 'PRICE_DESC';

export interface FetchUserProductSearchParams {
  keyword: string;
  sortType: UserProductSearchSortType;
  mainCategoryId?: number;
}

// 검색 결과 상품입니다. 저장된 상품과 같은 필드에 대분류 정보만 더해져 내려옵니다.
export interface UserProductSearchItemType extends UserProductDetailType {
  mainCategoryId: number;
  mainCategoryName: string;
}

export interface UserProductSearchResultType {
  totalCount: number;
  details: UserProductSearchItemType[];
}
