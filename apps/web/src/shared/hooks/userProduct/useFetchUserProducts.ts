import {
  fetchUserProducts,
  QUERY_KEYS,
  type UserProductStatusType,
} from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 사용자가 저장해 둔 잘 맞거나 맞지 않는 상품 목록을 조회합니다.
// ProtectedRoute 안의 계정 화면에서만 쓰므로 토큰 가드를 두지 않습니다.
export const useFetchUserProducts = (status: UserProductStatusType) =>
  useQuery({
    queryKey: QUERY_KEYS.USER_PRODUCT.LIST(status),
    queryFn: () => fetchUserProducts(status),
    // 조회 실패를 화면 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
    throwOnError: false,
  });
