import { useState } from 'react';
import YoutubeIcon from '@/shared/icons/YoutubeIcon.svg?react';
import Move12Icon from '@/shared/icons/Move12Icon.svg?react';
import { ChipBasic } from '@/shared/components';
import { BasicCreatorProfileType } from '@somesay/shared';
import { BlackHeartButton } from '@/shared/components';

interface CreatorHomeProfileProps extends BasicCreatorProfileType {
  likeCount: number;
  isLiked?: boolean;
  onLikeClick?: () => void;
  youtubeUrl: string;
}

const formatSubscriberCount = (count: number): string => {
  const man = count / 10000;
  return man % 1 === 0 ? `${man}만` : `${man.toFixed(1)}만`;
};

export const CreatorHomeProfile = ({
  nickname,
  profileImageUrl,
  subscriberCount,
  ageGroup,
  skinType,
  likeCount: initialLikeCount,
  isLiked: initialLiked = false,
  onLikeClick,
  youtubeUrl,
}: CreatorHomeProfileProps) => {
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
      aria-label={`크리에이터: ${nickname}, 유튜브 구독자 ${subscriberCount}만, ${ageGroup}대, ${skinType}`}
    >
      {/* 프로필 사진 */}
      <div
        className="flex aspect-square h-15.25 w-15.25 shrink-0 items-center justify-center overflow-hidden rounded-full"
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
        className="flex min-w-0 flex-1 flex-col justify-center gap-2"
        aria-hidden="true"
      >
        {/* 이름 + 유튜브 구독자 */}
        <div className="flex items-center gap-2">
          <span className="font-pretendard shrink-0 text-[1.25rem] leading-[150%] font-semibold">
            {nickname}
          </span>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="caption-m text-grey08 flex shrink-0 items-center gap-0.5"
            aria-label={`${nickname} 유튜브 채널로 이동`}
          >
            <YoutubeIcon />
            {formatSubscriberCount(subscriberCount)}
            <Move12Icon />
          </a>
        </div>

        {/* 피부/나이 칩 */}
        <div className="flex items-center gap-1 p-0">
          <ChipBasic label={`${ageGroup}대`} bgColor="grey03" />
          <ChipBasic label={skinType} bgColor="grey03" />
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
