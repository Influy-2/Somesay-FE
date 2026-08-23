// 컴포넌트 Button/더보기
import { Link } from 'react-router';

interface MoreButtonProps {
  to?: string;
  text: string;
  onClick?: () => void;
}

export const MoreButton = ({ to, text, onClick }: MoreButtonProps) => {
  if (to) {
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
      className="border-grey03 body2-m text-grey-black flex h-10 w-full items-center justify-center border"
    >
      {text}
    </button>
  );
};
