// InfoRow.tsx
import { Link } from 'react-router';
import { MainArrow20Icon } from '@/shared/icons';

type InfoRowProps = {
  label: string;
  value?: string;
  to?: string;
  onClick?: () => void;
};

// 행 전체를 눌러 이동하되, py로 넓힌 터치 영역만큼 -my로 상쇄해 레이아웃 박스는 그대로 둡니다.
const ROW_CLASS = '-my-2.5 flex w-full items-center justify-between py-2.5';

export const InfoRow = ({ label, value, to, onClick }: InfoRowProps) => {
  const content = (
    <>
      <span className="body1-sb text-grey-black">{label}</span>
      <span className="flex items-center gap-2">
        {value && <span className="text-grey05 body2-m">{value}</span>}
        {(to || onClick) && <MainArrow20Icon />}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={ROW_CLASS}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={ROW_CLASS}>
        {content}
      </button>
    );
  }

  // 이동할 곳이 아직 없는 메뉴는 화살표 없이 라벨만 보여줍니다.
  return (
    <div className="flex w-full items-center justify-between">{content}</div>
  );
};
