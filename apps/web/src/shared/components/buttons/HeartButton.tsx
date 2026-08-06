import {
  HeartWhiteOffIcon,
  HeartOnIcon,
  HeartBlackOffIcon,
} from '@/shared/icons';

interface WhiteHeartButtonProps {
  isHearted: boolean;
  onHeartToggle: () => void;
  productName: string;
}
export const WhiteHeartButton = ({
  isHearted,
  onHeartToggle,
  productName,
}: WhiteHeartButtonProps) => {
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

interface HeartButtonProps {
  isHearted: boolean;
  onHeartToggle: () => void;
  productName: string;
  onColor: 'white' | 'black';
  offColor: 'white' | 'black';
  isPending?: boolean;
}
export const HeartButton = ({
  isHearted,
  onHeartToggle,
  productName,
  onColor = 'white',
  offColor = 'black',
  isPending,
}: HeartButtonProps) => {
  return (
    <button
      type="button"
      onClick={onHeartToggle}
      disabled={isPending}
      className="flex cursor-pointer items-center justify-center disabled:cursor-default"
      aria-label={
        isHearted ? `${productName} 찜 해제` : `${productName} 찜하기`
      }
      aria-pressed={isHearted}
      aria-busy={isPending}
    >
      {isHearted && onColor == 'white' && (
        <HeartOnIcon className="text-white" />
      )}
      {isHearted && onColor == 'black' && (
        <HeartOnIcon className="text-black" />
      )}
      {!isHearted && offColor == 'white' && <HeartWhiteOffIcon />}
      {!isHearted && offColor == 'black' && <HeartBlackOffIcon />}
    </button>
  );
};
