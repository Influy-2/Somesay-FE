import { memo } from 'react';
import { RadioProductItem } from '@/shared/components';
import type { SelectableProduct } from '../model/productSelection.types';

interface SelectableProductListProps {
  products: SelectableProduct[];
  selectedProductIds: ReadonlySet<number>;
  onToggle: (productId: number) => void;
}

export const SelectableProductList = memo(function SelectableProductList({
  products,
  selectedProductIds,
  onToggle,
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
        />
      ))}
    </ul>
  );
});
