import {
  HeartWhiteOffIcon,
  HeartOnIcon,
  HeartBlackOffIcon,
} from '@/shared/icons';

type HeartColor = 'white' | 'black';

const ON_ICON_COLOR: Record<HeartColor, string> = {
  white: 'text-white',
  black: 'text-black',
};

const OFF_ICON: Record<HeartColor, typeof HeartWhiteOffIcon> = {
  white: HeartWhiteOffIcon,
  black: HeartBlackOffIcon,
};

interface HeartButtonProps {
  isHearted: boolean;
  onHeartToggle: () => void;
  productName: string;
  /** 찜한 상태의 하트 색 (기본: 이미지 위에 올리는 흰색) */
  onColor?: HeartColor;
  /** 찜하지 않은 상태의 하트 색 (기본: 이미지 위에 올리는 흰색) */
  offColor?: HeartColor;
}

export const HeartButton = ({
  isHearted,
  onHeartToggle,
  productName,
  onColor = 'white',
  offColor = 'white',
}: HeartButtonProps) => {
  const OffIcon = OFF_ICON[offColor];

  return (
    <button
      type="button"
      onClick={onHeartToggle}
      // 아이콘이 작아 터치 영역만 넓히고, 음수 마진으로 레이아웃은 유지합니다.
      className="-m-2 flex cursor-pointer items-center justify-center p-2"
      aria-label={
        isHearted ? `${productName} 찜 해제` : `${productName} 찜하기`
      }
      aria-pressed={isHearted}
    >
      {isHearted ? (
        <HeartOnIcon className={ON_ICON_COLOR[onColor]} />
      ) : (
        <OffIcon />
      )}
    </button>
  );
};
