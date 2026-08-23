// Profile/크리에이터/기본형 컴포넌트
import { YoutubeIcon } from '@/shared/icons';
import {
  formatSubscriberCount,
  getAgeLabel,
  type BasicCreatorProfileType,
} from '@somesay/shared';
import { ChipBasic } from '../chips/ChipBasic';

interface BasicCreatorProfileProps extends Omit<
  BasicCreatorProfileType,
  'trustScore'
> {
  trustRank?: number;
  highlightedLabels?: readonly string[];
}

const TRUST_RANK_LIMIT = 10;

export const BasicCreatorProfile = ({
  creatorId,
  creatorName,
  profileImgUrl,
  subscriberNum,
  age,
  skinTypes = [],
  trustRank,
  highlightedLabels = [],
}: BasicCreatorProfileProps) => {
  const skinTypeLabel = skinTypes.join(', '); // 여러 피부 타입을 쉼표로 구분하여 표시
  const ageLabel = getAgeLabel(age);
  const highlightedLabelSet = new Set(highlightedLabels);
  const showTrustRank =
    trustRank !== undefined && trustRank > 0 && trustRank <= TRUST_RANK_LIMIT;

  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={`크리에이터: ${creatorName}, 유튜브 구독자 ${formatSubscriberCount(subscriberNum)}${showTrustRank ? `, 신뢰도 ${trustRank}위` : ''}, ${ageLabel}, ${skinTypeLabel}`}
      key={creatorId}
    >
      {/* 프로필 사진 */}
      <div
        className="bg-grey02 flex aspect-square h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <img
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          src={profileImgUrl}
          alt=""
        />
      </div>

      {/* 텍스트 정보 */}
      <div
        className="flex min-w-0 flex-1 flex-col justify-center gap-0"
        aria-hidden="true"
      >
        {/* 이름 + 유튜브 구독자 */}
        <div className="flex items-center gap-2">
          <span className="body1-sb shrink-0 text-black">{creatorName}</span>
          <div className="text-grey08 caption2-m flex shrink-0 items-center gap-0.5">
            <YoutubeIcon />
            {formatSubscriberCount(subscriberNum)}
          </div>
        </div>

        {/* 신뢰도 + 피부/나이 칩 */}
        <div className="flex w-full items-center justify-between">
          {showTrustRank ? (
            <p className="text-grey07">
              <span className="caption1-m">신뢰도 </span>
              <strong className="caption1-b">{trustRank}위</strong>
            </p>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1 p-0">
            <ChipBasic
              label={ageLabel}
              variant={highlightedLabelSet.has(ageLabel) ? 'blue' : 'default'}
            />
            {skinTypes.map((skinType) => (
              <ChipBasic
                key={skinType}
                label={skinType}
                variant={highlightedLabelSet.has(skinType) ? 'blue' : 'default'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
