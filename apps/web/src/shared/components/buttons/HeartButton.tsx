import { HeartWhiteOffIcon, HeartOnIcon } from '@/shared/icons';

interface HeartButtonProps {
  isHearted: boolean;
  onHeartToggle: () => void;
  productName: string;
}
export const WhiteHeartButton = ({
  isHearted,
  onHeartToggle,
  productName,
}: HeartButtonProps) => {
  return (
    <button
      type="button"
      onClick={onHeartToggle}
      className="flex cursor-pointer items-center justify-center"
      aria-label={
        isHearted ? `${productName} 찜 해제` : `${productName} 찜하기`
      }
      aria-pressed={isHearted}
    >
      {isHearted ? <HeartOnIcon /> : <HeartWhiteOffIcon />}
    </button>
  );
};
