import { LoadingBlock } from '@/shared/components';

const CREATOR_RANKING_LOADING_COUNT = 10;

export const CreatorRankingSkeleton = () => (
  <ol
    className="flex flex-col gap-8 px-4 py-6"
    role="status"
    aria-label="크리에이터 랭킹을 불러오는 중"
  >
    {Array.from({ length: CREATOR_RANKING_LOADING_COUNT }).map((_, index) => (
      <li
        key={`creator-ranking-loading-${index}`}
        className="flex w-full items-center justify-between gap-3"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <LoadingBlock className="h-9 w-[1.4375rem] shrink-0" />
          <LoadingBlock className="size-[3.375rem] shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <LoadingBlock className="h-5 w-2/3" />
            <LoadingBlock className="h-5 w-3/4" />
          </div>
        </div>
        <LoadingBlock className="h-6 w-10 shrink-0" />
      </li>
    ))}
  </ol>
);
