import { useApiQuery } from '@/shared/api';

// 상품 상세 기본 정보(이미지·가격·용량·콜라보·찜)를 조회합니다.
export const useFetchProductDetail = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  return useApiQuery(
    '/api/v1/products/{productId}',
    { params: { path: { productId: productId ?? 0 } } },
    { enabled: isValidProductId }
  );
};
