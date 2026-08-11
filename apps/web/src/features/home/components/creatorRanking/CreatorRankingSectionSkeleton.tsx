import { CreatorRankingUpDownRowSkeleton } from '@/shared/components';

const CREATOR_RANKING_SKELETON_COUNT = 5;

/** 홈 크리에이터 랭킹 최초 조회 중 행 골격을 표시합니다. */
export const CreatorRankingSectionSkeleton = () => (
  <ol
    role="status"
    aria-label="크리에이터 랭킹을 불러오는 중"
    className="flex flex-col items-start gap-6 self-stretch py-0"
  >
    {Array.from({ length: CREATOR_RANKING_SKELETON_COUNT }).map((_, index) => (
      <CreatorRankingUpDownRowSkeleton
        key={`creator-ranking-skeleton-${index}`}
      />
    ))}
  </ol>
);
