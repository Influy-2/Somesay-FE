import { API_ENDPOINTS } from '../../constants/endpoints';
import { buildPath } from '../buildApi';
import { apiClient } from '../client';

// 저장해 둔 잘 맞거나 맞지 않는 상품 하나를 삭제합니다.
export const deleteUserProduct = async (productId: number) => {
  // 응답 본문이 없어 반환값 없이 성공 여부만 전달합니다.
  await apiClient.delete(
    buildPath(API_ENDPOINTS.USER_PRODUCT.DETAIL, { productId })
  );
};
