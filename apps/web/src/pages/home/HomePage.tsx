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
            {/* @spec 1.1.1 */}
            <SearchIcon />
          </Link>,
        ]}
      />
      {/* @spec 1.2.1 */}
      <RecommendationSection />

      {/* @spec 1.1.2 */}
      <div className="flex h-[7.3125rem] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
        베너 임시
      </div>

      {/* @spec 1.2.2 */}
      <BestReviewSection />

      {/* @spec 1.3.1 */}
      <ProductRankingSection />

      {/* @spec 1.3.2 */}
      <CreatorRankingSection />

      {/* @spec 1.4.1 */}
      <ReviewVoteSection />

      {/* @spec 1.5.1 */}
      <CategoryProductSection />
    </div>
  );
};
