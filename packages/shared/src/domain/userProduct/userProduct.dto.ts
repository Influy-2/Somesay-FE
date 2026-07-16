export type UserProductStatusDto = 'MATCHED' | 'UNMATCH';

// 사용자 상품 저장 API에 전달하는 백엔드 요청 데이터입니다.
export interface UserProductRequestDto {
  status: UserProductStatusDto;
  productIds: number[];
}

export interface UserProductDetailDto {
  productId: number;
  brandName: string;
  productName: string;
  productImgUrl: string;
}

export interface UserProductResponseDto {
  status: UserProductStatusDto;
  details: UserProductDetailDto[];
}
