import type { CreatorReviewSummaryType } from '@somesay/shared';

import { ChipLarge, StarRating } from '@/shared/components';
import { DotIcon, QuoteCloseIcon, QuoteOpenIcon } from '@/shared/icons';

// 크리에이터 리뷰 요약 정보를 표시하는 섹션입니다.
export const CreatorReviewSummarySection = ({
  aveRating,
  reviewCount,
  aiSummary,
  productSkinType,
  productSkinExpectations,
}: CreatorReviewSummaryType) => {
  return (
    <section className="flex flex-col gap-5 bg-white px-4 py-5">
      <h2 className="headline4">크리에이터 리뷰 요약</h2>
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {/* 별점 */}
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={`5점 만점에 ${aveRating.toFixed(1)}점`}
          >
            <StarRating rating={aveRating} />
            <span className="body1-b" aria-hidden="true">
              {aveRating.toFixed(1)}
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
            aria-label={`리뷰 ${reviewCount?.toLocaleString() ?? '0'}개`}
          >
            리뷰 {reviewCount?.toLocaleString() ?? '0'}
          </span>
        </div>
      </div>

      <div className="bg-grey02 p-5">
        <div className="flex self-start">
          <QuoteOpenIcon />
          <QuoteOpenIcon />
        </div>

        <p className="body1-sb py-2 text-center">{aiSummary}</p>

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
            {productSkinType.map((type) => (
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
            {productSkinExpectations.map((effect) => (
              <ChipLarge
                key={effect.productSkinExpectationId}
                label={effect.concern}
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
