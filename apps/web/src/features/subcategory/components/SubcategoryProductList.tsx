import { useState } from 'react';
import { SearchResultProductCard } from '@/shared/components';
import { MOCK_SUBCATEGORY_PRODUCTS } from '@/features/subcategory';

interface SubcategoryProductListProps {
  categoryId: number;
  selectedSubcategoryId: number;
}

export const SubcategoryProductList = ({
  categoryId,
  selectedSubcategoryId,
}: SubcategoryProductListProps) => {
  const [products, setProducts] = useState(MOCK_SUBCATEGORY_PRODUCTS);

  const filteredProducts =
    selectedSubcategoryId === 0
      ? products.filter((p) => p.categoryId === categoryId)
      : products.filter((p) => p.subCategoryId === selectedSubcategoryId);

  const handleHeartToggle = (productId: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.productId === productId
          ? { ...product, isHearted: !product.isHearted }
          : product
      )
    );
  };

  return (
    <section
      className="flex flex-1 flex-col gap-6"
      aria-label="상품 목록"
      aria-live="polite"
      aria-atomic="false"
    >
      {filteredProducts.map((product) => (
        <SearchResultProductCard
          key={product.productId}
          product={product}
          onHeartToggle={handleHeartToggle}
        />
      ))}
    </section>
  );
};
