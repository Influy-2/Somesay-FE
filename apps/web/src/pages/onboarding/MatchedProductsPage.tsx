import {
  OnboardingProductSelection,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';

const MATCHED_PRODUCT_SEARCH_PATH = `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.MATCHED_PRODUCTS_SEARCH}`;

/** @spec 11.2.2, 11.3.1, 11.3.2, 11.3.4, 11.3.5 */
export const MatchedProductsPage = () => {
  const nickname = useOnboardingStore((state) => state.nickname);

  return (
    <OnboardingProductSelection
      status="MATCHED"
      step="matchedProducts"
      title="이 중 잘 맞았던 제품이 있으신가요?"
      description={`${nickname}님 취향과 비슷한 사람들의 추천을 먼저 보여드릴게요.`}
      searchPath={MATCHED_PRODUCT_SEARCH_PATH}
      ctaLabel="다음"
    />
  );
};
