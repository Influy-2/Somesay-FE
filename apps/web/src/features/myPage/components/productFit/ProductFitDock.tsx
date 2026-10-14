import { SelectedProductDock } from '@/shared/components';

import { useProductFitDraftStore } from '../../stores/productFitDraft.store';

// 선택한 상품을 화면 하단에 고정하는 dock입니다. 선택 목록 구독을 여기로 모아 화면 컴포넌트가 다시 그려지지 않게 합니다.
export const ProductFitDock = () => {
  // 선택 목록과 제거 액션을 셀렉터로 구독합니다.
  const selectedProducts = useProductFitDraftStore(
    (state) => state.selectedProducts
  );
  const removeProduct = useProductFitDraftStore((state) => state.removeProduct);

  return (
    // 선택이 0개여도 항상 화면 하단에 고정합니다.
    <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2">
      <SelectedProductDock
        products={selectedProducts}
        onRemove={removeProduct}
      />
    </div>
  );
};
