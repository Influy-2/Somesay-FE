import {
  RecommendationSection,
  BestReviewSection,
  ProductRankingSection,
  CreatorRankingSection,
  ReviewVoteSection,
  CategoryProductSection,
} from '@/features/home';
import { BottomSheet } from '@/shared/components';
import { useState } from 'react';
export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="inline-flex w-full flex-col items-center gap-17 pt-[4.875rem] pb-[175px]">
      <RecommendationSection />
      <div className="flex h-[7.3125rem] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
        베너 임시
      </div>
      <BestReviewSection />
      <ProductRankingSection />

      <CreatorRankingSection />
      <ReviewVoteSection />
      <CategoryProductSection />
      <BottomSheet
        onClose={() => setIsOpen(false)}
        title="바텀 시트 테스트"
        height="h-[60vh]"
        isOpen={isOpen}
      >
        <div className="flex h-full flex-col gap-40 p-4">
          <p>바텀 시트 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
          <p>스크롤 가능한 콘텐츠입니다.</p>
        </div>
      </BottomSheet>
    </div>
  );
};
