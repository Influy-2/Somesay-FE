import { useState } from 'react';
import { HorizontalCategoriesTab } from '@/shared/components/category/HorizontalCategoriesTab';
import { BasicProductCard, MoreButton } from '@/shared/components';
import { MOCK_CATEGORY_PRODUCTS } from './mockData';
import { useFetchCategories } from '@/shared/hooks';

const ALL_CATEGORY = { id: 0, label: '전체' };

export const CategoryProductSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const { data: mainCategories = [] } = useFetchCategories();

  // const { data: products = [] } = useCategoryProducts(selectedCategoryId);

  const categories = [
    ALL_CATEGORY,
    ...mainCategories.map((category) => ({
      id: category.mainCategoryId,
      label: category.mainName,
    })),
  ];

  const products =
    selectedCategoryId === ALL_CATEGORY.id
      ? (MOCK_CATEGORY_PRODUCTS[0]?.products ?? [])
      : MOCK_CATEGORY_PRODUCTS.find(
          (category) => category.categoryId === selectedCategoryId
        )?.products || [];

  const selectedCategoryLabel =
    categories.find((category) => category.id === selectedCategoryId)?.label ??
    '';

  return (
    <section
      aria-labelledby="category-product-title"
      className="flex w-full flex-col gap-5 px-4"
    >
      {/* 타이틀 */}
      <h2 id="category-product-title" className="headline4 text-black">
        이 제품들의 크리에이터
        <br />
        내돈내산 리뷰를 확인하세요
      </h2>

      {/* 카테고리 탭 + 상품 그리드 */}
      <div className="flex flex-col gap-5">
        <HorizontalCategoriesTab
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          ariaLabel="상품 카테고리"
        />

        {/* 2열 상품 그리드 */}
        <div
          role="list"
          aria-label="추천 상품 목록"
          className="grid grid-cols-2 gap-x-1 gap-y-6 pb-2"
        >
          {products.map((product) => (
            <div key={product.productId} role="listitem">
              <BasicProductCard {...product} />
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <MoreButton
          to={'/임시'}
          text={`${selectedCategoryLabel === ALL_CATEGORY.label ? '' : selectedCategoryLabel} 상품 더보기`}
        />
      </div>
    </section>
  );
};
