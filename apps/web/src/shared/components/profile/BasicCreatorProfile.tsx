// Profile/크리에이터/기본형 컴포넌트
import { YoutubeIcon } from '@/shared/icons';
import { ChipBasic } from '@/shared/components';
import { BasicCreatorProfileType } from '@somesay/shared';

type BasicCreatorProfileProps = BasicCreatorProfileType;

export const BasicCreatorProfile = ({
  creatorId,
  nickname,
  profileImageUrl,
  subscriberNum,
  trustScore,
  ageGroup,
  skinTypes,
}: BasicCreatorProfileProps) => {
  const skinTypeLabel = skinTypes.join(', '); // 여러 피부 타입을 쉼표로 구분하여 표시
  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={`크리에이터: ${nickname}, 유튜브 구독자 ${subscriberNum}만, 신뢰도 ${trustScore}, ${ageGroup}대, ${skinTypeLabel}`}
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
          {/* // TODO: ~만 수정 필요 */}
          <div className="text-grey08 caption2-m flex shrink-0 items-center gap-0.5">
            <YoutubeIcon />
            {subscriberNum}만
          </div>
        </div>

        {/* 신뢰도 + 피부/나이 칩 */}
        <div className="flex w-full items-center justify-between">
          <p className="text-grey07">
            <span className="caption1-m">신뢰도 </span>
            <strong className="caption1-b">{trustScore}</strong>
          </p>

          <div className="flex items-center gap-1 p-0">
            <ChipBasic label={`${ageGroup}대`} bgColor="bg-grey03" />
            {skinTypes.map((skinType) => (
              <ChipBasic key={skinType} label={skinType} bgColor="bg-grey03" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
