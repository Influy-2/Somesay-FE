import YoutubeIcon from '@/shared/icons/YoutubeIcon.svg?react';
import ArrowUpIcon from '@/shared/icons/ArrowUpIcon.svg?react';
import ArrowDownIcon from '@/shared/icons/ArrowDownIcon.svg?react';
import NoRankChangeIcon from '@/shared/icons/NoRankChangeIcon.svg?react';
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
    <li
      className="flex w-full items-center justify-between"
      aria-label={`${ranking}위 ${nickname}, 구독자 ${subscriberCount}만, ${ageGroup}대, ${skinType}, 신뢰도 ${trustScore}점, ${rankChangeLabel}`}
    >
      {/* 좌측: 순위 + 프로필 */}
      <div className="flex items-center gap-3" aria-hidden="true">
        {/* 순위 번호 + 변동 */}
        <div className="flex w-[1.4375rem] flex-col items-center gap-0.5">
          <span className="subhead-sb text-center text-black">{ranking}</span>
          <div className="flex items-center gap-0.5">
            {rankChange === 'up' ? (
              <>
                <ArrowUpIcon className="size-3" />
                <span className="caption1-m">{rankChangeDiff}</span>
              </>
            ) : rankChange === 'down' ? (
              <>
                <ArrowDownIcon className="size-3" />
                <span className="caption1-m">{rankChangeDiff}</span>
              </>
            ) : (
              rankChange === 'same' && <NoRankChangeIcon className="size-3" />
            )}
          </div>
        </div>

        {/* 프로필 이미지 */}
        <div className="size-[3.375rem] shrink-0 overflow-hidden rounded-full">
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
            <span className="body1-sb whitespace-nowrap text-black">
              {nickname}
            </span>
            <div className="flex items-center gap-0.5">
              <YoutubeIcon className="text-grey08 size-3.5" />
              <span className="caption2-m text-grey08 whitespace-nowrap">
                {subscriberCount}만
              </span>
            </div>
          </div>

          {/* 칩: 나이대 + 피부타입 */}
          <div className="flex items-center gap-1">
            <ChipBasic label={`${ageGroup}대`} bgColor="grey02" />
            <ChipBasic label={skinType} bgColor="grey02" />
          </div>
        </div>
      </div>

      {/* 우측: 신뢰도 점수 */}
      <span
        className="body1-sb whitespace-nowrap text-black"
        aria-hidden="true"
      >
        {trustScore}점
      </span>
    </li>
  );
};
