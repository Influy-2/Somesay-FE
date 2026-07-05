// 1.6 상품 추천 화면
import { useNavigate } from 'react-router';

import {
  ProductRecommendationHeader,
  ProductRecommendationSection,
} from '@/features/home';
import { CTAButton, PageHeader } from '@/shared/components';

import { ArrowBackIcon } from '@/shared/icons';

export const ProductRecommendationsPage = () => {
  const navigate = useNavigate();

  const handleLikeAll = () => {
    console.log('추천 제품 모두 찜하기');
  };

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
        {/* 추천 결과 요약 */}
        <ProductRecommendationHeader count={5} keywords={SELECTED_KEYWORDS} />
        {/* 추천 상품 상세 */}
        <ProductRecommendationSection />
      </div>

      {/* 전체 상품 찜 */}
      <div className="border-grey02 z-toast fixed bottom-0 left-1/2 flex w-full max-w-110 min-w-[320px] -translate-x-1/2 border-t bg-white px-4 pt-2 pb-[30px]">
        <CTAButton label="추천 제품 모두 찜하기" onClick={handleLikeAll} />
      </div>
    </div>
  );
};

//mock
const SELECTED_KEYWORDS = ['건성', '여드름', '붉은기', '스킨'];
