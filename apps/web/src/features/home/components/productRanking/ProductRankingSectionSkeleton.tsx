import { HomeProductRankingCardSkeleton } from '@/shared/components';

const PRODUCT_RANKING_SKELETON_COUNT = 4;

/** 홈 상품 랭킹 최초 조회 중 4개의 카드 골격을 표시합니다. */
export const ProductRankingSectionSkeleton = () => (
  <div
    role="status"
    aria-label="제품 랭킹을 불러오는 중"
    className="grid grid-cols-2 grid-rows-2 content-start items-start gap-[1.5rem_.25rem] self-stretch"
  >
    {Array.from({ length: PRODUCT_RANKING_SKELETON_COUNT }).map((_, index) => (
      <HomeProductRankingCardSkeleton
        key={`product-ranking-skeleton-${index}`}
      />
    ))}
  </div>
);
