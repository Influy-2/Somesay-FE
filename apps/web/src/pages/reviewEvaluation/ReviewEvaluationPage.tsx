import { CommentInput } from '@/shared/components';

export const ReviewEvaluationPage = () => {
  return (
    <div className="relative inline-flex h-full w-full flex-col items-center">
      <h1>리뷰 평가 페이지</h1>
      <section className="border-y-grey02 z-header absolute bottom-0 flex w-full items-center gap-2 self-stretch border-t border-b border-solid bg-white px-4 pt-2 pb-7.5">
        <CommentInput />
      </section>
    </div>
  );
};
