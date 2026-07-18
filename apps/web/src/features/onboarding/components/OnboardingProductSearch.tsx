import { useMemo, useState, type ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router';
import {
  getProductsByIds,
  hasReachedProductLimit,
  MAX_PRODUCT_SELECTION,
  MOCK_PRODUCT_CATALOG,
  PRODUCT_CATEGORIES,
  ProductSearchHeader,
  SelectableProductList,
  SelectedProductDock,
  useProductCatalog,
} from '@/features/productSelection';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';
import cn from '@/utils/cn';
import { useOnboardingStore } from '../store/onboarding.store';
import type { ProductFitStatus } from '../types/onboarding.types';

interface OnboardingProductSearchProps {
  status: ProductFitStatus;
  parentPath: string;
  parentLabel: string;
}

export const OnboardingProductSearch = ({
  status,
  parentPath,
  parentLabel,
}: OnboardingProductSearchProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const productIds = useOnboardingStore((state) =>
    status === 'MATCHED' ? state.matchedProductIds : state.mismatchedProductIds
  );
  const toggleProduct = useOnboardingStore((state) => state.toggleProduct);
  const isResultMode = submittedQuery.length > 0;
  const products = useProductCatalog(selectedCategoryId, submittedQuery);
  const selectedProductIds = useMemo(() => new Set(productIds), [productIds]);
  const selectedProducts = useMemo(
    () => getProductsByIds(MOCK_PRODUCT_CATALOG, productIds),
    [productIds]
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
    setSubmittedQuery('');
  };

  const handleSubmit = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setQuery(trimmedQuery);
    setSubmittedQuery(trimmedQuery);
    setSelectedCategoryId(0);
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setSelectedCategoryId(0);
  };

  const handleToggleProduct = (productId: number) => {
    if (hasReachedProductLimit(productIds, productId, MAX_PRODUCT_SELECTION)) {
      showSnackbar('최대 15개까지 저장 가능해요.', {
        placement: 'onboardingBottom48',
      });
      return;
    }

    toggleProduct(status, productId);
  };

  const handleBack = () => navigate(parentPath, { replace: true });

  return (
    <div
      className={cn(
        'flex min-h-full flex-col pt-13.5',
        isResultMode && selectedProducts.length > 0 && 'pb-48'
      )}
    >
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

      {isResultMode ? (
        <SelectableProductList
          products={products}
          selectedProductIds={selectedProductIds}
          onToggle={handleToggleProduct}
        />
      ) : (
        <p className="body2-m text-grey05 py-24 text-center">
          최근 검색어 내역이 없습니다.
        </p>
      )}

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
