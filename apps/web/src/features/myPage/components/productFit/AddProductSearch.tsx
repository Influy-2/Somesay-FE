import { useNavigate } from 'react-router';

import {
  ProductSearchHeader,
  RecentProductSearchList,
  SelectableProductList,
  SelectedProductDock,
} from '@/features/productSelection';
import { SortBar } from '@/shared/components';
import cn from '@/utils/cn';
import type { UserProductStatusType } from '@somesay/shared';

import { PRODUCT_FIT_SEARCH_SORT_OPTIONS } from '../../constants/myPage.constants';
import { useAddProductSearch } from '../../hooks/useAddProductSearch';
import { useProductFitDraft } from '../../hooks/useProductFitDraft';

// 어느 쪽에 추가하는지를 받는 props입니다.
interface AddProductSearchProps {
  status: UserProductStatusType;
}

export const AddProductSearch = ({ status }: AddProductSearchProps) => {
  // 화면 이동, 선택·저장 로직, 검색 상태 훅을 묶어 호출합니다.
  const navigate = useNavigate();
  const {
    title,
    selectedProducts,
    selectedProductIds,
    alreadyAddedProductIds,
    handleToggle,
    handleRemove,
    handleAlreadyAdded,
    canSubmit,
    submit,
  } = useProductFitDraft(status);
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
    isLoading,
    isError,
    recentSearches,
    runSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleChange,
    handleSubmit,
    handleClear,
  } = useAddProductSearch();

  // 뒤로가기는 히스토리를 한 단계 되돌립니다.
  const handleBack = () => navigate(-1);

  // 검색 화면은 목록 화면 위에 쌓여 있어, 추가가 끝나면 두 단계를 되돌아 저장된 상품 목록으로 간다.
  const handleSubmitProducts = () => submit({ onSuccess: () => navigate(-2) });

  // 목록 컴포넌트가 id만 넘겨주므로, 상품 객체를 찾아 선택 로직에 넘깁니다.
  const handleToggleById = (productId: number) => {
    const product = products.find((item) => item.productId === productId);
    if (product) handleToggle(product);
  };

  // 상태별로 결과 영역을 고릅니다.
  const renderResults = () => {
    // 조회 실패 안내
    if (isError) {
      return (
        <p className="body2-m text-grey05 py-24 text-center">
          검색 결과를 불러오지 못했어요.
        </p>
      );
    }

    // 로딩 중 표시
    if (isLoading) {
      return (
        <div
          role="status"
          aria-busy="true"
          aria-label="검색 결과를 불러오는 중"
          className="py-24"
        />
      );
    }

    // 결과 목록(비어 있으면 목록 컴포넌트가 안내 문구를 그립니다)
    return (
      <SelectableProductList
        products={products}
        selectedProductIds={selectedProductIds}
        onToggle={handleToggleById}
        alreadyAddedProductIds={alreadyAddedProductIds}
        onAlreadyAdded={handleAlreadyAdded}
      />
    );
  };

  return (
    <div
      className={cn(
        'flex min-h-full flex-col pt-13.5',
        isResultMode && (selectedProducts.length > 0 ? 'pb-60' : 'pb-25')
      )}
    >
      {/* 헤더 영역: 결과 모드는 제목·저장 버튼·카테고리 탭까지, 입력 모드는 검색창만 보여줍니다. */}
      {isResultMode ? (
        <ProductSearchHeader
          mode="result"
          title={title}
          right={[
            <button
              key="add"
              type="button"
              onClick={handleSubmitProducts}
              disabled={!canSubmit}
              className={cn(
                'body1-sb',
                canSubmit ? 'text-black' : 'text-grey04'
              )}
            >
              추가
            </button>,
          ]}
          value={query}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={selectCategory}
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

      {/* 본문 영역: 결과 모드는 정렬바와 결과 목록, 입력 모드는 최근 검색어를 보여줍니다. */}
      {isResultMode ? (
        <>
          <SortBar
            count={productCount}
            sortOptions={PRODUCT_FIT_SEARCH_SORT_OPTIONS}
            currentSortValue={sortType}
            onSelectSort={handleSelectSort}
          />
          {renderResults()}
        </>
      ) : (
        <RecentProductSearchList
          items={recentSearches}
          onSelect={runSearch}
          onRemove={removeRecentSearch}
          onClearAll={clearRecentSearches}
        />
      )}

      {/* 하단 dock 영역: 결과 모드에서는 선택이 0개여도 항상 화면 하단에 고정합니다. */}
      {isResultMode && (
        <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2">
          <SelectedProductDock
            products={selectedProducts}
            onRemove={handleRemove}
          />
        </div>
      )}
    </div>
  );
};
