import ArrowBackIcon from '@/shared/icons/ArrowBackIcon.svg?react';
import SearchIcon from '@/shared/icons/SearchIcon.svg?react';
import { useNavigate, Link } from 'react-router';

interface SubCategoryHeaderProps {
  title: string;
}

export function SubCategoryHeader({ title }: SubCategoryHeaderProps) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex h-13.5 items-center justify-between px-4 py-2.5">
      <button type="button" aria-label="뒤로 가기" onClick={handleGoBack}>
        <ArrowBackIcon aria-hidden="true" />
      </button>
      <h1 className="body1-sb">{title}</h1>
      {/* TODO: 나중에 검색 페이지로 이동 */}
      <Link to={`/`} aria-label="검색">
        <SearchIcon aria-hidden="true" />
      </Link>
    </header>
  );
}
