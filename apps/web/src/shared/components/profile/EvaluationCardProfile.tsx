// Profile/리뷰카드 컴포넌트

import { SomesaySmIcon, YoutubeIcon } from '@/shared/icons';
import { ChipBasic } from '../chips/ChipBasic';
import { formatSubscriberCount, getAgeLabel } from '@somesay/shared';
import type { CreatorRankingResponse } from '@somesay/shared';

// 리뷰 평가 카드(EvaluationReviewCard)도 같은 크리에이터 정보를 받습니다.
export type EvaluationCardCreator = Pick<
  CreatorRankingResponse,
  | 'creatorName'
  | 'creatorProfileImgUrl'
  | 'creatorSubscriberNum'
  | 'creatorTrustScore'
  | 'creatorRanking'
  | 'creatorAge'
  | 'creatorSkinTypes'
>;

type EvaluationCardProfileProps = EvaluationCardCreator & {
  evaluated: boolean;
};

export const EvaluationCardProfile = ({
  evaluated,
  creatorName,
  creatorProfileImgUrl,
  creatorSubscriberNum,
  creatorTrustScore,
  creatorRanking,
  creatorAge,
  creatorSkinTypes,
}: EvaluationCardProfileProps) => {
  // 순위 밖 크리에이터는 순위가 null 입니다.
  const showRank =
    creatorRanking != null && creatorRanking > 0 && creatorRanking <= 30;

  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={
        evaluated
          ? `크리에이터: ${creatorName}, 신뢰도 ${creatorTrustScore}점`
          : ''
      }
    >
      {/* 프로필 이미지 */}
      {evaluated ? (
        <div
          className="bg-grey02 size-11 shrink-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          {creatorProfileImgUrl && (
            <img
              src={creatorProfileImgUrl}
              alt={`${creatorName} 프로필`}
              className="size-full object-cover"
            />
          )}
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
            <span className="body1-sb shrink-0 text-black">{creatorName}</span>
          ) : (
            <SomesaySmIcon className="shrink-0" aria-hidden="true" />
          )}
          {/* 유튜브 */}
          <div className="caption2-m flex shrink-0 items-center gap-0.5 text-black">
            <YoutubeIcon />
            {evaluated ? formatSubscriberCount(creatorSubscriberNum) : '???만'}
          </div>
        </div>

        {/* 신뢰도 + 순위 + 칩 */}
        <div className="flex h-[1.4375rem] w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="text-grey07 flex justify-center">
              <span className="caption1-m">신뢰도 </span>
              <span className="caption1-b">
                {evaluated ? `${creatorTrustScore}점` : '??점'}
              </span>
            </div>
            {evaluated && showRank && (
              <>
                <div className="bg-grey04 h-2.5 w-px" />
                <span className="caption1-b text-grey07">
                  {creatorRanking}위
                </span>
              </>
            )}
          </div>
          {evaluated && (
            <div className="flex items-center gap-1">
              <ChipBasic label={getAgeLabel(creatorAge)} />
              {creatorSkinTypes.map(({ skinTypeName: label }) => (
                <ChipBasic key={label} label={label} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
