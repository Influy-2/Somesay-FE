import { useMemo } from 'react';

import { useFetchUserProducts, usePostUserProduct } from '@/shared/hooks';
import { MAX_PRODUCT_SELECTION } from '@/features/productSelection';
import { useSnackbarStore } from '@/shared/stores';

import { PRODUCT_FIT_TITLES } from '../constants/myPage.constants';
import { useProductFitDraftStore } from '../stores/productFitDraft.store';
import type {
  UserProductDetailType,
  UserProductStatusType,
} from '@somesay/shared';

/**
 * 상품 추가 흐름(목록·검색 화면)이 함께 쓰는 선택·저장 로직입니다.
 */
export const useProductFitDraft = (status: UserProductStatusType) => {
  // 스토어 구독: 값과 액션을 셀렉터로 하나씩 꺼냅니다.
  const selectedProducts = useProductFitDraftStore(
    (state) => state.selectedProducts
  );
  const toggleProduct = useProductFitDraftStore((state) => state.toggleProduct);
  const removeProduct = useProductFitDraftStore((state) => state.removeProduct);
  const clearSelection = useProductFitDraftStore(
    (state) => state.clearSelection
  );
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  // 서버 상태: 이미 저장된 상품과 저장 요청입니다.
  const { data: savedProducts = [] } = useFetchUserProducts(status);
  const { mutate, isPending: isSubmitting } = usePostUserProduct();

  // 파생값: 라디오 상태 판단용 id 집합이라 매 렌더 계산을 피해 메모합니다.
  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map((product) => product.productId)),
    [selectedProducts]
  );
  const alreadyAddedProductIds = useMemo(
    () => new Set(savedProducts.map((product) => product.productId)),
    [savedProducts]
  );

  // 상품 선택을 토글하되, 이미 저장됐거나 상한을 넘으면 막습니다.
  const handleToggle = (product: UserProductDetailType) => {
    // 이미 저장된 상품은 다시 고를 수 없습니다.
    if (alreadyAddedProductIds.has(product.productId)) return;

    // 새로 고르려는데 저장분 + 선택분이 상한이면 안내하고 멈춥니다.
    if (
      !selectedProductIds.has(product.productId) &&
      savedProducts.length + selectedProducts.length >= MAX_PRODUCT_SELECTION
    ) {
      showSnackbar('최대 15개까지 저장 가능해요.');
      return;
    }

    toggleProduct(product);
  };

  // 저장된 상품의 라디오를 눌렀을 때 이유를 알려줍니다.
  const handleAlreadyAdded = () => showSnackbar('이미 저장된 상품입니다.');

  // 선택이 있고 저장 중이 아닐 때만 "추가"를 누를 수 있습니다.
  const canSubmit = selectedProducts.length > 0 && !isSubmitting;

  // 고른 상품을 저장하고, 성공하면 선택을 비운 뒤 화면 이동은 호출한 쪽에 맡깁니다.
  const submit = ({ onSuccess }: { onSuccess: () => void }) => {
    // 선택이 없거나 이미 저장 중이면 중복 요청을 막습니다.
    if (!canSubmit) return;

    mutate(
      { status, productIds: selectedProducts.map((p) => p.productId) },
      {
        onSuccess: () => {
          clearSelection();
          onSuccess();
        },
        onError: () =>
          showSnackbar(
            '상품을 추가하지 못했어요. 잠시 후 다시 시도해 주세요.',
            {
              variant: 'error',
            }
          ),
      }
    );
  };

  return {
    title: PRODUCT_FIT_TITLES[status],
    selectedProducts,
    selectedProductIds,
    alreadyAddedProductIds,
    handleToggle,
    handleRemove: removeProduct,
    handleAlreadyAdded,
    canSubmit,
    submit,
  };
};
