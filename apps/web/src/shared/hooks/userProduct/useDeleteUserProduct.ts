import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteUserProduct, QUERY_KEYS } from '@somesay/shared';

import { useSnackbarStore } from '@/shared/stores';

// 저장해 둔 잘 맞거나 맞지 않는 상품 하나를 삭제합니다.
export const useDeleteUserProduct = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUserProduct,
    retry: false,
    onSuccess: () =>
      // 페이지네이션이 없는 짧은 목록이라 국소 패치 대신 다시 불러옵니다.
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER_PRODUCT.LIST_ALL(),
      }),
    onError: () => {
      showSnackbar('상품을 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const removeUserProduct = (productId: number) => mutate(productId);

  return { removeUserProduct, isPending };
};
