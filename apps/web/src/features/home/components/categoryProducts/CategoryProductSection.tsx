import { useState } from 'react';
import { PATH } from '@/routes/path';
import { HorizontalCategoriesTab } from '@/shared/components/category/HorizontalCategoriesTab';
import { BasicProductCard, MoreButton } from '@/shared/components';
import {
  useFetchCategories,
  useFetchHomeProductList,
  useProductWish,
} from '@/shared/hooks';
import { CategoryProductEmptyState } from './CategoryProductEmptyState';
import { CategoryProductSkeleton } from './CategoryProductSkeleton';
import { CategoryTabSkeleton } from './CategoryTabSkeleton';

const ALL_CATEGORY = { id: 0, label: '전체' };

export const CategoryProductSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const { toggleWish } = useProductWish();
  const { data: mainCategories = [], isPending: isCategoryPending } =
    useFetchCategories();
  const homeProductParams =
    selectedCategoryId === ALL_CATEGORY.id
      ? {}
      : { mainCategoryId: selectedCategoryId };
  const { data: products = [], isPending } =
    useFetchHomeProductList(homeProductParams);
  const isEmpty = !isPending && products.length === 0;

  const categories = [
    ALL_CATEGORY,
    ...mainCategories.map((category) => ({
      id: category.mainCategoryId,
      label: category.mainCategoryName,
    })),
  ];

  const selectedCategoryLabel =
    categories.find((category) => category.id === selectedCategoryId)?.label ??
    '';

  return (
    <section
      aria-labelledby="category-product-title"
      aria-busy={isPending}
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
        {isCategoryPending ? (
          <CategoryTabSkeleton />
        ) : (
          <HorizontalCategoriesTab
            categories={categories}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
            ariaLabel="상품 카테고리"
          />
        )}

        {isPending ? (
          <CategoryProductSkeleton />
        ) : isEmpty ? (
          <CategoryProductEmptyState />
        ) : (
          <div
            role="list"
            aria-label="추천 상품 목록"
            className="grid grid-cols-2 gap-x-1 gap-y-6 pb-1"
          >
            {products.map((product) => (
              <div key={product.productId} role="listitem">
                <BasicProductCard
                  {...product}
                  onHeartToggle={() =>
                    toggleWish({
                      productId: product.productId,
                      isHearted: product.isHearted,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* 더보기 — 전체는 카테고리 목록으로, 대분류를 고르면 그 카테고리 상세로 */}
        {!isEmpty && (
          <MoreButton
            to={
              selectedCategoryId === ALL_CATEGORY.id
                ? PATH.CATEGORIES.BASE
                : `${PATH.CATEGORIES.BASE}/${selectedCategoryId}`
            }
            text={
              selectedCategoryId === ALL_CATEGORY.id
                ? '상품 더보기'
                : `${selectedCategoryLabel} 상품 더보기`
            }
          />
        )}
      </div>
    </section>
  );
};
