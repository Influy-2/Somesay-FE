import type {
  UserProductRequest,
  UserProductRequestType,
  UserProductStatusType,
} from '@somesay/shared';
import { useMutation } from '@tanstack/react-query';
import { fetchClient, unwrapApiData } from '@/shared/api';

// 화면은 'MISMATCHED', 서버는 'UNMATCHED' 를 써서 요청 직전에 바꿉니다.
const USER_PRODUCT_STATUS_TO_REQUEST: Record<
  UserProductStatusType,
  UserProductRequest['userProductStatus']
> = {
  MATCHED: 'MATCHED',
  MISMATCHED: 'UNMATCHED',
};

// 사용자에게 잘 맞거나 맞지 않는 상품을 저장합니다. 응답: UserProductItemResponse[]
export const postUserProduct = ({
  status,
  productIds,
}: UserProductRequestType) =>
  unwrapApiData(
    fetchClient.POST('/api/v1/users/products', {
      body: {
        userProductStatus: USER_PRODUCT_STATUS_TO_REQUEST[status],
        productIds,
      },
    })
  );

// 사용자에게 잘 맞거나 맞지 않는 상품 저장 요청을 처리합니다.
export const usePostUserProduct = () =>
  useMutation({
    mutationFn: postUserProduct,
    retry: false,
  });
