import { useState } from 'react';
import {
  useFetchProductReviews,
  useFetchTimeLinks,
  useFetchReviewComments,
} from '@/shared/hooks';
import { useInfiniteScroll } from '@/features/brandHome';
import { ReviewRankingItem } from './ReviewRankingItem';
import {
  OnOffButton,
  BottomSheet,
  OriginalVideo,
  ReviewComment,
} from '@/shared/components';

const INITIAL_DISPLAY_COUNT = 3;

interface ReviewRankingListProps {
  productId?: number;
}

export const ReviewRankingList = ({ productId }: ReviewRankingListProps) => {
  const [isMySkinTypeOnly, setIsMySkinTypeOnly] = useState(false);
  const [timeLinkReviewId, setTimeLinkReviewId] = useState<number | null>(null);
  const { data: timeLinks } = useFetchTimeLinks(timeLinkReviewId ?? undefined);

  const { data, fetchNextPage } = useFetchProductReviews(productId, {
    filterByMySkin: isMySkinTypeOnly,
  });
  const reviews = data?.pages.flatMap((page) => page.content) ?? [];
  const currentReview = reviews.find((r) => r.reviewId === timeLinkReviewId);

  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const displayedReviews = reviews.slice(0, displayCount);
  const totalCount = data?.pages[0]?.totalElements ?? 0;
  const remainingCount = totalCount - displayCount;
  const hasMoreToShow = remainingCount > 0;
  const [commentReviewId, setCommentReviewId] = useState<number | null>(null);
  const {
    data: commentData,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    isFetchingNextPage: isFetchingNextCommentPage,
  } = useFetchReviewComments(commentReviewId ?? undefined);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: hasNextCommentPage ?? false,
    isFetchingNextPage: isFetchingNextCommentPage,
    fetchNextPage: fetchNextCommentPage,
  });
  const comments = commentData?.pages.flatMap((page) => page.content) ?? [];

  return (
    <div className="flex flex-col bg-white pb-5">
      <div className="px-4 py-5">
        <h2 className="headline4 text-black">
          공감을 많이 받은 크리에이터 리뷰
        </h2>
      </div>

      <div className="bg-grey01 flex items-center justify-between px-4 py-3">
        <label htmlFor="skin-type-filter" className="body2-m text-black">
          내 피부 타입의 리뷰만 보기
        </label>
        <OnOffButton
          isOn={isMySkinTypeOnly}
          onToggle={() => setIsMySkinTypeOnly((prev) => !prev)}
          aria-label="내 피부 타입의 리뷰만 보기"
        />
      </div>

      <ol className="flex flex-col gap-5">
        {displayedReviews.map((review) => (
          <li key={review.reviewId}>
            <ReviewRankingItem
              review={review}
              onOpenTimeLinkSheet={(reviewId) => setTimeLinkReviewId(reviewId)}
              onOpenCommentSheet={(reviewId) => setCommentReviewId(reviewId)}
            />
          </li>
        ))}

        {hasMoreToShow && (
          <div className="px-4 pt-1">
            <button
              onClick={() => {
                setDisplayCount((prev) => prev + 10);
                fetchNextPage();
              }}
              aria-label={`크리에이터 리뷰 ${remainingCount}개 더보기`}
              className="border-grey03 body2-m flex h-10 w-full items-center justify-center border"
              type="button"
            >
              크리에이터 리뷰 {remainingCount}개 더보기{' '}
            </button>
          </div>
        )}
      </ol>
      <BottomSheet
        isOpen={timeLinkReviewId !== null}
        onClose={() => setTimeLinkReviewId(null)}
        ariaLabel="리뷰 원본 전체보기"
        header={
          <div className="flex flex-col gap-1 px-4">
            <p className="body1-sb text-center">리뷰 원본 전체보기</p>
            <p className="body2-m text-grey06 pb-3.5 text-center">
              텍스트 요약은 아래 원본 영상 리뷰들을 종합한 내용입니다.
            </p>
          </div>
        }
      >
        <div className="flex flex-col gap-5 px-4 pt-2 pb-5">
          {timeLinks?.timeLinks.map((link) => (
            <OriginalVideo
              key={link.timeLinkId}
              youtubeUrl={link.youtubeUrl}
              creatorName={currentReview?.creatorName ?? ''}
              {...(currentReview?.profileImgUrl
                ? { creatorProfileImgUrl: currentReview.profileImgUrl }
                : {})}
              videoTitle={link.videoTitle}
              viewCount={link.viewCount}
              uploadDate={link.uploadAt}
            />
          ))}
        </div>
      </BottomSheet>
      <BottomSheet
        isOpen={commentReviewId !== null}
        onClose={() => setCommentReviewId(null)}
        ariaLabel="코멘트 전체보기"
        header={
          <div className="body1-sb px-4 text-center">
            이 리뷰에 대한 코멘트 (
            {reviews.find((r) => r.reviewId === commentReviewId)
              ?.totalCommentCount ?? 0}
            )
          </div>
        }
      >
        <ol className="divide-grey03 flex flex-col divide-y px-4">
          {comments.map((comment) => (
            <li key={comment.reactionId}>
              <ReviewComment
                nickname={comment.nickname}
                isAgree={comment.reactionType === 'AGREE'}
                content={comment.comment}
                skinTypes={comment.skinTypes}
                skinExpectations={comment.skinExpectations}
                userId={comment.userId}
              />
            </li>
          ))}
          <div ref={loadMoreRef} />
        </ol>
      </BottomSheet>
    </div>
  );
};
