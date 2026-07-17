import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getProductsByIds,
  hasReachedProductLimit,
  MAX_PRODUCT_SELECTION,
  MOCK_PRODUCT_CATALOG,
  PRODUCT_CATEGORIES,
  ProductSearchTrigger,
  SelectableProductList,
  SelectedProductDock,
  useProductCatalog,
} from '@/features/productSelection';
import { PATH } from '@/routes/path';
import { HorizontalCategoriesTab } from '@/shared/components';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';
import { useCompleteOnboarding } from '../hooks/useCompleteOnboarding';
import { productIdsSchema } from '../schemas/onboarding.schema';
import { useOnboardingStore } from '../store/onboarding.store';
import type {
  OnboardingStep,
  ProductFitStatus,
} from '../types/onboarding.types';
import { getNextOnboardingPath } from '../utils/onboarding.flow';
import { OnboardingLayout } from './OnboardingLayout';

interface OnboardingProductSelectionProps {
  status: ProductFitStatus;
  step: Extract<OnboardingStep, 'matchedProducts' | 'mismatchedProducts'>;
  title: string;
  description?: string;
  searchPath: string;
  ctaLabel: string;
}

export const OnboardingProductSelection = ({
  status,
  step,
  title,
  description,
  searchPath,
  ctaLabel,
}: OnboardingProductSelectionProps) => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { completeOnboarding, isPending } = useCompleteOnboarding();
  const productIds = useOnboardingStore((state) =>
    status === 'MATCHED' ? state.matchedProductIds : state.mismatchedProductIds
  );
  const toggleProduct = useOnboardingStore((state) => state.toggleProduct);
  const products = useProductCatalog(selectedCategoryId);
  const selectedProductIds = useMemo(() => new Set(productIds), [productIds]);
  const selectedProducts = useMemo(
    () => getProductsByIds(MOCK_PRODUCT_CATALOG, productIds),
    [productIds]
  );
  const canProceed =
    productIds.length > 0 && productIdsSchema.safeParse(productIds).success;

  const handleToggleProduct = useCallback(
    (productId: number) => {
      if (
        hasReachedProductLimit(productIds, productId, MAX_PRODUCT_SELECTION)
      ) {
        showSnackbar('최대 15개까지 저장 가능해요.', {
          placement: 'onboardingBottom72',
        });
        return;
      }

      toggleProduct(status, productId);
    },
    [productIds, showSnackbar, status, toggleProduct]
  );

  const moveToNextStep = () => {
    const store = useOnboardingStore.getState();
    if (!store.provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    store.markStepComplete(step);

    if (step === 'mismatchedProducts') {
      void completeOnboarding();
      return;
    }

    navigate(getNextOnboardingPath(step));
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      progressStep={step}
      onSkip={moveToNextStep}
      contentClassName="flex min-h-0 flex-col overflow-hidden"
      footerContent={
        selectedProducts.length > 0 ? (
          <SelectedProductDock
            products={selectedProducts}
            onRemove={handleToggleProduct}
          />
        ) : undefined
      }
      cta={{
        label: ctaLabel,
        onClick: moveToNextStep,
        disabled: !canProceed || isPending,
        showPrevious: true,
      }}
    >
      <div className="flex h-full min-h-0 flex-col gap-9 overflow-hidden pt-3.5">
        <div className="flex shrink-0 flex-col gap-2">
          <h1 className="headline4">{title}</h1>
          {description && <p className="body2-m text-grey08">{description}</p>}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <ProductSearchTrigger onClick={() => navigate(searchPath)} />
          <HorizontalCategoriesTab
            categories={PRODUCT_CATEGORIES}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
            ariaLabel="상품 카테고리"
          />
          <div className="-mx-4 min-h-0 flex-1 overflow-y-auto pb-70">
            <SelectableProductList
              products={products}
              selectedProductIds={selectedProductIds}
              onToggle={handleToggleProduct}
            />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};
