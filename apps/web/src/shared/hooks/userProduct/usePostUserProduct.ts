import { postUserProduct, QUERY_KEYS } from '@somesay/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 사용자에게 잘 맞거나 맞지 않는 상품 저장 요청을 처리합니다.
export const usePostUserProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserProduct,
    retry: false,
    // 저장한 상품이 계정 화면의 목록에 바로 보이도록 목록 캐시를 무효화합니다.
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER_PRODUCT.LIST_ALL(),
      }),
  });
};
