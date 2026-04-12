import {
  Star20Icon,
  DotIcon,
  QuoteCloseIcon,
  QuoteOpenIcon,
} from '@/shared/icons';
import { ChipLarge } from '@/shared/components';

interface CreatorReviewSummarySectionProps {
  rating: number;
  reviewCount: number;
  summaryText: string;
  skinTypes: string[];
  effects: string[];
}

export const CreatorReviewSummarySection = ({
  rating,
  reviewCount,
  summaryText,
  skinTypes,
  effects,
}: CreatorReviewSummarySectionProps) => {
  return (
    <section className="flex flex-col gap-5 bg-white px-4 py-5">
      <h2 className="headline4">크리에이터 리뷰 요약</h2>
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {/* 별점 */}
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={`5점 만점에 ${rating.toFixed(1)}점`}
          >
            <div className="flex items-center text-black">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star20Icon key={i} aria-hidden="true" />
              ))}
            </div>
            <span className="body1-b" aria-hidden="true">
              {rating.toFixed(1)}
            </span>
            <span className="body1-b text-grey06" aria-hidden="true">
              /
            </span>
            <span className="body1-b text-grey06" aria-hidden="true">
              5
            </span>
          </div>

          <DotIcon aria-hidden="true" />

          <span
            className="body1-b"
            aria-label={`리뷰 ${reviewCount.toLocaleString()}개`}
          >
            리뷰 {reviewCount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-grey02 p-5">
        <div className="flex self-start">
          <QuoteOpenIcon />
          <QuoteOpenIcon />
        </div>

        <p className="body1-sb py-2 text-center">{summaryText}</p>

        <div className="flex w-full justify-end">
          <QuoteCloseIcon />
          <QuoteCloseIcon />
        </div>
      </div>

      {/* 4. 태그 영역 */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="body2-m mb-2">잘 맞는 피부 타입</p>
          <div className="flex flex-wrap gap-1.5">
            {skinTypes.map((type) => (
              <ChipLarge
                key={type}
                label={type}
                bgColor="bg-grey05"
                textColor="text-grey08"
              />
            ))}
          </div>
        </div>
        <div>
          <p className="body2-m mb-2">기대 효과</p>
          <div className="flex flex-wrap gap-1.5">
            {effects.map((type) => (
              <ChipLarge
                key={type}
                label={type}
                bgColor="bg-grey05"
                textColor="text-grey08"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
