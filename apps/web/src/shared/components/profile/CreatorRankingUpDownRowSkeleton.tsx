import { LoadingBlock } from '@/shared/components';

/** 크리에이터 랭킹 행 1개의 골격입니다. */
export const CreatorRankingUpDownRowSkeleton = () => (
  <li className="flex w-full items-center justify-between gap-3">
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <LoadingBlock className="h-9 w-[1.4375rem] shrink-0" />
      <LoadingBlock className="size-[3.375rem] shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <LoadingBlock className="h-6 w-2/3" />
        <LoadingBlock className="h-6 w-3/4" />
      </div>
    </div>
    <LoadingBlock className="h-6 w-10 shrink-0" />
  </li>
);
