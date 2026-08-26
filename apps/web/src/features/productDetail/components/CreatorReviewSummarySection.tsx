import {
  getSkinTypeLabel,
  type CreatorReviewSummaryType,
} from '@somesay/shared';
import { useMySkinProfile } from '@/shared/hooks';
import { ChipLarge, StarRating } from '@/shared/components';
import {
  BulletDotIcon,
  DotIcon,
  QuoteCloseIcon,
  QuoteOpenIcon,
} from '@/shared/icons';

// 크리에이터 리뷰 요약 정보를 표시하는 섹션입니다.
export const CreatorReviewSummarySection = ({
  avgRating,
  reviewCount,
  aiSummary,
  frequentMention,
  consideration,
  productSkinTypeIds,
  productSkinExpectations,
}: CreatorReviewSummaryType) => {
  const { isMySkinTypeId } = useMySkinProfile();
  const mentionItems = [
    { label: '자주 언급되는 점', text: frequentMention },
    { label: '참고할 점', text: consideration },
  ];
  return (
    <section className="flex flex-col gap-5 bg-white px-4 py-5">
      <h2 className="headline4">크리에이터 리뷰 요약</h2>
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {/* 별점 */}
          <div
            className="flex items-center gap-1"
            role="img"
            aria-label={`5점 만점에 ${avgRating.toFixed(1)}점`}
          >
            <StarRating rating={avgRating} />
            <span className="body1-b" aria-hidden="true">
              {avgRating.toFixed(1)}
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

      <div className="bg-grey01 p-4">
        <div className="flex self-start">
          <QuoteOpenIcon />
        </div>

        <p className="body2-sb px-1 py-3 text-center">{aiSummary}</p>

        <div className="flex w-full justify-end">
          <QuoteCloseIcon />
        </div>
      </div>
      {mentionItems.map(
        ({ label, text }) =>
          text && (
            <div key={label} className="flex flex-col gap-1 px-2">
              <p className="body2-m text-grey06">{label}</p>
              <ul>
                <li className="body2-m flex list-none items-start gap-2">
                  <BulletDotIcon
                    className="text-grey08 mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{text}</span>
                </li>
              </ul>
            </div>
          )
      )}
      <div className="bg-grey02 my-1 h-px w-full" />
      {/* 4. 태그 영역 */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="body2-m text-grey06 mb-1.5">잘 맞는 피부 타입</p>
          <div className="flex flex-wrap gap-2.5">
            {productSkinTypeIds.map((skinTypeId) => {
              const label = getSkinTypeLabel(skinTypeId);
              if (!label) return null;

              return (
                <ChipLarge
                  key={skinTypeId}
                  label={label}
                  color={isMySkinTypeId(skinTypeId) ? 'blue100' : 'white'}
                />
              );
            })}
          </div>
        </div>
        <div>
          <p className="body2-m text-grey06 mb-1.5">기대 효과</p>
          <div className="flex flex-wrap gap-2.5">
            {productSkinExpectations.map((effect) => (
              <ChipLarge
                key={effect.skinExpectationId}
                label={effect.concern}
                color="white"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
