import { OnboardingProductSearch } from '@/features/onboarding';
import { PATH } from '@/routes/path';

const MISMATCHED_PRODUCTS_PATH = `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.MISMATCHED_PRODUCTS}`;

export const MismatchedProductSearchPage = () => (
  <OnboardingProductSearch
    data-feature="F-0163"
    status="MISMATCHED"
    parentPath={MISMATCHED_PRODUCTS_PATH}
    parentLabel="안 맞았던 제품"
  />
);
