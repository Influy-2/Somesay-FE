import { SelectedItem } from '../product/SelectedItem';

import type { SelectableProductItem } from './productSelection.types';

// 선택된 상품 목록과 제거 콜백을 받는 props입니다.
interface SelectedProductDockProps {
  products: SelectableProductItem[];
  onRemove: (productId: number) => void;
}

// 화면 하단에 선택한 제품을 가로로 모아 보여주는 dock입니다.
export const SelectedProductDock = ({
  products,
  onRemove,
}: SelectedProductDockProps) => (
  <section
    aria-label="선택된 제품"
    className="rounded-t-[1.25rem] bg-white px-4 pt-2.5 pb-2 shadow-[0_-4px_20px_0_rgba(0,0,0,0.08)]"
  >
    {/* 시트처럼 보이게 하는 장식용 손잡이입니다. */}
    <div className="mb-2 flex justify-center">
      <div className="bg-grey03 h-1 w-12 rounded-full" />
    </div>
    <p className="body2-m text-grey06 mb-2">선택된 제품 {products.length}</p>
    {/* 선택 개수가 많아지면 가로 스크롤로 넘깁니다. */}
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
