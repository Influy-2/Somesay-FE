import {
  formatSubscriberCount,
  getAgeLabel,
  getSkinTypeLabels,
  type CreatorRankingUpDownType,
} from '@somesay/shared';
import { Link } from 'react-router';

import { PATH } from '@/routes/path';
import { ChipBasic } from '@/shared/components/chips/ChipBasic';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  NoRankChangeIcon,
  YoutubeIcon,
} from '@/shared/icons';

export const CreatorRankingCard = ({
  creatorId,
  ranking,
  rankChange,
  rankChangeDiff,
  profileImgUrl,
  creatorName,
  subscriberNum,
  age,
  skinTypeIds,
  trustScore,
}: CreatorRankingUpDownType) => {
  const subscriberLabel = formatSubscriberCount(subscriberNum);
  const ageLabel = getAgeLabel(age);
  const skinTypeLabels = getSkinTypeLabels(skinTypeIds);
  const skinTypeLabel =
    skinTypeLabels.length > 0
      ? skinTypeLabels.join(', ')
      : '피부 타입 정보 없음';
  const rankChangeLabel =
    rankChangeDiff === 'up'
      ? `${rankChange}단계 상승`
      : rankChangeDiff === 'down'
        ? `${rankChange}단계 하락`
        : '순위 변동 없음';

  return (
    <Link
      to={`${PATH.CREATOR.BASE}/${creatorId}`}
      className="flex w-full items-center justify-between gap-3"
      aria-label={`${ranking}위 ${creatorName} 크리에이터 홈으로 이동, 구독자 ${subscriberLabel}, ${ageLabel}, ${skinTypeLabel}, 신뢰도 ${trustScore.toFixed(0)}점, ${rankChangeLabel}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex w-[1.4375rem] shrink-0 flex-col items-center gap-0.5">
          <span className="subhead-sb text-center text-black">{ranking}</span>
          <span
            className={`caption1-m flex items-center gap-0.5 ${rankChangeDiff === 'up' ? 'text-primary-400' : 'text-black'}`}
            aria-hidden="true"
          >
            {rankChangeDiff === 'up' ? (
              <ArrowUpIcon className="size-3" />
            ) : rankChangeDiff === 'down' ? (
              <ArrowDownIcon className="size-3" />
            ) : (
              <NoRankChangeIcon className="size-3" />
            )}
            {rankChangeDiff !== 'same' && <span>{rankChange}</span>}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="bg-grey02 size-[3.375rem] shrink-0 overflow-hidden rounded-full">
            {profileImgUrl && (
              <img
                src={profileImgUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="body1-sb min-w-0 truncate text-black">
                {creatorName}
              </span>
              <span className="flex shrink-0 items-center gap-0.5">
                <YoutubeIcon className="size-3.5" aria-hidden="true" />
                <span className="caption2-m text-grey08 whitespace-nowrap">
                  {subscriberLabel}
                </span>
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-1 overflow-hidden">
              <ChipBasic label={ageLabel} />
              {skinTypeLabels.map((label) => (
                <ChipBasic key={label} label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <span
        className="body1-sb shrink-0 whitespace-nowrap text-black"
        aria-hidden="true"
      >
        {trustScore.toFixed(0)}점
      </span>
    </Link>
  );
};
