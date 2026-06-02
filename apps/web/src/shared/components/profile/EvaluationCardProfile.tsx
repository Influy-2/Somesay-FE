// Profile/리뷰카드 컴포넌트

import { SomesaySmIcon, YoutubeIcon } from '@/shared/icons';
import { ChipBasic } from '@/shared/components';
import { formatSubscriberCount } from '@somesay/shared';
import type { CreatorType } from '@somesay/shared';

type EvaluationCardProfileProps = Pick<
  CreatorType,
  | 'nickname'
  | 'profileImageUrl'
  | 'subscriberNum'
  | 'trustScore'
  | 'ranking'
  | 'ageGroup'
  | 'skinTypes'
> & {
  evaluated: boolean;
};

export const EvaluationCardProfile = ({
  evaluated,
  nickname,
  profileImageUrl,
  subscriberNum,
  trustScore,
  ranking,
  ageGroup,
  skinTypes,
}: EvaluationCardProfileProps) => {
  const showRank = ranking > 0 && ranking <= 30;

  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={
        evaluated ? `크리에이터: ${nickname}, 신뢰도 ${trustScore}점` : ''
      }
    >
      {/* 프로필 이미지 */}
      {evaluated ? (
        <div
          className="size-11 shrink-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <img
            src={profileImageUrl}
            alt={`${nickname} 프로필`}
            className="size-full object-cover"
          />
        </div>
      ) : (
        <div
          className="bg-grey04 size-11 shrink-0 rounded-full"
          aria-hidden="true"
        />
      )}

      {/* 텍스트 정보 */}
      <div className="flex min-w-0 flex-1 flex-col gap-0">
        {/* 닉네임 + 구독자수 */}
        <div className="flex h-6 items-center gap-2">
          {evaluated ? (
            <span className="body1-sb shrink-0 text-black">{nickname}</span>
          ) : (
            <SomesaySmIcon className="shrink-0" aria-hidden="true" />
          )}
          {/* 유튜브 */}
          <div className="caption2-m flex shrink-0 items-center gap-0.5 text-black">
            <YoutubeIcon />
            {evaluated ? formatSubscriberCount(subscriberNum) : '???만'}
          </div>
        </div>

        {/* 신뢰도 + 순위 + 칩 */}
        <div className="flex h-[1.4375rem] w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="text-grey07 flex justify-center">
              <span className="caption1-m">신뢰도 </span>
              <span className="caption1-b">
                {evaluated ? `${trustScore}점` : '??점'}
              </span>
            </div>
            {evaluated && showRank && (
              <>
                <div className="bg-grey04 h-2.5 w-px" />
                <span className="caption1-b text-grey07">{ranking}위</span>
              </>
            )}
          </div>
          {evaluated && (
            <div className="flex items-center gap-1">
              <ChipBasic label={`${ageGroup}대`} bgColor="bg-grey02" />
              {skinTypes.map((skinType) => (
                <ChipBasic
                  key={skinType}
                  label={skinType}
                  bgColor="bg-grey02"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
