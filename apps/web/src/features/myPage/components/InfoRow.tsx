// InfoRow.tsx
import { Link } from 'react-router';
import { MainArrowIcon } from '@/shared/icons';

type InfoRowProps = {
  label: string;
  value?: string;
  to?: string;
  onClick?: () => void;
};

export const InfoRow = ({ label, value, to, onClick }: InfoRowProps) => {
  const arrowButton = to ? (
    <Link to={to} aria-label={`${label} 페이지로 이동`}>
      <MainArrowIcon className="text-grey06" />
    </Link>
  ) : onClick ? (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label} 페이지로 이동`}
    >
      <MainArrowIcon className="text-grey06" />
    </button>
  ) : null;
  return (
    <div className="flex w-full items-center justify-between">
      <span className="body1-sb text-grey-black">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-grey05 body2-m">{value}</span>}
        {arrowButton}
      </div>
    </div>
  );
};
