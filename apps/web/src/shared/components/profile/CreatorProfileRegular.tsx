// Profile/크리에이터/기본형 컴포넌트
import YoutubeIcon from '@/shared/icons/YoutubeIcon.svg?react';
import { ChipHomeProfile } from '@/shared/components/chips/HomeProfileChip';

// TODO: Review Content와 통일 (추후 백엔드 연결시 수정)
interface CreatorProfileRegularProps {
  name: string;
  profileImageUrl: string;
  subscriberCount: number; // 단위: 만
  trustScore: number;
  ageGroup: number; // 단위: 대 (20, 30, 40...)
  skinType: string;
}

export const CreatorProfileRegular = ({
  name,
  profileImageUrl,
  subscriberCount,
  trustScore,
  ageGroup,
  skinType,
}: CreatorProfileRegularProps) => {
  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={`크리에이터: ${name}, 유튜브 구독자 ${subscriberCount}만, 신뢰도 ${trustScore}, ${ageGroup}대, ${skinType}`}
    >
      {/* 프로필 사진 */}
      <div
        className="flex aspect-square h-11 w-11 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <img
          className="h-full w-full object-cover"
          src={profileImageUrl}
          alt={`${name} 프로필 사진`}
        />
      </div>

      {/* 텍스트 정보 */}
      <div
        className="flex min-w-0 flex-1 flex-col justify-center gap-0"
        aria-hidden="true"
      >
        {/* 이름 + 유튜브 구독자 */}
        <div className="flex items-center gap-2">
          <span className="body1-sb shrink-0 text-black"> {name}</span>

          <div className="text-grey08 caption2-m flex shrink-0 items-center gap-0.5">
            <YoutubeIcon />
            {subscriberCount}
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
