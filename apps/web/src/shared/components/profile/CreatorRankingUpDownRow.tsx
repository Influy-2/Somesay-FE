import { Link } from 'react-router';

import {
  formatSubscriberCount,
  getAgeLabel,
  getSkinTypeLabel,
  getSkinTypeLabels,
  type AgeType,
  type CreatorRankingUpDownType,
} from '@somesay/shared';

import { PATH } from '@/routes/path';
import { ChipBasic } from '../chips/ChipBasic';
import {
  YoutubeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  NoRankChangeIcon,
} from '@/shared/icons';

type CreatorRankingUpDownRowProps = CreatorRankingUpDownType & {
  // 내 조건과 일치하는 칩을 강조할지 판단합니다. 기본은 강조 없음.
  isMyAge?: (age?: AgeType | null) => boolean;
  isMySkinTypeId?: (id: number) => boolean;
};

export const CreatorRankingUpDownRow = ({
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
  isMyAge = () => false,
  isMySkinTypeId = () => false,
}: CreatorRankingUpDownRowProps) => {
  // aria-label을 위한 문자열 생성
  const skinTypeLabel = getSkinTypeLabels(skinTypeIds).join(', ');
  const ageLabel = getAgeLabel(age);

  const rankChangeLabel =
    rankChangeDiff === 'up'
      ? `${rankChange}단계 상승`
      : rankChangeDiff === 'down'
        ? `${rankChange}단계 하락`
        : '순위 변동 없음';

  return (
    <li className="relative flex w-full items-center justify-between">
      {/* 좌측: 순위 + 프로필 */}
      <div className="flex items-center gap-3" aria-hidden="true">
        {/* 순위 번호 + 변동 */}
        <div className="flex w-[1.4375rem] flex-col items-center gap-0.5">
          <span className="subhead-sb text-center text-black">{ranking}</span>
          {/* 업다운 화살표 */}
          <div className="flex items-center gap-0.5">
            {rankChangeDiff === 'up' ? (
              <>
                <ArrowUpIcon className="text-primary-400" />
                <span className="caption1-m text-primary-400">
                  {rankChange}
                </span>
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
          <img src={profileImgUrl} alt="" className="size-full object-cover" />
        </div>

        {/* 이름 + 채널 + 칩 */}
        <div className="flex flex-col gap-1.5">
          {/* 이름 + 유튜브 구독자 */}
          <div className="flex items-center gap-2">
            <span className="body1-sb whitespace-nowrap text-black">
              {creatorName}
            </span>
            <div className="flex items-center gap-0.5">
              <YoutubeIcon className="text-grey08 size-3.5" />
              <span className="caption2-m text-grey08 whitespace-nowrap">
                {formatSubscriberCount(subscriberNum)}
              </span>
            </div>
          </div>

          {/* 칩: 나이대 + 피부타입 (내 조건과 일치하면 강조) */}
          <div className="flex items-center gap-1">
            <ChipBasic
              label={ageLabel}
              variant={isMyAge(age) ? 'blue' : 'default'}
            />
            {skinTypeIds.map((skinTypeId) => {
              const label = getSkinTypeLabel(skinTypeId);
              if (!label) return null;

              return (
                <ChipBasic
                  key={skinTypeId}
                  label={label}
                  variant={isMySkinTypeId(skinTypeId) ? 'blue' : 'default'}
                />
              );
            })}
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

      {/* 행 전체를 크리에이터 상세로 잇는 링크 오버레이 */}
      <Link
        to={`${PATH.CREATOR.BASE}/${creatorId}`}
        className="absolute inset-0"
        aria-label={`${ranking}위 ${creatorName}, 구독자 ${formatSubscriberCount(subscriberNum)}, ${ageLabel}, ${skinTypeLabel}, 신뢰도 ${trustScore}점, ${rankChangeLabel} 상세 페이지로 이동`}
      />
    </li>
  );
};
