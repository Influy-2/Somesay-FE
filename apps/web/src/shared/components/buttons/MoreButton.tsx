// 컴포넌트 Button/더보기
import { Link } from 'react-router';

interface MoreButtonProps {
  to: string;
  text: string;
}

export const MoreButton = ({ to, text }: MoreButtonProps) => {
  return (
    <Link
      to={to}
      className="border-grey03 body2-m text-grey-black flex h-10 w-full items-center justify-center border"
    >
      {text}
    </Link>
  );
};
