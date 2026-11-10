// 온보딩·마이페이지 화면이 쓰는 상품 적합 상태입니다.
// 서버는 'UNMATCHED' 를 쓰지만 화면·라우트가 'MISMATCHED' 로 굳어 있어, 요청 직전에 바꿔 보냅니다.
export type UserProductStatusType = 'MATCHED' | 'MISMATCHED';

// 사용자에게 잘 맞거나 맞지 않는 상품을 저장할 때 화면이 만드는 데이터입니다.
// 서버 요청(UserProductRequest)으로는 usePostUserProduct 가 바꿔 보냅니다.
export interface UserProductRequestType {
  status: UserProductStatusType;
  productIds: number[];
}
