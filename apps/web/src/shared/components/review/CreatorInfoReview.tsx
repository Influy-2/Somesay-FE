// Review/상세페이지용

import { Star16Icon } from '@/shared/icons';
import { CreatorRankingProfile, RateBar } from '@/shared/components';

export interface CreatorInfoReviewProps {
  review: {
    ranking: number;
    creator: {
      name: string;
      profileImg: string;
      subscriberCount: string;
      reliability: number;
      tags: string[];
    };
    rating: number;
    content: string;
    agreedPercentage: number;
  };
}

export const CreatorInfoReview = ({ review }: CreatorInfoReviewProps) => {
  const isEvaluated = review.agreedPercentage > 0;

  return (
    <div className="flex flex-col px-4 pt-5">
      <CreatorRankingProfile
        ranking={review.ranking}
        creator={review.creator}
      />

      <div className="mb-5">
        <div className="flex items-center gap-1">
          <div
            role="img"
            aria-label={`5점 만점에 ${review.rating}점`}
            className="flex"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star16Icon key={i} aria-hidden="true" />
            ))}
          </div>
          <span className="body2-sb" aria-hidden="true">
            {review.rating}
          </span>
        </div>
        <p className="body2-m">{review.content}</p>
      </div>

      <div className="pb-4">
        <p className="mb-1">
          {isEvaluated ? (
            <>
              <span className="body2-b">{review.agreedPercentage}%</span>
              <span className="body2-m text-grey08">
                의 사용자가 이 리뷰에 공감했어요
              </span>{' '}
            </>
          ) : (
            <span className="body2-m text-grey05">
              아직 이 리뷰에 대한 평가가 이루어지지 않았어요.
            </span>
          )}
        </p>
        {isEvaluated ? (
          <RateBar percentage={review.agreedPercentage} />
        ) : (
          <div className="bg-grey01 mr-2 h-1.5 w-full" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};
