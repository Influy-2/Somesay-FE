import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  cancelProductWishQueries,
  patchProductWish,
  setProductWishInCaches,
} from '@somesay/shared';

import { useAuthGuard } from '../auth/useAuthGuard';
import { useSnackbarStore } from '@/shared/stores';

interface ToggleProductWishParams {
  productId: number;
  /** 토글하기 전의 현재 찜 상태 */
  isHearted: boolean;
}

/**
 * 상품 찜 상태를 토글합니다.
 *
 * 찜 상태가 실린 모든 캐시를 낙관적으로 갱신하므로, 화면마다 별도의
 * 로컬 상태를 두지 않아도 홈/랭킹/카테고리/상세가 함께 갱신됩니다.
 * 비로그인 상태에서는 요청 없이 로그인 안내만 노출합니다.
 */
export const useProductWish = () => {
  const queryClient = useQueryClient();
  const guardAction = useAuthGuard();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const { mutate } = useMutation({
    // 같은 상품을 연타해도 요청이 직렬로 처리돼 응답 순서가 뒤집히지 않습니다.
    scope: { id: 'product-wish' },
    mutationFn: ({ productId, isHearted }: ToggleProductWishParams) =>
      patchProductWish(productId, isHearted ? 'NONE' : 'LIKE'),
    onMutate: async ({ productId, isHearted }) => {
      await cancelProductWishQueries(queryClient);
      setProductWishInCaches(queryClient, productId, !isHearted);
    },
    onError: (_error, { productId, isHearted }) => {
      // 바뀐 값이 boolean 하나뿐이라 스냅샷 없이 이전 값을 다시 써서 되돌립니다.
      setProductWishInCaches(queryClient, productId, isHearted);
      showSnackbar('상품 찜 상태를 변경하지 못했어요.', {
        variant: 'error',
      });
    },
    onSuccess: ({ productId, isHearted }) => {
      setProductWishInCaches(queryClient, productId, isHearted);
    },
  });

  const toggleWish = guardAction((params: ToggleProductWishParams) =>
    mutate(params)
  );

  return { toggleWish };
};
