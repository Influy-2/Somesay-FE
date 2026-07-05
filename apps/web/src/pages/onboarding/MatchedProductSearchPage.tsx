import { OnboardingProductSearch } from '@/features/onboarding';
import { PATH } from '@/routes/path';

const MATCHED_PRODUCTS_PATH = `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.MATCHED_PRODUCTS}`;

export const MatchedProductSearchPage = () => (
  <OnboardingProductSearch
    status="MATCHED"
    parentPath={MATCHED_PRODUCTS_PATH}
    parentLabel="잘 맞았던 제품"
  />
);
