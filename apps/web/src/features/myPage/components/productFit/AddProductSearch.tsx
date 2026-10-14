import { useNavigate } from 'react-router';

import {
  ProductSearchHeader,
  ProductSelectionBrowser,
  RecentProductSearchList,
  SortBar,
} from '@/shared/components';
import cn from '@/utils/cn';

import {
  PRODUCT_FIT_SEARCH_SORT_OPTIONS,
  PRODUCT_FIT_TITLES,
} from '../../constants/myPage.constants';
import { useAddProductSearch } from '../../hooks/useAddProductSearch';
import { useProductFitDraftStore } from '../../stores/productFitDraft.store';

import { ProductFitCardList } from './ProductFitCardList';
import { ProductFitDock } from './ProductFitDock';
import { ProductFitSubmitButton } from './ProductFitSubmitButton';
import type { UserProductStatusType } from '@somesay/shared';

// 어느 쪽에 추가하는지를 받는 props입니다.
interface AddProductSearchProps {
  status: UserProductStatusType;
}

export const AddProductSearch = ({ status }: AddProductSearchProps) => {
  // 화면 이동과 검색 상태 훅을 묶어 호출합니다.
  const navigate = useNavigate();
  const {
    query,
    isResultMode,
    categories,
    selectedCategoryId,
    selectCategory,
    sortType,
    handleSelectSort,
    products,
    productCount,
    listStatus,
    recentSearches,
    runSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleChange,
    handleSubmit,
    handleClear,
  } = useAddProductSearch();

  // 선택 목록 전체가 아니라 "하나라도 있는가"만 구독해, 선택 개수가 바뀔 때 화면이 다시 그려지지 않게 합니다.
  const hasSelection = useProductFitDraftStore(
    (state) => state.selectedProducts.length > 0
  );

  // 뒤로가기는 히스토리를 한 단계 되돌립니다.
  const handleBack = () => navigate(-1);

  return (
    <div
      className={cn(
        'flex min-h-full flex-col pt-13.5',
        isResultMode && (hasSelection ? 'pb-60' : 'pb-25')
      )}
    >
      {/* 헤더 영역: 결과 모드는 제목·저장 버튼까지, 입력 모드는 검색창만 보여줍니다. 검색 화면은 목록 화면 위에 쌓여 있어 저장 후 두 단계를 되돌아갑니다. */}
      {isResultMode ? (
        <ProductSearchHeader
          mode="result"
          title={PRODUCT_FIT_TITLES[status]}
          right={[
            <ProductFitSubmitButton
              key="add"
              status={status}
              onSuccess={() => navigate(-2)}
            />,
          ]}
          value={query}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onBack={handleBack}
          backLabel="상품 추가 화면으로 이동"
        />
      ) : (
        <ProductSearchHeader
          mode="input"
          value={query}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onBack={handleBack}
          backLabel="상품 추가 화면으로 이동"
        />
      )}

      {/* 본문 영역: 결과 모드는 탭·정렬바·결과 목록, 입력 모드는 최근 검색어를 보여줍니다. */}
      {isResultMode ? (
        <ProductSelectionBrowser
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={selectCategory}
          toolbar={
            <SortBar
              count={productCount}
              sortOptions={PRODUCT_FIT_SEARCH_SORT_OPTIONS}
              currentSortValue={sortType}
              onSelectSort={handleSelectSort}
            />
          }
        >
          <ProductFitCardList
            status={status}
            products={products}
            listStatus={listStatus}
            emptyMessage="검색 결과가 없습니다."
            errorMessage="검색 결과를 불러오지 못했어요."
          />
        </ProductSelectionBrowser>
      ) : (
        <RecentProductSearchList
          items={recentSearches}
          onSelect={runSearch}
          onRemove={removeRecentSearch}
          onClearAll={clearRecentSearches}
        />
      )}

      {/* 하단 dock 영역: 결과 모드에서는 선택이 0개여도 항상 화면 하단에 고정합니다. */}
      {isResultMode && <ProductFitDock />}
    </div>
  );
};
