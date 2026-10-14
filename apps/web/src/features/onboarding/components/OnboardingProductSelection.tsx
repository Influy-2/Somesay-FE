import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getProductsByIds,
  hasReachedProductLimit,
  MAX_PRODUCT_SELECTION,
  MOCK_PRODUCT_CATALOG,
  PRODUCT_CATEGORIES,
  useProductCatalog,
} from '@/features/productSelection';
import {
  ProductSearchTrigger,
  ProductSelectionBrowser,
  SelectableProductCardList,
  SelectedProductDock,
  type SelectableProductItem,
} from '@/shared/components';
import { useSnackbarStore } from '@/shared/stores';
import { useCompleteOnboarding } from '../hooks/useCompleteOnboarding';
import { productIdsSchema } from '../schemas/onboarding.schema';
import { useOnboardingStore } from '../stores/onboarding.store';
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

// TODO: 온보딩의 상품 목록은 아직 mock(MOCK_PRODUCT_CATALOG)입니다. 실제 API 전환 조건은 OnboardingProductSearch 상단 주석을 참고하세요.
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
  // productIds 구독은 dock·CTA 활성화에 필요해 화면 껍데기는 다시 그려지지만, 카드는 memo라 바뀐 카드만 갱신됩니다.
  const selectedProductIds = useMemo(() => new Set(productIds), [productIds]);
  const selectedProducts = useMemo(
    () => getProductsByIds(MOCK_PRODUCT_CATALOG, productIds),
    [productIds]
  );
  const canProceed =
    productIds.length > 0 && productIdsSchema.safeParse(productIds).success;

  // 선택 id를 클로저로 잡지 않고 getState()로 최신값을 읽어, 선택이 바뀌어도 콜백 참조가 유지됩니다(카드 memo 유지).
  const handleToggleProduct = useCallback(
    ({ productId }: SelectableProductItem) => {
      const state = useOnboardingStore.getState();
      const currentIds =
        status === 'MATCHED'
          ? state.matchedProductIds
          : state.mismatchedProductIds;
      if (
        hasReachedProductLimit(currentIds, productId, MAX_PRODUCT_SELECTION)
      ) {
        showSnackbar('최대 15개까지 저장 가능해요.', {
          placement: 'onboardingBottom72',
        });
        return;
      }

      toggleProduct(status, productId);
    },
    [showSnackbar, status, toggleProduct]
  );

  // dock의 제거는 상한 검사가 필요 없어 상품 id만 받아 바로 토글합니다.
  const handleRemoveProduct = useCallback(
    (productId: number) => toggleProduct(status, productId),
    [status, toggleProduct]
  );

  const moveToNextStep = () => {
    const store = useOnboardingStore.getState();
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
            onRemove={handleRemoveProduct}
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
          {/* 콘텐츠가 이미 px-4라, Browser와 카드의 px-4가 겹치지 않도록 -mx-4로 바깥까지 넓힙니다. */}
          <ProductSelectionBrowser
            categories={PRODUCT_CATEGORIES}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            className="-mx-4 min-h-0 flex-1"
          >
            {/* 기존 탭-목록 간격(gap-4)에 맞추려고 Browser의 pb-3.5에 pt-0.5를 더합니다. */}
            <div className="min-h-0 flex-1 overflow-y-auto pt-0.5 pb-70">
              <SelectableProductCardList
                products={products}
                selectedProductIds={selectedProductIds}
                onToggle={handleToggleProduct}
                emptyMessage="검색 결과가 없습니다."
              />
            </div>
          </ProductSelectionBrowser>
        </div>
      </div>
    </OnboardingLayout>
  );
};
