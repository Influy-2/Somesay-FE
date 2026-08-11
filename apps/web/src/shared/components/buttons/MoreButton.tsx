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
  // 링크형 더보기에는 로딩/비활성 상태가 없으므로 disabled는 버튼형에만 적용됩니다.
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
      disabled={disabled}
      className="border-grey03 body2-m text-grey-black flex h-10 w-full items-center justify-center border disabled:cursor-not-allowed disabled:opacity-60"
    >
      {text}
    </button>
  );
};
