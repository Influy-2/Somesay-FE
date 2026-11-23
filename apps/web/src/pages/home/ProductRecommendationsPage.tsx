// 1.6 상품 추천 화면
import { useNavigate } from 'react-router';

import type { RecommendedProductType } from '@somesay/shared';

import {
  ProductRecommendationHeader,
  ProductRecommendationSection,
  getSelectedKeywords,
  useRecommendationFilterStore,
} from '@/features/home';
import { CTAButton, PageHeader } from '@/shared/components';

import { ArrowBackIcon } from '@/shared/icons';

// TODO: 추천 API 재정의 후 다시 연결 (/home/recommend 스펙에서 삭제됨)
// 추천 조회·추천 일괄 찜 API 가 없어 결과를 비워 둡니다. 홈에서도 진입 섹션을 숨겨 둔 상태입니다.
const products: RecommendedProductType[] = [];

export const ProductRecommendationsPage = () => {
  const navigate = useNavigate();

  // 홈에서 확정한 조건을 그대로 사용합니다.
  const filters = useRecommendationFilterStore((state) => state.filters);
  const keywords = getSelectedKeywords(filters);

  const hasProducts = products.length > 0;

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
        {!hasProducts && (
          <div className="flex w-full flex-col items-center gap-4 px-4">
            <p className="body1-m text-grey06 text-center">
              조건에 맞는 제품을 찾지 못했어요.
            </p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="body2-sb text-grey08 border-grey03 cursor-pointer border px-4 py-2"
            >
              조건 다시 고르기
            </button>
          </div>
        )}

        {hasProducts && (
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

      {/* 전체 상품 찜 — TODO: 추천 일괄 찜 API 재정의 후 다시 연결 */}
      <div className="border-grey02 z-toast fixed bottom-0 left-1/2 flex w-full max-w-110 min-w-[320px] -translate-x-1/2 border-t bg-white px-4 pt-2 pb-[30px]">
        <CTAButton
          label="추천 제품 모두 찜하기"
          onClick={() => {}}
          disabled={!hasProducts}
        />
      </div>
    </div>
  );
};
