import { postUserProduct } from '@somesay/shared';
import { useMutation } from '@tanstack/react-query';

// 사용자에게 잘 맞거나 맞지 않는 상품 저장 요청을 처리합니다.
export const usePostUserProduct = () =>
  useMutation({
    mutationFn: postUserProduct,
    retry: false,
  });
