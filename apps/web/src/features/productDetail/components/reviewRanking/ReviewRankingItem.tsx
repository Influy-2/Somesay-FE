import { useState } from 'react';
import { ToggleDownIcon, ToggleUpIcon } from '@/shared/icons';
import {
  MoreButton,
  CreatorInfoReview,
  OriginalVideoCard,
} from '@/shared/components';
import { ReviewCommentList } from './ReviewCommentList';
import type { ProductReviewType } from '@somesay/shared';

interface ReviewRankingItemProps {
  review: ProductReviewType;
  onOpenTimeLinkSheet: (review: ProductReviewType) => void;
  onOpenCommentSheet: (review: ProductReviewType) => void;
}

const COMMENTS_PREVIEW_COUNT = 2;

export const ReviewRankingItem = ({
  review,
  onOpenTimeLinkSheet,
  onOpenCommentSheet,
}: ReviewRankingItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewComments = review.previewComments.slice(
    0,
    COMMENTS_PREVIEW_COUNT
  );
  const remainingCommentCount =
    review.totalCommentCount - COMMENTS_PREVIEW_COUNT;

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
          {previewComments.length === 0 ? (
            <div className="mb-5 flex h-24 w-full items-center justify-center">
              <span className="body2-m text-grey05">아직 코멘트가 없어요.</span>
            </div>
          ) : (
            <ReviewCommentList comments={previewComments} className="pb-4" />
          )}

          {remainingCommentCount > 0 && (
            <div className="px-5 pb-6">
              <MoreButton
                text={`코멘트 ${remainingCommentCount}개 더보기`}
                onClick={() => onOpenCommentSheet(review)}
              />
            </div>
          )}

          <div className="bg-white px-4">
            {review.youtubeUrl && (
              <OriginalVideoCard
                youtubeUrl={review.youtubeUrl}
                creatorName={review.creatorName}
                creatorProfileImgUrl={review.profileImgUrl}
                timeLinkCount={review.timeLinkCount}
                reviewId={review.reviewId}
                videoTitle={review.videoTitle}
                viewCount={review.viewCount}
                onOpenTimeLinkSheet={() => onOpenTimeLinkSheet(review)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
