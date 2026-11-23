import {
  formatRating,
  formatCount,
  type ProductReviewOverviewResponse,
} from '@somesay/shared';
import { useMySkinProfile } from '@/shared/hooks';
import { ChipLarge, StarRating } from '@/shared/components';
import { DotIcon, QuoteCloseIcon, QuoteOpenIcon } from '@/shared/icons';

// 크리에이터 리뷰 요약 정보를 표시하는 섹션입니다.
export const CreatorReviewSummarySection = ({
  productAvgRating,
  productReviewCount,
  productAiSummary,
  productSkinTypes,
  productEffectChips,
}: ProductReviewOverviewResponse) => {
  const { isMySkinTypeId } = useMySkinProfile();
  return (
    <section className="flex flex-col gap-5 bg-white px-4 py-5">
      <h2 className="headline4">크리에이터 리뷰 요약</h2>
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {/* 별점 */}
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={`5점 만점에 ${formatRating(productAvgRating)}점`}
          >
            <StarRating rating={productAvgRating} />
            <span className="body1-b" aria-hidden="true">
              {formatRating(productAvgRating)}
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
            aria-label={`리뷰 ${formatCount(productReviewCount)}개`}
          >
            리뷰 {formatCount(productReviewCount)}
          </span>
        </div>
      </div>

      <div className="bg-grey01 p-4">
        <div className="flex self-start">
          <QuoteOpenIcon />
        </div>

        <p className="body2-sb px-1 py-3 text-center">{productAiSummary}</p>

        <div className="flex w-full justify-end">
          <QuoteCloseIcon />
        </div>
      </div>
      {/* TODO: 자주 언급되는 점·참고할 점이 리뷰 개요 응답에서 빠졌습니다. 서버가 필드를 다시 주면 복구합니다.
          (productFrequentMention·productConsideration 을 BulletDotIcon 목록으로 그리던 블록) */}
      <div className="bg-grey02 my-1 h-px w-full" />
      {/* 4. 태그 영역 */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="body2-m text-grey06 mb-1.5">잘 맞는 피부 타입</p>
          <div className="flex flex-wrap gap-2.5">
            {productSkinTypes.map(({ skinTypeId, skinTypeName }) => (
              <ChipLarge
                key={skinTypeId}
                label={skinTypeName}
                color={isMySkinTypeId(skinTypeId) ? 'blue100' : 'white'}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="body2-m text-grey06 mb-1.5">기대 효과</p>
          <div className="flex flex-wrap gap-2.5">
            {productEffectChips.map((effect) => (
              <ChipLarge
                key={effect.chipId}
                label={effect.chipName}
                color="white"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
