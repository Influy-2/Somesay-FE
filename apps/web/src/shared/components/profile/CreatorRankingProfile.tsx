// Profile/크리에이터/순위형

import { YoutubeIcon } from '@/shared/icons';
import { ChipBasic } from '../chips/ChipBasic';
import { formatSubscriberCount, getSkinTypeLabels } from '@somesay/shared';

export interface CreatorRankingProfileProps {
  ranking: number;
  nickname: string;
  creatorProfileImgUrl: string;
  subscriberNum: number;
  trustScore: number;
  skinTypeIds: number[];
}

export const CreatorRankingProfile = ({
  ranking,
  nickname,
  creatorProfileImgUrl,
  subscriberNum,
  trustScore,
  skinTypeIds,
}: CreatorRankingProfileProps) => {
  const skinTypeLabels = getSkinTypeLabels(skinTypeIds);
  // 순위 밖 크리에이터는 운영에서 순위가 null 로 옵니다(타입은 non-null).
  // `null <= 30` 은 JS 에서 true 라 "null위"가 보이지 않도록 값부터 확인합니다.
  const showRanking = ranking != null && ranking > 0 && ranking <= 30;

  return (
    <div className="mb-4 flex gap-2.5">
      {showRanking && (
        <span
          className="headline4 flex h-11 shrink-0 items-center"
          aria-label={`순위 ${ranking}위`}
        >
          {ranking}
        </span>
      )}
      <div className="bg-grey02 h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <img
          src={creatorProfileImgUrl}
          alt={`${nickname} 프로필 이미지`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="body1-sb">{nickname}</span>
          <div
            className="flex items-center gap-0.5"
            aria-label={`유튜브 구독자 수 ${subscriberNum}`}
          >
            <YoutubeIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="caption2-m" aria-hidden="true">
              {formatSubscriberCount(subscriberNum)}
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <dl className="flex items-center gap-1">
            <dt className="caption1-m text-grey07">신뢰도</dt>
            <dd className="caption1-b text-grey07">{trustScore}점</dd>
          </dl>
          <div
            className="flex gap-1"
            aria-label={`태그: ${skinTypeLabels.join(', ')}`}
          >
            {skinTypeLabels.map((tag) => (
              <ChipBasic key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
