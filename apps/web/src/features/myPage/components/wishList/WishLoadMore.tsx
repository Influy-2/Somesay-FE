import type { Ref } from 'react';

interface WishLoadMoreProps {
  loadMoreRef: Ref<HTMLDivElement>;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  onRetryNextPage: () => void;
}

// 목록 끝에 닿으면 다음 페이지를 부르는 감시 영역입니다.
export const WishLoadMore = ({
  loadMoreRef,
  isFetchingNextPage,
  isFetchNextPageError,
  onRetryNextPage,
}: WishLoadMoreProps) => {
  return (
    <div ref={loadMoreRef} className="min-h-10 pb-10">
      {isFetchingNextPage && (
        <p role="status" className="body2-m text-grey06 py-4 text-center">
          더 불러오는 중이에요.
        </p>
      )}
      {isFetchNextPageError && !isFetchingNextPage && (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 py-4 text-center"
        >
          <p className="body2-m text-grey06">더 불러오지 못했어요.</p>
          <button
            type="button"
            className="body2-sb border-grey03 border px-4 py-2 text-black"
            onClick={onRetryNextPage}
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
};
