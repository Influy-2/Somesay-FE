import type { UserProductRequest, UserProductStatusType } from '@somesay/shared';

import { useApiQuery } from '@/shared/api';

// 화면은 'MISMATCHED', 서버는 'UNMATCHED' 를 써서 요청 직전에 바꿉니다.
const USER_PRODUCT_STATUS_TO_REQUEST: Record<
  UserProductStatusType,
  UserProductRequest['userProductStatus']
> = {
  MATCHED: 'MATCHED',
  MISMATCHED: 'UNMATCHED',
};

// 사용자가 저장해 둔 잘 맞거나 맞지 않는 상품 목록을 조회합니다. data: UserProductItemResponse[]
// ProtectedRoute 안의 계정 화면에서만 쓰므로 토큰 가드를 두지 않습니다.
export const useFetchUserProducts = (status: UserProductStatusType) =>
  useApiQuery(
    '/api/v1/users/products',
    {
      params: {
        query: { userProductStatus: USER_PRODUCT_STATUS_TO_REQUEST[status] },
      },
    },
    // 조회 실패를 화면 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
    { throwOnError: false }
  );
