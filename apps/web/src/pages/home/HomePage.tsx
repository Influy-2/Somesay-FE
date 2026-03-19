import {
  RecommendationSection,
  BestReviewSection,
  ProductRankingSection,
  CreatorRankingSection,
  ReviewVoteSection,
  CategoryProductSection,
} from '@/features/home';

export const HomePage = () => {
  return (
    <div className="inline-flex w-full flex-col items-center gap-17 pt-[4.875rem] pb-[10.9375rem]">
      <RecommendationSection />
      <div className="flex h-[117px] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
        베너 임시
      </div>
      <BestReviewSection />
      <ProductRankingSection />

      <CreatorRankingSection />
      <ReviewVoteSection />
      <CategoryProductSection />
    </div>
  );
};
