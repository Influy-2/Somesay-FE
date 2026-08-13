// 1.6 상품 추천 화면
import { useNavigate } from 'react-router';

import { buildRecommendationParams } from '@somesay/shared';

import {
  ProductRecommendationHeader,
  ProductRecommendationSection,
  getSelectedKeywords,
  useRecommendationFilterStore,
} from '@/features/home';
import { CTAButton, LoadingBlock, PageHeader } from '@/shared/components';
import {
  useFetchHomeRecommendations,
  useWishRecommendedProducts,
} from '@/shared/hooks';

import { ArrowBackIcon } from '@/shared/icons';

export const ProductRecommendationsPage = () => {
  const navigate = useNavigate();

  // 홈에서 확정한 조건을 그대로 사용합니다. (홈에서 이미 조회해 둔 응답을 재사용)
  const filters = useRecommendationFilterStore((state) => state.filters);
  const keywords = getSelectedKeywords(filters);
  const {
    data: products = [],
    isPending,
    isError,
    refetch,
  } = useFetchHomeRecommendations(buildRecommendationParams(filters));

  const hasProducts = products.length > 0;

  const { wishRecommendedProducts, isWishing } = useWishRecommendedProducts();

  return (
    <div className="min-h-screen w-full bg-white pb-[7.875rem]">
      {/* 페이지 헤더 */}
      <PageHeader
        title="상품 추천"
        left={
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="이전 화면으로 돌아가기"
            className="flex cursor-pointer items-center justify-center"
          >
            <ArrowBackIcon />
          </button>
        }
      />

      <div className="flex w-full flex-col pt-15 pb-[10.9375rem]">
        {isPending && (
          <div className="flex w-full flex-col items-center gap-6 px-4">
            <LoadingBlock className="h-14 w-3/4" />
            <LoadingBlock className="aspect-100/105 w-full" />
          </div>
        )}

        {/* 조회 실패 — 조건을 다시 고르면 되는 화면이라 안내와 재시도만 제공합니다. */}
        {!isPending && (isError || !hasProducts) && (
          <div className="flex w-full flex-col items-center gap-4 px-4">
            <p className="body1-m text-grey06 text-center">
              {isError
                ? '추천 제품을 불러오지 못했어요.'
                : '조건에 맞는 제품을 찾지 못했어요.'}
            </p>
            <button
              type="button"
              onClick={() => (isError ? refetch() : navigate(-1))}
              className="body2-sb text-grey08 border-grey03 cursor-pointer border px-4 py-2"
            >
              {isError ? '다시 시도' : '조건 다시 고르기'}
            </button>
          </div>
        )}

        {!isPending && !isError && hasProducts && (
          <>
            {/* 추천 결과 요약 */}
            <ProductRecommendationHeader
              count={products.length}
              keywords={keywords}
            />
            {/* 추천 상품 상세 */}
            <ProductRecommendationSection
              products={products}
              selectedKeywords={keywords}
            />
          </>
        )}
      </div>

      {/* 전체 상품 찜 */}
      <div className="border-grey02 z-toast fixed bottom-0 left-1/2 flex w-full max-w-110 min-w-[320px] -translate-x-1/2 border-t bg-white px-4 pt-2 pb-[30px]">
        <CTAButton
          label="추천 제품 모두 찜하기"
          onClick={() =>
            wishRecommendedProducts(products.map(({ productId }) => productId))
          }
          disabled={isPending || isWishing || !hasProducts}
        />
      </div>
    </div>
  );
};
