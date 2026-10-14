import { usePostUserProduct } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores';
import cn from '@/utils/cn';
import type { UserProductStatusType } from '@somesay/shared';

import { useProductFitDraftStore } from '../../stores/productFitDraft.store';

// 저장할 대상과, 저장 성공 뒤 이동을 화면에 맡기는 콜백을 받는 props입니다.
interface ProductFitSubmitButtonProps {
  status: UserProductStatusType;
  onSuccess: () => void;
}

// 헤더 오른쪽 "추가" 버튼입니다. 저장 후 어디로 갈지는 화면이 정합니다(목록 -1, 검색 -2).
export const ProductFitSubmitButton = ({
  status,
  onSuccess,
}: ProductFitSubmitButtonProps) => {
  // boolean 셀렉터라 선택 개수가 바뀌어도 0↔1을 넘을 때만 이 버튼이 다시 그려집니다.
  const hasSelection = useProductFitDraftStore(
    (state) => state.selectedProducts.length > 0
  );
  const clearSelection = useProductFitDraftStore(
    (state) => state.clearSelection
  );
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { mutate, isPending } = usePostUserProduct();

  // 선택이 있고 저장 중이 아닐 때만 누를 수 있습니다.
  const canSubmit = hasSelection && !isPending;

  // 선택 목록은 구독하지 않고 클릭 시점에 최신값을 읽어 저장하고, 성공하면 선택을 비운 뒤 이동은 화면에 맡깁니다.
  const handleClick = () => {
    const { selectedProducts } = useProductFitDraftStore.getState();
    mutate(
      {
        status,
        productIds: selectedProducts.map(({ productId }) => productId),
      },
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

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!canSubmit}
      className={cn('body1-sb', canSubmit ? 'text-black' : 'text-grey04')}
    >
      추가
    </button>
  );
};
