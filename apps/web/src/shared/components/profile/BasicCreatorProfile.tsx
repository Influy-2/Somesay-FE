// Profile/크리에이터/기본형 컴포넌트
import YoutubeIcon from '@/shared/icons/YoutubeIcon.svg?react';
import { ChipHomeProfile } from '@/shared/components';
import { BasicCreatorProfileType } from '@somesay/shared';

type BasicCreatorProfileProps = BasicCreatorProfileType;

export const BasicCreatorProfile = ({
  creatorId,
  nickname,
  profileImageUrl,
  subscriberCount,
  trustScore,
  ageGroup,
  skinType,
}: BasicCreatorProfileProps) => {
  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={`크리에이터: ${nickname}, 유튜브 구독자 ${subscriberCount}만, 신뢰도 ${trustScore}, ${ageGroup}대, ${skinType}`}
      key={creatorId}
    >
      {/* 프로필 사진 */}
      <div
        className="flex aspect-square h-11 w-11 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <img
          className="h-full w-full object-cover"
          src={profileImageUrl}
          alt={`${nickname} 프로필 사진`}
        />
      </div>

      {/* 텍스트 정보 */}
      <div
        className="flex min-w-0 flex-1 flex-col justify-center gap-0"
        aria-hidden="true"
      >
        {/* 이름 + 유튜브 구독자 */}
        <div className="flex items-center gap-2">
          <span className="body1-sb shrink-0 text-black"> {nickname}</span>

          <div className="text-grey08 caption2-m flex shrink-0 items-center gap-0.5">
            <YoutubeIcon />
            {subscriberCount}만
          </div>
        </div>

        {/* 신뢰도 + 피부/나이 칩 */}
        <div className="flex w-full items-center justify-between">
          <p className="text-grey07">
            <span className="caption1-m">신뢰도 </span>
            <strong className="caption1-b">{trustScore}</strong>
          </p>

          <div className="flex items-center gap-1 p-0">
            <ChipHomeProfile label={`${ageGroup}대`} />
            <ChipHomeProfile label={skinType} />
          </div>
        </div>
      </div>
    </div>
  );
};
