// 컴포넌트 Button/더보기
import { Link } from 'react-router';

interface MoreButtonProps {
  to?: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MoreButton = ({
  to,
  text,
  onClick,
  disabled = false,
}: MoreButtonProps) => {
  if (to && !disabled) {
    return (
      <Link
        to={to}
        className="border-grey03 body2-m text-grey-black flex h-10 w-full items-center justify-center border"
      >
        {text}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border-grey03 body2-m text-grey-black flex h-10 w-full items-center justify-center border disabled:cursor-not-allowed disabled:opacity-60"
    >
      {text}
    </button>
  );
};
