import { LoadingBlock } from '@/shared/components';

// 프로필과 활동 통계가 같은 쿼리에서 오므로 항상 함께 뜹니다.
export const MyPageSummarySkeleton = () => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="내 정보를 불러오는 중"
      className="flex flex-col"
    >
      {/* 프로필 */}
      <div className="mb-1 flex items-start py-5">
        <LoadingBlock className="size-15 shrink-0 rounded-full" />
        <div className="ml-3 flex flex-1 flex-col gap-2">
          <LoadingBlock className="h-7.5 w-28" />
          <div className="flex gap-1">
            <LoadingBlock className="h-6 w-12 rounded-[1.25rem]" />
          </div>
        </div>
      </div>

      {/* 활동 통계 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-grey01 col-span-2 flex py-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`my-page-count-loading-${index}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <LoadingBlock className="h-5 w-16" />
              <LoadingBlock className="h-7 w-6" />
            </div>
          ))}
        </div>

        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`my-page-card-loading-${index}`}
            className="bg-grey01 flex flex-col gap-3 p-5"
          >
            <LoadingBlock className="h-5 w-20" />
            <LoadingBlock className="h-8.5 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
};
