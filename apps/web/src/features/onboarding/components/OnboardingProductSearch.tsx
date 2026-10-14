import { useMemo, useState, type ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router';
import {
  getProductsByIds,
  hasReachedProductLimit,
  MAX_PRODUCT_SELECTION,
  MOCK_PRODUCT_CATALOG,
  PRODUCT_CATEGORIES,
  ProductSearchHeader,
  RecentProductSearchList,
  SelectableProductList,
  SelectedProductDock,
  useProductCatalog,
  useRecentProductSearchStore,
} from '@/features/productSelection';
import { useSnackbarStore } from '@/shared/stores';
import cn from '@/utils/cn';
import { useOnboardingStore } from '../stores/onboarding.store';
import type { ProductFitStatus } from '../types/onboarding.types';

// 어떤 선택 단계(MATCHED/MISMATCHED)인지와 뒤로가기 목적지를 받는 props입니다.
interface OnboardingProductSearchProps {
  status: ProductFitStatus;
  parentPath: string;
  parentLabel: string;
}

// TODO: 온보딩의 상품 목록·검색 결과는 아직 mock(MOCK_PRODUCT_CATALOG)입니다.
// 스토어가 상품 id만 들고 있어, 실제 API(카테고리 상품·상품 검색)로 바꾸려면 선택한 상품 객체를 보관하도록 먼저 고쳐야 합니다.
// 마이페이지 상품 추가 화면(features/myPage)은 같은 흐름을 실제 API로 구현해 두었습니다.
export const OnboardingProductSearch = ({
  status,
  parentPath,
  parentLabel,
}: OnboardingProductSearchProps) => {
  // 화면 이동과 검색 입력 상태: 입력 중인 값과 제출된 값을 분리해 결과 모드를 구분합니다.
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  // 스낵바와 온보딩 스토어 구독: 단계에 맞는 선택 목록만 꺼냅니다.
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const productIds = useOnboardingStore((state) =>
    status === 'MATCHED' ? state.matchedProductIds : state.mismatchedProductIds
  );
  const toggleProduct = useOnboardingStore((state) => state.toggleProduct);

  // 최근 검색어 스토어 구독: 목록과 추가·삭제·전체 삭제 액션을 각각 꺼냅니다.
  const recentSearches = useRecentProductSearchStore((state) => state.items);
  const addRecentSearch = useRecentProductSearchStore((state) => state.addItem);
  const removeRecentSearch = useRecentProductSearchStore(
    (state) => state.removeItem
  );
  const clearRecentSearches = useRecentProductSearchStore(
    (state) => state.clearAll
  );

  // 파생값: 제출된 검색어가 있으면 결과 모드이고, 선택 id/상품은 매 렌더 계산을 피하려 메모합니다.
  const isResultMode = submittedQuery.length > 0;
  const products = useProductCatalog(selectedCategoryId, submittedQuery);
  const selectedProductIds = useMemo(() => new Set(productIds), [productIds]);
  const selectedProducts = useMemo(
    () => getProductsByIds(MOCK_PRODUCT_CATALOG, productIds),
    [productIds]
  );

  // 입력이 바뀌면 결과 모드를 풀어 다시 입력 모드(최근 검색어)로 돌아갑니다.
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
    setSubmittedQuery('');
  };

  // 검색창 제출과 최근 검색어 선택이 같은 절차를 타도록 한곳에 모읍니다.
  const runSearch = (keyword: string) => {
    // 공백뿐인 검색어는 무시합니다.
    const trimmedQuery = keyword.trim();
    if (!trimmedQuery) return;

    // 입력창·제출값을 맞추고 카테고리를 '전체'로 되돌린 뒤 기록에 남깁니다.
    setQuery(trimmedQuery);
    setSubmittedQuery(trimmedQuery);
    setSelectedCategoryId(0);
    addRecentSearch(trimmedQuery);
  };

  // 검색창 제출은 현재 입력값으로 검색합니다.
  const handleSubmit = () => runSearch(query);

  // 입력과 결과를 모두 초기화해 최근 검색어 화면으로 돌아갑니다.
  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setSelectedCategoryId(0);
  };

  // 상품 선택을 토글하되, 최대 개수에 도달하면 막고 안내합니다.
  const handleToggleProduct = (productId: number) => {
    if (hasReachedProductLimit(productIds, productId, MAX_PRODUCT_SELECTION)) {
      showSnackbar('최대 15개까지 저장 가능해요.', {
        placement: 'onboardingBottom48',
      });
      return;
    }

    toggleProduct(status, productId);
  };

  // 뒤로가기는 히스토리를 쌓지 않고 상위 선택 화면으로 교체 이동합니다.
  const handleBack = () => navigate(parentPath, { replace: true });

  return (
    <div
      className={cn(
        'flex min-h-full flex-col pt-13.5',
        isResultMode && selectedProducts.length > 0 && 'pb-48'
      )}
    >
      {/* 헤더 영역: 결과 모드는 카테고리 탭까지, 입력 모드는 검색창만 보여줍니다. */}
      {isResultMode ? (
        <ProductSearchHeader
          mode="result"
          value={query}
          categories={PRODUCT_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onBack={handleBack}
          backLabel={`${parentLabel}으로 이동`}
          onSelectCategory={setSelectedCategoryId}
        />
      ) : (
        <ProductSearchHeader
          mode="input"
          value={query}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onBack={handleBack}
          backLabel={`${parentLabel}으로 이동`}
        />
      )}

      {/* 본문 영역: 결과 모드는 상품 목록, 입력 모드는 최근 검색어를 보여줍니다. */}
      {isResultMode ? (
        <SelectableProductList
          products={products}
          selectedProductIds={selectedProductIds}
          onToggle={handleToggleProduct}
        />
      ) : (
        <RecentProductSearchList
          items={recentSearches}
          onSelect={runSearch}
          onRemove={removeRecentSearch}
          onClearAll={clearRecentSearches}
        />
      )}

      {/* 하단 dock 영역: 결과 모드에서 선택된 상품이 있을 때만 화면 하단에 고정합니다. */}
      {isResultMode && selectedProducts.length > 0 && (
        <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2">
          <SelectedProductDock
            products={selectedProducts}
            onRemove={handleToggleProduct}
          />
        </div>
      )}
    </div>
  );
};
