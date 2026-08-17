// Review/상세페이지용

import {
  CreatorRankingProfile,
  RateBar,
  StarRating,
} from '@/shared/components';
import type { ProductReviewType } from '@somesay/shared';

export interface CreatorInfoReviewProps {
  review: ProductReviewType;
}

export const CreatorInfoReview = ({ review }: CreatorInfoReviewProps) => {
  const isEvaluated = review.agreeCount + review.disagreeCount > 0;
  const participantCount = review.agreeCount + review.disagreeCount;

  return (
    <div className="flex flex-col px-4 pt-5">
      <CreatorRankingProfile
        ranking={review.ranking}
        nickname={review.nickname}
        profileImageUrl={review.profileImageUrl}
        subscriberNum={review.subscriberNum}
        trustScore={review.trustScore}
        skinTypes={review.skinTypes}
      />

      <div className="mb-5">
        <div className="flex items-center gap-1">
          <StarRating rating={review.rating} />
          <span className="body2-sb" aria-hidden="true">
            {review.rating}
          </span>
        </div>
        <p className="body2-m">{review.content}</p>
      </div>

      <div className="pb-4">
        <div className="mb-1">
          {isEvaluated ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="body2-b">
                  {Math.round(review.agreeRatio)}%
                </span>
                <span className="body2-m text-grey08">
                  의 사용자가 이 리뷰에 공감했어요
                </span>
              </div>
              <span className="body2-m text-grey06">
                {participantCount.toLocaleString()}명 참여
              </span>
            </div>
          ) : (
            <span className="body2-m text-grey05">
              아직 이 리뷰에 대한 평가가 이루어지지 않았어요.
            </span>
          )}
        </div>
        {isEvaluated ? (
          <RateBar percentage={review.agreeRatio} />
        ) : (
          <div className="bg-grey01 mr-2 h-1.5 w-full" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};
