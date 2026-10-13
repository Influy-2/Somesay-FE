import {
  cancelProductWishQueries,
  postRecommendProductsWish,
  setProductWishInCaches,
} from '@somesay/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthGuard } from '../auth/useAuthGuard';
import { useSnackbarStore } from '@/shared/stores';

/**
 * 추천 화면의 상품을 한 번에 모두 찜합니다.
 *
 * 이미 찜한 상품은 서버가 그대로 두고 새로 찜한 개수만 알려줍니다.
 * 응답에 담긴 찜 목록으로 캐시를 갱신해 카드의 하트와 마이페이지가 함께 반영됩니다.
 */
export const useWishRecommendedProducts = () => {
  const queryClient = useQueryClient();
  const guardAction = useAuthGuard();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const { mutate, isPending } = useMutation({
    // 개별 찜과 같은 scope를 써서 같은 상품의 요청 순서가 뒤집히지 않습니다.
    scope: { id: 'product-wish' },
    mutationFn: async (productIds: number[]) => {
      await cancelProductWishQueries(queryClient);

      return postRecommendProductsWish(productIds);
    },
    onSuccess: ({ wishedProductIds, newAddedCount }) => {
      wishedProductIds.forEach((productId) => {
        setProductWishInCaches(queryClient, productId, true);
      });

      showSnackbar(
        newAddedCount === 0
          ? '이미 모두 찜한 제품이에요.'
          : `추천 제품 ${newAddedCount}개를 찜했어요.`
      );
    },
    onError: () => {
      showSnackbar('추천 제품을 찜하지 못했어요. 잠시 후 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const wishRecommendedProducts = guardAction((productIds: number[]) =>
    mutate(productIds)
  );

  return { wishRecommendedProducts, isWishing: isPending };
};
