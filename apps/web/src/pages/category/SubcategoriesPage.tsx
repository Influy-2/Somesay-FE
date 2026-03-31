import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SubcategoryProductList } from '@/features/subcategory';
import { MOCK_SUBCATEGORY_PRODUCTS } from '@/features/subcategory';
import {
  HorizontalCategoriesTab,
  PageHeader,
  SortBar,
} from '@/shared/components';
import { ArrowBackIcon, SearchIcon } from '@/shared/icons';
import { PRODUCT_SUB_CATEGORY_GROUPS } from '@somesay/shared';

const SORT_OPTIONS = [
  { value: 'rating', label: '평점순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'price_low', label: '가격 낮은 순' },
];

export const SubcategoriesPage = () => {
  const navigate = useNavigate();
  const { categoryId: categoryIdParam } = useParams();
  const categoryId = Number(categoryIdParam);
  const [selectedId, setSelectedId] = useState(0);
  const [currentSortValue, setCurrentSortValue] = useState('rating');

  const currentCategory = PRODUCT_SUB_CATEGORY_GROUPS.find(
    (c) => c.categoryId === categoryId
  );
  const categoryTitle = currentCategory?.categoryLabel ?? '';

  const tabCategories = [
    { id: 0, title: '전체' },
    ...(currentCategory?.subcategories.map((sub) => ({
      id: sub.subCategoryId,
      title: sub.label,
    })) ?? []),
  ];

  const filteredCount =
    selectedId === 0
      ? MOCK_SUBCATEGORY_PRODUCTS.filter((p) => p.categoryId === categoryId)
          .length
      : MOCK_SUBCATEGORY_PRODUCTS.filter((p) => p.subCategoryId === selectedId)
          .length;

  return (
    <div className="min-dvh-screen mt-18.5 flex flex-col bg-white">
      <PageHeader
        left={
          <button
            type="button"
            aria-label="뒤로 가기"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
        title={currentCategory?.categoryLabel ?? ''}
        right={[
          <button type="button" aria-label="검색">
            <SearchIcon aria-hidden="true" />
          </button>,
        ]}
      />
      <div className="px-4">
        <HorizontalCategoriesTab
          categories={tabCategories}
          selectedId={selectedId}
          onSelect={setSelectedId}
          ariaLabel={`${categoryTitle} 소분류 카테고리`}
        />
      </div>
      <div className="px-4 pt-4">
        <SortBar
          productCount={filteredCount}
          sortOptions={SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={setCurrentSortValue}
        />
      </div>
      <div className="pt-6" />
      <SubcategoryProductList
        categoryId={categoryId}
        selectedSubcategoryId={selectedId}
      />
    </div>
  );
};
