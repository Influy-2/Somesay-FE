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
import { useFetchCategories } from '@/shared/hooks';

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
  const { data: categoryGroups = [] } = useFetchCategories();

  const currentCategory = categoryGroups.find(
    (c) => c.mainCategoryId === categoryId
  );
  const categoryTitle = currentCategory?.mainName ?? '';

  const tabSubcategories = [
    { id: 0, label: '전체' },
    ...(currentCategory?.subCategories.map((sub) => ({
      id: sub.subCategoryId,
      label: sub.subName,
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
        title={currentCategory?.mainName ?? ''}
        right={[
          <button type="button" aria-label="검색">
            <SearchIcon aria-hidden="true" />
          </button>,
        ]}
      />
      <div className="px-4">
        <HorizontalCategoriesTab
          categories={tabSubcategories}
          selectedId={selectedId}
          onSelect={setSelectedId}
          ariaLabel={`${categoryTitle} 소분류 카테고리`}
        />
      </div>
      <div className="px-4 pt-4">
        <SortBar
          count={filteredCount}
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
