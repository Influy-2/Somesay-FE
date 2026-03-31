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

const CATEGORY_MOCK_DATA = [
  {
    id: 1,
    title: '스킨케어',
    subcategories: [
      { id: 101, name: '스킨/토너' },
      { id: 102, name: '로션/에멀전' },
      { id: 103, name: '에센스/앰플/세럼' },
      { id: 104, name: '크림' },
      { id: 105, name: '미스트/오일' },
    ],
  },
  {
    id: 2,
    title: '클렌징',
    subcategories: [
      { id: 201, name: '클렌징 폼' },
      { id: 202, name: '클렌징 오일' },
    ],
  },
];

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

  const currentCategory = CATEGORY_MOCK_DATA.find((c) => c.id === categoryId);
  const categoryTitle = currentCategory?.title ?? '';

  const tabCategories = [
    { id: 0, title: '전체' },
    ...(currentCategory?.subcategories?.map((sub) => ({
      id: sub.id,
      title: sub.name,
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
        title={currentCategory?.title ?? ''}
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
