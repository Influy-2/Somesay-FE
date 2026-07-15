//Profile/내리뷰평가화면/세로형

import cn from '@/utils/cn';

interface EvaluatedCreatorItemVerticalProps {
  creatorId: number;
  profileImageUrl: string;
  name: string;
  isSelected: boolean;
  onClick: (creatorId: number) => void;
}

export const EvaluatedCreatorItemVertical = ({
  creatorId,
  profileImageUrl,
  name,
  isSelected,
  onClick,
}: EvaluatedCreatorItemVerticalProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(creatorId)}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={cn(
          'size-15 overflow-hidden rounded-full',
          isSelected ? 'border-[1.8px] border-black' : 'opacity-50'
        )}
      >
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span className="caption1-m line-clamp-1 w-15 text-center">{name}</span>
    </button>
  );
};
