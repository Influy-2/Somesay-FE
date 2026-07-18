import { SelectedItem } from '@/shared/components';
import type { SelectableProduct } from '../model/productSelection.types';

interface SelectedProductDockProps {
  products: SelectableProduct[];
  onRemove: (productId: number) => void;
}

export const SelectedProductDock = ({
  products,
  onRemove,
}: SelectedProductDockProps) => (
  <section
    aria-label="선택된 제품"
    className="rounded-t-[1.25rem] bg-white px-4 pt-2.5 pb-2 shadow-[0_-4px_20px_0_rgba(0,0,0,0.08)]"
  >
    <div className="mb-2 flex justify-center">
      <div className="bg-grey03 h-1 w-12 rounded-full" />
    </div>
    <p className="body2-m text-grey06 mb-2">선택된 제품 {products.length}</p>
    <div className="scrollbar-hide flex gap-3.5 overflow-x-auto">
      {products.map((product) => (
        <SelectedItem
          key={product.productId}
          {...product}
          onRemove={onRemove}
        />
      ))}
    </div>
  </section>
);
