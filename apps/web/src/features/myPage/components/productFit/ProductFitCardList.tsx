import { useMemo } from 'react';

import { SelectableProductCardList } from '@/shared/components';
import type {
  SelectableProductItem,
  SelectableProductListStatus,
} from '@/shared/components';
import type { UserProductStatusType } from '@somesay/shared';

import { useProductFitSelection } from '../../hooks/useProductFitSelection';
import { useProductFitDraftStore } from '../../stores/productFitDraft.store';

// 어느 쪽 저장 목록과 비교할지와 목록 상태·문구를 받는 props입니다.
interface ProductFitCardListProps {
  status: UserProductStatusType;
  products: SelectableProductItem[];
  listStatus: SelectableProductListStatus;
  emptyMessage: string;
  errorMessage?: string;
}

// 선택 id를 구독하는 유일한 목록 쪽 컴포넌트입니다. 화면 전체가 선택 변화에 다시 그려지지 않게 여기서만 구독합니다.
export const ProductFitCardList = ({
  status,
  products,
  listStatus,
  emptyMessage,
  errorMessage,
}: ProductFitCardListProps) => {
  // 선택 상품을 구독해 카드가 쓸 id 집합으로 바꿉니다. 선택이 바뀔 때만 새로 만듭니다.
  const selectedProducts = useProductFitDraftStore(
    (state) => state.selectedProducts
  );
  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map(({ productId }) => productId)),
    [selectedProducts]
  );
  const { savedProductIds, handleToggle, handleAlreadyAdded } =
    useProductFitSelection(status);

  return (
    <SelectableProductCardList
      products={products}
      selectedProductIds={selectedProductIds}
      onToggle={handleToggle}
      status={listStatus}
      emptyMessage={emptyMessage}
      alreadyAddedProductIds={savedProductIds}
      onAlreadyAdded={handleAlreadyAdded}
      {...(errorMessage ? { errorMessage } : {})}
    />
  );
};
