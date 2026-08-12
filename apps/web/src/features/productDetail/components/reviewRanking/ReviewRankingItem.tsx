import { useState } from 'react';
import { ToggleDownIcon, ToggleUpIcon } from '@/shared/icons';
import {
  ReviewComment,
  MoreButton,
  CreatorInfoReview,
} from '@/shared/components';

import type { ProductReviewType } from '@somesay/shared';
import { OriginalVideoCard } from '@/shared/components';

interface ReviewRankingItemProps {
  review: ProductReviewType;
  onOpenTimeLinkSheet?: (reviewId: number) => void;
  onOpenCommentSheet?: (reviewId: number) => void;
}

const COMMENTS_PREVIEW_COUNT = 2;

export const ReviewRankingItem = ({
  review,
  onOpenTimeLinkSheet,
  onOpenCommentSheet,
}: ReviewRankingItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const comments = review.previewComments;
  const remainingComments = review.totalCommentCount - COMMENTS_PREVIEW_COUNT;
  return (
    <div className="border-grey01 flex flex-col">
      <CreatorInfoReview review={review} />

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={`review-expandable-${review.reviewId}`}
        className="text-grey06 body2-m flex w-full items-center justify-center gap-0.5"
      >
        {isExpanded ? (
          <>
            접기 <ToggleUpIcon aria-hidden="true" />
          </>
        ) : (
          <>
            더보기 <ToggleDownIcon aria-hidden="true" />
          </>
        )}
      </button>

      {isExpanded && (
        <div
          id={`review-expandable-${review.reviewId}`}
          className="flex flex-col bg-white"
        >
          {comments.length === 0 ? (
            <div className="mb-5 flex h-24 w-full items-center justify-center">
              <span className="body2-m text-grey05">아직 코멘트가 없어요.</span>
            </div>
          ) : (
            <ol className="divide-grey03 flex flex-col divide-y px-4 pb-4">
              {comments.slice(0, COMMENTS_PREVIEW_COUNT).map((comment) => (
                <li key={comment.reactionId}>
                  <ReviewComment
                    key={comment.reactionId}
                    nickname={comment.nickname}
                    isAgree={comment.reactionType === 'AGREE'}
                    content={comment.comment}
                    skinTypes={comment.skinTypes}
                    skinExpectations={comment.skinExpectations}
                    userId={comment.userId}
                  />
                </li>
              ))}
            </ol>
          )}

          {remainingComments > 0 && (
            <div className="px-5 pb-6">
              <MoreButton
                text={`코멘트 ${remainingComments}개 더보기`}
                onClick={() => onOpenCommentSheet?.(review.reviewId)}
              />
            </div>
          )}

          <div className="bg-white px-4">
            {review.youtubeUrl && (
              <OriginalVideoCard
                youtubeUrl={review.youtubeUrl}
                creatorName={review.nickname}
                creatorProfileImgUrl={review.profileImageUrl}
                timeLinkCount={review.timeLinkCount}
                reviewId={review.reviewId}
                videoTitle={review.videoTitle}
                viewCount={review.viewCount}
                {...(onOpenTimeLinkSheet ? { onOpenTimeLinkSheet } : {})}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
