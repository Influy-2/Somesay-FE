import { ArrowBackIcon } from '@/shared/icons';
import { ShareIcon } from '@/shared/icons';
import { useNavigate, Link } from 'react-router';

export const CreatorHomeHeader = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex h-13.5 items-center justify-between px-4 py-2.5">
      <button type="button" aria-label="뒤로 가기" onClick={handleGoBack}>
        <ArrowBackIcon aria-hidden="true" />
      </button>
      {/* TODO: 나중에 공유 페이지로 이동 */}
      <Link to={`/`} aria-label="공유">
        <ShareIcon aria-hidden="true" />
      </Link>
    </header>
  );
};
