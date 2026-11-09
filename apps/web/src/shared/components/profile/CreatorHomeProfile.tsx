import { useState } from 'react';
import { YoutubeIcon } from '@/shared/icons';
import { Move12Icon } from '@/shared/icons';
import { ChipBasic } from '../chips/ChipBasic';
import {
  formatSubscriberCount,
  getAgeLabel,
  type CreatorDetailResponse,
} from '@somesay/shared';
import { BlackHeartButton } from '../buttons/BlackHeartButton';

type CreatorHomeProfileProps = Pick<
  CreatorDetailResponse,
  | 'creatorName'
  | 'creatorProfileImgUrl'
  | 'creatorSubscriberNum'
  | 'creatorAge'
  | 'creatorSkinTypes'
  | 'creatorYoutubeLink'
> & {
  // 찜 수·찜 여부는 UI 값입니다. (크리에이터 상세 응답에 해당 필드 없음)
  likeCount: number;
  isLiked?: boolean;
  onLikeClick?: () => void;
};

export const CreatorHomeProfile = ({
  creatorName,
  creatorProfileImgUrl,
  creatorSubscriberNum,
  creatorAge,
  creatorSkinTypes,
  likeCount: initialLikeCount,
  isLiked: initialLiked = false,
  onLikeClick,
  creatorYoutubeLink,
}: CreatorHomeProfileProps) => {
  const skinTypeLabels = creatorSkinTypes.map(
    ({ skinTypeName }) => skinTypeName
  );
  const skinTypeLabel = skinTypeLabels.join(', ');
  const ageLabel = getAgeLabel(creatorAge);
  const [liked, setLiked] = useState(initialLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(initialLikeCount);

  const handleToggle = () => {
    setLiked((prev) => !prev);
    setCurrentLikeCount((prev) => (liked ? prev - 1 : prev + 1)); // 숫자는 하트 상태에 따라 +1 하거나 -1
    onLikeClick?.();
  };

  return (
    <div
      className="flex w-full items-center gap-2"
      aria-label={`크리에이터: ${creatorName}, 유튜브 구독자 ${creatorSubscriberNum}만, ${ageLabel}, ${skinTypeLabel}`}
    >
      {/* 프로필 사진 */}
      <div
        className="flex aspect-square h-15.25 w-15.25 shrink-0 items-center justify-center overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <img
          className="h-full w-full object-cover"
          src={creatorProfileImgUrl}
          alt={`${creatorName} 프로필 사진`}
        />
      </div>

      {/* 텍스트 정보 */}
      <div
        className="flex min-w-0 flex-1 flex-col justify-center gap-2"
        aria-hidden="true"
      >
        {/* 이름 + 유튜브 구독자 */}
        <div className="flex items-center gap-2">
          <span className="font-pretendard shrink-0 text-[1.25rem] leading-[150%] font-semibold">
            {creatorName}
          </span>
          <a
            href={creatorYoutubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="caption-m text-grey08 flex shrink-0 items-center gap-0.5"
            aria-label={`${creatorName} 유튜브 채널로 이동`}
          >
            <YoutubeIcon />
            {formatSubscriberCount(creatorSubscriberNum)}
            <Move12Icon />
          </a>
        </div>

        {/* 피부/나이 칩 */}
        <div className="flex items-center gap-1 p-0">
          <ChipBasic label={ageLabel} />
          {skinTypeLabels.map((label) => (
            <ChipBasic key={label} label={label} />
          ))}
        </div>
      </div>

      {/* 좋아요 버튼 */}
      <BlackHeartButton
        isLiked={liked}
        onLikeToggle={handleToggle}
        likeCount={currentLikeCount}
      />
    </div>
  );
};
