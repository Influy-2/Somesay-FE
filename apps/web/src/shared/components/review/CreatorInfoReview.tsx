import { Star16Icon, YoutubeIcon } from '@/shared/icons';
import { ChipBasic } from '@/shared/components';

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
      <div className="mb-4 flex gap-2.5">
        {review.ranking <= 30 && (
          <span
            className="headline4 flex h-11 shrink-0 items-center"
            aria-label={`순위 ${review.ranking}위`}
          >
            {review.ranking}
          </span>
        )}
        <div className="bg-grey02 h-11 w-11 shrink-0 overflow-hidden rounded-full">
          <img
            src={review.creator.profileImg}
            alt={`${review.creator.name} 프로필 이미지`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="body1-sb">{review.creator.name}</span>
            <div
              className="flex items-center gap-0.5"
              aria-label={`유튜브 구독자 수 ${review.creator.subscriberCount}`}
            >
              <YoutubeIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="caption2-m" aria-hidden="true">
                {review.creator.subscriberCount}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <dl className="flex items-center gap-1">
              <dt className="caption1-m text-grey07">신뢰도</dt>
              <dd className="caption1-b text-grey07">
                {review.creator.reliability}점
              </dd>
            </dl>
            <div
              className="flex gap-1"
              aria-label={`태그: ${review.creator.tags.join(', ')}`}
            >
              {review.creator.tags.map((tag) => (
                <ChipBasic
                  key={tag}
                  label={tag}
                  bgColor="bg-grey02"
                  textColor="text-grey07"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

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
        {isEvaluated ? (
          <>
            <p className="mb-1">
              <span className="body2-b">{review.agreedPercentage}%</span>
              <span className="body2-m text-grey08">
                의 사용자가 이 리뷰에 공감했어요
              </span>
            </p>
            <div
              className="bg-grey02 mr-2 h-1.5"
              role="progressbar"
              aria-valuenow={review.agreedPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`공감 비율 ${review.agreedPercentage}%`}
            >
              <div
                className="bg-grey08 h-full"
                style={{ width: `${review.agreedPercentage}%` }}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="body2-m text-grey05">
              아직 이 리뷰에 대한 평가가 이루어지지 않았어요.
            </p>
            <div className="bg-grey01 mr-2 h-1.5 w-full" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
};
