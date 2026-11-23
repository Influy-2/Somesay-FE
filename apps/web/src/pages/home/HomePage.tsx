import { SomesayIcon, SearchIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { PATH } from '@/routes/path';
import {
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
      {/* 요즘 나의 피부 고민에 딱 맞는 제품을 추천해 드려요 섹션 */}
      {/* TODO: 추천 API 재정의 후 다시 연결 (/home/recommend 스펙에서 삭제됨) */}
      {/* 추천을 받을 API 가 없어 섹션을 숨겼습니다. 다시 연결하면 <RecommendationSection /> 을 되살립니다. */}

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
