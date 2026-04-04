import {
  Star16Icon,
  DotIcon,
  QuoteCloseIcon,
  QuoteOpenIcon,
} from '@/shared/icons';
import { ChipLarge } from '@/shared/components';

interface CreatorReviewSummaryProps {
  rating: number;
  reviewCount: number;
  summaryText: string;
  skinTypes: string[];
  effects: string[];
}

export const CreatorReviewSummary = ({
  rating,
  reviewCount,
  summaryText,
  skinTypes,
  effects,
}: CreatorReviewSummaryProps) => {
  return (
    <section className="flex flex-col gap-5 bg-white px-4 py-5">
      <h2 className="headline4">크리에이터 리뷰 요약</h2>
      <div className="flex items-center">
        <div className="flex items-center text-black">
          {[...Array(5)].map((_, i) => (
            <Star16Icon key={i} />
          ))}
        </div>
        <span className="body1-b ml-1">{rating.toFixed(1)}</span>
        <span className="body1-b text-grey06 px-1">/</span>
        <span className="body1-b text-grey06">5</span>
        <DotIcon className="mx-2" />
        <span className="body1-b">리뷰 {reviewCount.toLocaleString()}</span>
      </div>

      <div className="bg-grey02 px-5 py-5">
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
