import { LoadingBlock } from '@/shared/components';

const PRODUCT_RANKING_LOADING_COUNT = 10;

export const ProductRankingSkeleton = () => (
  <div
    className="grid grid-cols-2 gap-y-6"
    role="status"
    aria-label="상품 랭킹을 불러오는 중"
  >
    {Array.from({ length: PRODUCT_RANKING_LOADING_COUNT }).map((_, index) => (
      <div
        key={`product-ranking-loading-${index}`}
        className="flex min-w-0 flex-col gap-2"
      >
        <LoadingBlock className="aspect-39/44 w-full" />
        <div className="flex flex-col gap-1 px-3">
          <LoadingBlock className="h-5 w-1/3" />
          <LoadingBlock className="h-5 w-full" />
          <LoadingBlock className="h-5 w-1/2" />
          <LoadingBlock className="h-5 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);
