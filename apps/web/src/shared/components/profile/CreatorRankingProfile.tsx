// Profile/크리에이터/순위형

import { YoutubeIcon } from '@/shared/icons';
import { ChipBasic } from '@/shared/components';

export interface CreatorRankingProfileProps {
  ranking: number;
  creator: {
    name: string;
    profileImg: string;
    subscriberCount: string;
    reliability: number;
    tags: string[];
  };
}

export const CreatorRankingProfile = ({
  ranking,
  creator,
}: CreatorRankingProfileProps) => {
  return (
    <div className="mb-4 flex gap-2.5">
      {ranking <= 30 && (
        <span
          className="headline4 flex h-11 shrink-0 items-center"
          aria-label={`순위 ${ranking}위`}
        >
          {ranking}
        </span>
      )}
      <div className="bg-grey02 h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <img
          src={creator.profileImg}
          alt={`${creator.name} 프로필 이미지`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="body1-sb">{creator.name}</span>
          <div
            className="flex items-center gap-0.5"
            aria-label={`유튜브 구독자 수 ${creator.subscriberCount}`}
          >
            <YoutubeIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="caption2-m" aria-hidden="true">
              {creator.subscriberCount}
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <dl className="flex items-center gap-1">
            <dt className="caption1-m text-grey07">신뢰도</dt>
            <dd className="caption1-b text-grey07">{creator.reliability}점</dd>
          </dl>
          <div
            className="flex gap-1"
            aria-label={`태그: ${creator.tags.join(', ')}`}
          >
            {creator.tags.map((tag) => (
              <ChipBasic
                key={tag}
                label={tag}
                bgColor="bg-grey02"
                textColor="text-grey07"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
