import { useCallback, useMemo } from 'react';

import { MAX_PRODUCT_SELECTION } from '@/features/productSelection';
import { useFetchUserProducts } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores';
import type { SelectableProductItem } from '@/shared/components';
import type { UserProductStatusType } from '@somesay/shared';

import { useProductFitDraftStore } from '../stores/productFitDraft.store';

// 상품 추가 화면의 선택 규칙(이미 저장됨·최대 개수)을 담고, 카드에 넘길 안정된 콜백을 만듭니다.
export const useProductFitSelection = (status: UserProductStatusType) => {
  // 저장된 상품 목록(서버 상태)과 스낵바, 스토어 액션을 꺼냅니다.
  const { data: savedProducts } = useFetchUserProducts(status);
  const toggleProduct = useProductFitDraftStore((state) => state.toggleProduct);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  // 구조분해 기본값(= [])은 매 렌더 새 배열이라 memo가 깨지므로, 빈 배열 대체를 useMemo 안에서 합니다.
  const savedProductIds = useMemo(
    () => new Set((savedProducts ?? []).map(({ productId }) => productId)),
    [savedProducts]
  );

  // 선택 상태를 클로저로 잡지 않고 getState()로 최신값을 읽어, 선택이 바뀌어도 콜백 참조가 유지됩니다.
  const handleToggle = useCallback(
    (product: SelectableProductItem) => {
      // 이미 저장된 상품은 다시 고를 수 없습니다.
      if (savedProductIds.has(product.productId)) return;

      // 새로 고르려는데 저장분 + 선택분이 상한이면 안내하고 멈춥니다.
      const { selectedProducts } = useProductFitDraftStore.getState();
      const isSelected = selectedProducts.some(
        ({ productId }) => productId === product.productId
      );
      if (
        !isSelected &&
        savedProductIds.size + selectedProducts.length >= MAX_PRODUCT_SELECTION
      ) {
        showSnackbar('최대 15개까지 저장 가능해요.');
        return;
      }

      toggleProduct(product);
    },
    [savedProductIds, showSnackbar, toggleProduct]
  );

  // 저장된 상품을 눌렀을 때 이유를 알려줍니다.
  const handleAlreadyAdded = useCallback(
    () => showSnackbar('이미 저장된 상품입니다.'),
    [showSnackbar]
  );

  return { savedProductIds, handleToggle, handleAlreadyAdded };
};
