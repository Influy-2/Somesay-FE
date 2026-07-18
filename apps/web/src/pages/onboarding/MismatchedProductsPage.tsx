import { OnboardingProductSelection } from '@/features/onboarding';
import { PATH } from '@/routes/path';

const MISMATCHED_PRODUCT_SEARCH_PATH = `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.MISMATCHED_PRODUCTS_SEARCH}`;

export const MismatchedProductsPage = () => (
  <OnboardingProductSelection
    status="MISMATCHED"
    step="mismatchedProducts"
    title="이 중 안 맞았던 제품이 있으신가요?"
    description="비슷하게 안 맞을 제품은 추천하지 않을게요."
    searchPath={MISMATCHED_PRODUCT_SEARCH_PATH}
    ctaLabel="완료"
  />
);
