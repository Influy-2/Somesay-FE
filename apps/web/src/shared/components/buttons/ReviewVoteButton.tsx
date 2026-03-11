import AgreeIcon from '@/shared/icons/AgreeIcon.svg?react';
import DisagreeIcon from '@/shared/icons/DisagreeIcon.svg?react';
import cn from '@/utils/cn';

export type ReviewVoteType = 'agree' | 'disagree';

interface ReviewVoteButtonProps {
  type: ReviewVoteType;
  isActive: boolean; // 현재 유저가 선택한 상태
  onClick: (type: ReviewVoteType) => void;
}

export const ReviewVoteButton = ({
  type,
  isActive,
  onClick,
}: ReviewVoteButtonProps) => {
  const IconComponent = type === 'agree' ? AgreeIcon : DisagreeIcon;

  return (
    <button
      aria-pressed={isActive}
      type="button"
      onClick={() => onClick(type)}
      className={cn(
        'flex w-full cursor-pointer items-center justify-center gap-1 px-2.5 py-3',
        {
          'bg-grey03 text-black': !isActive,
          'bg-black text-white': isActive,
        }
      )}
    >
      {type === 'agree' ? '공감해요' : '반대해요'}
      <IconComponent />
    </button>
  );
};
