import type { UserProductDetailType } from './userProduct.types';

export type UserProductStatusDto = 'MATCHED' | 'UNMATCHED';

// 사용자 상품 저장 API에 전달하는 백엔드 요청 데이터입니다.
export interface UserProductRequestDto {
  status: UserProductStatusDto;
  productIds: number[];
}

export interface UserProductResponseDto {
  status: UserProductStatusDto;
  // 서버가 주는 상품 정보는 프론트 타입과 필드가 동일해 그대로 쓴다.
  details: UserProductDetailType[];
}
