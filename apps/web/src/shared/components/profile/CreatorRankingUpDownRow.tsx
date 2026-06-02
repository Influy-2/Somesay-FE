import {
  YoutubeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  NoRankChangeIcon,
} from '@/shared/icons';
import { ChipBasic } from '@/shared/components';
import { CreatorRankingUpDownType } from '@somesay/shared';
import { formatSubscriberCount } from '@somesay/shared/src/utils';

export const CreatorRankingUpDownRow = ({
  ranking,
  rankChange,
  rankChangeDiff,
  profileImageUrl,
  nickname,
  subscriberNum,
  ageGroup,
  skinTypes,
  trustScore,
}: CreatorRankingUpDownType) => {
  // aria-label을 위한 문자열 생성
  const skinTypeLabel = skinTypes.join(', ');

  const rankChangeLabel =
    rankChangeDiff === 'up'
      ? `${rankChange}단계 상승`
      : rankChangeDiff === 'down'
        ? `${rankChange}단계 하락`
        : '순위 변동 없음';

  return (
    <li
      className="flex w-full items-center justify-between"
      aria-label={`${ranking}위 ${nickname}, 구독자 ${subscriberNum}만, ${ageGroup}대, ${skinTypeLabel}, 신뢰도 ${trustScore}점, ${rankChangeLabel}`}
    >
      {/* 좌측: 순위 + 프로필 */}
      <div className="flex items-center gap-3" aria-hidden="true">
        {/* 순위 번호 + 변동 */}
        <div className="flex w-[1.4375rem] flex-col items-center gap-0.5">
          <span className="subhead-sb text-center text-black">{ranking}</span>
          <div className="flex items-center gap-0.5">
            {rankChangeDiff === 'up' ? (
              <>
                <ArrowUpIcon className="size-3" />
                <span className="caption1-m">{rankChange}</span>
              </>
            ) : rankChangeDiff === 'down' ? (
              <>
                <ArrowDownIcon className="size-3" />
                <span className="caption1-m">{rankChange}</span>
              </>
            ) : (
              rankChangeDiff === 'same' && (
                <NoRankChangeIcon className="size-3" />
              )
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
                {formatSubscriberCount(subscriberNum)}
              </span>
            </div>
          </div>

          {/* 칩: 나이대 + 피부타입 */}
          <div className="flex items-center gap-1">
            <ChipBasic label={`${ageGroup}`} bgColor="bg-grey02" />
            {skinTypes.map((type) => (
              <ChipBasic key={type} label={type} bgColor="bg-grey02" />
            ))}
          </div>
        </div>
      </div>

      {/* 우측: 신뢰도 점수 */}
      <span
        className="body1-sb whitespace-nowrap text-black"
        aria-hidden="true"
      >
        {trustScore.toFixed(0)}점
      </span>
    </li>
  );
};
