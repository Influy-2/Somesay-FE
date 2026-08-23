import { SomesayIcon, SearchIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import {
  RecommendationSection,
  BestReviewSection,
  ProductRankingSection,
  CreatorRankingSection,
  ReviewVoteSection,
  CategoryProductSection,
} from '@/features/home';
import { PageHeader } from '@/shared/components';

export const HomePage = () => {
  return (
    <div className="inline-flex w-full flex-col items-center gap-17 pt-[4.875rem] pb-[175px]">
      <PageHeader
        left={
          <Link to={PATH.ROOT}>
            <SomesayIcon />
          </Link>
        }
        right={[
          <Link to={PATH.SEARCH.BASE}>
            <SearchIcon />
          </Link>,
        ]}
      />
      <RecommendationSection />
      <div className="flex h-[7.3125rem] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
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
