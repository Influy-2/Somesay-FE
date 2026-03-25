import { useState } from 'react';

import SomesayIcon from '@/shared/icons/SomesayIcon.svg?react';
import SearchIcon from '@/shared/icons/SearchIcon.svg?react';

import {
  RecommendationSection,
  BestReviewSection,
  ProductRankingSection,
  CreatorRankingSection,
  ReviewVoteSection,
  CategoryProductSection,
} from '@/features/home';
import { PageHeader, Snackbar } from '@/shared/components';

export const HomePage = () => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  return (
    <div className="inline-flex w-full flex-col items-center gap-17 pt-[4.875rem] pb-[175px]">
      <PageHeader left={<SomesayIcon />} right={[<SearchIcon />]} />
      <RecommendationSection />
      <div className="flex h-[117px] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
        베너 임시
      </div>
      <BestReviewSection />
      <ProductRankingSection />

      <CreatorRankingSection />
      <ReviewVoteSection />
      <CategoryProductSection />
      {showSnackbar && (
        <Snackbar
          message="피부타입을 아직 등록하지 않았어요."
          action={{ label: '등록하러가기', onClick: () => {} }}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
};
