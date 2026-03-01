import YoutubeIcon from '@/shared/icons/YoutubeIcon.svg?react';
import ArrowUpIcon from '@/shared/icons/ArrowUp12Icon.svg?react';
import ArrowDownIcon from '@/shared/icons/ArrowDown12Icon.svg?react';
import { ChipBasic } from '@/shared/components';
import { CreatorRankingUpDownType } from '@somesay/shared';

export const CreatorRankingUpDownRow = ({
  ranking,
  rankChange,
  rankChangeDiff,
  profileImageUrl,
  nickname,
  subscriberCount,
  ageGroup,
  skinType,
  trustScore,
}: CreatorRankingUpDownType) => {
  const rankChangeLabel =
    rankChange === 'up'
      ? `${rankChangeDiff}단계 상승`
      : rankChange === 'down'
        ? `${rankChangeDiff}단계 하락`
        : '순위 변동 없음';

  return (
    <div
      className="flex w-full items-center justify-between"
      aria-label={`${ranking}위 ${name}, 구독자 ${subscriberCount}만, ${ageGroup}대, ${skinType}, 신뢰도 ${trustScore}점, ${rankChangeLabel}`}
    >
      {/* 좌측: 순위 + 프로필 */}
      <div className="flex items-center gap-3" aria-hidden="true">
        {/* 순위 번호 + 변동 */}
        <div className="flex w-[23px] flex-col items-center gap-0.5">
          <span className="subhead-sb text-grey-black text-center">
            {ranking}
          </span>
          <div className="flex items-center gap-0.5">
            {rankChange === 'up' && (
              <ArrowUpIcon className="size-3 text-red-500" />
            )}
            {rankChange === 'down' && (
              <ArrowDownIcon className="size-3 text-blue-500" />
            )}
            <span className="caption1-m text-grey-black">{rankChangeDiff}</span>
          </div>
        </div>

        {/* 프로필 이미지 */}
        <div className="size-[54px] shrink-0 overflow-hidden rounded-full">
          <img
            src={profileImageUrl}
            alt=""
            className="size-full object-cover"
          />
        </div>

        {/* 이름 + 채널 + 칩 */}
        <div className="flex flex-col gap-1.5">
          {/* 이름 + 유튜브 구독자 */}
          <div className="flex items-center gap-1">
            <span className="body1-sb text-grey-black whitespace-nowrap">
              {nickname}
            </span>
            <div className="flex items-center gap-0.5">
              <YoutubeIcon className="size-3.5" />
              <span className="caption2-m text-grey08 whitespace-nowrap">
                {subscriberCount}만
              </span>
            </div>
          </div>

          {/* 칩: 나이대 + 피부타입 */}
          <div className="flex items-center gap-1">
            <ChipBasic label={`${ageGroup}대`} />
            <ChipBasic label={skinType} />
          </div>
        </div>
      </div>

      {/* 우측: 신뢰도 점수 */}
      <span
        className="body1-sb text-grey-black whitespace-nowrap"
        aria-hidden="true"
      >
        {trustScore}점
      </span>
    </div>
  );
};
