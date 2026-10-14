import { SearchIcon } from '@/shared/icons';

// 눌렀을 때 검색 화면으로 넘어가는 콜백만 받습니다.
interface ProductSearchTriggerProps {
  onClick: () => void;
}

// 입력처럼 보이지만 실제로는 검색 화면 진입용 버튼입니다.
export const ProductSearchTrigger = ({
  onClick,
}: ProductSearchTriggerProps) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-grey01 flex h-10 w-full items-center justify-between px-2.5 py-2 text-left"
  >
    <span className="body2-m text-grey05">제품명 또는 브랜드명 검색</span>
    <SearchIcon />
  </button>
);
