import { LoadingBlock } from '@/shared/components';

const CATEGORY_TAB_SKELETON_COUNT = 5;

/** 홈 카테고리 최초 조회 중 탭 골격을 표시합니다. */
export const CategoryTabSkeleton = () => (
  <div
    role="status"
    aria-label="카테고리를 불러오는 중"
    className="flex items-center gap-2 self-stretch"
  >
    {Array.from({ length: CATEGORY_TAB_SKELETON_COUNT }).map((_, index) => (
      <LoadingBlock
        key={`category-tab-skeleton-${index}`}
        className="h-[2.125rem] w-16 shrink-0"
      />
    ))}
  </div>
);
