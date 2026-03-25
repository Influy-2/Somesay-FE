import HeartBlackOffIcon from '@/shared/icons/HeartBlackOffIcon.svg?react';
import HeartOnIcon from '@/shared/icons/HeartOnIcon.svg?react';

interface BlackHeartButtonProps {
  isLiked: boolean;
  onLikeToggle: () => void;
  likeCount: number;
}

export const BlackHeartButton = ({
  isLiked,
  onLikeToggle,
  likeCount,
}: BlackHeartButtonProps) => {
  return (
    <button
      type="button"
      onClick={onLikeToggle}
      className="flex w-8 shrink-0 cursor-pointer flex-col items-center gap-0.5"
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      aria-pressed={isLiked}
    >
      {isLiked ? <HeartOnIcon /> : <HeartBlackOffIcon />}
      <span className="caption1-m">
        {likeCount >= 10000
          ? `${Math.floor(likeCount / 10000)}만`
          : likeCount.toLocaleString()}
      </span>
    </button>
  );
};
