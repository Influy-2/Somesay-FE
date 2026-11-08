// Review/상세페이지용

import { CreatorRankingProfile } from '../profile/CreatorRankingProfile';
import { RateBar } from '../ratebar/RateBar';
import { StarRating } from '../rating/StarRating';
import type { ProductReviewResponse } from '@somesay/shared';
import { formatCount } from '@somesay/shared';

export interface CreatorInfoReviewProps {
  review: Pick<
    ProductReviewResponse,
    | 'creatorRanking'
    | 'creatorName'
    | 'creatorProfileImgUrl'
    | 'creatorSubscriberNum'
    | 'creatorTrustScore'
    | 'creatorSkinTypeIds'
    | 'reviewRating'
    | 'reviewContent'
    | 'reviewAgreeCount'
    | 'reviewDisagreeCount'
    | 'reviewAgreeRatio'
  >;
}

export const CreatorInfoReview = ({ review }: CreatorInfoReviewProps) => {
  const participantCount = review.reviewAgreeCount + review.reviewDisagreeCount;
  const isEvaluated = participantCount > 0;

  return (
    <div className="flex flex-col px-4 pt-5">
      <CreatorRankingProfile
        ranking={review.creatorRanking}
        nickname={review.creatorName}
        creatorProfileImgUrl={review.creatorProfileImgUrl}
        subscriberNum={review.creatorSubscriberNum}
        trustScore={review.creatorTrustScore}
        skinTypeIds={review.creatorSkinTypeIds}
      />

      <div className="mb-5">
        <div className="flex items-center gap-1">
          <StarRating rating={review.reviewRating} />
          <span className="body2-sb" aria-hidden="true">
            {review.reviewRating}
          </span>
        </div>
        <p className="body2-m">{review.reviewContent}</p>
      </div>

      <div className="pb-4">
        <div className="mb-1">
          {isEvaluated ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="body2-b">
                  {Math.round(review.reviewAgreeRatio)}%
                </span>
                <span className="body2-m text-grey08">
                  의 사용자가 이 리뷰에 공감했어요
                </span>
              </div>
              <span className="body2-m text-grey06">
                {formatCount(participantCount)}명 참여
              </span>
            </div>
          ) : (
            <span className="body2-m text-grey05">
              아직 이 리뷰에 대한 평가가 이루어지지 않았어요.
            </span>
          )}
        </div>
        {isEvaluated ? (
          <RateBar percentage={review.reviewAgreeRatio} />
        ) : (
          <div className="bg-grey01 mr-2 h-1.5 w-full" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};
