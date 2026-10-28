import { BottomSheet } from '@/shared/components';
import { useFetchReviewComments } from '@/shared/hooks';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { ReviewCommentList } from './ReviewCommentList';
import type { ProductReviewType } from '@somesay/shared';

interface ReviewCommentSheetProps {
  /** 열려 있을 때만 리뷰가 담기고, 닫히면 null이다. */
  review: ProductReviewType | null;
  onClose: () => void;
}

// 코멘트 조회·무한스크롤을 시트가 소유합니다. 목록에 두면 코멘트 페이지가
// 올 때마다 리뷰 카드 전부가 리렌더됩니다.
export const ReviewCommentSheet = ({
  review,
  onClose,
}: ReviewCommentSheetProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchReviewComments(review?.reviewId);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const comments = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <BottomSheet
      isOpen={review !== null}
      onClose={onClose}
      ariaLabel="코멘트 전체보기"
      header={
        <div className="body1-sb px-4 text-center">
          이 리뷰에 대한 코멘트 ({review?.totalCommentCount ?? 0})
        </div>
      }
    >
      <ReviewCommentList comments={comments} />
      {/* 감지용 요소는 목록 밖에 둔다 — ol은 li만 자식으로 받는다. */}
      <div ref={loadMoreRef} />
    </BottomSheet>
  );
};
