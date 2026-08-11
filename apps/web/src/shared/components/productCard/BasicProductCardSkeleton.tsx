import { LoadingBlock } from '@/shared/components';

/** 기본 상품 카드 1개의 골격입니다. */
export const BasicProductCardSkeleton = () => (
  <div className="flex flex-1 shrink-0 flex-col items-start">
    <LoadingBlock className="h-50 w-full" />
    <div className="flex w-full flex-col gap-1 pt-2">
      <LoadingBlock className="h-5 w-1/3" />
      <LoadingBlock className="h-5 w-full" />
      <LoadingBlock className="h-5 w-1/2" />
      <LoadingBlock className="h-5 w-2/3" />
    </div>
  </div>
);
