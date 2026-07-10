import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { SubcategoryProductList } from '@/features/subcategory';
import { MOCK_SUBCATEGORY_PRODUCTS } from '@/features/subcategory';
import { SearchFilterBottomSheet } from '@/features/search/components/SearchFilterBottomSheet';
import { SearchFilter } from '@/shared/components';
import {
  HorizontalCategoriesTab,
  PageHeader,
  SortBar,
} from '@/shared/components';
import { ArrowBackIcon, SearchIcon } from '@/shared/icons';
import { useFetchCategories } from '@/shared/hooks';
import type {
  SearchFilterGroupType,
  SelectedFiltersType,
} from '@/features/search/types/search.types';

const SORT_OPTIONS = [
  { value: 'rating', label: '평점순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'price_low', label: '가격 낮은 순' },
];

const EMPTY_FILTERS: SelectedFiltersType = {
  skinType: [],
  effect: [],
  category: [],
};

export const SubcategoriesPage = () => {
  const navigate = useNavigate();
  const { categoryId: categoryIdParam } = useParams();
  const categoryId = Number(categoryIdParam);
  const [currentSortValue, setCurrentSortValue] = useState('rating');
  const { data: categoryGroups = [] } = useFetchCategories();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<SearchFilterGroupType>('skinType');
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFiltersType>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] =
    useState<SelectedFiltersType>(EMPTY_FILTERS);

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

  const location = useLocation();
  const initialSubId =
    (location.state as { selectedSubCategoryId?: number } | null)
      ?.selectedSubCategoryId ?? 0;
  const [selectedId, setSelectedId] = useState(initialSubId);

  const filteredCount =
    selectedId === 0
      ? MOCK_SUBCATEGORY_PRODUCTS.filter((p) => p.categoryId === categoryId)
          .length
      : MOCK_SUBCATEGORY_PRODUCTS.filter((p) => p.subCategoryId === selectedId)
          .length;

  return (
    <div className="mt-18.5 flex min-h-dvh flex-col bg-white">
      {' '}
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
      <div className="px-4 pb-3.5">
        <HorizontalCategoriesTab
          categories={tabSubcategories}
          selectedId={selectedId}
          onSelect={setSelectedId}
          ariaLabel={`${categoryTitle} 소분류 카테고리`}
        />
      </div>
      <div className="border-grey02 flex gap-3 border-y px-4 py-3.5">
        <SearchFilter
          placeholder="피부타입"
          selectedLabel={selectedFilters.skinType as string[]}
          onClick={() => {
            setDraftFilters(selectedFilters);
            setActiveCategory('skinType');
            setIsFilterOpen(true);
          }}
        />
        <SearchFilter
          placeholder="기대효과"
          selectedLabel={selectedFilters.effect as string[]}
          onClick={() => {
            setDraftFilters(selectedFilters);
            setActiveCategory('effect');
            setIsFilterOpen(true);
          }}
        />
      </div>
      <div className="pb-2.5">
        <SortBar
          count={filteredCount}
          sortOptions={SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={setCurrentSortValue}
        />
      </div>
      <SubcategoryProductList
        categoryId={categoryId}
        selectedSubcategoryId={selectedId}
      />
      <SearchFilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedFilters={selectedFilters}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSubmit={(filters) => setSelectedFilters(filters)}
        onReset={() => setSelectedFilters(EMPTY_FILTERS)}
        visibleCategories={['skinType', 'effect']}
        draftFilters={draftFilters}
        onDraftFiltersChange={setDraftFilters}
      />
    </div>
  );
};
