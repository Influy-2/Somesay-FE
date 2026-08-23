import { LoadingBlock } from '@/shared/components';

/** 홈 공감 리뷰 최초 조회 중 리뷰 섹션의 골격을 표시합니다. */
export const BestReviewSkeleton = () => (
  <section
    role="status"
    aria-label="공감 리뷰를 불러오는 중"
    aria-busy="true"
    className="flex w-full flex-col items-center justify-center gap-y-5 px-4"
  >
    <h2 id="best-review-title" className="headline4 w-full">
      유저들이 가장 많이 공감한 리뷰
    </h2>
    <div className="flex w-full flex-col gap-2">
      <LoadingBlock className="h-[138.81px] w-full" />
      <LoadingBlock className="h-[15.25rem] w-full" />
      <div className="flex items-start gap-2 self-stretch">
        <LoadingBlock className="h-[5.375rem] flex-1" />
        <LoadingBlock className="h-[5.375rem] flex-1" />
      </div>
    </div>

    <LoadingBlock className="h-2.5 w-10" />
  </section>
);
