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
      {/* 요즘 나의 피부 고민에 딱 맞는 제품을 추천해 드려요 섹션 */}
      <RecommendationSection />

      {/* 1.1.2 배너 */}
      <div className="flex h-[7.3125rem] w-full items-center justify-center gap-2.5 p-2.5 text-black [background:var(--grey-03,#E4E2DF)]">
        베너 임시
      </div>

      {/* 1.2.2 유저가 선택한 고평점 리뷰 */}
      <BestReviewSection />

      {/* 1.3.1 상품 랭킹 */}
      <ProductRankingSection />

      {/* 1.3.2 크리에이터 랭킹 */}
      <CreatorRankingSection />

      {/* 1.4 리뷰 평가 유도 */}
      <ReviewVoteSection />

      {/* 1.5 상품 목록 */}
      <CategoryProductSection />
    </div>
  );
};
