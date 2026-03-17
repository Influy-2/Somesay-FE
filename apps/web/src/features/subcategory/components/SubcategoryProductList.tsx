import { useState } from 'react';
import { SearchResultsProductCard } from '@/shared/components';
import { MOCK_SUBCATEGORY_PRODUCTS } from '@/features/subcategory';

interface SubcategoryProductListProps {
  categoryId: number;
  selectedSubCategoryId: number;
}

export function SubcategoryProductList({
  categoryId,
  selectedSubCategoryId,
}: SubcategoryProductListProps) {
  const [products, setProducts] = useState(MOCK_SUBCATEGORY_PRODUCTS);

  const filteredProducts =
    selectedSubCategoryId === 0
      ? products.filter((p) => p.categoryId === categoryId)
      : products.filter((p) => p.subCategoryId === selectedSubCategoryId);

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
        <SearchResultsProductCard
          key={product.productId}
          product={product}
          onHeartToggle={handleHeartToggle}
        />
      ))}
    </section>
  );
}
