import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  SUBCATEGORY_SORT_OPTIONS,
  SubcategoryLoadMore,
  SubcategoryProductList,
  useSubcategoryProducts,
} from '@/features/category';
import {
  HorizontalCategoriesTab,
  PageHeader,
  SearchFilter,
  SortBar,
} from '@/shared/components';
import { ArrowBackIcon, SearchIcon } from '@/shared/icons';
import { PATH } from '@/routes/path';

import type {
  SearchFilterGroupType,
  SelectedFiltersType,
} from '@/features/search';
import { EMPTY_FILTERS, SearchFilterBottomSheet } from '@/features/search';

export const SubcategoriesPage = () => {
  const navigate = useNavigate();
  const { categoryId: categoryIdParam } = useParams();
  const parsedCategoryId = Number(categoryIdParam);
  const isValidCategoryId =
    Number.isInteger(parsedCategoryId) && parsedCategoryId > 0;

  const {
    category,
    isCategoryPending,
    isCategoryError,
    tabProps,
    sortProps,
    listProps,
    loadMoreProps,
  } = useSubcategoryProducts(isValidCategoryId ? parsedCategoryId : undefined);

  // TODO: 카테고리 상품 API가 피부타입·기대효과 파라미터를 지원하면 목록 조회에 반영
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterGroup, setActiveFilterGroup] =
    useState<SearchFilterGroupType>('skinType');
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFiltersType>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] =
    useState<SelectedFiltersType>(EMPTY_FILTERS);

  // 적용하지 않고 닫은 선택은 버리고, 적용된 값에서 다시 시작합니다.
  const openFilter = (filterGroup: SearchFilterGroupType) => {
    setDraftFilters(selectedFilters);
    setActiveFilterGroup(filterGroup);
    setIsFilterOpen(true);
  };

  const renderContent = () => {
    // TODO: 카테고리 헤더·탭 스켈레톤으로 교체
    if (isValidCategoryId && isCategoryPending) {
      return (
        <p role="status" className="body2-m text-grey06 px-4 py-16 text-center">
          카테고리를 불러오는 중이에요.
        </p>
      );
    }

    // TODO: 재시도 버튼이 있는 에러 안내 UI로 교체
    if (isCategoryError) {
      return (
        <p role="alert" className="body2-m text-grey06 px-4 py-16 text-center">
          카테고리를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      );
    }

    if (!category) {
      return (
        <p className="body2-m text-grey06 px-4 py-16 text-center">
          카테고리를 찾을 수 없어요.
        </p>
      );
    }

    return (
      <>
        <div className="px-4 pt-5 pb-3.5">
          <HorizontalCategoriesTab
            {...tabProps}
            ariaLabel={`${category.mainCategoryName} 소분류 카테고리`}
          />
        </div>
        <div className="border-grey02 flex gap-3 border-y px-4 py-3.5">
          <SearchFilter
            placeholder="피부타입"
            selectedLabel={selectedFilters.skinType}
            onClick={() => openFilter('skinType')}
          />
          <SearchFilter
            placeholder="기대효과"
            selectedLabel={selectedFilters.effect}
            onClick={() => openFilter('effect')}
          />
        </div>
        <div className="pb-2.5">
          <SortBar sortOptions={SUBCATEGORY_SORT_OPTIONS} {...sortProps} />
        </div>
        <SubcategoryProductList {...listProps} />
        <SubcategoryLoadMore {...loadMoreProps} />
        <SearchFilterBottomSheet
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedFilters={selectedFilters}
          activeCategory={activeFilterGroup}
          onCategoryChange={setActiveFilterGroup}
          onSubmit={setSelectedFilters}
          onReset={() => setSelectedFilters(EMPTY_FILTERS)}
          visibleCategories={['skinType', 'effect']}
          draftFilters={draftFilters}
          onDraftFiltersChange={setDraftFilters}
        />
      </>
    );
  };

  return (
    <div className="mt-13.5 flex flex-col bg-white">
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
        {...(category ? { title: category.mainCategoryName } : {})}
        right={[
          <Link
            key="search"
            to={PATH.SEARCH.BASE}
            aria-label="검색 페이지로 이동"
          >
            <SearchIcon aria-hidden="true" />
          </Link>,
        ]}
      />
      {renderContent()}
    </div>
  );
};
