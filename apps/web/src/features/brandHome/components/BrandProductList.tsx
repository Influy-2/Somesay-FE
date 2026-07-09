import type { BrandProductType } from '@somesay/shared';
import { SearchResultProductCard } from '@/shared/components';

interface BrandProductListProps {
  products: BrandProductType[];
  onHeartToggle: (productId: number) => void;
}

export const BrandProductList = ({
  products,
  onHeartToggle,
}: BrandProductListProps) => {
  if (products.length === 0) {
    return (
      <p className="body2-m text-grey06 px-4 py-16 text-center">
        해당 카테고리에 등록된 상품이 없어요.
      </p>
    );
  }

  return (
    <ul
      className="flex flex-col gap-6 pt-2 pb-10"
      aria-label="브랜드 상품 목록"
    >
      {products.map((product) => (
        <li key={product.productId}>
          <SearchResultProductCard
            product={product}
            onHeartToggle={onHeartToggle}
          />
        </li>
      ))}
    </ul>
  );
};
