import { memo } from 'react';
import { RadioProductItem } from '@/shared/components';
import type { SelectableProductItem } from '../types/productSelection.types';

interface SelectableProductListProps {
  products: SelectableProductItem[];
  selectedProductIds: ReadonlySet<number>;
  onToggle: (productId: number) => void;
  /** 이미 저장돼 있어 다시 고를 수 없는 상품 id입니다. */
  alreadyAddedProductIds?: ReadonlySet<number>;
  /** 이미 저장된 상품을 눌렀을 때 안내를 띄우는 콜백입니다. */
  onAlreadyAdded?: () => void;
}

export const SelectableProductList = memo(function SelectableProductList({
  products,
  selectedProductIds,
  onToggle,
  alreadyAddedProductIds,
  onAlreadyAdded,
}: SelectableProductListProps) {
  if (products.length === 0) {
    return (
      <p className="body2-m text-grey05 py-24 text-center">
        검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <ul className="divide-grey02 divide-y px-4">
      {products.map((product) => (
        <RadioProductItem
          key={product.productId}
          {...product}
          isSelected={selectedProductIds.has(product.productId)}
          onClick={onToggle}
          isAlreadyAdded={
            alreadyAddedProductIds?.has(product.productId) ?? false
          }
          {...(onAlreadyAdded ? { onAlreadyAdded } : {})}
        />
      ))}
    </ul>
  );
});
